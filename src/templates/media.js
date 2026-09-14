import {projectMedia} from '../lib/media-paths.js';
import {e, external} from './shared.js';
import {projectLinks, projectVideo, projectTags, canFilterTag} from '../lib/projects.js';
export function links(project, className = 'project-ctas') {
  const items = projectLinks(project);
  if (!items.length) return '';
  return `<div class="${className}" aria-label="${e(project.title)} links">${items.map(link => external(link.url, link.label, `button ${link.primary ? 'primary' : 'outline'}`)).join('')}</div>`;
}
export function filterTags(project) {
 return `<ul class="tags project-tags" aria-label="Project tags">${projectTags(project).map(tag => `<li>${canFilterTag(tag) ? `<a href="/?tag=${encodeURIComponent(tag)}#projects" data-project-tag="${e(tag)}" aria-label="Filter projects by ${e(tag)}">${e(tag)}</a>` : `<span class="display-tag">${e(tag)}</span>`}</li>`).join('')}</ul>`;
}
export function videoSection(project) {
 const video = projectVideo(project);
 if (!video) return '';
 const media = projectMedia(project);
 const player = video.type === 'youtube'
  ? `<button class="video-launch" data-video="${e(video.id)}" data-video-title="${e(video.title)}" aria-label="Play ${e(video.title)}"><img src="${e(media.poster)}" alt="" loading="lazy"><span class="video-play"><span aria-hidden="true">▶</span><small>PLAY VIDEO</small></span></button>`
  : `<video controls playsinline preload="none" poster="${e(media.poster)}" aria-label="${e(video.title)}"><source src="${e(video.src)}"${video.mime ? ` type="${e(video.mime)}"` : ''}>Your browser cannot play this video. <a href="${e(video.src)}">Open video</a></video>`;
 const url = video.type === 'youtube' ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}` : video.src;
 return `<section id="video"><p class="eyebrow">PROJECT VIDEO</p><h2>${e(video.title)}</h2><div class="video-container ${e(project.slug)}">${player}</div><p class="video-fallback">${external(url, video.type === 'youtube' ? 'Watch on YouTube' : 'Open video')}</p></section>`;
}

export function gallerySection(project) {
 const {gallery} = projectMedia(project);
 if (!gallery.length) return '';
 return `<section id="gallery"><p class="eyebrow">IN-GAME LOOK</p><h2>Project screenshots</h2><div class="project-gallery">${gallery.map(image => `<figure><img src="${e(image.src)}" alt="${e(image.alt)}" loading="lazy">${image.caption ? `<figcaption>${e(image.caption)}</figcaption>` : ''}</figure>`).join('')}</div></section>`;
}
