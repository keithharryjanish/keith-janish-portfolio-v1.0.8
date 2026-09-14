import operation from './projects/operation-station.js';
import clockwork from './projects/clockwork-trials.js';

// Add your new project's import above, then add it to this list.
// This order controls the cards, project numbers, and Next project links.
export const projects = [operation, clockwork].map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, '0')
}));
