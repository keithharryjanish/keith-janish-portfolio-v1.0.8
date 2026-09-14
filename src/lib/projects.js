import {normalizeMediaPath} from './media-paths.js';
import {filterableTags} from '../content/filter-tags.js';
export const projectTags = project => [...new Set((Array.isArray(project.tags) ? project.tags : []).filter(tag => typeof tag === 'string').map(tag => tag.trim()).filter(Boolean))];
export const allProjectTags = () => [...new Set(filterableTags.filter(tag => typeof tag === 'string').map(tag => tag.trim()).filter(Boolean))];
export const canFilterTag = tag => allProjectTags().includes(tag);
export const matchesTag = (tags, selected) => !selected || tags.includes(selected);
export function projectVideo(project) {
  const video = project.video;
  if (!video) return null;
  if (video.type === 'youtube' && /^[a-zA-Z0-9_-]{11}$/.test(video.id ?? '')) {
    return {...video, title: video.title || `${project.title} video`};
  }
  if (video.type === 'file') {
    try { return {...video, src:normalizeMediaPath(video.src), title: video.title || `${project.title} video`}; }
    catch { return null; }
  }
  return null;
}
export const projectLinks = project => (project.links ?? []).filter(link => link.label && /^(https:\/\/|\/[^/])/.test(link.url ?? ''));
