import {readFile,stat,readdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {projects} from '../src/content/projects.js';
const root=resolve('dist');
const routes=['/','/projects/operation-station/','/projects/clockwork-trials/','/404.html'];
let checked=0;
for(const route of routes){
 const file=join(root,route.endsWith('/')?route+'index.html':route);
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: exactly one h1`);
 assert(html.includes('<main id="main"'),`${route}: main landmark`);
 assert(html.includes('name="description"'),`${route}: description`);
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const url=new URL(ref,'https://local.test'+route);
  const pathname=decodeURIComponent(url.pathname);
  let local=join(root,pathname);
  if(pathname.endsWith('/'))local=join(local,'index.html');
  try{assert((await stat(local)).isFile());}catch{throw Error(`${route}: missing local reference ${ref}`);}
  if(url.hash){const targetHtml=await readFile(local,'utf8');assert(targetHtml.includes(`id="${url.hash.slice(1)}"`),`Missing anchor ${ref}`);}
  checked++;
 }
}
for(const p of projects){assert(p.developers.includes('Keith Janish'));assert(Array.isArray(p.links));assert(p.responsibilities.length);}
const config=JSON.parse(await readFile('wrangler.jsonc','utf8'));
assert.equal(config.assets.directory,'./dist');
console.log(`PASS: ${routes.length} routes, ${checked} local asset/link references, metadata, anchors, project records, and Cloudflare output path.`);

const {allProjectTags, projectTags, matchesTag, projectVideo} = await import('../src/lib/projects.js');
const {project: renderProject} = await import('../src/templates/project.js');
for (const tag of allProjectTags(projects)) {
 assert(projects.some(p => matchesTag(projectTags(p), tag)), `Tag ${tag} must have results`);
}
assert(projects.every(p => matchesTag(projectTags(p), '')));
assert.deepEqual(projects.filter(p => matchesTag(projectTags(p), 'Unity')).map(p => p.slug), ['operation-station']);
assert.deepEqual(projects.filter(p => matchesTag(projectTags(p), 'Unreal Engine')).map(p => p.slug), ['clockwork-trials']);
assert.deepEqual(projects.filter(p => matchesTag(projectTags(p), 'C++')).map(p => p.slug), ['clockwork-trials']);
assert.equal(projects.filter(p => matchesTag(projectTags(p), 'Unknown')).length, 0);
for (const p of projects) {
 const html = renderProject(p);
 assert.equal(html.includes('id="video"'), Boolean(projectVideo(p)));
 const overview = html.split('<section id="overview">')[1].split('</section>')[0];
 for (const link of p.links) assert(overview.includes(link.url.replaceAll('&', '&amp;')), `Overview must include ${link.label}`);
 const noVideo = renderProject({...p, video:null});
 assert(!noVideo.includes('id="video"') && !noVideo.includes('video-launch') && !noVideo.includes('Watch project video'));
 assert(!renderProject({...p,video:{type:'youtube',id:''}}).includes('video-launch'));
 const fileVideo = renderProject({...p,video:{type:'file',src:'/media/demo.mp4',mime:'video/mp4'}});
 assert(fileVideo.includes('<video controls') && fileVideo.includes('/media/demo.mp4'));
 const withExtra = renderProject({...p,links:[...p.links,{label:'Development notes',url:'https://example.com/notes'}]});
 assert(withExtra.split('<section id="overview">')[1].split('</section>')[0].includes('https://example.com/notes'));
 assert(!renderProject({...p,links:[]}).includes('aria-label="'+p.title+' links"'));
}
console.log('PASS: tag matching, optional video (assigned / null / invalid / local file), and configurable overview links.');

assert.deepEqual(projectTags({engine:'Unity',language:'C#',tags:['Puzzle']}), ['Puzzle']);
assert.deepEqual(projectTags({engine:'Unity',language:'C#',tags:[]}), []);
assert.deepEqual(projectTags({engine:'Unity',language:'C#'}), []);
assert.deepEqual(projectTags({tags:[' Puzzle ','Puzzle','',null,3]}), ['Puzzle']);
console.log('PASS: tags are explicitly controlled by tags arrays.');

const {filterableTags} = await import('../src/content/filter-tags.js');
const {filterTags: renderTags} = await import('../src/templates/media.js');
const configuredTags = [...filterableTags];
try {
 filterableTags.splice(0, filterableTags.length, 'Unity');
 assert.deepEqual(allProjectTags(projects), ['Unity']);
 const tagsHtml = renderTags({tags:['Unity','VFX']});
 assert(tagsHtml.includes('data-project-tag="Unity"'));
 assert(!tagsHtml.includes('data-project-tag="VFX"'));
 assert(tagsHtml.includes('<span class="display-tag">VFX</span>'));
 filterableTags.splice(0);
 assert.deepEqual(allProjectTags(projects), []);
 assert(!renderTags({tags:['Unity']}).includes('data-project-tag'));
} finally {filterableTags.splice(0, filterableTags.length, ...configuredTags);}
console.log('PASS: separate filter whitelist controls available chips; other project tags are display-only.');
