import {profile} from '../content/profile.js';
import {site} from '../content/site.js';
import {projects} from '../content/projects.js';
import {skills} from '../content/skills.js';
import {education} from '../content/education.js';
import {allProjectTags, projectTags, projectVideo} from '../lib/projects.js';
import {filterTags} from './media.js';
import {e,arrow,tags,header,footer,contact,page} from './shared.js';

function projectCard(p) {
 return `<article class="project-card ${e(p.slug)}" data-project-tags="${e(JSON.stringify(projectTags(p)))}">
  <a class="project-visual" href="/projects/${p.slug}/" aria-label="Explore ${e(p.title)}">
   <img src="${e(p.image)}" alt="${e(p.imageAlt)}" loading="lazy">
  </a>
  <div class="project-copy">
   <div class="project-index"><span>${e(p.kind)}</span><span class="release-badge">${e(p.status)}</span></div>
   <h3><a class="project-card-link" href="/projects/${p.slug}/">${e(p.title)}</a></h3>
   <p class="project-summary">${e(p.summary)}</p>
   ${filterTags(p)}
   <div class="project-role"><span>MY CONTRIBUTION</span><p>${e(p.role)}</p></div>
   <div class="card-actions"><a href="/projects/${p.slug}/" class="case-link">View project ${arrow}</a>${projectVideo(p) ? `<a class="card-video" href="/projects/${p.slug}/#video"><span aria-hidden="true">▷</span> Watch video</a>` : ''}</div>
  </div>
 </article>`;
}
export function home() {
 return page({body:`${header()}
 <main id="main">
  <section class="hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="accent-line"></span> KEITH JANISH / GAMEPLAY PROGRAMMER</p><h1>I build the<br>systems behind<br><span>the play.</span></h1><p class="hero-description">${e(profile.summary)}</p><div class="hero-buttons"><a href="#projects" class="button primary">Explore my work <span aria-hidden="true">↓</span></a><a href="${profile.resume}" target="_blank" rel="noopener" class="text-link">View résumé ${arrow}</a></div></div><div class="hero-portrait"><div class="portrait-frame"><img src="${profile.portrait}" alt="Keith Janish outdoors at sunset" width="1362" height="1824" fetchpriority="high"><div class="portrait-caption"><span>KEITH JANISH</span><span>DEVELOPER. DESIGNER. PLAYER.</span></div></div><div class="portrait-note"><span class="cross" aria-hidden="true">+</span><span>BASED IN ${e(profile.location.toUpperCase())}<br><span class="muted">BUILDING FOR THE NEXT PLAYER.</span></span></div></div><div class="hero-bottom"><span>${e(profile.availability)}</span><span>UNITY <i>/</i> UNREAL ENGINE <i>/</i> C# <i>/</i> C++</span></div></section>
  <section class="section work wrap" id="projects">
   <div class="section-heading"><div><p class="eyebrow">THE PORTFOLIO</p><h2>${e(site.selectedWork)}<span class="count">${String(projects.length).padStart(2,'0')}</span></h2></div></div>
   <div class="filter-panel"><div class="filter-heading"><span>Filter by tag</span><p id="filter-status" role="status" aria-live="polite" aria-atomic="true">Showing ${projects.length} projects</p></div><div class="filter-chips" role="group" aria-label="Filter projects by tag"><button type="button" class="filter-chip" disabled data-filter="" aria-pressed="true">All projects <span>${projects.length}</span></button>${allProjectTags(projects).map(tag=>`<button type="button" class="filter-chip" disabled data-filter="${e(tag)}" aria-pressed="false">${e(tag)} <span>${projects.filter(p=>projectTags(p).includes(tag)).length}</span></button>`).join('')}</div></div>
   <noscript><p>Enable JavaScript to use project filters. All projects are shown below.</p></noscript><div class="project-carousel" aria-label="Projects">
    <div class="carousel-toolbar"><p class="carousel-position" data-carousel-position role="status" aria-live="polite">${projects.length} projects</p><div class="carousel-buttons"><button type="button" class="carousel-button" data-carousel-prev aria-label="Previous projects" aria-controls="project-track" disabled><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M19 12H5m0 0 6 6m-6-6 6-6"/></svg></button><button type="button" class="carousel-button" data-carousel-next aria-label="Next projects" aria-controls="project-track" disabled><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg></button></div></div>
    <div class="project-list" id="project-track" tabindex="0" role="region" aria-label="Scrollable project cards">${projects.map(projectCard).join('')}</div>
   </div>
   <div class="filter-empty" hidden><h3>No matching projects</h3><p>Try another tag to explore the portfolio.</p><button type="button" class="button primary" data-clear-filter>Show all projects</button></div>
  </section>
  <section class="about section" id="about"><div class="wrap"><div class="about-grid"><div><p class="eyebrow">A LITTLE ABOUT ME</p><h2>${profile.aboutTitle.split('\n').map(e).join('<br>')}</h2><div class="about-signature">Keith Janish<span>GAME DEVELOPMENT + GAME DESIGN</span></div></div><div class="about-copy">${profile.about.map(p=>`<p>${e(p)}</p>`).join('')}<a class="text-link" href="${profile.resume}" target="_blank" rel="noopener">Read my résumé ${arrow}</a></div></div><div class="skills-grid">${skills.map((s,i)=>`<article class="skill"><span class="skill-number">0${i+1}</span><h3>${e(s.title)}</h3><p>${e(s.description)}</p>${tags(s.tags)}</article>`).join('')}</div><div class="education"><p class="eyebrow">EDUCATION</p>${education.map(x=>`<div class="education-row"><h3>${e(x.degree)}<span>${e(x.school)}</span></h3><p>${e(x.date)}<span>${e(x.status)}</span></p></div>`).join('')}</div></div></section>
  ${contact()}
 </main>${footer()}`});
}
