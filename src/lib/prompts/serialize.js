import { extractVariables } from './variables';

/**
 * The shape of a prompt as the browser sees it in listings. The body is left
 * out on purpose — cards do not need it, and the detail route adds it back.
 */
export function publicPrompt(p, { saved = false } = {}) {
  return {
    id: p._id.toString(),
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags,
    difficulty: p.difficulty,
    providers: p.providers,
    origin: p.origin,
    authorName: p.authorName,
    status: p.status,
    usageCount: p.usageCount,
    saveCount: p.saveCount,
    rating: p.ratingCount ? Number((p.ratingSum / p.ratingCount).toFixed(1)) : 0,
    ratingCount: p.ratingCount,
    variables: extractVariables(p.content),
    updatedAt: p.updatedAt,
    saved,
  };
}
