# OMR project-page videos

Place comparison videos in this directory using these filenames:

- `backflip-comparison.mp4`
- `baseball-wall-contact.mp4`
- `tool-clay-deformation.mp4`
- `ring-swing-body-dynamics.mp4`
- `wheelbarrow-concrete.mp4`

Then set the corresponding empty `data-video-src` attribute in `omr/index.html`
to the file path. The backflip path belongs on its `.video-shell`; the four
three-way comparison paths belong on the A-D tab buttons. For example:

```html
data-video-src="assets/videos/backflip-comparison.mp4"
```

The poster-backed placeholder will become a native, muted, looping HTML video
player. Use H.264 MP4 for broad browser compatibility, and keep method labels
inside each rendered comparison video.
