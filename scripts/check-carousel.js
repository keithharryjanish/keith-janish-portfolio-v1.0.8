import assert from 'node:assert/strict';
import {initProjectCarousel} from '../site/assets/project-carousel.js';

// Test production handlers with geometry for five fixture cards (not site content).
class Control extends EventTarget {
  click() { if (!this.disabled) this.dispatchEvent(new Event('click')); }
}
const track = new Control();
const previous = new Control(), next = new Control(), position = {};
const cards = Array.from({length:5}, () => ({hidden:false, offsetWidth:488}));
track.clientWidth = 1000;
track.scrollLeft = 0;
track.getBoundingClientRect = () => ({left:137});
cards.forEach(card => {card.getBoundingClientRect = () => ({left:137 + cards.filter(c => !c.hidden).indexOf(card) * (card.offsetWidth + 24) - track.scrollLeft});});
Object.defineProperty(track, 'scrollWidth', {get:() => Math.max(track.clientWidth, cards.filter(c=>!c.hidden).length * (cards[0].offsetWidth + 24) - 24)});
track.querySelectorAll = () => cards;
track.scrollTo = ({left, behavior}) => {
  track.scrollLeft = Math.max(0, Math.min(left, track.scrollWidth-track.clientWidth));
  track.behavior = behavior;
  track.dispatchEvent(new Event('scroll'));
};
const root = {querySelector:s=>({'#project-track':track,'[data-carousel-prev]':previous,'[data-carousel-next]':next,'[data-carousel-position]':position})[s]};
const browser = new EventTarget();
browser.matchMedia = () => ({matches:true});
browser.getComputedStyle = () => ({columnGap:'24px'});
initProjectCarousel(root, browser);
assert.equal(position.textContent,'1–2 of 5 projects');
assert(previous.disabled);assert(!next.disabled);
next.click();assert.equal(position.textContent,'3–4 of 5 projects');
assert.equal(track.scrollLeft,1024);assert.equal(track.behavior,'instant');
next.click();assert.equal(position.textContent,'4–5 of 5 projects');assert(next.disabled);
previous.click();assert.equal(position.textContent,'2–3 of 5 projects');
function key(value) {const event = new Event('keydown',{cancelable:true});event.key=value;track.dispatchEvent(event);assert(event.defaultPrevented);}
key('Home');assert(previous.disabled);
key('End');assert(next.disabled);
key('ArrowLeft');assert(!next.disabled);
key('Home');key('ArrowRight');assert.equal(position.textContent,'3–4 of 5 projects');
// Filtering resets an advanced page, lays out only visible cards, and updates controls.
cards.forEach((card,i)=>card.hidden=i>1);
track.dispatchEvent(new Event('projects-filtered'));
assert.equal(track.scrollLeft,0);assert.equal(position.textContent,'1–2 of 2 projects');
assert(previous.disabled&&next.disabled);
// One card per mobile view, then empty results.
track.clientWidth=488;browser.dispatchEvent(new Event('resize'));
assert.equal(position.textContent,'1–1 of 2 projects');assert(!next.disabled);
next.click();assert.equal(position.textContent,'2–2 of 2 projects');assert(next.disabled);
cards.forEach(card=>card.hidden=true);track.dispatchEvent(new Event('projects-filtered'));
assert.equal(position.textContent,'No projects');assert(previous.disabled&&next.disabled);
console.log('PASS: carousel handlers — two-card pages, boundaries, keyboard, mobile, filter reset, empty results, and reduced motion.');
