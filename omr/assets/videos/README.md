# OMR comparison gallery

The live page has 21 prompts: 18 retained from the author's `compare.zip`
and three added from `compare_new3.zip` (September 9, 2026). The author
rejected `det_066` (ring-supported motion) as a convincing physical example;
it is no longer in the live gallery or highlight selector. The author also
removed `det_096` (balloon rupture), replacing its highlight with the wet
towel. Their original
assets remain on disk for provenance, not as an endorsed result.

Five prompts show Wan2.2, P&P, and OMR:

- `det_025`: baseball–wall impact
- `det_032`: tool–clay contact
- `det_090`: wheelbarrow and concrete
- `det_081`: wood carving
- `det_048`: bearing collision

The other 16 show Wan2.2 and OMR only. `comparisons.js` declares the exact
method list for every prompt. Hidden P&P clips are neither loaded nor part
of synchronization; their links are hidden and their captions are omitted.
Omitting P&P from a pair is a presentation choice, not evidence of a loss.

The five three-method examples follow the exact order above in a Next-only
carousel without thumbnail previews. Twelve additional pairs appear as
thumbnail-and-title cards in More comparisons, the last main-page section.
The four pairs already featured in the teaser/highlights (`det_013`,
`orig_039`, `orig_086`, `orig_084`) are not repeated as cards. Their full
original comparisons remain accessible through the teaser/highlight links.
Clicking a card opens a separate native dialog and starts synchronized playback;
it never changes the five-example player above.
Pair videos have no sources attached until a card is opened. Closing the
dialog or pressing Escape cancels pending playback and pauses both clips.
Only one comparison plays at a time. Original full-frame videos share
scrubbing, slow motion, and fullscreen controls. Method labels have equal
heights and left alignment. No method-count or paper-example badges appear
on thumbnail cards. Paper provenance remains in the data, not in the UI.

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
- `towel-water`: orig_086, Wan2.2 vs. OMR, source 0–5 seconds, full frames.
- `clay-contact`: orig_084, Wan2.2 vs. OMR, source 0–5 seconds.

The clay highlight uses the identical fixed crop `(160, 0, 672, 480)` from
each 832 × 480 original. The bag and towel highlights preserve the full
field of view to retain hands, contact regions, and water. Every source frame in each stated
interval is kept at 0.5× speed (8 displayed frames per second), with source
timestamps and labels. No interpolation, event realignment, or synthetic
scene content is used. GIF durations alternate between 120 and 130 ms.
Both wet-towel replacement outputs were decoded and timing-checked.

Only the selected loop loads. Autoplay respects reduced motion, pauses
offscreen, and can be stopped. Each highlight links to its full comparison;
the number of methods follows that scene's declared configuration.

The separate hero teaser is unchanged; see `teaser/README.md` for its
slow-motion, freeze-frame, and original-frame timing details.
