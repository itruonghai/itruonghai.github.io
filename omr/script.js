(() => {
  const videoSlots = document.querySelectorAll("[data-video-src]");
  videoSlots.forEach(async (slot) => {
    const sourceUrl = slot.dataset.videoSrc;
    if (!sourceUrl) return;
    try {
      const response = await fetch(sourceUrl, { method: "HEAD" });
      if (!response.ok) return;
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.startsWith("video/") && !sourceUrl.endsWith(".mp4")) return;

      const poster = slot.querySelector("img");
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
  });

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
