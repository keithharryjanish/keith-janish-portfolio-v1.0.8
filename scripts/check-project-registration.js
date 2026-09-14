import assert from 'node:assert/strict';
import {mkdtemp, readdir, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {projects} from '../src/content/projects.js';
import {projectRoutes} from '../src/lib/project-routes.js';
import {generate} from './generate.js';
import {home} from '../src/templates/home.js';
import {project} from '../src/templates/project.js';

const original = [...projects];
const fixture = original[0];
assert(fixture, 'Keep at least one real project as the registration test fixture.');
const workspace = await mkdtemp(join(tmpdir(), 'portfolio-registration-'));
const previousDirectory = process.cwd();
try {
  process.chdir(workspace);
  for (const count of [5, 1, 0]) {
    const fixtures = Array.from({length:count}, (_, index) => ({
      ...fixture,
      slug: `fixture-${index + 1}`,
      title: `Fixture ${index + 1}`,
      number: String(index + 1).padStart(2, '0')
    }));
    projects.splice(0, projects.length, ...fixtures);
    assert.equal(projectRoutes(projects).length, count);
    assert.equal((home().match(/data-project-tags=/g) || []).length, count);
    await generate();
    assert.deepEqual((await readdir('site/projects')).sort(), fixtures.map(p => p.slug).sort());
    for (const [index, p] of projects.entries()) {
      const html = await readFile(`site/projects/${p.slug}/index.html`, 'utf8');
      assert(html.includes(`<h1>${p.title}</h1>`));
      const tail = project(p).split('class="wrap next-project"')[1];
      assert(tail);
      assert(!tail.includes('/projects/undefined/'));
      if (count > 1) assert(tail.includes(`href="/projects/${projects[(index + 1) % count].slug}/"`));
      else assert(tail.includes('href="/#projects"'));
    }
  }
  assert.throws(() => projectRoutes([{slug:'duplicate'}, {slug:'duplicate'}]), /Duplicate/);
  assert.throws(() => projectRoutes([{slug:'../bad'}]), /slug/);
} finally {
  projects.splice(0, projects.length, ...original);
  process.chdir(previousDirectory);
  await rm(workspace, {recursive:true, force:true});
}
console.log('PASS: registration generates 5, 1, and 0 projects, removes stale pages, validates slugs, and cycles Next links.');
