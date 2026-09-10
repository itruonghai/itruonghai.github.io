# Animated paper teaser

`backflip-annotated.gif` is a standalone annotated backflip comparison.
`backflip-annotated.mp4` is the equivalent lighter loop used on the page;
`backflip-annotated.webp` is its second inspection frame as a static poster.

The inputs are `../det_013/wan.mp4` and `../det_013/omr.mp4`.
Both use the exact same source frame index at every point. The excerpt
keeps frames 0–56 (source time 0–3.5 seconds); there is no spatial crop,
motion interpolation, event realignment, or generated scene content.

Playback is 1× for source frames 0–31, then 0.25× for frames 32–56.
Additional inspection holds are inserted in both panels together:

| Stop | Source time | Extra hold | Output start |
| --- | --- | --- | --- |
| 1: leg position | 2.75 s | 2.0 s | 5.0 s |
| 2: next leg position | 3.00 s | 2.0 s | 8.0 s |
| 3: landing | 3.50 s | 1.0 s | 12.0 s |

The resulting loop is 13.25 seconds. The MP4 contains 424 frames at 32 fps,
including exact frame repeats for slow motion and holds. The GIF contains
57 frames with variable durations; its total duration also equals 13.25 s.
All frames were decoded for validation. Dotted red and green circles follow
the paper teaser's annotation style, and source timestamps remain visible.
`manifest.json` records the full frame-level timing schedule.

The page offers play/pause, replay, and direct inspection-stop buttons.
Autoplay respects reduced-motion preferences and pauses offscreen.
The original full-length three-method comparison remains in the gallery,
including the remaining body–cushion artifacts outside this excerpt.

## Rebuild

Run `python render_teaser.py` from this directory using Python with PyAV
and Pillow installed. The renderer uses the macOS Arial fonts; adjust
`FONT` and `BOLD` on other systems. `--source` and `--output` override
the input and output directories, and `--qa-dir` exports inspection PNGs.
The hold times, tracked circle coordinates, and labels are editable in
the renderer. If the timing changes, update the stop buttons and
`data-duration` in `index.html` to match `manifest.json`.
