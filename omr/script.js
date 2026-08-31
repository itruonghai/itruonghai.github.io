(() => {
  const hydrateVideoSlot = async (slot) => {
    const sourceUrl = slot.dataset.videoSrc;
    if (!sourceUrl) return;
    try {
      const response = await fetch(sourceUrl, { method: "HEAD" });
      if (!response.ok) return;
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("video/") && !sourceUrl.endsWith(".mp4")) return;
      if (slot.dataset.videoSrc !== sourceUrl) return;

      const poster = slot.querySelector("img");
      if (!poster) return;
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.muted = true;
      video.loop = true;
      video.preload = "metadata";
      video.poster = poster.src;
      video.setAttribute("aria-label", slot.dataset.videoLabel || "OMR comparison video");

      const source = document.createElement("source");
      source.src = sourceUrl;
      source.type = contentType.startsWith("video/") ? contentType.split(";")[0] : "video/mp4";
      video.append(source);
      poster.replaceWith(video);
      slot.querySelector(".video-status")?.remove();
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          if (!entries[0].isIntersecting) video.pause();
        }, { threshold: 0.08 });
        observer.observe(video);
      }
    } catch {
      // Keep the poster visible when a video has not been added yet.
    }
  };

  const videoSlots = document.querySelectorAll(".video-shell[data-video-src]");
  videoSlots.forEach((slot) => hydrateVideoSlot(slot));

  const comparisonBrowser = document.querySelector("[data-comparison-browser]");
  if (comparisonBrowser) {
    const tabs = Array.from(comparisonBrowser.querySelectorAll("[role='tab']"));
    const panel = comparisonBrowser.querySelector("[role='tabpanel']");
    const title = comparisonBrowser.querySelector("[data-comparison-title]");
    const kicker = comparisonBrowser.querySelector("[data-comparison-kicker]");
    const caption = comparisonBrowser.querySelector("[data-comparison-caption]");

    const activateTab = (tab) => {
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      const currentMedia = panel.querySelector("img, video");
      if (currentMedia instanceof HTMLVideoElement) currentMedia.pause();

      const image = document.createElement("img");
      image.loading = "lazy";
      image.src = tab.dataset.poster;
      image.alt = `Three-way frame-strip comparison for ${tab.dataset.title.toLowerCase()}.`;
      image.width = Number(tab.dataset.width);
      image.height = Number(tab.dataset.height);
      currentMedia.replaceWith(image);

      panel.style.aspectRatio = `${tab.dataset.width} / ${tab.dataset.height}`;
      panel.dataset.videoSrc = tab.dataset.videoSrc;
      panel.dataset.videoLabel = `${tab.dataset.title} comparison video`;
      panel.setAttribute("aria-labelledby", tab.id);
      title.textContent = tab.dataset.title;
      kicker.textContent = tab.dataset.kicker;
      caption.textContent = tab.dataset.caption;

      if (!panel.querySelector(".video-status")) {
        const status = document.createElement("span");
        status.className = "video-status";
        status.innerHTML = '<i aria-hidden="true">▶</i> Frame-strip preview';
        panel.append(status);
      }
      hydrateVideoSlot(panel);
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
