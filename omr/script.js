(() => {
  const viewer = document.querySelector("[data-sequence-viewer]");

  if (viewer) {
    const baseline = viewer.querySelector("[data-baseline-frame]");
    const omr = viewer.querySelector("[data-omr-frame]");
    const range = viewer.querySelector("[data-sequence-range]");
    const output = viewer.querySelector("[data-frame-output]");
    const playButton = viewer.querySelector("[data-play]");
    const playIcon = viewer.querySelector("[data-play-icon]");
    const playLabel = viewer.querySelector("[data-play-label]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null;

    const showFrame = (frame) => {
      const next = Math.max(1, Math.min(6, Number(frame)));
      range.value = String(next);
      output.textContent = `${next} / 6`;
      baseline.src = `assets/backflip/baseline-${next}.webp`;
      omr.src = `assets/backflip/omr-${next}.webp`;
      baseline.alt = `Wan2.2 baseline, backflip sequence frame ${next} of 6`;
      omr.alt = `Wan2.2 with OMR, backflip sequence frame ${next} of 6`;
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = null;
      playButton.setAttribute("aria-pressed", "false");
      playIcon.textContent = "▶";
      playLabel.textContent = "Play sequence";
    };

    const play = () => {
      if (reducedMotion) {
        showFrame(Number(range.value) % 6 + 1);
        return;
      }
      playButton.setAttribute("aria-pressed", "true");
      playIcon.textContent = "Ⅱ";
      playLabel.textContent = "Pause sequence";
      timer = window.setInterval(() => showFrame(Number(range.value) % 6 + 1), 900);
    };

    range.addEventListener("input", () => {
      stop();
      showFrame(range.value);
    });

    playButton.addEventListener("click", () => {
      if (timer) stop(); else play();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting && timer) stop();
      }, { threshold: 0.08 });
      observer.observe(viewer);
    }

    for (let frame = 2; frame <= 6; frame += 1) {
      new Image().src = `assets/backflip/baseline-${frame}.webp`;
      new Image().src = `assets/backflip/omr-${frame}.webp`;
    }
  }

  const gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    const tabs = Array.from(gallery.querySelectorAll("[role='tab']"));
    const panel = gallery.querySelector("[role='tabpanel']");
    const image = gallery.querySelector("[data-gallery-image]");
    const title = gallery.querySelector("[data-gallery-title]");
    const caption = gallery.querySelector("[data-gallery-caption]");

    const activateTab = (tab) => {
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      const key = tab.dataset.example;
      image.src = `assets/qualitative/${key}.webp`;
      image.alt = `Qualitative frame strips comparing Wan2.2, P and P, and OMR for ${tab.dataset.title.toLowerCase()}.`;
      title.textContent = tab.dataset.title;
      caption.textContent = tab.dataset.caption;
      panel.setAttribute("aria-labelledby", tab.id);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = tabs[(index + direction + tabs.length) % tabs.length];
        next.focus();
        activateTab(next);
      });
    });
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
