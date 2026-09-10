# OMR comparison gallery

The 20 scenes come from the author's `compare.zip` (September 9, 2026).
Each scene directory contains the unmodified Wan2.2, P&P, and OMR H.264
clips (`wan.mp4`, `pnp.mp4`, `omr.mp4`), first-frame WebP posters, and a
small OMR thumbnail sampled at two seconds. The originals total 33.1 MB.

All 60 MP4 hashes were checked against the supplied manifest, and all
4,860 video frames were decoded successfully. Each triplet shares the
prompt, negative prompt, seed 0, Wan2.2-T2V-A14B checkpoint, 832 × 480
resolution, 81 frames, 16 fps, 40 base steps, and CFG 4.0 / 3.0.
Matching base steps do not imply matching computation costs.

`comparisons.js` contains public titles, prompts, viewing cues, observations,
limitations, and the supplied existing physics scores. It contains no
internal source paths or training configuration. These are selected
qualitative examples, not 20 independent wins or a new evaluation.
The first five correspond to the paper's illustrated scenes.

The main gallery shows all 20 prompts by default in a visible grid. It uses
the full-frame per-method originals with synchronized playback, scrubbing,
slow motion, and fullscreen. All-three and two-method views are available;
two-method views give each video more display space. Labels share the same
height and text alignment. Full prompts, viewing cues, and limitations
update with the selected scene. The precomposed comparison files from the
previous layout remain available but are not used by the current gallery.
The original MP4s remain directly available from the details disclosure.
Native video controls remain as a fallback when JavaScript is unavailable.
The hero reuses the two backflip clips; it does not download a second copy.

The original per-method files are not retimed or re-encoded and remain
available from the details disclosure; the archive's full reel is omitted.

## Annotated GIF highlights

`highlights/` contains three standalone GIFs and equivalent, lighter H.264
loop previews used on the page:

- `ring-support`: det_066, Wan2.2 vs. OMR, source 0–5 seconds.
- `balloon-rupture`: det_096, Wan2.2 vs. OMR, source 0–3 seconds.
- `clay-contact`: orig_084, Wan2.2 vs. OMR, source 0–5 seconds.

Both methods use the identical fixed crop `(160, 0, 672, 480)` from the
832 × 480 originals. Every source frame in each stated interval is kept,
at 0.5× speed (8 displayed frames per second). No interpolation, event-time
alignment, or synthetic video content is used. Labels and source timestamps
are burned into the GIFs; annotations change as the event develops. GIF
durations alternate between 120 and 130 ms to approximate 125 ms/frame.

The page loads only the selected loop preview. Autoplay respects reduced
motion, pauses offscreen, and can be stopped with the loop button. GIF
downloads preserve the same annotations and comparison. The 211 frames in
each output format were decoded and verified, and representative output
frames were visually inspected. `highlights/manifest.json` records the
source IDs, crop, intervals, frame counts, and file sizes.

These highlight pairs illustrate specific differences against Wan2.2,
not superiority over both baselines. P&P is competitive in the balloon
and clay cases, and the page states the tied existing physics scores.
