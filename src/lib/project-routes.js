export function projectRoutes(projects) {
  const seen = new Set();
  return projects.map(project => {
    const slug = project.slug;
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error('Each project needs a slug such as "my-new-game".');
    }
    if (seen.has(slug)) throw new Error(`Duplicate project slug: ${slug}`);
    seen.add(slug);
    return `/projects/${slug}/`;
  });
}
