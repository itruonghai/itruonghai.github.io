(() => {
  const players = [];

  // One timeline per comparison. If a stream stalls, pause the whole group.
  const synchronizedPlayer = (root, videos, update, report = () => {}, enabledVideos = () => videos) => {
    let playing = false;
    let pending = false;
    let run = 0;
    let frameRequest = 0;
    let loadController;
    let seekVersion = 0;
    const master = videos[0];
    const duration = () => Number.isFinite(master.duration) ? master.duration : Number(master.dataset?.duration) || 81 / 16;
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
        enabledVideos().slice(1).forEach((video) => {
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
        const activeVideos = enabledVideos();
        await Promise.all(activeVideos.map((video) => ready(video, loadController.signal)));
        if (attempt !== run) return;
        const time = master.ended || master.currentTime >= duration() - 0.03 ? 0 : master.currentTime;
        activeVideos.forEach((video) => { if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time; });
        await Promise.all(activeVideos.map((video) => ready(video, loadController.signal)));
        if (attempt !== run) return;
        await Promise.all(activeVideos.map((video) => video.play()));
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
      enabledVideos().forEach((video) => {
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
        if (!playing || !enabledVideos().includes(video)) return;
        seek(0);
        play();
      });
      video.addEventListener("waiting", () => {
        if (!playing || video.seeking || !enabledVideos().includes(video)) return;
        pause();
        report("Buffering paused the comparison. Press Play to resume.");
      });
      video.addEventListener("error", () => {
        if (!enabledVideos().includes(video)) return;
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = false;
    let autoStarted = false;
    const player = synchronizedPlayer(hero, Array.from(hero.querySelectorAll("video")), ({ playing, pending }) => {
      button.textContent = pending ? "■ Cancel loading" : playing ? "Ⅱ Pause teaser" : "▶ Play teaser";
      button.setAttribute("aria-label", pending ? "Cancel loading teaser" : playing ? "Pause annotated teaser" : "Play annotated teaser");
    }, (message, error) => { if (error) button.textContent = "▶ Retry teaser"; });
    button.addEventListener("click", () => { userPaused = player.active(); player.toggle(); });
    hero.querySelector("[data-hero-replay]").addEventListener("click", () => {
      userPaused = false;
      player.seek(0);
      player.play();
    });
    hero.querySelectorAll("[data-hero-stop]").forEach((stop) => stop.addEventListener("click", () => {
      userPaused = true;
      player.seek(Number(stop.dataset.heroStop));
    }));
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) player.pause();
        else if (!autoStarted && !userPaused && !reducedMotion.matches) { autoStarted = true; player.play(); }
      }, { threshold: 0.25 }).observe(hero);
    }
    reducedMotion.addEventListener?.("change", () => { if (reducedMotion.matches) player.pause(); });
  }

  const comparisonOpeners = new Map();
  const openComparison = (id) => comparisonOpeners.get(id)?.();
  document.querySelectorAll("[data-video-gallery]").forEach((gallery) => {
    const scenes = (window.OMR_COMPARISONS || []).filter((scene) =>
      scene.methods.length === (gallery.dataset.videoGallery === "three" ? 3 : 2));
    if (!scenes.length) return;
    const dialog = gallery.querySelector("[data-comparison-dialog]");
    const stage = gallery.querySelector("[data-comparison-stage]");
    const videos = Array.from(stage.querySelectorAll("video"));
    const playButton = gallery.querySelector("[data-play-all]");
    const timeline = gallery.querySelector("[data-timeline]");
    const timeOutput = gallery.querySelector("[data-playback-time]");
    const status = gallery.querySelector("[data-playback-status]");
    const cards = Array.from(gallery.querySelectorAll("[data-scene]"));
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
    }, () => videos.filter((video) => current.methods.includes(video.dataset.method)));
    gallery.querySelector("[data-shared-controls]").hidden = false;

    const showScene = (scene, resume = player.active()) => {
      player.reset();
      current = scene;
      const threeWay = scene.methods.length === 3;
      gallery.querySelector("[data-compare-layout]").dataset.compareLayout = threeWay ? "all" : "wan";
      gallery.querySelector("[data-method-summary]").textContent = threeWay ? "Baseline · P&P · OMR" : "Baseline · OMR";
      gallery.querySelectorAll("[data-method-panel]").forEach((panel) => {
        panel.hidden = !scene.methods.includes(panel.dataset.methodPanel);
      });
      gallery.querySelector("[data-scene-title]").textContent = scene.title;
      gallery.querySelector("[data-scene-category]").textContent = scene.category;
      gallery.querySelector("[data-scene-focus]").textContent = scene.focus;
      gallery.querySelector("[data-scene-observation]").textContent = scene.observation;
      gallery.querySelector("[data-scene-limitation]").textContent = scene.limitation;
      gallery.querySelector("[data-scene-prompt]").textContent = scene.prompt;
      gallery.querySelector("[data-scene-id]").textContent = `Prompt ${scene.id}`;
      gallery.querySelector("[data-scene-counter]").textContent = `${String(scenes.indexOf(scene) + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
      cards.forEach((card) => {
        const selected = card.dataset.scene === scene.id;
        card.setAttribute("aria-pressed", String(selected));
      });
      videos.forEach((video) => {
        // Remove unused sources so a two-way scene never loads a hidden P&P clip.
        video.querySelectorAll("source").forEach((source) => source.remove());
        if (!scene.methods.includes(video.dataset.method)) {
          video.removeAttribute("src");
          video.removeAttribute("poster");
          video.load();
          return;
        }
        const base = `assets/videos/${scene.id}/${video.dataset.method}`;
        video.poster = `${base}.webp`;
        video.src = `${base}.mp4`;
        video.preload = "none";
        video.setAttribute("aria-label", `${video.dataset.method === "wan" ? "Wan2.2" : video.dataset.method === "pnp" ? "P and P" : "OMR"}: ${scene.title}`);
        video.load();
      });
      gallery.querySelectorAll("[data-original]").forEach((link) => {
        link.hidden = !scene.methods.includes(link.dataset.original);
        if (link.hidden) link.removeAttribute("href");
        else link.href = `assets/videos/${scene.id}/${link.dataset.original}.mp4`;
      });
      timeline.value = "0";
      timeOutput.textContent = "0.00 / 5.06 s";
      status.classList.remove("has-error");
      status.textContent = "Same prompt · same seed · one synchronized comparison";
      if (resume) player.play();
    };

    const openScene = (scene) => {
      if (dialog && !dialog.open) dialog.showModal();
      showScene(scene, true);
      if (!dialog) stage.scrollIntoView({ behavior: "auto", block: "start" });
    };
    scenes.forEach((scene) => comparisonOpeners.set(scene.id, () => openScene(scene)));
    cards.forEach((card) => card.addEventListener("click", () => {
      const scene = scenes.find((item) => item.id === card.dataset.scene);
      if (scene) openScene(scene);
    }));
    gallery.querySelector("[data-scene-next]")?.addEventListener("click", () =>
      showScene(scenes[(scenes.indexOf(current) + 1) % scenes.length], true));
    if (dialog) {
      const close = () => { player.reset(); dialog.close(); };
      gallery.querySelector("[data-close-comparison]").addEventListener("click", close);
      dialog.addEventListener("cancel", () => player.reset());
      dialog.addEventListener("close", () => {
        player.reset();
        cards.forEach((card) => card.setAttribute("aria-pressed", "false"));
      });
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) close();
      });
    }
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
    if (!dialog) showScene(current, false);
  });

  const showcase = document.querySelector("[data-highlight-showcase]");
  if (showcase) {
    const cases = {
      "bag-contact": {
        id: "orig_039", title: "Does contact lead to recovery?",
        caption: "OMR shows the rod approaching, pressing into the bag, and withdrawing as the bag recovers. Wan2.2 shows a rotating prop with no visible hand support.",
        context: "Both clips misrepresent the requested nunchucks. Inspect contact and recovery, not correct execution of the prompt.",
        geometry: "full frames"
      },
      "towel-water": {
        id: "orig_086", title: "How does water leave the towel?",
        caption: "Wan2.2 repeatedly produces strong directional jets. OMR shows more dispersed droplets around the towel; compare the water’s shape and motion as the hands squeeze.",
        context: "Both physics scores are 3/5. OMR still shows excessive suspended spray and incomplete twisting; this is a relative fluid-appearance comparison, not a physically correct simulation.",
        geometry: "full frames"
      },
      "clay-contact": {
        id: "orig_084", title: "Does deformation follow contact?",
        caption: "Wan2.2 begins with a hole already visible in the clay. OMR begins with an intact surface, then shows the finger pressing in and withdrawing to leave an indentation.",
        context: "Both existing physics scores are 5/5. OMR’s final indentation is still large relative to the fingertip."
      }
    };
    const video = showcase.querySelector("[data-highlight-video]");
    const toggle = showcase.querySelector("[data-highlight-toggle]");
    const choices = Array.from(showcase.querySelectorAll("[data-highlight]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let selected = "bag-contact";
    let userPaused = false;
    let visible = false;
    let autoStarted = false;
    const player = synchronizedPlayer(showcase, [video], ({ playing, pending }) => {
      toggle.textContent = pending ? "■ Cancel loading" : playing ? "Ⅱ Pause loop" : "▶ Play loop";
      toggle.setAttribute("aria-label", pending ? "Cancel loading annotated loop" : playing ? "Pause annotated loop" : "Play annotated loop");
    }, (message, error) => { if (error) toggle.textContent = "▶ Retry loop"; });
    const start = () => {
      if (!video.getAttribute("src")) video.src = `assets/videos/highlights/${selected}.mp4`;
      player.play();
    };
    toggle.addEventListener("click", () => {
      userPaused = player.active();
      if (userPaused) player.pause(); else start();
    });
    choices.forEach((button) => button.addEventListener("click", () => {
      player.reset();
      selected = button.dataset.highlight;
      const item = cases[selected];
      video.poster = `assets/videos/highlights/${selected}.webp`;
      video.height = selected === "clay-contact" ? 614 : 438;
      video.src = `assets/videos/highlights/${selected}.mp4`;
      video.preload = "none";
      video.load();
      video.setAttribute("aria-label", `${item.title} Annotated Wan2.2 and OMR comparison at half speed, with ${item.geometry || "the same center crop"} and source timestamps.`);
      showcase.querySelector("[data-highlight-title]").textContent = item.title;
      showcase.querySelector("[data-highlight-caption]").textContent = item.caption;
      showcase.querySelector("[data-highlight-context]").textContent = item.context;
      showcase.querySelector("[data-highlight-gif]").href = `assets/videos/highlights/${selected}.gif`;
      choices.forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
      if (!userPaused && !reduceMotion.matches) start();
    }));
    showcase.querySelector("[data-highlight-open]").addEventListener("click", () => {
      player.pause();
      openComparison(cases[selected].id);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) player.pause();
        else if (!autoStarted && !userPaused && !reduceMotion.matches) { autoStarted = true; start(); }
      }, { threshold: 0.3 }).observe(showcase);
    }
    reduceMotion.addEventListener?.("change", () => { if (reduceMotion.matches) player.pause(); });
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
