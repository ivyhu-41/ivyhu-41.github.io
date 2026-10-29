/* ------------------------------------------------------------------
   Project data — the single place to add / edit work.
   Projects migrated from Wix keep their files in media/wix/, named by
   their Wix hash; newer projects use their own media/<project-id>/.
------------------------------------------------------------------- */

// Wix-era names: "<hash>~mv2.png" | "<hash>~mv2.jpg" | "<hash>f000.jpg" (video poster) → media/wix/<hash>.webp
// Paths containing "/" are already local (e.g. "media/afterglow/x.jpg") and are used as-is.
const WIX_LOCAL = "media/wix/";
const isLocal = (file) => file.includes("/");
const base = (file) => file.replace(/~mv2\.\w+$/, "").replace(/\.\w+$/, "");
const img = (file) => (isLocal(file) ? file : `${WIX_LOCAL}${base(file)}.webp`);
const thumb = (file) => (isLocal(file) ? file : `${WIX_LOCAL}${base(file)}-16x9.webp`); // 16:9 crop for covers
const vid = (hash, q = "720p") => `${WIX_LOCAL}${hash}-${q}.mp4`;
const poster = (hash) => thumb(`${hash}f000.jpg`);
const png = (hash) => `${hash}~mv2.png`;
const jpg = (hash) => `${hash}~mv2.jpg`;

/* Categories — each has its own page and a nav link, in this order. */
const GROUPS = [
  {
    id: "games",
    title: "Games",
    page: "games.html",
    blurb: "Team-built games I worked on as an environment, VFX and technical artist.",
  },
  {
    id: "techart",
    title: "Tech Art",
    page: "tech-art.html",
    blurb: "Shaders, real-time VFX, procedural generation, materials and lighting.",
  },
  {
    id: "prototypes",
    title: "Prototypes",
    page: "prototypes.html",
    blurb: "Gameplay AI and systems programming experiments.",
  },
];

/* Projects shown under "Highlights" on the home page, in this order. */
const HIGHLIGHTS = ["afterglow", "lit-the-fire", "soul-gem", "merry-keystmas"];

