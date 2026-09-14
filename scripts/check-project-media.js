import assert from 'node:assert/strict';
import {mkdtemp, cp, symlink, readFile, writeFile, rm, stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve, join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {normalizeMediaPath, mediaUrl, projectMedia} from '../src/lib/media-paths.js';
import operation from '../src/content/projects/operation-station.js';

for (const path of ['operation-station.png', 'media/operation-station.png', '/media/operation-station.png', 'public/media/operation-station.png', './public/media/operation-station.png', 'public\\media\\operation-station.png']) {
  assert.equal(mediaUrl(path), mediaUrl(operation.image), `Normalize ${path}`);
}
assert.equal(normalizeMediaPath('https://example.com/art.png'), 'https://example.com/art.png');
assert.throws(() => mediaUrl('../outside.png'), /inside public/);
assert.throws(() => projectMedia({...operation, image:'missing-artwork.png'}), /operation-station.*public\/media\/missing-artwork.png/);
assert.equal(projectMedia(operation).image, projectMedia(operation).detailImage);
assert.equal(projectMedia({...operation, heroImage:'https://example.com/hero.jpg'}).detailImage, 'https://example.com/hero.jpg');
assert.equal(projectMedia({...operation, heroImage:'clockwork-trials.png', detailImage:operation.image}).detailImage, mediaUrl('clockwork-trials.png'));
assert.throws(() => projectMedia({...operation, heroImage:'missing-hero.png'}), /operation-station.*missing-hero/);

const root = resolve('.');
const fixture = await mkdtemp(join(tmpdir(), 'portfolio-media-'));
try {
  for (const path of ['src', 'scripts', 'public', 'site/assets', 'package.json', 'vite.config.js']) {
    await cp(join(root, path), join(fixture, path), {recursive:true});
  }
  await symlink(join(root, 'node_modules'), join(fixture, 'node_modules'), 'dir');
  // Exercise the real workflow: copy a content module, change the slug, register it.
  const source = await readFile(join(fixture, 'src/content/projects/operation-station.js'), 'utf8');
  await writeFile(join(fixture, 'src/content/projects/copied-station.js'), source
    .replace("slug:'operation-station'", "slug:'copied-station'")
    .replace("image:'/media/operation-station.png'", "image:'public/media/operation-station.png'")
     .replace('heroImage: null', "heroImage: 'public/media/clockwork-trials.png'")
    .replace("heroImageAlt: ''", "heroImageAlt: 'A custom <hero>'")
    .replace('gallery: []', "gallery: [{src:'media/clockwork-trials.png', alt:'Copied screenshot', caption:'Details <and> images'}, 'operation-station.png']")
    .replace("type: 'youtube',", "poster: 'clockwork-trials.png', type: 'youtube',"));
  const registryPath = join(fixture, 'src/content/projects.js');
  const registry = await readFile(registryPath, 'utf8');
  await writeFile(registryPath, "import copiedStation from './projects/copied-station.js';\n" + registry.replace('[operation, clockwork]', '[operation, clockwork, copiedStation]'));
  execFileSync('npm', ['run', 'build'], {cwd:fixture, stdio:'pipe'});
  const homepage = await readFile(join(fixture, 'dist/index.html'), 'utf8');
  const detail = await readFile(join(fixture, 'dist/projects/copied-station/index.html'), 'utf8');
  assert.equal((homepage.match(/data-project-tags=/g) || []).length, 3);
  assert(homepage.includes('/projects/copied-station/'));
  assert(homepage.includes(mediaUrl(operation.image)));
  const banner = detail.split('<figure class="project-banner ')[1].split('</figure>')[0];
  assert(banner.includes(`src="${mediaUrl('clockwork-trials.png')}"`), 'Project hero uses its own image field');
  assert(banner.includes('alt="A custom &lt;hero&gt;"'), 'Project hero uses its own escaped alt text');
  const card = homepage.split('class="project-card copied-station"')[1].split('</article>')[0];
  assert(card.includes(`src="${mediaUrl(operation.image)}"`), 'Custom hero leaves the card image unchanged');
  assert(detail.includes('id="gallery"') && detail.includes('Details &lt;and&gt; images'));
  assert(detail.includes('class="video-launch"'));
  assert(detail.includes(mediaUrl('clockwork-trials.png')), 'Copied gallery and custom poster resolve');
  assert(homepage.includes('data-carousel-progress'));
  for (const html of [homepage, detail]) {
    for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      assert(src.startsWith('/media/'), `Image must work from every route: ${src}`);
      const path = new URL(src, 'https://local.test/projects/copied-station/').pathname;
      assert((await stat(join(fixture, 'dist', path))).size > 0);
      assert.deepEqual(await readFile(join(fixture, 'dist', path)), await readFile(join(root, 'public', path)));
    }
  }
  const {projectMedia: fixtureMedia, mediaUrl: fixtureUrl} = await import(join(fixture, 'src/lib/media-paths.js'));
  assert.equal(fixtureMedia({...operation, detailImage:'clockwork-trials.png'}).detailImage, fixtureUrl('clockwork-trials.png'));
  const portraitBefore = fixtureUrl('keith-janish.jpg');
  await writeFile(join(fixture, 'public/media/keith-janish.jpg'), 'Changed fixture only');
  assert.notEqual(fixtureUrl('keith-janish.jpg'), portraitBefore, 'Same-filename replacement changes cache version');
  await rm(join(fixture, 'public/media/operation-station.png'));
  assert.throws(() => execFileSync(process.execPath, ['scripts/generate.js'], {cwd:fixture, stdio:'pipe'}), error => /Missing image/.test(error.stderr.toString()));
} finally {
  await rm(fixture, {recursive:true, force:true});
}
console.log('PASS: copied project builds its route and artwork, custom hero, gallery, poster, path normalization, missing-image errors and replacement cache versions.');
