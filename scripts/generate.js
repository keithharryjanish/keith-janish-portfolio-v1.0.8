import {mkdir, writeFile, cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {home} from '../src/templates/home.js';
import {project} from '../src/templates/project.js';
import {projects} from '../src/content/projects.js';
import {page,header,footer} from '../src/templates/shared.js';
export async function generate(){
 await mkdir('site/projects',{recursive:true});
 await writeFile('site/index.html',home());
 for(const p of projects){await mkdir(`site/projects/${p.slug}`,{recursive:true});await writeFile(`site/projects/${p.slug}/index.html`,project(p));}
 await writeFile('site/404.html',page({title:'Page not found — Keith Janish',body:header()+'<main id="main" class="wrap missing"><p class="eyebrow">404 / OFF THE MAP</p><h1>Let’s get back<br>to the work.</h1><p>This page could not be found.</p><a class="button primary" href="/">Back to portfolio ↗</a></main>'+footer()}));
 console.log('Generated homepage, 2 project pages, and custom 404.');
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) await generate();