const PROJECTS = [
  /* ---------------------------- GAMES ---------------------------- */
  {
    // Placeholder page — clip is 0:10–0:20 of the capture; replace summary/contributions/sections later.
    id: "undelivered-letter",
    group: "games",
    title: "Undelivered Letter",
    subtitle: "Narrative Game — AI Asset Environment Pipeline",
    platform: "Unity 6",
    tags: ["Environment", "Pipeline"],
    year: "2026",
    role: "Solo Artist",
    type: "Narrative Game",
    team: "",
    engine: "Unity 6",
    tools: "Unity 6.3",
    cover: "media/undelivered-letter/cover.jpg",
    preview: "media/undelivered-letter/clip.mp4",
    loop: "media/undelivered-letter/clip.mp4",
    summary:
      "A narrative game set in a post office: read each letter, stamp it deliverable, hold, return or undeliverable, and send it to its basket. As the project's solo artist I built the environment through an AI-assisted asset pipeline.",
    contributions: [
      "Sole artist on the project",
      "AI-assisted asset pipeline for the environment",
      "Post office environment and props",
    ],
    sections: [],
  },
  {
    id: "lit-the-fire",
    group: "games",
    title: "Lit the Fire",
    subtitle: "Feedback VFX & Environment Pipeline",
    platform: "VR",
    tags: ["VFX", "Environment", "Shader"],
    year: "2025",
    role: "Environment Artist, VFX Artist",
    type: "VR Game Demo",
    team: "Team project · 2 weeks",
    prompt: "Make a Fire",
    engine: "Unity",
    tools: "Unity, Maya, Substance Painter, Photoshop, Procreate",
    cover: poster("76c9b2cf660646e799ad0e20e1ff8648"),
    preview: vid("76c9b2cf660646e799ad0e20e1ff8648", "480p"),
    gameplay: "media/lit-the-fire/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/lit-the-fire/reel-poster.jpg",
    summary:
      "A VR survival experience: stranded in a dense forest after a plane crash, players gather wood, start a fire and keep it burning to ward off forest creatures — ending with a signal flare that brings the rescue helicopter.",
    contributions: [
      "Created nearly all visual assets",
      "Feedback VFX for the fire and the signal flare",
      "Shader Graph work for the campfire glow",
      "Optimised assets for VR performance without losing the stylised look",
    ],
    sections: [
      {
        kind: "video",
        title: "Full Playthrough",
        intro: "Complete gameplay capture.",
        src: vid("d506843fe18849568acddea1900b1d6e"),
        poster: img(png("5151d78f2cf148eabf2624a2e833f11b")), // night campsite (the capture opens on a title scribble)
      },
      {
        kind: "gallery",
        title: "In-Game",
        layout: "feature",
        items: [
          { src: png("5151d78f2cf148eabf2624a2e833f11b"), caption: "Night campsite — final lighting in headset view" },
          { src: png("9bbc89d4663d409892993e24144570d4"), caption: "Scene assembly in Unity" },
        ],
      },
      {
        kind: "pairs",
        title: "Asset Breakdown",
        intro: "Modelled in Maya, textured in Substance Painter, optimised for VR.",
        items: [
          { a: png("2bc0d7e1fc9f4e62be37f6bdf82a1cd9"), b: png("f170d63b2c9d44a2b1b21db268f48c02"), caption: "Flare gun" },
          { a: png("1148ce9332704588a2ea59b55a074636"), b: png("f8223abdb1274ce0a19b7d803e2a8cec"), caption: "Radio" },
        ],
      },
      {
        kind: "gallery",
        title: "Props",
        layout: "grid",
        items: [
          { src: png("f265b81314fd4ee89d06a8a2fdb309b7"), caption: "Tree" },
          { src: png("0222b18d8fc04b7ca0c558710f3405ef"), caption: "Matchbox" },
          { src: png("cbcc9120471a4ef489cf47755906b54a"), caption: "Rock" },
        ],
      },
      {
        kind: "compare",
        title: "Before / After",
        a: png("5151d78f2cf148eabf2624a2e833f11b"),
        b: png("5151d78f2cf148eabf2624a2e833f11b"),
        la: "Unlit",
        lb: "Final",
        demo: true,
        note: "Demo of the slider component — drop in two aligned captures (e.g. no-post vs. final, or base vs. VFX on).",
      },
      {
        kind: "figure",
        title: "Shader",
        src: png("138d7d86a2834ef78ab4ae4dc0b04194"),
        caption: "Shader Graph driving the fire glow",
      },
    ],
  },
  {
    id: "merry-keystmas",
    group: "games",
    title: "Merry Keystmas",
    subtitle: "Stylized Party Game",
    platform: "Multiplayer",
    tags: ["Environment", "Shader", "VFX"],
    year: "2025",
    role: "Environment Artist, VFX Artist, UI Artist",
    type: "3D Multiplayer Game",
    team: "Team project · 1 week",
    prompt: "Gate Keyper",
    engine: "Unity",
    tools: "Unity, Maya, Photoshop, Procreate",
    cover: poster("3c06d07b06af466eba2a7510f1544800"),
    preview: vid("3c06d07b06af466eba2a7510f1544800", "480p"),
    gameplay: "media/merry-keystmas/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/merry-keystmas/reel-poster.jpg",
    summary:
      "Set inside a festive snow globe, four snowmen compete to steal the key that unlocks their freedom — throwing and passing explosive Christmas bombs to sabotage rivals before the countdown ends.",
    contributions: [
      "Designed the visual theme and built all environment assets",
      "Stylised props and festive lighting",
      "Custom shaders for snow and the glass globe",
      "In-game UI art",
    ],
    sections: [
      {
        kind: "video",
        title: "Full Playthrough",
        intro: "Complete gameplay capture.",
        src: vid("fb754cd1921b4754845da1f8ee891dad"),
        poster: poster("fb754cd1921b4754845da1f8ee891dad"),
      },
      {
        kind: "gallery",
        title: "Screens",
        layout: "grid",
        items: ["220b492cb5c146eeac0b7478a3e16a95", "d3b2c5f149bd4323a9af6fa2e4e4f6d3", "c0b0c37b9a62403ca20c1e9fd8ee5421", "d06ede751e9c4982a2efb8c9eac8353a", "0af852bed7a44d939149382da849da5f", "d017d26b40cb401f9e9afd8e600e42e6", "21654ed8635f413dbbb8bfeae7063eef", "fc0da28a05b747b1afb12ed9ba656671"].map((h) => ({ src: png(h) })),
      },
    ],
  },
  {
    id: "escape-march",
    group: "games",
    title: "Escape March",
    subtitle: "3D Environment Pipeline & Asset Integration",
    platform: "Custom Controller",
    tags: ["Environment", "Lighting", "Materials"],
    year: "2025",
    role: "3D Modeler, Environment Artist, UI Artist",
    type: "3D Escape Game · Interactive Surface",
    team: "Team project · 2 weeks",
    prompt: "Dig a Hole",
    engine: "Unity",
    tools: "Unity, Maya, Substance Painter, Photoshop, Procreate",
    cover: thumb(png("b430ef3765ea42d0ad287587b9ff82ee")),
    preview: "media/escape-march/card-preview.mp4",
    gameplay: "media/escape-march/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/escape-march/reel-poster.jpg",
    summary:
      "A rhythm-based prison escape inspired by The Shawshank Redemption: players break through the wall by timing each hammer strike to environmental sounds while avoiding guards who can hear you — played on a custom cardboard-and-hammer controller.",
    contributions: [
      "Realistic visual assets for the prison cell",
      "Lighting, shader and material integration in Unity",
      "UI art",
    ],
    sections: [
      {
        kind: "video",
        title: "Full Playthrough",
        intro: "Complete gameplay capture.",
        src: vid("1008426c70e740e197e644e10011df13"),
        poster: poster("1008426c70e740e197e644e10011df13"),
      },
      {
        kind: "gallery",
        title: "Screens",
        layout: "grid",
        items: ["a08cbc94f23942bbba12b7c6da0d9032", "132bf8877f9e43cf94803b2edcc3b603", "1a4b48634c0a4a42a3669a14d42f6112", "85fd4c4520784c969078eab003501fc0", "8449904b349541fb9ee6eb54b73ee5f3", "5c208c49fb4e47f2a9b554d0d5ef4bc0"].map((h) => ({ src: png(h) })),
      },
    ],
  },
  {
    id: "echoes-of-the-deep",
    group: "games",
    title: "Echoes of the Deep",
    subtitle: "2D Blueprint Gameplay — Animation & UI",
    platform: "2D · PC",
    tags: ["Gameplay", "VFX"],
    year: "2024",
    role: "Designer, Artist, Programmer",
    type: "2D Side-Scrolling Adventure",
    team: "",
    engine: "Unreal Engine 4",
    tools: "Unreal Engine 4 (Blueprint), Procreate",
    cover: poster("e1e3a1ec7ac44d988511bdcc0ac50fd5"),
    preview: vid("e1e3a1ec7ac44d988511bdcc0ac50fd5", "480p"),
    loop: vid("e1e3a1ec7ac44d988511bdcc0ac50fd5"),
    summary:
      "Hook, a young beluga whale, journeys to find the human who once helped him. The game shows ocean pollution from a sea creature's point of view — ropes, plastic, entanglement — to encourage respect for nature.",
    contributions: [
      "Gameplay and UI built in Blueprint",
      "2D animation and art",
      "Game design",
    ],
    sections: [
      {
        kind: "gallery",
        title: "Screens",
        layout: "grid",
        items: [png("ba18f9e50bbb4be982ea5bf8e79db4da"), png("48b43c500c8a445186e084d6553cbf08"), png("9d9ed7b4a4e84bbcbbb2ffc81b872e25"), png("b9a13fc9b023491586480ec8feac34a9"), png("90e9086d260e4f18929ec78b37b11576"), jpg("65fd2a6be0e04caea960ab859bb1fb96")].map((src) => ({ src })),
      },
    ],
  },

  /* --------------------------- TECH ART --------------------------- */
  {
    // Placeholder page — clip is 0:10–0:20 of the intro video; replace summary/contributions/sections later.
    id: "portal",
    group: "techart",
    title: "Portal",
    subtitle: "Seamless Portals & Parallax Rendering",
    platform: "Unity 6",
    tags: ["Rendering"],
    year: "",
    role: "",
    type: "Real-time Rendering",
    team: "",
    engine: "Unity 6",
    tools: "Unity 6",
    cover: "media/portal/cover.jpg",
    preview: "media/portal/clip.mp4",
    loop: "media/portal/clip.mp4",
    mediaRatio: "1920 / 936", // Game view only, wider than 16:9
    summary:
      "Seamless portals you can walk straight through into another world, plus a parallax effect — each portal shows the far side live through a second camera rendered into a RenderTexture.",
    contributions: [
      "Seamless walk-through portals between two worlds",
      "Parallax effect",
      "Dual-camera rendering with RenderTexture",
    ],
    sections: [],
  },
  {
    id: "afterglow",
    group: "techart",
    title: "Afterglow",
    subtitle: "Procedural Roller Coaster & Rain VFX",
    platform: "Unreal Engine 5",
    tags: ["Procedural", "VFX"],
    year: "2026",
    role: "Technical Artist — PCG & VFX",
    type: "PBR Environment & Cinematic",
    team: "Team of 4",
    engine: "Unreal Engine 5",
    tools: "Unreal Engine 5 (PCG, Blueprint), Maya, Substance Painter",
    cover: "media/afterglow/render-sunset.jpg",
    preview: "media/afterglow/card-preview.mp4", // spline generation → final scene
    gameplay: "media/afterglow/scene-full.mp4", // the team's final film
    gameplayPoster: "media/afterglow/scene-poster.jpg",
    mediaRatio: "2 / 1", // film is 2:1 with black bars baked into a 16:9 file
    summary:
      "A rain-soaked amusement park in 2033, three years after a nuclear war, where the last robot with power still keeps the rides running. A four-person PBR environment and cinematic in Unreal Engine 5 — I built the procedural roller coaster and the rain and charging effects.",
    contributions: [
      "Roller coaster generated with UE5 PCG — rails, ties and pillars placed along a spline",
      "Circular (loop) track generation",
      "Ride motion: speed changes with slope, distance advances with speed",
      "Track modules modelled in Maya and textured in Substance Painter",
      "Rain, puddle and droplet effects",
      "Tube charging effect",
    ],
    sections: [
      {
        kind: "gallery",
        title: "In Scene",
        layout: "feature",
        items: [
          { src: "media/afterglow/render-sunset.jpg", caption: "The generated coaster in the team's environment" },
          { src: "media/afterglow/render-dusk.jpg" },
          { src: "media/afterglow/render-loops.jpg" },
        ],
      },
      {
        kind: "clips",
        title: "Procedural Generation",
        intro: "One PCG graph builds the whole track from a spline.",
        items: [
          { video: "media/afterglow/generate-spline.mp4", title: "Generate along Spline", text: "Running rails, cross ties, main ties and pillars are placed along the spline." },
          { video: "media/afterglow/generate-circular.mp4", title: "Circular Track Generate", text: "Generates a full loop section of track." },
        ],
      },
      {
        kind: "gallery",
        title: "PCG Pipeline",
        layout: "stack",
        items: [{ src: "media/afterglow/pcg-graph.jpg", caption: "PCG graph — cross ties, running rails, main ties, pillars" }],
      },
      {
        kind: "gallery",
        title: "Track Modules",
        intro: "Maya → Substance Painter → Unreal Engine",
        layout: "row",
        items: [
          { src: "media/afterglow/module-maya.jpg", caption: "Maya — modelling" },
          { src: "media/afterglow/module-substance-tie.jpg", caption: "Substance Painter — tie" },
          { src: "media/afterglow/module-substance-rail.jpg", caption: "Substance Painter — rail" },
          { src: "media/afterglow/module-unreal.jpg", caption: "Unreal Engine — assembled track" },
        ],
      },
      {
        kind: "clips",
        title: "Ride Motion",
        intro: "Speed changes with the slope; distance along the track is updated from the speed.",
        items: [{ video: "media/afterglow/motion-slope.mp4" }, { video: "media/afterglow/coaster-ride.mp4" }],
      },
      {
        kind: "explain",
        title: "Why It Works",
        lead: "This model captures:",
        points: ["Downhill acceleration", "Uphill slowing", "Speed loss in sharp turns", "Looping motion", "Frame-rate independent movement"],
        note: "All with simple vector math and Euler integration.",
        src: "media/afterglow/motion-blueprint.jpg",
        caption: "Motion Blueprint",
      },
      {
        kind: "clips",
        title: "Rain",
        ratio: "1 / 1",
        cols: 4,
        items: [
          { video: "media/afterglow/rain-puddles.mp4", title: "Puddles" },
          { video: "media/afterglow/rain-ground.mp4", title: "Rain · ground" },
          { video: "media/afterglow/rain-droplets.mp4", title: "Droplets" },
          { video: "media/afterglow/rain-lamp.mp4", title: "Rain · street lamp" },
        ],
      },
      {
        kind: "clips",
        title: "Tube Charging Effect",
        ratio: "1 / 1",
        cols: 3,
        items: [
          { video: "media/afterglow/tube-charge.mp4", title: "In scene" },
          { image: "media/afterglow/tube-charge-still-1.jpg", title: "Charge" },
          { image: "media/afterglow/tube-charge-still-2.jpg", title: "Orb" },
        ],
      },
    ],
  },
  {
    id: "soul-gem",
    group: "techart",
    title: "Soul Gem",
    subtitle: "Flow Shader Inspired by Madoka Magica",
    platform: "Unity 6",
    tags: ["Shader"],
    year: "2026",
    role: "Technical Artist",
    type: "Real-time Shader",
    team: "",
    engine: "Unity 6",
    tools: "Unity 6.3",
    cover: "media/soul-gem/cover-gems.jpg",
    preview: "media/soul-gem/shader-controls.mp4",
    gameplay: "media/soul-gem/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/soul-gem/reel-poster.jpg",
    summary:
      "A glowing Soul Gem with a flowing interior, built as a real-time shader in Unity and inspired by Puella Magi Madoka Magica. The gem model came out of an AI-assisted asset pipeline and was optimised for real time; exposed shader parameters restyle one material into each character's gem.",
    contributions: [
      "Flow shader for the gem's moving, glowing interior",
      "AI asset optimisation pipeline for the gem model",
      "Parameterised shader controls that restyle the interior",
      "Five character colour variants from one material",
    ],
    sections: [
      {
        kind: "gallery",
        title: "AI Asset Optimization Pipeline",
        layout: "row",
        ratio: "16 / 9", // keep the burned-in captions in frame
        items: [{ src: "media/soul-gem/ai-pipeline-1.jpg" }, { src: "media/soul-gem/ai-pipeline-2.jpg" }],
      },
      {
        kind: "clips",
        title: "Parameterized Shader Controls",
        intro: "One material, restyled live from its exposed parameters.",
        items: [{ video: "media/soul-gem/shader-controls.mp4" }],
      },
      {
        kind: "gallery",
        title: "Colour Variants",
        layout: "stack",
        items: [{ src: "media/soul-gem/cover-gems.jpg", caption: "Each character's gem from the same shader" }],
      },
    ],
  },
  {
    id: "ice-lava-sword",
    group: "techart",
    title: "Ice & Lava Sword",
    subtitle: "Real-Time VFX",
    platform: "Real-time",
    tags: ["VFX", "Shader"],
    year: "2024",
    role: "VFX Artist, Technical Artist",
    type: "Game VFX",
    team: "",
    engine: "Unity",
    tools: "Unity, Maya, Photoshop, Procreate",
    cover: poster("2ee024758d814dfa8189e27900c6f328"),
    preview: vid("2ee024758d814dfa8189e27900c6f328", "480p"),
    gameplay: "media/ice-lava-sword/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/ice-lava-sword/reel-poster.jpg",
    summary:
      "Two contrasting sword effects built in Unity — ice crystallisation and molten lava — using particle systems, custom shaders and material blending to drive the scene's atmosphere.",
    contributions: [
      "Particle systems for crystal growth, embers and ground cracks",
      "Custom ice and lava shaders with material blending",
      "Ground decals masked to reveal snow and cracks",
    ],
    sections: [
      {
        kind: "gallery",
        title: "Breakdown",
        layout: "stack",
        items: [png("0d2f61e708454b17967580beceaeb1ec"), png("ecd81049eba24747881db1716543ad44"), png("51deba589c124f77bbcaee8474a5e65c")].map((src) => ({ src })),
      },
      { kind: "figure", title: "Shader", src: png("e78b64ca697a4722b55adde34c0f3e81"), caption: "Ice Shader Graph details" },
    ],
  },
  {
    id: "pbr-materials",
    group: "techart",
    title: "Procedural PBR Materials",
    subtitle: "Fabric & Brick",
    platform: "Substance",
    tags: ["Materials", "Procedural"],
    year: "2024",
    role: "Technical Artist",
    type: "Procedural Texture Generation",
    team: "",
    engine: "Substance 3D Designer",
    tools: "Substance 3D Designer",
    cover: thumb(png("2c3ac877037e4a8ca3c439b22f904179")),
    preview: "media/pbr-materials/card-preview.mp4", // brick sphere → fabric
    gameplay: "media/pbr-materials/reel.mp4", // cut from the Tech Art reel
    gameplayPoster: "media/pbr-materials/reel-poster.jpg",
    summary:
      "Procedural fabric and brick materials built node-by-node in Substance 3D Designer — exploring pattern, shape and surface response to produce detailed, reusable textures for game environments.",
    contributions: ["Node-based graphs for fabric and brick", "Pattern, shape and material-property experiments", "Texture creation optimised for game environments"],
    sections: [
      {
        kind: "gallery",
        title: "Materials",
        layout: "grid",
        items: ["b7fa758e26dd4b4c9235287f3fc7a8c5", "025b00a5f30845b89255c9057db989cd", "8e09efecd5c84e47af1c9a78dbc2780c", "81e1a95ed077495eb37da6bab6195c9c", "01af3a12d680428597a570fd1cff28f2", "5eb766bd87764787a5658759d151a85e", "7d5137910b0a4832b62157c5d8002471", "b2c64dccc3734a519bd4c9397ca9d9bf", "518903c965794c86933cd36930107327", "ea04f10c31294fe4b4f7b320086ccc0d", "d5bc8073d10a45dfa329aa03c34669c9"].map((h) => ({ src: png(h) })),
      },
    ],
  },
  {
    id: "environment-lighting",
    group: "techart",
    title: "Environment Tech Art",
    subtitle: "Lighting & Assembly",
    platform: "Third-person",
    tags: ["Environment", "Lighting"],
    year: "2024",
    role: "Technical Artist — Environment & Pipeline",
    type: "Third-person Exploration",
    team: "",
    engine: "Unreal Engine 4",
    tools: "Unreal Engine 4, Maya, Procreate",
    cover: thumb(jpg("96bd94cc76d64d3c85d3d644557a2849")),
    summary:
      "A narrative environment built through a full tech-art pipeline — modular modelling and texturing, Unreal scene assembly, lighting, and gameplay-space iteration.",
    contributions: ["Modular kit modelling and texturing", "Scene assembly and lighting in UE4", "Gameplay-space iteration"],
    sections: [
      {
        kind: "gallery",
        title: "Screens",
        layout: "grid",
        items: [png("c196b1f6235642b5985a34b06271b870"), png("19fdeabb1024421d8a7bd52aac22d3f1"), jpg("0d6cb80fb7e84d9d836a9568a00a3966"), jpg("72fa38ea6dab475b94553e4f11151cd5"), jpg("a9b14deeb3514787b8691bce216b7831"), jpg("ff35ed16327d4775b6226ea3327c144c"), jpg("a0c815c8e573427cb87a2f0badca4b79"), png("e84361afa38b4b4d8c06b38e0e4fba23"), png("900cfb2f1773460e804551b7f1c8f634"), png("38728bab03e54b4687195384c618c0a2"), png("d7e061d54b1d41cebc8c5c482509293f"), jpg("c6aa0e34b8db449a8c87161d50dfe0bd")].map((src) => ({ src })),
      },
    ],
  },

  /* -------------------------- PROTOTYPES -------------------------- */
  {
    id: "htn-planning",
    group: "prototypes",
    title: "AI System — HTN Planning",
    subtitle: "Game AI Algorithm Design",
    platform: "Prototype",
    tags: ["AI"],
    year: "2025",
    role: "Programmer",
    type: "Game AI",
    team: "Coursework",
    engine: "Unity",
    tools: "Unity, C#",
    cover: poster("bcca5252ee724b3489fe88cf801c09b3"),
    preview: vid("bcca5252ee724b3489fe88cf801c09b3", "480p"),
    gameplay: vid("bcca5252ee724b3489fe88cf801c09b3"),
    gameplayPoster: poster("bcca5252ee724b3489fe88cf801c09b3"),
    summary:
      "A hierarchical task network planner for a frog crossing a busy road — moving, eating flies, and spending them to leap over traffic.",
    contributions: ["Task network for move / eat-fly / leap actions", "Resource rule: a leap consumes a collected fly", "Obstacle (traffic) avoidance"],
    sections: [
      {
        kind: "gallery",
        title: "Planner",
        layout: "grid",
        items: ["e8b557457c2347b49d8091192898624e", "a17d82a004d94006bcbf5fdba9e48048", "9512c36320a04e4386734b5fe6ee3105", "5c56b72b3edb4aa4996a4ee720c5c928", "ca3d56f47e364d6f8719f24932d57cae"].map((h) => ({ src: png(h) })),
      },
    ],
  },
  {
    id: "pathfinding",
    group: "prototypes",
    title: "AI System — Pathfinding",
    subtitle: "A* from Scratch",
    platform: "Prototype",
    tags: ["AI"],
    year: "2025",
    role: "Programmer",
    type: "Game AI",
    team: "Coursework",
    engine: "Unity",
    tools: "Unity, C#",
    cover: poster("21e73c7296a6417d9d41c806e7ef0e5f"),
    preview: vid("21e73c7296a6417d9d41c806e7ef0e5f", "480p"),
    loop: vid("ddfded94d543470fbecbfe714e2524c7"),
    summary:
      "A custom A* pathfinding system written from scratch in Unity, covering grid-based movement (Manhattan heuristic) and continuous movement.",
    contributions: ["A* with Manhattan heuristic for grid movement", "Separate continuous-movement navigation model", "Path selection tuned for obstacle-dense maps"],
    sections: [
      {
        kind: "gallery",
        title: "Screens",
        layout: "grid",
        items: ["0f50db3c3c5b4e0295515b7c4339b6f0", "ff0da4885f554f6285ce105ddde3a4bd", "5cd77e2239674f27a671671e59c11546", "5c5d9a220a944606b27af90e7376feb8", "9e98dfc4dae14abeb4e0624937fc897a"].map((h) => ({ src: png(h) })),
      },
    ],
  },
];

const SITE = {
  name: "Ivy Hu",
  short: "I.H",
  role: "Technical Artist",
  email: "hello@example.com", // TODO: replace with your real address
  linkedin: "https://www.linkedin.com/in/ivy-hu-061890238",
  reel: "media/reel/demo-reel.mp4",
  reelPoster: "media/reel/demo-reel-poster.jpg",
  portrait: img("7b53c984280c474dac5c913fb9ef0036~mv2.jpg", 1000),
};
