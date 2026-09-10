(() => {
  const players = [];

  // One timeline per comparison. If a stream stalls, pause the whole group.
  const synchronizedPlayer = (root, videos, update, report = () => {}) => {
    let playing = false;
    let pending = false;
    let run = 0;
    let frameRequest = 0;
    let loadController;
    let seekVersion = 0;
    const master = videos[0];
    const duration = () => Number.isFinite(master.duration) ? master.duration : 81 / 16;
    const notify = () => update({ playing, pending, time: master.currentTime, duration: duration() });

    const pause = () => {
      run += 1;
      playing = false;
      pending = false;
      loadController?.abort();
      cancelAnimationFrame(frameRequest);
      videos.forEach((video) => video.pause());
      notify();
    };

    const ready = (video, signal) => new Promise((resolve, reject) => {
      if (signal.aborted) return reject(new DOMException("Canceled", "AbortError"));
      if (video.readyState >= 3 && !video.seeking) return resolve();
      let timeout;
      const clean = () => {
        clearTimeout(timeout);
        video.removeEventListener("canplay", loaded);
        video.removeEventListener("seeked", loaded);
        video.removeEventListener("error", failed);
        signal.removeEventListener("abort", canceled);
      };
      const loaded = () => { if (video.readyState >= 3 && !video.seeking) { clean(); resolve(); } };
      const failed = () => { clean(); reject(new Error("Video unavailable")); };
      const canceled = () => { clean(); reject(new DOMException("Canceled", "AbortError")); };
      video.addEventListener("canplay", loaded);
      video.addEventListener("seeked", loaded);
      video.addEventListener("error", failed);
      signal.addEventListener("abort", canceled, { once: true });
      timeout = window.setTimeout(failed, 20000);
      if (video.networkState === 0 || video.preload === "none") {
        video.preload = "auto";
        video.load();
      }
    });

    const tick = () => {
      if (!playing) return;
      if (!master.seeking) {
        videos.slice(1).forEach((video) => {
          if (!video.seeking && Math.abs(video.currentTime - master.currentTime) > 0.09) {
            video.currentTime = master.currentTime;
          }
        });
      }
      notify();
      frameRequest = requestAnimationFrame(tick);
    };

    const play = async () => {
      pause();
      players.forEach((player) => { if (player.root !== root) player.pause(); });
      const attempt = run;
      pending = true;
      loadController = new AbortController();
      notify();
      report("Loading comparison…");
      try {
        await Promise.all(videos.map((video) => ready(video, loadController.signal)));
        if (attempt !== run) return;
        const time = master.ended || master.currentTime >= duration() - 0.03 ? 0 : master.currentTime;
        videos.forEach((video) => { if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time; });
        await Promise.all(videos.map((video) => ready(video, loadController.signal)));
        if (attempt !== run) return;
        await Promise.all(videos.map((video) => video.play()));
        if (attempt !== run) return;
        pending = false;
        playing = true;
        report("Synchronized playback · original frame timing · loops automatically");
        notify();
        tick();
      } catch (error) {
        if (attempt !== run) return;
        pause();
        if (error.name !== "AbortError") report("Playback could not start. Try Play again, or open an original clip below.", true);
      }
    };

    const seek = (time) => {
      const version = ++seekVersion;
      pause();
      const target = Math.max(0, Math.min(time, duration() - 1 / 16));
      videos.forEach((video) => {
        if (video.readyState >= 1) video.currentTime = target;
        else {
          video.addEventListener("loadedmetadata", () => {
            if (version === seekVersion) { video.currentTime = target; notify(); }
          }, { once: true });
          video.preload = "auto";
          video.load();
        }
      });
      report("Paused · scrub to inspect the same moment across methods");
      notify();
    };

    videos.forEach((video) => {
      video.controls = false;
      video.loop = false;
      video.muted = true;
      video.addEventListener("timeupdate", () => { if (!playing && video === master) notify(); });
      video.addEventListener("ended", () => {
        if (!playing) return;
        seek(0);
        play();
      });
      video.addEventListener("waiting", () => {
        if (!playing || video.seeking) return;
        pause();
        report("Buffering paused the comparison. Press Play to resume.");
      });
      video.addEventListener("error", () => {
        pause();
        report("A clip could not load. Try Replay, or use the original clip links below.", true);
      });
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }, { threshold: 0 }).observe(root);
    }
    const player = { root, play, pause, seek, reset: () => { seekVersion += 1; pause(); },
      active: () => playing || pending,
      toggle: () => playing || pending ? pause() : play(),
      setSpeed: (speed) => videos.forEach((video) => { video.defaultPlaybackRate = speed; video.playbackRate = speed; })
    };
    players.push(player);
    notify();
    return player;
  };

  const hero = document.querySelector("[data-hero-preview]");
  if (hero) {
    const button = hero.querySelector("[data-hero-play]");
    const player = synchronizedPlayer(hero, Array.from(hero.querySelectorAll("video")), ({ playing, pending }) => {
      button.textContent = pending ? "■ Cancel loading" : playing ? "Ⅱ Pause comparison" : "▶ Play comparison";
      button.setAttribute("aria-label", pending ? "Cancel loading comparison" : playing ? "Pause comparison" : "Play comparison");
    }, (message, error) => { if (error) button.textContent = "▶ Retry comparison"; });
    button.addEventListener("click", () => player.toggle());
  }

  const gallery = document.querySelector("[data-video-gallery]");
  const scenes = window.OMR_COMPARISONS;
  if (gallery && Array.isArray(scenes) && scenes.length) {
    const stage = gallery.querySelector("[data-comparison-stage]");
    const videos = Array.from(stage.querySelectorAll("video"));
    const playButton = gallery.querySelector("[data-play-all]");
    const timeline = gallery.querySelector("[data-timeline]");
    const timeOutput = gallery.querySelector("[data-playback-time]");
    const status = gallery.querySelector("[data-playback-status]");
    const cards = Array.from(gallery.querySelectorAll("[data-scene]"));
    const filters = Array.from(gallery.querySelectorAll("[data-scene-filter]"));
    let visibleScenes = scenes.filter((scene) => scene.paper);
    let current = scenes[0];
    let scrubbing = false;
    let resumeAfterScrub = false;
    const player = synchronizedPlayer(stage, videos, ({ playing, pending, time, duration }) => {
      playButton.textContent = pending ? "■ Cancel" : playing ? "Ⅱ Pause" : "▶ Play";
      playButton.setAttribute("aria-label", pending ? "Cancel loading comparison" : playing ? "Pause comparison" : "Play comparison");
      if (!scrubbing) timeline.value = String(time);
      timeline.max = String(duration);
      timeline.setAttribute("aria-valuetext", `${time.toFixed(2)} of ${duration.toFixed(2)} seconds`);
      timeOutput.textContent = `${time.toFixed(2)} / ${duration.toFixed(2)} s`;
    }, (message, error = false) => {
      status.textContent = message;
      status.classList.toggle("has-error", error);
    });
    gallery.querySelector("[data-shared-controls]").hidden = false;

    const showScene = (scene, resume = player.active()) => {
      player.reset();
      current = scene;
      gallery.querySelector("[data-scene-title]").textContent = scene.title;
      gallery.querySelector("[data-scene-category]").textContent = `${scene.category}${scene.paper ? " · From the paper" : ""}`;
      gallery.querySelector("[data-scene-focus]").textContent = scene.focus;
      gallery.querySelector("[data-scene-observation]").textContent = scene.observation;
      gallery.querySelector("[data-scene-limitation]").textContent = scene.limitation;
      gallery.querySelector("[data-scene-prompt]").textContent = scene.prompt;
      gallery.querySelector("[data-scene-id]").textContent = `Prompt ${scene.id}`;
      gallery.querySelector("[data-scene-counter]").textContent = `${String(visibleScenes.indexOf(scene) + 1).padStart(2, "0")} / ${String(visibleScenes.length).padStart(2, "0")}`;
      cards.forEach((card) => {
        const selected = card.dataset.scene === scene.id;
        card.setAttribute("aria-pressed", String(selected));
        if (selected) {
          const strip = card.parentElement;
          const left = card.offsetLeft;
          if (left < strip.scrollLeft) strip.scrollLeft = left;
          else if (left + card.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = left + card.offsetWidth - strip.clientWidth;
        }
      });
      videos.forEach((video) => {
        const base = `assets/videos/${scene.id}/comparison`;
        video.poster = `${base}.webp`;
        video.src = `${base}.mp4`;
        video.preload = "none";
        video.setAttribute("aria-label", `${scene.title}: OMR on the left, Wan2.2 in the center, and P and P on the right`);
        video.load();
      });
      gallery.querySelectorAll("[data-original]").forEach((link) => { link.href = `assets/videos/${scene.id}/${link.dataset.original}.mp4`; });
      timeline.value = "0";
      timeOutput.textContent = "0.00 / 5.06 s";
      status.classList.remove("has-error");
      status.textContent = "Same prompt · same seed · one synchronized comparison";
      if (resume) player.play();
    };

    filters.forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.sceneFilter;
      visibleScenes = scenes.filter((scene) => filter === "all" || (filter === "paper" ? scene.paper : scene.category === filter));
      filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      cards.forEach((card) => { card.hidden = !visibleScenes.some((scene) => scene.id === card.dataset.scene); });
      gallery.querySelector("[data-gallery-count]").textContent = `${visibleScenes.length} ${filter === "paper" ? "paper examples" : "examples"}`;
      if (!visibleScenes.includes(current)) showScene(visibleScenes[0]);
      else gallery.querySelector("[data-scene-counter]").textContent = `${String(visibleScenes.indexOf(current) + 1).padStart(2, "0")} / ${String(visibleScenes.length).padStart(2, "0")}`;
    }));
    cards.forEach((card) => card.addEventListener("click", () => {
      showScene(scenes.find((scene) => scene.id === card.dataset.scene));
      if (stage.getBoundingClientRect().bottom < 100) stage.scrollIntoView({ behavior: "auto", block: "start" });
    }));
    const nextScene = (direction) => showScene(visibleScenes[(visibleScenes.indexOf(current) + direction + visibleScenes.length) % visibleScenes.length]);
    gallery.querySelector("[data-scene-prev]").addEventListener("click", () => nextScene(-1));
    gallery.querySelector("[data-scene-next]").addEventListener("click", () => nextScene(1));
    playButton.addEventListener("click", () => player.toggle());
    gallery.querySelector("[data-restart]").addEventListener("click", () => { player.seek(0); player.play(); });
    timeline.addEventListener("pointerdown", () => { scrubbing = true; resumeAfterScrub = player.active(); player.pause(); });
    timeline.addEventListener("input", () => { if (!scrubbing) { resumeAfterScrub = player.active(); scrubbing = true; } player.seek(Number(timeline.value)); });
    const finishScrub = () => {
      scrubbing = false;
      if (resumeAfterScrub) { resumeAfterScrub = false; player.play(); }
    };
    timeline.addEventListener("change", finishScrub);
    timeline.addEventListener("pointerup", finishScrub);
    timeline.addEventListener("pointercancel", finishScrub);
    gallery.querySelector("[data-playback-speed]").addEventListener("change", (event) => player.setSpeed(Number(event.target.value)));
    const fullscreenButton = gallery.querySelector("[data-fullscreen]");
    if (!stage.requestFullscreen) fullscreenButton.hidden = true;
    fullscreenButton.addEventListener("click", async () => {
      try { if (document.fullscreenElement) await document.exitFullscreen(); else await stage.requestFullscreen(); }
      catch { status.textContent = "Full screen is unavailable in this browser. Original clips can be opened below."; }
    });
    document.addEventListener("fullscreenchange", () => {
      fullscreenButton.textContent = document.fullscreenElement === stage ? "⛶ Exit full screen" : "⛶ Expand";
      fullscreenButton.setAttribute("aria-label", document.fullscreenElement === stage ? "Exit full screen" : "Expand comparison to full screen");
    });
  }

  document.addEventListener("visibilitychange", () => { if (document.hidden) players.forEach((player) => player.pause()); });

  const gradientExplainer = document.querySelector("[data-gradient-explainer]");
  if (gradientExplainer) {
    const modeButtons = Array.from(gradientExplainer.querySelectorAll("[data-gradient-mode]"));
    const replayButton = gradientExplainer.querySelector("[data-gradient-replay]");
    const routeUnits = Array.from(gradientExplainer.querySelectorAll("[data-forward-step]"));
    const status = gradientExplainer.querySelector("[data-gradient-status]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const descriptions = {
      forward: "Forward computation: WMReward decodes and re-encodes pixels, whereas OMR maps generator latents directly into predictor tokens.",
      backward: "Backward gradient: OMR bypasses the in-loop VAE decoder and V-JEPA encoder."
    };

    const playRoute = (mode, announce = true) => {
      gradientExplainer.dataset.mode = mode;
      modeButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.gradientMode === mode));
      });
      routeUnits.forEach((unit) => {
        const step = mode === "forward" ? unit.dataset.forwardStep : unit.dataset.backwardStep;
        unit.style.setProperty("--route-order", step);
      });
      if (status) status.textContent = descriptions[mode];

      gradientExplainer.classList.remove("is-playing");
      if (!reduceMotion.matches) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => gradientExplainer.classList.add("is-playing"));
        });
      }
      if (announce && status) status.setAttribute("aria-live", "polite");
    };

    gradientExplainer.classList.add("is-enhanced");
    modeButtons.forEach((button) => {
      button.addEventListener("click", () => playRoute(button.dataset.gradientMode));
    });
    replayButton?.addEventListener("click", () => playRoute(gradientExplainer.dataset.mode));
    reduceMotion.addEventListener?.("change", () => playRoute(gradientExplainer.dataset.mode, false));
    playRoute(gradientExplainer.dataset.mode, false);
  }

  const copyButton = document.querySelector("[data-copy-bibtex]");
  const bibtex = document.querySelector("#bibtex code");
  if (copyButton && bibtex) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(bibtex.textContent.trim());
        copyButton.textContent = "Copied";
        window.setTimeout(() => { copyButton.textContent = "Copy citation"; }, 1800);
      } catch {
        copyButton.textContent = "Select citation below";
      }
    });
  }
})();
