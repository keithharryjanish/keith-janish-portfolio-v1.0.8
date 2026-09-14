import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve, sep} from 'node:path';

const publicRoot = fileURLToPath(new URL('../../public/', import.meta.url));

export function normalizeMediaPath(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('An image needs a file path.');
  let path = value.trim().replaceAll('\\', '/');
  if (/^https:\/\//i.test(path)) return new URL(path).href;
  if (path.startsWith('//') || /^[a-z]+:/i.test(path)) throw new Error(`Use a public media path or an HTTPS URL: ${value}`);
  path = path.replace(/^\.\//, '').replace(/^\/?public\//, '');
  if (path.split(/[/?#]/).includes('..')) throw new Error(`Keep media inside public/: ${value}`);
  if (!path.includes('/')) path = `media/${path}`;
  const url = new URL(path.startsWith('/') ? path : `/${path}`, 'https://portfolio.local');
  return url.pathname + url.search + url.hash;
}

export function mediaUrl(value) {
  const path = normalizeMediaPath(value);
  if (path.startsWith('https://')) return path;
  const url = new URL(path, 'https://portfolio.local');
  const file = resolve(publicRoot, '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(resolve(publicRoot) + sep)) throw new Error(`Keep media inside public/: ${value}`);
  let bytes;
  try { bytes = readFileSync(file); }
  catch { throw new Error(`Missing image "${value}". Add it at public${decodeURIComponent(url.pathname)} (check spelling and capitalization).`); }
  url.searchParams.set('v', createHash('sha256').update(bytes).digest('hex').slice(0, 12));
  return url.pathname + url.search + url.hash;
}

export function projectMedia(project) {
  try {
    return {
      image: mediaUrl(project.image),
      imageAlt: project.imageAlt || project.title,
      detailImage: mediaUrl(project.heroImage || project.detailImage || project.image),
      detailImageAlt: (project.heroImage ? project.heroImageAlt : project.detailImageAlt) || project.imageAlt || project.title,
      poster: mediaUrl(project.video?.poster || project.image),
      gallery: (project.gallery || []).map(item => {
        const image = typeof item === 'string' ? {src:item} : item;
        return {src:mediaUrl(image.src), alt:image.alt || project.title, caption:image.caption || ''};
      })
    };
  } catch (error) {
    throw new Error(`Project "${project.slug}": ${error.message}`);
  }
}
