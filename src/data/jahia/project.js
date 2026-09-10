// The Learnverse News Portal — the project the whole Jahia course builds.
//
// PHASES maps the 17 build steps onto the lessons that teach them, so the
// project board can show where each step is covered and tick it off from real
// course progress (a phase is done when its lesson is marked done).

export const PROJECT = {
  name: 'Learnverse News Portal — Jahia Edition',
  module: 'lv-news',
  namespace: 'lv',
  sites: ['learnverse.com', 'learnverse.in'],
  pages: ['Home', 'News', 'Article Details', 'Categories', 'About', 'Contact'],
  components: ['Hero', 'Article Card', 'Article List', 'Image', 'Video', 'Rich Text', 'CTA', 'Author', 'Category', 'Related Articles', 'Newsletter'],
  types: ['lv:article', 'lv:author', 'lv:category', 'lv:hero', 'lv:cta', 'lv:video', 'lv:gallery'],
};

export const PHASES = [
  { n: 1, title: 'Create the module', detail: 'Scaffold lv-news and deploy it empty.', lesson: 'Project — Create the lv-news Module and Namespace' },
  { n: 2, title: 'Create the namespace', detail: "<lv = 'http://learnverse.dev/jahia/nt/1.0'>", lesson: 'Project — Create the lv-news Module and Namespace' },
  { n: 3, title: 'First node type', detail: '[lv:article] > jnt:content, jmix:editorialContent', lesson: 'Project — Build lv:article Field by Field' },
  { n: 4, title: 'Add title', detail: '- jcr:title (string) i18n mandatory', lesson: 'Project — Build lv:article Field by Field' },
  { n: 5, title: 'Add description', detail: '- summary (string, textarea) i18n', lesson: 'Project — Build lv:article Field by Field' },
  { n: 6, title: 'Add image reference', detail: "- image (weakreference, picker[type='image']) < 'jmix:image'", lesson: 'Project — Build lv:article Field by Field' },
  { n: 7, title: 'Add rich text', detail: '- body (string, richtext) i18n', lesson: 'Project — Build lv:article Field by Field' },
  { n: 8, title: 'Add category', detail: '+ jmix:categorized', lesson: 'Project — Build lv:article Field by Field' },
  { n: 9, title: 'Add author', detail: "- author (weakreference) < 'lv:author'", lesson: 'Project — Build lv:article Field by Field' },
  { n: 10, title: 'Create the component', detail: 'Make lv:article droppable and labelled.', lesson: 'Project — The Article Card Component' },
  { n: 11, title: 'Create the view', detail: 'Default view + card view.', lesson: 'Project — The Article Card Component' },
  { n: 12, title: 'Deploy', detail: 'Build and deploy lv-news.', lesson: 'Project — Deploy, Author, Publish, Render' },
  { n: 13, title: 'Open Jahia', detail: 'Log in, open the site in jContent.', lesson: 'Project — Deploy, Author, Publish, Render' },
  { n: 14, title: 'Enable the component', detail: 'Enable lv-news on the site.', lesson: 'Project — Deploy, Author, Publish, Render' },
  { n: 15, title: 'Author content', detail: 'Create an author and two articles.', lesson: 'Project — Deploy, Author, Publish, Render' },
  { n: 16, title: 'Publish', detail: 'Publish articles, images and the page.', lesson: 'Project — Deploy, Author, Publish, Render' },
  { n: 17, title: 'Render on the frontend', detail: 'Server view + a GraphQL-fed React card.', lesson: 'Query Articles for a React Card' },
];

// Interactive data model: click an entity to see its fields; reference fields
// link to another entity.
export const DATA_MODEL = [
  {
    id: 'article', label: 'ARTICLE', type: 'lv:article',
    fields: [
      { name: 'jcr:title', type: 'string i18n mandatory', cms: 'Text input' },
      { name: 'summary', type: 'string, textarea i18n', cms: 'Text area' },
      { name: 'image', type: 'weakreference → jmix:image', cms: 'Image picker', ref: 'media' },
      { name: 'body', type: 'string, richtext i18n', cms: 'Rich text editor' },
      { name: 'author', type: 'weakreference → lv:author', cms: 'Content picker', ref: 'author' },
      { name: 'j:defaultCategory', type: 'via jmix:categorized', cms: 'Category picker', ref: 'category' },
      { name: 'related', type: 'weakreference multiple → lv:article', cms: 'Content picker (many)', ref: 'article' },
      { name: 'publishedDate', type: 'date, datepicker', cms: 'Date picker' },
      { name: 'isFeatured', type: 'boolean = false', cms: 'Checkbox' },
    ],
  },
  {
    id: 'author', label: 'AUTHOR', type: 'lv:author',
    fields: [
      { name: 'name', type: 'string mandatory', cms: 'Text input' },
      { name: 'role', type: 'string i18n', cms: 'Text input' },
      { name: 'photo', type: 'weakreference → jmix:image', cms: 'Image picker', ref: 'media' },
      { name: 'bio', type: 'string, textarea i18n', cms: 'Text area' },
    ],
  },
  {
    id: 'category', label: 'CATEGORY', type: 'jnt:category (core tree)',
    fields: [
      { name: 'jcr:title', type: 'string i18n', cms: 'Title in category manager' },
    ],
  },
  {
    id: 'media', label: 'IMAGE FILE', type: 'jnt:file + jmix:image',
    fields: [
      { name: 'jcr:content/jcr:data', type: 'binary', cms: 'Uploaded in Media' },
      { name: 'j:width / j:height', type: 'long', cms: 'Shown in media details' },
    ],
  },
  {
    id: 'video', label: 'VIDEO', type: 'lv:video',
    fields: [
      { name: 'jcr:title', type: 'string i18n', cms: 'Text input' },
      { name: 'file', type: 'weakreference → jnt:file', cms: 'File picker', ref: 'media' },
      { name: 'poster', type: 'weakreference → jmix:image', cms: 'Image picker', ref: 'media' },
      { name: 'externalUrl', type: 'string', cms: 'Text input' },
    ],
  },
  {
    id: 'gallery', label: 'GALLERY', type: 'lv:gallery',
    fields: [
      { name: 'jcr:title', type: 'string i18n', cms: 'Text input' },
      { name: '+ * (lv:galleryItem)', type: 'child nodes, orderable', cms: 'List of items' },
    ],
  },
  {
    id: 'hero', label: 'HERO', type: 'lv:hero',
    fields: [
      { name: 'heading', type: 'string i18n mandatory', cms: 'Text input' },
      { name: 'background', type: 'weakreference → jmix:image', cms: 'Image picker', ref: 'media' },
      { name: 'ctaTarget', type: 'weakreference → jnt:page', cms: 'Page picker' },
    ],
  },
];

