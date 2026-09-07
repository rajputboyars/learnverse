import trendingSkills from './trending-skills';
import jobMarket from './job-market';
import compareCourses from './compare-courses';
import bestResources from './best-resources';
import learningAnalysis from './learning-analysis';
import learningRoadmap from './learning-roadmap';
import explainTopic from './explain-topic';
import socialPost from './social-post';

// The prompt-template registry. Adding a quick action = add a file next to
// these and list it here; the dashboard cards, the run route and the result
// pages all read from this one list.
export const TEMPLATES = [
  trendingSkills,
  jobMarket,
  compareCourses,
  bestResources,
  learningAnalysis,
  learningRoadmap,
  explainTopic,
  socialPost,
];

export const CATEGORIES = [
  { id: 'career', label: 'Career' },
  { id: 'learning', label: 'Learning' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'create', label: 'Create' },
];

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || null;
}

/**
 * Client-safe view of a template: everything the UI needs to render a card and
 * an input form, minus the prompt text itself (which stays on the server so the
 * templates can be tuned without shipping them to every visitor).
 */
export function publicTemplate(t) {
  return {
    id: t.id,
    title: t.title,
    short: t.short,
    description: t.description,
    category: t.category,
    icon: t.icon,
    cta: t.cta,
    version: t.version,
    outputFormat: t.outputFormat,
    resultView: t.resultView,
    inputs: t.inputs,
  };
}

export function publicTemplates() {
  return TEMPLATES.filter((t) => t.status === 'active').map(publicTemplate);
}
