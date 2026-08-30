# OMR project-page videos

Place comparison videos in this directory using these filenames:

- `backflip-comparison.mp4`
- `tool-deformation.mp4`
- `material-dynamics.mp4`

Then set the corresponding empty `data-video-src` attribute in `omr/index.html`
to the file path, for example:

```html
data-video-src="assets/videos/backflip-comparison.mp4"
```

The poster-backed placeholder will become a native, muted, looping HTML video
player. Use H.264 MP4 for broad browser compatibility, and keep method labels
inside each rendered comparison video.