export const MINI_PROJECTS = [
  {
    id: 'employee-directory', title: 'Employee Directory', level: 'Beginner', minutes: 60,
    goal: 'One type, one list view. Practises string, image and choicelist.',
    types: "[lv:employee] > jnt:content, jmix:structuredContent\n - name (string) mandatory\n - jobTitle (string) i18n\n - photo (weakreference, picker[type='image']) < 'jmix:image'\n - department (string, choicelist) < 'engineering', 'design', 'sales'",
    steps: ['Define lv:employee', 'Default view as a card', 'Content folder "people" with 5 employees', 'A page listing them', 'Publish'],
  },
  {
    id: 'blog', title: 'Blog', level: 'Beginner', minutes: 90,
    goal: 'Rich text, dates, tags and a detail page.',
    types: "[lv:post] > jnt:content, jmix:editorialContent, jmix:tagged\n - jcr:title (string) i18n mandatory\n - body (string, richtext) i18n\n - publishedDate (date, datepicker)",
    steps: ['Define lv:post', 'Card view + full view', 'Three posts with tags', 'Blog listing page', 'Publish and check the live URL'],
  },
  {
    id: 'news-portal', title: 'News Portal (starter)', level: 'Intermediate', minutes: 120,
    goal: 'References between types: article → author, article → category.',
    types: "[lv:article] > jnt:content, jmix:editorialContent, jmix:categorized\n - jcr:title (string) i18n mandatory\n - author (weakreference) < 'lv:author'",
    steps: ['Define lv:author and lv:article', 'Author reference in the view', 'Category listing page', 'GraphQL query for the latest five'],
  },
  {
    id: 'media-library', title: 'Media Library', level: 'Intermediate', minutes: 90,
    goal: 'Images, videos and PDFs, with galleries and child nodes.',
    types: "[lv:gallery] > jnt:content, jmix:multimediaContent orderable\n + * (lv:galleryItem)\n\n[lv:galleryItem] > jnt:content, jmix:hiddenType\n - image (weakreference, picker[type='image']) < 'jmix:image'\n - caption (string) i18n",
    steps: ['Media folders for images, videos, documents', 'Gallery with orderable items', 'Video component with poster', 'PDF download block'],
  },
  {
    id: 'product-catalog', title: 'Product Catalog', level: 'Advanced', minutes: 150,
    goal: 'Numbers, constraints, filtering and pagination over GraphQL.',
    types: "[lv:product] > jnt:content, jmix:editorialContent, jmix:categorized\n - jcr:title (string) i18n mandatory\n - price (decimal) mandatory\n - rating (double) < '[0, 5]'\n - isAvailable (boolean) = true autocreated",
    steps: ['Define lv:product', 'Twenty products across three categories', 'GraphQL: filter by category, paginate 6 per page', 'Cache the list, invalidate on publish'],
  },
];

export const FINAL_REQUIREMENTS = [
  { group: 'Content types', items: ['lv:article', 'lv:author', 'lv:category or core categories', 'lv:video', 'lv:gallery', 'lv:hero', 'lv:cta'] },
  { group: 'Pages', items: ['Home', 'News', 'Article Details', 'Categories', 'About', 'Contact'] },
  {
    group: 'Features',
    items: ['CMS authoring for every type', 'Images', 'Videos', 'Rich text', 'References (author, related)', 'Categories', 'Authors', 'Search', 'English + Hindi', 'Review workflow', 'Roles for 5 users', 'GraphQL-fed React card', 'Cache dependencies declared', 'Responsive frontend'],
  },
];
