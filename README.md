> **Corrected package v1.0.8.** Start with `START_HERE.md`. Extract into a new folder and use the Vite URL printed by `npm run dev`.

# Keith Janish — Gameplay Programmer Portfolio

A complete responsive portfolio built with **plain JavaScript, CSS, npm, and Vite**, with Cloudflare Wrangler support. Includes a homepage, two separate project pages, a custom 404 page, portrait, downloadable résumé, and a click-to-play YouTube trailer. Content is generated into HTML so visitors and search engines can read it without client-side JavaScript.

## Start locally (Windows, macOS, or Linux)

1. Install Node.js **22.12 or newer** (Node 24 LTS recommended) from https://nodejs.org/ and restart your terminal.
2. Extract the ZIP completely. Open the `keith-janish-portfolio` folder in VS Code.
3. Open **Terminal → New Terminal**. Make sure `package.json` is in this folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local address Vite prints (normally http://localhost:5173). Keep the terminal running. Press Ctrl+C to stop.

Content changes inside `src/` regenerate the pages and reload the browser automatically. CSS and browser JavaScript changes also update through Vite. If you change the site configuration, restart the development command.

If PowerShell reports that `npm.ps1` cannot run, use `npm.cmd install` and `npm.cmd run dev`, or switch VS Code's terminal to Command Prompt. No system execution-policy change is necessary.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite local development with live updates |
| `npm run build` | Generate HTML and build the complete `dist/` site |
| `npm run check` | Check the built pages, local links, assets, anchors, and metadata |
| `npm run preview` | Preview an existing production build |
| `npm run dev:cloudflare` | Build, then serve through Wrangler locally |
| `npm run deploy` | Build and publish to your Cloudflare Workers account |
| `npm run deploy:pages` | Build and upload to Cloudflare Pages |

## Deploy with Cloudflare Workers / Wrangler

Wrangler is a project dependency; no global installation is needed.

```bash
npx wrangler login
npm run deploy
```

This creates or updates the Worker named `keith-janish-portfolio`. Change `name` in `wrangler.jsonc` first if that name already belongs to another project you want to retain. No account ID, API token, or custom-domain binding is bundled.

To use Wrangler directly:

```bash
npm run build
npx wrangler dev
```

```bash
npx wrangler deploy
```

In Cloudflare, add `keithjanish.com` to your deployed Worker's **Settings → Domains & Routes** when you are ready to move the domain. The included configuration does not alter your existing website or DNS by itself.

Official reference: https://developers.cloudflare.com/workers/static-assets/get-started/

## If your current site uses Cloudflare Pages

Use an existing Pages project name you intend to update:

```bash
npm run build
npx wrangler pages deploy dist --project-name YOUR_PAGES_PROJECT_NAME
```

For Pages Git integration, use build command `npm run build` and output directory `dist`. For Workers Git integration, use build command `npm run build` and deploy command `npx wrangler deploy`.

## Edit content

| File | Content |
| --- | --- |
| `src/content/profile.js` | Name, biography, contact links, portrait, résumé, availability |
| `src/content/site.js` | Navigation, site metadata, section and contact copy |
| `src/content/skills.js` | Skill groups and tools |
| `src/content/education.js` | Degrees, graduation dates, education status |
| `src/content/projects.js` | Project imports and ordering |
| `src/content/filter-tags.js` | The only tags visitors are allowed to filter by |
| `src/content/projects/operation-station.js` | All Operation Station project content |
| `src/content/projects/clockwork-trials.js` | All Clockwork Trials project content |
| `src/templates/home.js` | Homepage structure |
| `src/templates/project.js` | Shared project-page structure |
| `src/templates/shared.js` | Header, footer, contact, HTML helpers |
| `site/assets/style.css` | Colors, typography, spacing, responsive layouts |
| `site/assets/main.js` | Mobile navigation, email-copy button, trailer player, project navigation |
| `public/media/` | Portrait, project images, résumé PDF |
| `vite.config.js` | Build entrypoints and content live-reload |
| `wrangler.jsonc` | Your Cloudflare Worker name and static asset settings |

Edit the source `.js` files, not generated `site/index.html`, generated project HTML, or `dist/`. Production HTML is pre-rendered from the content modules during each build. To add another project, create a content file, register it in `projects.js`, and add its HTML entry to `vite.config.js`.

The résumé PDF is the exact uploaded document, renamed for a clean download link. Its separate Unity capstone experience is not attributed to Clockwork Trials. Project descriptions and team credits follow the supplied brief. M.S. graduation is labeled **expected July 2027**.

External email links open the visitor's mail app. Copy email needs a secure context (HTTPS or localhost). The trailer contacts YouTube only after the visitor presses Play; a direct YouTube link remains available. Google Fonts loads Barlow Condensed and DM Sans; system font fallbacks are provided. All essential images and the résumé are local.

## Research and media

Portfolio structure applies Riot's advice to focus on selected work, readable case studies, and accessible presentation:
https://www.riotgames.com/en/portfolio-and-reel-suggestions

- Operation Station artwork: supplied by Keith Janish for this redesign.
- Clockwork Trials title artwork: supplied by Keith Janish for this redesign.
- Portrait and résumé: provided by Keith Janish.

Both project images use the newly supplied artwork without altering the files. Cards and detail pages use matching 16:9 artwork frames. Images scale proportionally to fill them, with centered cropping where needed and no distortion. Detail-page captions sit below the artwork. The portrait is displayed with CSS cropping; its original file is preserved.

## Display tags versus filter tags

These are deliberately separate.

**Choose available visitor filters** in `src/content/filter-tags.js`:

```js
export const filterableTags = [
  'Unity',
  'Unreal Engine',
  'C#',
  'C++'
];
```

Only these entries create filter buttons or clickable tags. Their order controls the filter-button order. A configured tag with no matching projects shows a zero count and an empty state. An empty array leaves only **All projects**.

**Assign/display tags on each project** at the top of its file in `src/content/projects/`:

```js
export const tags = ['Unity', 'C#', 'Gameplay systems', 'Systems design', 'Prototype'];
```

All of a project's tags are displayed. Only tags also included in `filterableTags` are clickable/filterable. With the current configuration, Gameplay systems, Systems design, Prototype, Frontend, Player experience, and VFX are display-only. To make VFX filterable, add `'VFX'` to `filterableTags`. Removing it from that list keeps the VFX badge visible on its projects.

Metadata such as `engine` and `language` never adds filter options automatically. Tag spelling and capitalization must match. Duplicate or empty filter entries are ignored. A manually edited or old URL containing a disallowed tag resets to All projects and removes that tag parameter.

## Project links and optional videos

Each project also contains:

```js
links: [
  {label: 'Play build', url: 'https://your-name.itch.io/your-game', primary: true},
  {label: 'Watch trailer', url: 'https://www.youtube.com/watch?v=9nlNoeEMFZk'}
],
video: {type: 'youtube', id: '9nlNoeEMFZk', title: 'Project trailer'},
```

Add/remove/reorder the `links` array to control overview links and quick-access buttons. Set `links: []` to hide the link group. Set `video: null` to hide the video player and video navigation. Adding a trailer link alone does not create a player. Clockwork Trials has no assigned video; Operation Station has its provided trailer.

For a local MP4 in `public/media/`:

```js
video: {type: 'file', src: '/media/my-trailer.mp4', mime: 'video/mp4', title: 'Project trailer'},
```

## Appearance and artwork

Version 1.0.8 restores the supplied screenshot's near-black background, orange accents, Barlow Condensed headline, and rectangular portrait. The source hero reads “I build the systems behind the play.” The corresponding dark styling carries through navigation, filters, project pages, and contact.

Both project images remain the exact supplied Clockwork Trials title card and Operation Station trailer artwork. Artwork fills consistent 16:9 frames using proportional cover scaling; detail captions appear below the image. Video player sizing remains independent.

Run `npm run check` after building to check local assets, links, video configuration, separate filter configuration, and the production filter event handlers.

## Project scrolling

The project row shows two cards at a time above 760px, and one on smaller screens. Use the arrow buttons, horizontal swipe/trackpad, or focus the row and use Left/Right, Home, and End. Arrows are disabled when there are no additional cards in that direction. With the current two projects, both fit on desktop. Filtering resets the scroll position and updates the range and arrow states.

The project introduction sentence has been removed. Versioned dark/orange SVG and ICO favicon URLs replace the old icon, with an Apple touch icon and a default favicon.ico fallback.
