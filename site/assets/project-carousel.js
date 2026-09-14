export function initProjectCarousel(root = document, browser = window) {
  const track = root.querySelector('#project-track');
  if (!track) return;
  const previous = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  const position = root.querySelector('[data-carousel-position]');
  const progress = root.querySelector('[data-carousel-progress]');
  const visibleCards = () => [...track.querySelectorAll('[data-project-tags]')].filter(card => !card.hidden);
  const leftOf = card => card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
  const motion = () => browser.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

  function update() {
    const cards = visibleCards();
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    previous.disabled = !cards.length || track.scrollLeft <= 2;
    next.disabled = !cards.length || track.scrollLeft >= maxScroll - 2;
    const inView = cards.map((card, index) => ({card, index})).filter(({card}) =>
      leftOf(card) + card.offsetWidth > track.scrollLeft + 2 &&
      leftOf(card) < track.scrollLeft + track.clientWidth - 2
    );
    if (progress) {
      const fraction = cards.length ? (inView.at(-1)?.index + 1 || 0) / cards.length : 0;
      progress.style.transform = `scaleX(${fraction})`;
    }
    position.textContent = inView.length
      ? `${inView[0].index + 1}–${inView[inView.length - 1].index + 1} of ${cards.length} projects`
      : 'No projects';
  }

  function move(direction) {
    const cards = visibleCards();
    if (!cards.length) return;
    const first = Math.max(0, cards.findIndex(card => leftOf(card) + card.offsetWidth > track.scrollLeft + 2));
    const gap = Number.parseFloat(browser.getComputedStyle(track).columnGap) || 0;
    const perPage = Math.max(1, Math.round((track.clientWidth + gap) / (cards[0].offsetWidth + gap)));
    const target = Math.max(0, Math.min(cards.length - 1, first + direction * perPage));
    track.scrollTo({left:leftOf(cards[target]), behavior:motion()});
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      track.scrollTo({left:event.key === 'Home' ? 0 : track.scrollWidth, behavior:motion()});
    }
  });
  track.addEventListener('projects-filtered', () => {
    track.scrollTo({left:0, behavior:'instant'});
    update();
  });
  browser.addEventListener('resize', update);
  if (browser.ResizeObserver) new browser.ResizeObserver(update).observe(track);
  update();
}

if (typeof document !== 'undefined') initProjectCarousel();
