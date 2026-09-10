window.OMR_COMPARISONS = [
  {
    "id": "det_025",
    "title": "Baseball–wall impact",
    "category": "Impact and contact",
    "paper": true,
    "focus": "The wall just before the ball arrives: does the damage follow contact? Inspect 0.5–3 seconds.",
    "observation": "In OMR, the visible wall response more closely coincides with ball contact. Compare with premature or weakly coupled damage in the baselines.",
    "limitation": "All three physics scores are 3. Ball hovering, repeated contact and implausible material behavior remain; the comparison concerns relative timing.",
    "prompt": "“In a dynamic sports action sequence, a baseball soars through the air, propelled by a powerful throw from an unseen player. The camera captures the ball's trajectory in a stunning close-up, revealing its textured surface and the blurred background, which hints at a bustling stadium. As the ball approaches a weathered brick wall, its speed intensifies, creating a dramatic tension. The moment of impact is captured with striking clarity, as the ball smashes into the wall, leaving a visible dent and a cloud of dust. The camera remains static, allowing the viewer to fully absorb the force of the collision and the resulting mark, a testament to the power of the throw. This cinematic moment encapsulates the raw energy and excitement of baseball, showcasing the sport's visceral impact.”",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "pnp": 3,
      "omr": 3
    },
    "methods": [
      "wan",
      "pnp",
      "omr"
    ]
  },
  {
    "id": "det_032",
    "title": "Tool–clay contact",
    "category": "Material deformation",
    "paper": true,
    "focus": "The tool tip and the nearby clay surface. Does deformation stay coupled to contact? Inspect 1.5–5 seconds.",
    "observation": "OMR shows deformation developing near the tool tip as it engages the rotating surface. Wan2.2 has weaker visible tool–material coupling; P&P begins with a recessed shape and a less stable local response.",
    "limitation": "All physics scores are 4. Clay geometry is still stylized; this is a relative contact/deformation example.",
    "prompt": "The video opens with a close-up of a potter's wheel, its surface glistening with wet clay, as it spins in a smooth, rhythmic motion. The camera remains static, capturing the intricate details of the clay's texture and the subtle sheen of moisture that enhances its earthy tones. A skilled hand, adorned with a dark glove, enters the frame, wielding a slender tool that delicately probes the clay's surface. The tool's tip, a gleaming silver, contrasts beautifully with the warm clay, creating a striking visual contrast. As the tool makes contact, the clay responds with a gentle wobble, revealing the dynamic nature of the material. The background is softly blurred, drawing the viewer's focus to the mesmerizing dance of the clay and the tool, embodying the artistry and precision of pottery craftsmanship.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "pnp": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "pnp",
      "omr"
    ]
  },
  {
    "id": "det_090",
    "title": "Wheelbarrow & concrete",
    "category": "Material deformation",
    "paper": true,
    "focus": "Where concrete is deposited, then where the tool makes contact. Inspect 0.5–4.5 seconds.",
    "observation": "OMR moves from tipping concrete into the form to working the nearby deposited region. Compare the deposit location with the later tool motion in P&P and the weaker visible contact in Wan2.2.",
    "limitation": "OMR ties P&P at 4 and exceeds Wan at 3. Concrete volume and surface changes are not fully physically resolved.",
    "prompt": "In a sun-drenched construction site, a skilled worker clad in a dark blue shirt and a protective hard hat meticulously pours concrete from a wheelbarrow into a rectangular form, the golden-hour light casting a warm glow over the scene. The camera, held steady, captures the rhythmic dance of the worker as they expertly maneuver the wheelbarrow, ensuring a smooth flow of concrete into the form. As the concrete begins to fill, the worker transitions to a trowel, skillfully leveling the surface with precise, deliberate strokes, creating a flawless, even finish. The surrounding environment, bathed in a soft, diffused light, reveals a backdrop of lush greenery and distant structures, enhancing the tranquil yet industrious atmosphere. This cinematic portrayal of craftsmanship and precision invites viewers to appreciate the artistry behind construction, showcasing the dedication and expertise required for such meticulous work.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "pnp": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "pnp",
      "omr"
    ]
  },
  {
    "id": "det_081",
    "title": "Wood carving",
    "category": "Material deformation",
    "paper": false,
    "focus": "1–5 s: tool tip and shaving",
    "observation": "OMR shows a narrow tool staying near the wood surface with a curled shaving at the contact region. P&P shows a changing, stretched groove/ridge around its tip. Wan uses a broader blade and has intermittent apparent contact.",
    "limitation": "Scores: OMR 4, Wan 4, P&P 3. Tool shape and shaving geometry remain imperfect; the clearest comparison is with P&P.",
    "prompt": "In a serene, sunlit workshop, a skilled artisan clad in a dark blue shirt and a protective face mask meticulously works on a piece of wood, its rich grain and texture illuminated by the soft, golden-hour glow filtering through the window. The camera captures a close-up of their hands, one steadying the wood while the other wields a small, sharp knife, its blade glinting as it deftly carves a precise groove into the surface. The rhythmic motion of the knife, guided by the artisan's steady grip, creates a mesmerizing dance of craftsmanship. The background remains softly blurred, enhancing the focus on the intricate process, while the subtle play of light and shadow accentuates the wood's natural beauty. This intimate portrayal of woodworking artistry invites viewers to appreciate the delicate balance of skill and patience, embodying the essence of traditional craftsmanship.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "pnp": 3,
      "omr": 4
    },
    "methods": [
      "wan",
      "pnp",
      "omr"
    ]
  },
  {
    "id": "det_048",
    "title": "Bearing collision",
    "category": "Impact and contact",
    "paper": false,
    "focus": "Object shape and contact as the bearings meet and one tips, around 3–5 seconds.",
    "observation": "At roughly 3–5 s, OMR shows two bearings meeting and the left bearing tipping onto its side. P&P keeps both upright and shows a more conspicuous change in the left bearing's apparent size and shape. Wan depicts a sphere and an open bearing with an unexplained line extending into the background.",
    "limitation": "OMR and P&P both score 5 for physics. Toppling by itself does not prove a physically correct collision; the prompt asks for ball bearings, while OMR and P&P depict ring-shaped bearings.",
    "prompt": "A mesmerizing close-up captures the dynamic interaction of two metallic ball bearings on a sleek, dark surface, illuminated by soft, diffused lighting that accentuates their polished surfaces. The first ball, a gleaming silver sphere, rolls steadily from right to left, its smooth trajectory hinting at a gentle push. As it approaches the second, stationary ball, the scene transforms into a captivating display of physics in motion. The silver ball collides with the second, a darker, matte-finished sphere, causing both to momentarily halt, their surfaces glinting under the light. The camera remains static, focusing intently on this precise moment of impact, where the silver ball's momentum is transferred, and the darker ball begins to roll in the opposite direction. The interplay of light and shadow enhances the visual appeal, while the absence of sound amplifies the subtle textures and movements, creating a serene yet engaging exploration of kinetic energy.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "pnp": 5,
      "omr": 5
    },
    "methods": [
      "wan",
      "pnp",
      "omr"
    ]
  },
  {
    "id": "orig_039",
    "title": "Punching bag: contact and recovery",
    "category": "Impact and contact",
    "paper": false,
    "focus": "Compare 1.0–3.2 s, then 3.5–5.0 s. Watch the rod endpoint and the bag indentation.",
    "observation": "OMR shows separate approaches, contact, and withdrawal, with the bag recovering between strikes. Wan2.2 shows an unsupported rotating prop.",
    "limitation": "Both clips misrepresent the requested nunchucks. This supports a narrow contact/recovery comparison, not correct execution of the prompt.",
    "prompt": "Nunchucks are swung, striking a punching bag, creating a visible ripple effect.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "omr": 3,
      "wan": 2
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "orig_036",
    "title": "Folded napkin: shape after release",
    "category": "Material deformation",
    "paper": false,
    "focus": "Watch 3.7–5.0 s, especially after the hands withdraw.",
    "observation": "OMR produces a broad folded fan and retains much of its shape after the hands withdraw. Wan2.2 does not produce a comparable expanding fan.",
    "limitation": "The comparison with Wan2.2 mainly concerns task completion. OMR creates folds too readily and its fan still changes; this is not proof of material conservation.",
    "prompt": "A person uses a specialized napkin folding tool to create a complex, origami-like design.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "omr": 4,
      "wan": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "orig_086",
    "title": "Wet towel: water breakup",
    "category": "Fluid and supported motion",
    "paper": false,
    "focus": "Watch the water below the towel at 1.0–3.2 s and beside the hands near 4.0 s.",
    "observation": "Wan2.2 repeatedly produces strong directional jets. OMR shows more dispersed droplets around the towel. Inspect the water below the towel and beside the hands.",
    "limitation": "Both physics scores are 3/5. OMR still has excessive suspended spray and incomplete twisting; this is a relative fluid-appearance comparison.",
    "prompt": "A person vigorously twists a wet towel, water spraying outwards in a visible arc.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "omr": 3,
      "wan": 3
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_053",
    "title": "Rowing & water response",
    "category": "Fluid and supported motion",
    "paper": false,
    "focus": "1–5 s: oar endpoints, water entry and wake",
    "observation": "OMR shows a continuous boat path with paired oars and an evolving wake. Wan2.2 is also broadly coherent; inspect how the oars meet the water and how the wake follows the boat.",
    "limitation": "Both physics scores are 5/5. This is a close comparison, not a clear win over Wan2.2.",
    "prompt": "In a serene, sunlit river scene, a solitary rower glides through the tranquil waters, their sleek single scull boat cutting through the glassy surface. The camera captures a static, wide-angle view, showcasing the rower's focused demeanor as they skillfully maneuver the oar, creating a rhythmic, rippling wake that dances behind the boat. The riverbank, adorned with lush greenery, frames the scene, while the clear blue sky above reflects on the water, enhancing the peaceful ambiance. The rower's fluid movements, accentuated by the subtle play of light, evoke a sense of harmony with nature, as they navigate the calm waters with precision and grace, embodying the essence of solitude and tranquility in this idyllic setting.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 5,
      "omr": 5
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_013",
    "title": "Backflip landing",
    "category": "Body dynamics",
    "paper": true,
    "focus": "Cushion shape and body motion through impact, especially from 1.5–5 seconds.",
    "observation": "OMR keeps the cushion outline more stable through impact. Wan2.2 shows a larger collapse and an abrupt pose transition.",
    "limitation": "Both physics scores are 3/5. OMR still shows unusual body–cushion overlap.",
    "prompt": "“In a vibrant outdoor setting, a young man clad in a sleek black t-shirt and dark shorts stands poised on a lush green lawn, framed by a backdrop of towering trees and a serene blue sky. As he prepares for a daring stunt, the camera captures his focused expression, the tension palpable. With a deep breath, he launches into a powerful backflip, his body arching gracefully through the air. The scene transitions seamlessly as he lands with a soft thud onto a massive inflatable cushion, its bright yellow and blue stripes contrasting vividly against the verdant grass. The camera remains steady, showcasing the cushion's resilience as it absorbs his weight, while the surrounding greenery and clear sky enhance the tranquil atmosphere. This moment of exhilarating athleticism is beautifully captured, highlighting the joy of outdoor adventure and the thrill of pushing physical limits.”",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "omr": 3
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_065",
    "title": "Basketball dribbling",
    "category": "Impact and contact",
    "paper": false,
    "focus": "Hand–ball timing and the lower turn of each bounce, especially 1–4 seconds.",
    "observation": "OMR keeps a stable standing pose and a recognizable ball through repeated dribbling cycles. Wan2.2 pauses longer near hand height. Inspect hand–ball timing and the lower turn of each bounce, especially 1–4 s.",
    "limitation": "Both show plausible portions of the action. Sampled frames do not establish that every reversal occurs at ground contact; this is not a conclusive physical-correctness claim.",
    "prompt": "In a sun-drenched outdoor court, a young boy, clad in a vibrant blue t-shirt and shorts, stands poised with a basketball in his hands. The camera captures him from a low angle, emphasizing his focused expression as he prepares to execute a perfect underhand throw. The scene is bathed in golden-hour light, casting soft shadows that dance across the court's polished surface, enhancing the dynamic interplay of light and shadow. As he releases the ball, the camera remains static, allowing the viewer to witness the graceful arc of the ball as it descends, tracing a gentle parabola against the backdrop of a distant, blurred fence. The ball's trajectory is accentuated by the subtle sway of the boy's body, his arms outstretched in a fluid motion that underscores the elegance of the throw. The moment culminates as the ball meets the court, the impact resonating with a satisfying thud, encapsulating the joy and precision of this simple yet captivating act.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_014",
    "title": "Pinball motion",
    "category": "Impact and contact",
    "paper": false,
    "focus": "Ball identity, apparent scale, and trajectory around 1.5–3.5 seconds.",
    "observation": "OMR shows a single red/white ball moving across the table and exiting the right side. Compare ball appearance, trajectory, and apparent scale with Wan2.2 around 1.5–3.5 s.",
    "limitation": "Both depict an oversized colored ball rather than a conventional metal pinball. Camera and perspective differences complicate judging physical scale.",
    "prompt": "The video captures a mesmerizing pinball game in a vibrant arcade setting, where a sleek, metallic pinball machine glimmers under the warm glow of overhead lights. The camera, positioned at a static angle, focuses on the left side of the machine, where a gleaming metal barrier reflects the dynamic play. A pinball, adorned with a striking red and white design, ricochets off the metal, creating a resonant clang that echoes through the arcade. The ball's trajectory is expertly tracked, showcasing its lively bounce and the intricate mechanics of the machine. As the ball careens off the metal, it arcs gracefully, illuminating the vibrant playfield with its colorful targets and obstacles. The scene is enhanced by the soft hum of the machine and the subtle flicker of nearby lights, immersing viewers in the thrill of classic arcade gaming.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_049",
    "title": "Paper folding",
    "category": "Material deformation",
    "paper": false,
    "focus": "Fingers lifting and pressing the triangular fold around 1–3 seconds.",
    "observation": "Around 1–3 s, OMR shows fingers lifting and pressing a visible triangular fold in the green sheet. Wan2.2 changes the arrangement of flat sheets.",
    "limitation": "OMR still has paper-geometry ambiguity and a white panel becoming visible later. This illustrates a relative material-interaction difference, not an error-free folding simulation.",
    "prompt": "In a softly lit room, a person clad in a dark shirt and a striking red cap sits at a rustic wooden table, their hands deftly folding a vibrant green gift certificate. The camera captures a close-up of their hands, showcasing the intricate process of creasing and tucking the paper with precision. As the certificate is transformed into a neat square, the person's fingers glide gracefully, revealing a delicate attention to detail. The scene is bathed in a warm, golden-hour glow, enhancing the intimate atmosphere. With a gentle flourish, the folded certificate is placed into a decorative envelope, its intricate design hinting at a special occasion. The camera remains static, focusing on the hands and the envelope, creating a serene and contemplative moment that celebrates the art of gift-giving.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "orig_084",
    "title": "Finger–clay contact",
    "category": "Material deformation",
    "paper": false,
    "focus": "0–4 s: surface before contact, insertion, withdrawal",
    "observation": "OMR shows the finger approaching an initially unpierced surface, pressing in, and withdrawing to leave an indentation. Wan2.2 begins with a visible hole.",
    "limitation": "Both physics scores are 5/5. The hole remains large relative to the fingertip.",
    "prompt": "A finger pokes a hole in a soft clay sculpture, leaving a distinct indentation.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 5,
      "omr": 5
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "orig_064",
    "title": "Scraping a clay vase",
    "category": "Material deformation",
    "paper": false,
    "focus": "0.5–5 s: scraper edge, vase contour and support hand",
    "observation": "OMR keeps the inner support hand and external scraper beside the rotating vase as its contour changes. Wan2.2 shows detached fragments and a weaker connection between scraping and the resulting profile.",
    "limitation": "OMR scores 4/5 and Wan2.2 scores 3/5. Scraping and material removal remain stylized.",
    "prompt": "A potter uses a wooden tool to scrape excess clay from a vase, leaving clean lines and a smooth surface.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 3,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_057",
    "title": "Leaf-blower response",
    "category": "Material deformation",
    "paper": false,
    "focus": "1–5 s: nozzle direction and displaced leaves",
    "observation": "OMR shows leaves and dust lifting in front of the nozzle as the operator sweeps it. Wan2.2 leaves much of the pile nearly stationary.",
    "limitation": "Both physics scores are 4/5. Dust amount is not a measure of correctness; compare the location and timing of motion relative to the nozzle.",
    "prompt": "In a serene suburban lawn, a man clad in a dark blue shirt and a cap stands poised, wielding a powerful leaf blower. The camera captures a close-up of his hands, gloved in black, as he expertly maneuvers the machine, its nozzle pointed at a patch of vibrant green leaves scattered across the grass. The sunlight filters through the trees, casting dappled shadows that dance across the scene, enhancing the tranquil atmosphere. As he engages the blower, a gust of air sweeps through the leaves, creating a mesmerizing swirl of movement. The camera remains static, focusing on the dynamic interplay of the leaves as they are forcefully displaced, revealing the meticulous craftsmanship of the lawn's maintenance. The man's steady grip and deliberate movements underscore the precision of his task, while the lush greenery and the gentle rustle of leaves evoke a sense of nature's harmony.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_033",
    "title": "Unrolling pastry",
    "category": "Material deformation",
    "paper": false,
    "focus": "0–4 s: finger contact, sheet edge and roller",
    "observation": "OMR keeps hands near the sheet and roller through the unrolling sequence. Wan2.2 produces a less coherent-looking sheet with uneven layers.",
    "limitation": "Both physics scores are 4/5. Pastry thickness and exact conservation of sheet area remain ambiguous.",
    "prompt": "A skilled baker meticulously unrolls a pristine sheet of phyllo pastry, its delicate layers glistening under the warm glow of overhead lights. The camera captures the scene in a shallow depth of field, focusing on the intricate textures and subtle sheen of the pastry as it unfurls, revealing a mesmerizing interplay of light and shadow. Each layer, thin and translucent, separates with a gentle touch, showcasing the artistry of the craft. The background remains softly blurred, enhancing the focus on the pastry's delicate beauty. As the baker's hands expertly manipulate the dough, the camera remains static, allowing viewers to immerse themselves in the rhythmic dance of rolling and stretching, culminating in a breathtaking display of culinary finesse.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_047",
    "title": "Bending wood",
    "category": "Material deformation",
    "paper": false,
    "focus": "2–5 s: grips, curvature and table contact",
    "observation": "OMR shows a continuous strip bending as both ends are raised, with the middle staying near the table. Wan2.2’s grip and hand geometry are less clearly resolved.",
    "limitation": "Both physics scores are 4/5 and both show broadly similar bending. This is a close comparison, not a decisive win.",
    "prompt": "In a serene, softly lit studio, a close-up shot reveals a thin, rectangular piece of wood, its surface smooth and polished, resting on a flat, dark surface. The camera remains static, capturing the wood's subtle texture and the gentle interplay of light that accentuates its natural grain. As the scene unfolds, a pair of hands, one gloved in black, the other bare, enters the frame, delicately grasping the wood's edges. With a slow, deliberate motion, the hands begin to bend the wood, revealing its remarkable flexibility as it arches gracefully into a bow-like shape. The camera captures the wood's transformation in exquisite detail, highlighting the tension and resilience of the material. The background remains softly blurred, drawing the viewer's focus to the intricate dance of the wood as it bends and curves, showcasing the artistry of craftsmanship and the beauty of natural materials.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_038",
    "title": "Bulldozer & sand",
    "category": "Material deformation",
    "paper": false,
    "focus": "2–5 s: blade/pile boundary and vehicle support",
    "observation": "OMR preserves a visible blade, tracks, and sand ridge as the vehicle approaches and engages the pile. Wan2.2’s machine becomes partly submerged in the mound.",
    "limitation": "Both physics scores are 4/5. Material displacement is limited in this short clip.",
    "prompt": "In a breathtaking aerial view, a vast expanse of sandy terrain unfolds, where a formidable bulldozer, its yellow body gleaming under the sun, navigates the landscape with purpose. The machine, equipped with a robust blade, glides effortlessly across the sand, leaving a trail of disturbed earth in its wake. As it approaches a large pile of sand, the bulldozer begins to push and sculpt the material, creating a formidable barrier that rises majestically against the horizon. The camera, held steady from a high vantage point, captures the dynamic interplay of the machine and the shifting sands, revealing the intricate patterns of the bulldozer's tracks as it meticulously shapes the earth. The scene is bathed in a warm, golden-hour glow, enhancing the textures of the sand and the machine's powerful movements, while the surrounding landscape remains untouched, emphasizing the transformative power of this solitary operation.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 4
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_040",
    "title": "Jet-ski wakes",
    "category": "Fluid and supported motion",
    "paper": false,
    "focus": "0–5 s: vehicle identity and wake continuity",
    "observation": "OMR maintains two distinct vehicles with wakes trailing their paths. Wan2.2 changes framing markedly and introduces foreground people, making motion harder to follow.",
    "limitation": "OMR scores 5/5 and Wan2.2 scores 4/5. Framing consistency alone is not a physics win.",
    "prompt": "In a breathtaking display of aquatic speed and agility, two sleek jet skis race side by side, their powerful engines roaring as they slice through the crystal-clear waters of a tranquil lake. The scene is captured from a dynamic aerial perspective, showcasing the vibrant blue and white craft, each adorned with a distinctive number—'1' and '2'—emblazoned on their sides. The riders, clad in vibrant life vests and helmets, lean forward, their bodies perfectly poised for the thrill of competition. As they accelerate, their wakes collide, creating a mesmerizing spray of water that dances in the sunlight, casting shimmering reflections across the surface. The camera glides smoothly, maintaining a steady focus on the exhilarating chase, while the surrounding landscape of lush greenery and distant mountains adds depth to this adrenaline-fueled spectacle.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 5
    },
    "methods": [
      "wan",
      "omr"
    ]
  },
  {
    "id": "det_088",
    "title": "Parasail support",
    "category": "Body dynamics",
    "paper": false,
    "focus": "0–5 s: canopy shape and rider position",
    "observation": "OMR maintains an inflated canopy with riders beneath it. Wan2.2 shows a distorted canopy and a rider positioned above the apparent canopy edge.",
    "limitation": "OMR scores 5/5 and Wan2.2 scores 4/5. Small straps and exact tension cannot be established from the sampled frames.",
    "prompt": "The video opens with a breathtaking aerial view of a pristine beach, where a vibrant red parasail glides gracefully against a backdrop of azure skies and shimmering turquoise waters. The camera, positioned at a slight angle, captures the dynamic interplay of the parasail as it inflates, revealing its intricate design and the meticulous preparation by a dedicated crew. The scene is bathed in the golden-hour glow, enhancing the rich textures of the fabric and the serene beauty of the surroundings. As the parasail billows and expands, the camera remains steady, allowing viewers to appreciate the careful choreography of the crew, who skillfully manage the lines and ensure a smooth inflation process. The gentle breeze rustles the fabric, creating a sense of anticipation as the parasail prepares for its ascent, embodying the thrill of adventure and the artistry of human endeavor in harmony with nature.",
    "duration": 5.0625,
    "fps": 16,
    "scores": {
      "wan": 4,
      "omr": 5
    },
    "methods": [
      "wan",
      "omr"
    ]
  }
];
