# Keith Janish Portfolio — v1.0.9

This version keeps the established dark-and-white layout with a muted crimson accent.

1. Extract `Keith_Janish_Portfolio_v1.0.9.zip` into a NEW folder.
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

Edit **`src/content/projects/operation-station.js`** or **`src/content/projects/clockwork-trials.js`**:

```js
export const tags = ['Unity', 'C#', 'Gameplay systems', 'Prototype'];
```

All these tags are displayed on the project. Only those also present in `filterableTags` can filter projects. For example, Prototype stays a plain badge until you add it to `filter-tags.js`.

The artwork, overview `links` arrays, and optional `video` settings are preserved. Clockwork Trials has `video: null`; Operation Station has its assigned trailer.

## Cloudflare

Run `npx wrangler login`, then `npm run deploy` for your Cloudflare Worker. For Pages, run `npm run build`, then `npx wrangler pages deploy dist --project-name YOUR_PROJECT_NAME`.

The previously shared hosted preview is an earlier publication. Use this package's local Vite URL to see version 1.0.9, or deploy this package to your own Cloudflare site.

Version 1.0.9 adds circular project navigation buttons with clean SVG arrows and uses the supplied KJ favicon design, recolored to match the palette, with matching ICO and Apple touch versions.

Version 1.0.9 removes the gap beneath embedded video and makes each full project card a link. Filter tags and Watch video keep their separate actions.

Version 1.0.9 keeps the dark-and-white design and replaces orange with muted crimson (#e47786). No blue accent is used. Layout, artwork, project filters, full-card links, and video behavior are preserved.
