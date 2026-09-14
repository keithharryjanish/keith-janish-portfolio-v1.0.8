import {mkdir, writeFile, readdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {home} from '../src/templates/home.js';
import {project} from '../src/templates/project.js';
import {projects} from '../src/content/projects.js';
import {page,header,footer} from '../src/templates/shared.js';
import {projectRoutes} from '../src/lib/project-routes.js';
export async function generate(){
 const routes = projectRoutes(projects);
 const homepage = home();
 const projectPages = projects.map(p => ({slug:p.slug, html:project(p)}));
 await mkdir('site/projects',{recursive:true});
 const slugs = new Set(projects.map(p => p.slug));
 for (const entry of await readdir('site/projects', {withFileTypes:true})) {
  if (entry.isDirectory() && !slugs.has(entry.name)) await rm(`site/projects/${entry.name}`, {recursive:true, force:true});
 }
 await writeFile('site/index.html',homepage);
 for(const p of projectPages){await mkdir(`site/projects/${p.slug}`,{recursive:true});await writeFile(`site/projects/${p.slug}/index.html`,p.html);}
 await writeFile('site/404.html',page({title:'Page not found — Keith Janish',body:header()+'<main id="main" class="wrap missing"><p class="eyebrow">404 / OFF THE MAP</p><h1>Let’s get back<br>to the work.</h1><p>This page could not be found.</p><a class="button primary" href="/">Back to portfolio ↗</a></main>'+footer()}));
 console.log(`Generated homepage, ${routes.length} project pages, and custom 404.`);
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) await generate();
