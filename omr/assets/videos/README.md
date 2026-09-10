# OMR comparison gallery

The live gallery has 22 prompts: 19 retained from the author's `compare.zip`
and three added from `compare_new3.zip` (September 9, 2026). The author
rejected `det_066` (ring-supported motion) as a convincing physical example;
it is no longer in the live gallery or highlight selector. Its original
assets remain on disk for provenance, not as an endorsed result.

Five prompts show Wan2.2, P&P, and OMR:

- `orig_039`: punching-bag contact and recovery
- `orig_036`: folded napkin shape after release
- `orig_086`: wet-towel water breakup
- `det_081`: wood carving
- `det_053`: rowing and water response

The other 17 show Wan2.2 and OMR only. `comparisons.js` declares the exact
method list for every prompt. Hidden P&P clips are neither loaded nor part
of synchronization; their links are hidden and their captions are omitted.
Omitting P&P from a pair is a presentation choice, not evidence of a loss.

All 22 prompt cards are visible by default. Five three-method examples are
listed first and available through the Three methods filter. Original
full-frame videos share playback, scrubbing, slow motion, and fullscreen.
Method labels have equal heights and left alignment. Four retained scenes
are marked as paper examples; the new scenes are not paper illustrations.

## Provenance and limitations

The original 60 MP4s from `compare.zip` were hash-checked against its
manifest and all 4,860 frames were decoded. The nine newly imported MP4s
were also SHA-256 checked against the supplied manifest, and all 729 frames
decoded. `new-source-manifest.json` preserves public hashes and method IDs
without internal source paths. Imported source videos are unmodified.

Within each triplet, generation metadata match on prompt, negative prompt,
seed 0, Wan2.2-T2V-A14B checkpoint, 832 × 480 resolution, 81 frames, 16 fps,
40 base steps, and CFG 4.0 / 3.0. Equal base steps do not mean equal compute.
Source aliases map ext3_grad to OMR, wan22_base to Wan2.2, and selfrefine_l1
to P&P. The new archive's score order is OMR / Wan2.2 / P&P, explicitly
mapped to named keys in the website data.

These are selected qualitative comparisons, not independent wins or a new
evaluation. The bag example does not correctly depict nunchucks. The napkin
comparison with Wan2.2 mainly concerns task completion. Towel water remains
imperfect in all three clips. Viewing cues and limitations remain available
with each scene, including close comparisons and remaining artifacts.

## Annotated GIF highlights

The active `highlights/manifest.json` lists three standalone GIFs and
equivalent lighter H.264 loops used on the page:

- `bag-contact`: orig_039, Wan2.2 vs. OMR, source 0–5 seconds, full frames.
- `balloon-rupture`: det_096, Wan2.2 vs. OMR, source 0–3 seconds.
- `clay-contact`: orig_084, Wan2.2 vs. OMR, source 0–5 seconds.

The last two use the identical fixed crop `(160, 0, 672, 480)` from each
832 × 480 original. The bag highlight preserves the full field of view
to retain the hand and contact region. Every source frame in each stated
interval is kept at 0.5× speed (8 displayed frames per second), with source
timestamps and labels. No interpolation, event realignment, or synthetic
scene content is used. GIF durations alternate between 120 and 130 ms.
Both replacement outputs were decoded and timing-checked.

Only the selected loop loads. Autoplay respects reduced motion, pauses
offscreen, and can be stopped. Each highlight links to its full comparison;
the number of methods follows that scene's declared configuration.

The separate hero teaser is unchanged; see `teaser/README.md` for its
slow-motion, freeze-frame, and original-frame timing details.
