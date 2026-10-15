# Keith Janish Portfolio — v1.0.9

This version keeps the existing charcoal, white, and steel-blue portfolio design.

1. Extract this ZIP into a new folder.
2. Open the folder containing `package.json` in VS Code.
3. Run `npm install`, then `npm run dev`.
4. Open the local URL Vite prints. Do not double-click the HTML files.

## Select which tags visitors can filter by

Edit **`src/content/filter-tags.js`**:

```js
export const filterableTags = ['Unity', 'Unreal Engine', 'C#', 'C++'];
```

This list alone controls the available filter buttons.

## Assign tags to each project

Edit **`src/content/projects/firebase.js`**, **`src/content/projects/operation-station.js`**, or **`src/content/projects/clockwork-trials.js`**:

```js
export const tags = ['Unity', 'C#', 'Gameplay systems', 'Prototype'];
```

All these tags are displayed on the project. Only those also present in `filterableTags` can filter projects. For example, Prototype stays a plain badge until you add it to `filter-tags.js`.

The artwork, overview `links` arrays, and optional `video` settings are preserved. Clockwork Trials has `video: null`; Operation Station uses YouTube, and Firebase uses the supplied local MP4 trailer and thumbnail. Edit the Firebase content at `src/content/projects/firebase.js`.

## Cloudflare

Run `npx wrangler login`, then `npm run deploy` for your Cloudflare Worker. For Pages, run `npm run build`, then `npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME`.

The previously shared hosted preview is an earlier publication. Use this package's local Vite URL to see version 1.0.9, or deploy this package to your own Cloudflare site.

The unused icon versions were removed. Current icons live in `public/icons/`, with `public/favicon.ico` as the browser fallback. Project artwork and trailers live in `public/media/projects/<slug>/`; the résumé and portrait live in `public/media/profile/`. Update the matching project JS file when adding media.

Version 1.0.9 removes the gap beneath embedded video and makes each full project card a link. Filter tags and Watch video keep their separate actions.

The dark-and-white layout with steel-blue accents, project filters, full-card links, and video behavior are preserved.
