# Portfolio site

Plain HTML/CSS/JS — no build step. Open with any static server:

```bash
python3 -m http.server 4173
```

| File | What it is |
| --- | --- |
| `index.html` | Home: intro → demo reel → Highlights (set by `HIGHLIGHTS` in `projects.js`) |
| `games.html`, `tech-art.html`, `prototypes.html` | One page per category (`GROUPS` in `projects.js`); header and footer are filled in by `main.js` |
| `project.html?id=…` | One template for every project page |
| `about.html` | About + contact |
| `assets/js/projects.js` | **All project content.** Add a project = add one object here |
| `assets/js/main.js` | Rendering, hover previews, lightbox, before/after slider |
| `assets/css/style.css` | Styles; colour/spacing tokens at the top |

Live at **https://ivyhu-41.github.io** (GitHub Pages, repo `ivyhu-41/ivyhu-41.github.io`, branch `main`). To publish changes:

```bash
git add -A
git commit -m "Describe the change"
git push
```

The site updates about a minute after the push. Keep every file under 100 MB (GitHub's limit); host long videos on YouTube / Bilibili instead.

Browsers cache `assets/` aggressively. After editing JS or CSS for a deploy, bump the `?v=` number on the `<script>`/`<link>` tags in all three HTML files so visitors get the new files.

## Adding a project

Copy an entry in `PROJECTS`, set `group` to `games`, `techart` or `prototypes` (it then appears on that category page), optionally add its `id` to `HIGHLIGHTS`, and list its `sections`:

- `gallery` — `layout: "feature"` (1 large + 1–2 small), `"grid"`, `"row"` (all items in one row, e.g. a pipeline; optional `ratio`, default `"4 / 3"`), or `"stack"` (full width, for breakdown boards)
- `clips` — looping silent videos (converted GIFs) or stills, each with a title and a line of text; set `cols` and `ratio` (e.g. `"1 / 1"`)
- `explain` — bullet points beside one image (e.g. "why it works" next to a Blueprint)
- `pairs` — wireframe vs textured, side by side
- `compare` — before/after slider (needs two **pixel-aligned** captures)
- `figure` — one wide image with a caption (shader graphs, node trees)
- `video` — an extra full-length video with controls

The top of every project page shows the main video next to the overview: `gameplay` (full video, click to play) if set, otherwise `loop` (short, muted autoplay), otherwise the cover. If a film has black bars baked in, set `mediaRatio` (e.g. `"2 / 1"`) and the player crops them off.

## Media specs

| Asset | Size | Format | Notes |
| --- | --- | --- | --- |
| Card cover | 1600×900 (16:9) | WebP / JPG | Most readable frame, no UI text |
| Card hover loop | 6–10 s, 720p, no audio | MP4 (H.264), ≤ 2 MB | Seamless loop, cut straight to the action |
| Page loop (`loop`) | 10–20 s, 1080p, no audio | MP4, ≤ 6 MB | Only used when there's no `gameplay` video |
| Gameplay / film (`gameplay`) | full length, 1080p | MP4 locally; YouTube / Bilibili / Vimeo when deployed | Shown at the top of the page; pick a good `gameplayPoster` frame |
| Screenshots | 1920×1080 | WebP | Gallery crops them; the lightbox shows them uncropped |
| Before/after | 2 frames, same camera | WebP | Lighting off/on, VFX off/on, unlit/lit |

GIFs from slides: convert to MP4 rather than shipping the GIF (typically 10× smaller, looks identical):

```bash
ffmpeg -i clip.gif -an -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -pix_fmt yuv420p -c:v libx264 -crf 24 clip.mp4
```

Local media lives in `media/<project-id>/` (see `afterglow`); media migrated from Wix lives in `media/wix/`.
