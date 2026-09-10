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

The gallery uses the archive's precomposed `comparison.mp4` for each scene:
OMR on the left, Wan2.2 in the center, and P&P on the right. All three
methods are encoded in one video and therefore stay aligned during playback,
seeking, and slow motion. Each composite has 81 frames at 2496 × 592 and
16 fps; all 1,620 composite frames have been decoded for verification.
CSS masks only the supplied 112-pixel title band, replacing it with readable
HTML method labels. The three 832 × 480 panels are never cropped or stacked.
The page loads only the selected comparison, and puts its notes, settings,
filters, and a scrollable scene strip inside the same panel.
The original MP4s remain directly available from the details disclosure.
Native video controls remain as a fallback when JavaScript is unavailable.
The hero reuses the two backflip clips; it does not download a second copy.

No clips were retimed or re-encoded. The original per-method files remain
available from the details disclosure; the archive's full reel is omitted.
