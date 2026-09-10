export function initProjectFilters(root = document, browser = window) {
  const panel = root.querySelector('.filter-panel');
  if (!panel) return;
  const cards = [...root.querySelectorAll('[data-project-tags]')].map(element => ({
    element,
    tags: JSON.parse(element.dataset.projectTags)
  }));
  const chips = [...panel.querySelectorAll('[data-filter]')];
  const allowedTags = new Set(chips.map(chip => chip.dataset.filter));
  const status = root.querySelector('#filter-status');
  const empty = root.querySelector('.filter-empty');
  const clear = root.querySelector('[data-clear-filter]');

  function applyFilter(tag, updateUrl = false) {
    if (!allowedTags.has(tag)) {
      tag = '';
      const cleanUrl = new URL(browser.location.href);
      cleanUrl.searchParams.delete('tag');
      browser.history.replaceState(null, '', cleanUrl.href);
    }
    let count = 0;
    cards.forEach(card => {
      const visible = tag === '' || card.tags.includes(tag);
      card.element.hidden = !visible;
      if (visible) count++;
    });
    chips.forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.filter === tag)));
    status.textContent = `Showing ${count} of ${cards.length} projects${tag ? ` · ${tag}` : ''}`;
    empty.hidden = count > 0;
    root.querySelector('#project-track')?.dispatchEvent(new Event('projects-filtered'));
    if (updateUrl) {
      const url = new URL(browser.location.href);
      if (tag) url.searchParams.set('tag', tag);
      else url.searchParams.delete('tag');
      url.hash = 'projects';
      if (url.href !== browser.location.href) browser.history.pushState(null, '', url.href);
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => applyFilter(chip.dataset.filter, true));
    chip.disabled = false;
  });
  clear?.addEventListener('click', () => {
    applyFilter('', true);
    chips[0]?.focus();
  });
  root.querySelectorAll('[data-project-tag]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      applyFilter(link.dataset.projectTag, true);
      chips.find(chip => chip.dataset.filter === link.dataset.projectTag)?.focus({preventScroll:true});
      panel.scrollIntoView({block:'start', behavior:'auto'});
    });
  });
  browser.addEventListener('popstate', () => applyFilter(new URL(browser.location.href).searchParams.get('tag') || ''));
  applyFilter(new URL(browser.location.href).searchParams.get('tag') || '');
}

if (typeof document !== 'undefined') initProjectFilters();
