import assert from 'node:assert/strict';
import {initProjectFilters} from '../site/assets/project-filters.js';
import {home} from '../src/templates/home.js';

// Exercise the production event handlers against the actual generated tag data.
const html = home();
const decode = value => value.replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&');
class Control extends EventTarget {
  constructor(dataset = {}) { super(); this.dataset = dataset; this.hidden = false; this.disabled = true; this.attributes = {}; }
  setAttribute(key, value) { this.attributes[key] = value; }
  focus() { this.focused = true; }
  scrollIntoView() {}
  click() { this.dispatchEvent(new Event('click', {cancelable:true})); }
}
const cards = [...html.matchAll(/data-project-tags="([^"]+)"/g)].map(match => new Control({projectTags:decode(match[1])}));
const chips = [...html.matchAll(/data-filter="([^"]*)"/g)].map(match => new Control({filter:decode(match[1])}));
const links = [...html.matchAll(/data-project-tag="([^"]+)"/g)].map(match => new Control({projectTag:decode(match[1])}));
const track = new Control();
let filterSignals = 0;
track.addEventListener('projects-filtered', () => filterSignals++);
const panel = new Control();
const status = new Control();
const empty = new Control();
const clear = new Control();
panel.querySelectorAll = () => chips;
const root = {
  querySelector: selector => ({'#project-track':track,'.filter-panel':panel,'#filter-status':status,'.filter-empty':empty,'[data-clear-filter]':clear})[selector],
  querySelectorAll: selector => selector === '[data-project-tags]' ? cards : links
};
const browser = new EventTarget();
browser.location = {href:'https://test.local/'};
browser.history = {pushState: (_, __, url) => {browser.location.href = url;}, replaceState: (_, __, url) => {browser.location.href = url;}};
initProjectFilters(root, browser);
assert(chips.every(chip => !chip.disabled));
assert(cards.every(card => !card.hidden));
const click = tag => chips.find(chip => chip.dataset.filter === tag).click();
click('Unity');
assert.deepEqual(cards.map(card => card.hidden), [false, true]);
assert.equal(status.textContent, 'Showing 1 of 2 projects · Unity');
click('Unreal Engine');
assert.deepEqual(cards.map(card => card.hidden), [true, false]);
click('C++');
assert.equal(new URL(browser.location.href).searchParams.get('tag'), 'C++');
assert.equal(chips.find(chip => chip.dataset.filter === 'C++').attributes['aria-pressed'], 'true');
click('');
assert(cards.every(card => !card.hidden));
assert(!new URL(browser.location.href).searchParams.has('tag'));
links.find(link => link.dataset.projectTag === 'Unity').click();
assert.deepEqual(cards.map(card => card.hidden), [false, true]);
browser.location.href = 'https://test.local/?tag=Unreal%20Engine#projects';
browser.dispatchEvent(new Event('popstate'));
assert.deepEqual(cards.map(card => card.hidden), [true, false]);
browser.location.href = 'https://test.local/?tag=Missing#projects';
browser.dispatchEvent(new Event('popstate'));
assert(cards.every(card => !card.hidden));
assert.equal(empty.hidden, true);
assert(!new URL(browser.location.href).searchParams.has('tag'));
browser.location.href = 'https://test.local/?tag=VFX#projects';
browser.dispatchEvent(new Event('popstate'));
assert(cards.every(card => !card.hidden));
assert(!new URL(browser.location.href).searchParams.has('tag'));
assert(!links.some(link => link.dataset.projectTag === 'VFX'));
assert(!chips.some(chip => chip.dataset.filter === 'VFX'));
clear.click();
assert(cards.every(card => !card.hidden));
assert.equal(empty.hidden, true);
assert(chips[0].focused);
assert.equal(filterSignals, 10, 'Every filter application signals the carousel to reset');
console.log('PASS: actual filter handlers — Unity, Unreal, C++, All, card tag click, URL/back state, display-only tags, rejected disallowed filters, reset, and pressed state.');
