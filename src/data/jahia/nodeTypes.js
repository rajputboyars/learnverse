// Node Types Explorer data.
//
// There is no single, universal list of "all Jahia node types". What exists in
// a given repository depends on the Jahia version and on every module
// installed — each module can register its own types. So each entry says where
// it comes from:
//
//   jcr     — the JCR standard itself (nt:, mix:). Present in any JCR.
//   core    — Jahia core. Present in a standard Jahia 8.x install.
//   module  — provided by a module (often a default one). Present only if that
//             module is installed; name and shape may vary by version.
//   custom  — defined by your own module. The lv: types are the course project.
//
// To see what YOUR install really has: Jahia Tools → Definitions browser (or
// the Content Editor's type picker). Trust that over any list, including this.

export const NT_SCOPES = {
  jcr: { label: 'JCR standard', tone: 'bg-slate-100 text-slate-700' },
  core: { label: 'Core Jahia', tone: 'bg-indigo-50 text-indigo-700' },
  module: { label: 'Module-provided', tone: 'bg-amber-50 text-amber-700' },
  custom: { label: 'Custom (course project)', tone: 'bg-green-50 text-green-700' },
};

export const NT_CATEGORIES = [
  'Content', 'Page', 'Component', 'Media', 'File', 'Folder', 'System', 'Reference', 'Template', 'Mixin', 'Custom',
];

export const NODE_TYPES = [
  /* ── JCR standard ── */
  {
    name: 'nt:base', namespace: 'nt', category: 'System', scope: 'jcr',
    inheritance: [], mixins: [],
    properties: ['jcr:primaryType', 'jcr:mixinTypes'],
    purpose: 'The root of every node type. Every node has a primary type and a list of mixins because of it.',
    whereUsed: 'Everywhere, implicitly.',
    cms: 'Never seen directly.',
    cnd: '// every type ultimately extends nt:base',
  },
  {
    name: 'mix:referenceable', namespace: 'mix', category: 'Mixin', scope: 'jcr',
    inheritance: [], mixins: [],
    properties: ['jcr:uuid'],
    purpose: 'Gives a node a stable UUID so other nodes can reference it — the target of every weakreference.',
    whereUsed: 'Content, files, pages — anything you can point at.',
    cms: 'Invisible; it is why pickers work.',
    cnd: '[mix:referenceable] mixin\n - jcr:uuid (string) mandatory autocreated protected',
  },
  {
    name: 'mix:title', namespace: 'mix', category: 'Mixin', scope: 'jcr',
    inheritance: [], mixins: [],
    properties: ['jcr:title', 'jcr:description'],
    purpose: 'Standard title and description. Jahia reads jcr:title as the display name of a node in lists and pickers.',
    whereUsed: 'Pages, content, files.',
    cms: 'The Title field at the top of many forms.',
    cnd: '// reuse the standard name in your own types:\n - jcr:title (string) i18n mandatory',
  },
  {
    name: 'mix:created / mix:lastModified', namespace: 'mix', category: 'Mixin', scope: 'jcr',
    inheritance: [], mixins: [],
    properties: ['jcr:created', 'jcr:createdBy', 'jcr:lastModified', 'jcr:lastModifiedBy'],
    purpose: 'Who created or changed a node, and when. Maintained by the repository — protected.',
    whereUsed: 'Almost all Jahia content.',
    cms: 'Shown as metadata ("Last modified by …"), not editable.',
    cnd: '// read in a view:\n// currentNode.getProperty("jcr:lastModified").getDate()',
  },

  /* ── Core Jahia: structure ── */
  {
    name: 'jnt:virtualsite', namespace: 'jnt', category: 'System', scope: 'core',
    inheritance: ['jnt:folder'], mixins: [],
    properties: ['j:serverName', 'j:languages', 'j:defaultLanguage', 'j:mixLanguage', 'j:templatesSet', 'j:installedModules'],
    purpose: 'A site. Everything for that site lives beneath /sites/<key>.',
    whereUsed: '/sites/learnverse, /sites/learnverse-in',
    cms: 'Site settings: server name, languages, template set, modules.',
    cnd: '// /sites/learnverse   (jnt:virtualsite)',
  },
  {
    name: 'jnt:page', namespace: 'jnt', category: 'Page', scope: 'core',
    inheritance: ['jnt:content'], mixins: ['mix:title'],
    properties: ['jcr:title', 'j:templateName'],
    purpose: 'A page of the site tree. j:templateName points at the page template that lays it out.',
    whereUsed: 'home, news, about, contact…',
    cms: 'jContent → Pages; Page Composer edits it visually.',
    cnd: '// /sites/learnverse/home        (jnt:page)\n// /sites/learnverse/home/news   (jnt:page)',
  },
  {
    name: 'jnt:content', namespace: 'jnt', category: 'Content', scope: 'core',
    inheritance: ['nt:base'], mixins: ['mix:referenceable', 'mix:created', 'mix:lastModified'],
    properties: [],
    purpose: 'The base of all content types. Extend it for every type you create.',
    whereUsed: 'As the supertype of lv:article, lv:hero, jnt:text…',
    cms: 'Not created directly.',
    cnd: '[lv:article] > jnt:content, jmix:editorialContent',
  },
  {
    name: 'jnt:contentFolder', namespace: 'jnt', category: 'Folder', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['jcr:title'],
    purpose: 'A folder for content that does not belong on one page — articles, authors, categories reused across pages.',
    whereUsed: '/sites/learnverse/contents/articles',
    cms: 'jContent → Content Folders.',
    cnd: '// /sites/learnverse/contents/articles   (jnt:contentFolder)',
  },
  {
    name: 'jnt:contentList', namespace: 'jnt', category: 'Content', scope: 'core',
    inheritance: ['jnt:content'], mixins: [],
    properties: [],
    purpose: 'An ordered list of content nodes. Many "list" components are a contentList underneath.',
    whereUsed: 'Card lists, carousels.',
    cms: 'An area where authors add several items.',
    cnd: '+ items (jnt:contentList)',
  },
  {
    name: 'jnt:area', namespace: 'jnt', category: 'Template', scope: 'core',
    inheritance: ['jnt:content'], mixins: [],
    properties: [],
    purpose: 'A named drop zone in a template (header, main, sidebar). Authors drop components into areas.',
    whereUsed: 'Page templates.',
    cms: 'The "+ Add content" zones in Page Composer.',
    cnd: '// JSP: <template:area path="main"/>',
    version: 'Template/area mechanics differ between JSP and JavaScript modules',
  },
  {
    name: 'jnt:template / jnt:pageTemplate', namespace: 'jnt', category: 'Template', scope: 'core',
    inheritance: ['jnt:content'], mixins: [],
    properties: ['j:view'],
    purpose: 'Page templates defined in a template set. A page picks one by name through j:templateName.',
    whereUsed: 'Template set modules (home template, article-detail template).',
    cms: 'Template selector when creating a page.',
    cnd: '// page → j:templateName = "article-detail"',
    version: 'JavaScript modules declare templates in code instead',
  },
  {
    name: 'jnt:user', namespace: 'jnt', category: 'System', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:firstName', 'j:lastName', 'j:email'],
    purpose: 'A user account. Stored under /users (server) or /sites/<site>/users (site users).',
    whereUsed: 'Author, reviewer, editor accounts.',
    cms: 'Administration → Users.',
    cnd: '// /users/.../priya   (jnt:user)',
  },
  {
    name: 'jnt:group', namespace: 'jnt', category: 'System', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:members'],
    purpose: 'A group of users. Assign roles to groups, not individuals — people change jobs.',
    whereUsed: 'reviewers, news-authors.',
    cms: 'Administration → Groups.',
    cnd: '// /sites/learnverse/groups/reviewers   (jnt:group)',
  },
  {
    name: 'jnt:category', namespace: 'jnt', category: 'System', scope: 'core',
    inheritance: [], mixins: ['mix:title'],
    properties: ['jcr:title'],
    purpose: 'A node in the category tree. Content tagged through jmix:categorized references these.',
    whereUsed: 'Technology, Business, Sports…',
    cms: 'Category manager; category picker in the editor.',
    cnd: '// /sites/systemsite/categories/technology   (jnt:category)',
    version: 'Category storage location varies by version',
  },

  /* ── Core Jahia: files & media ── */
  {
    name: 'jnt:file', namespace: 'jnt', category: 'File', scope: 'core',
    inheritance: [], mixins: ['mix:referenceable'],
    properties: ['jcr:content → jcr:data (binary)', 'jcr:content → jcr:mimeType'],
    purpose: 'Any uploaded file: image, PDF, video, audio, zip. The bytes live in its jcr:content child.',
    whereUsed: '/sites/learnverse/files/images/hero.jpg',
    cms: 'jContent → Media.',
    cnd: '// URL: /files/live/sites/learnverse/files/images/hero.jpg',
  },
  {
    name: 'jnt:folder', namespace: 'jnt', category: 'Folder', scope: 'core',
    inheritance: [], mixins: [],
    properties: [],
    purpose: 'A folder of files in the media library.',
    whereUsed: '/sites/learnverse/files/images',
    cms: 'Folders in jContent → Media.',
    cnd: '// /sites/learnverse/files   (jnt:folder)',
  },
  {
    name: 'jmix:image', namespace: 'jmix', category: 'Media', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:width', 'j:height'],
    purpose: 'Added to files Jahia recognises as images. Constrain image pickers to it so authors cannot pick a PDF.',
    whereUsed: "< 'jmix:image' on image references",
    cms: 'Image files show thumbnails and dimensions.',
    cnd: "- image (weakreference, picker[type='image']) < 'jmix:image'",
  },

  /* ── Core Jahia: component mixins ── */
  {
    name: 'jmix:droppableContent', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: [], mixins: [],
    properties: [],
    purpose: 'Marks a type as something authors can drop into an area. The category mixins below extend it.',
    whereUsed: 'Indirectly through editorialContent etc.',
    cms: 'Type appears in "New content".',
    cnd: '[lv:hero] > jnt:content, jmix:droppableContent',
  },
  {
    name: 'jmix:editorialContent', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: ['jmix:droppableContent'], mixins: [],
    properties: [],
    purpose: 'Places a type in the editorial group of the type picker.',
    whereUsed: 'Articles, heroes, rich text.',
    cms: '"Editorial content" group.',
    cnd: '[lv:article] > jnt:content, jmix:editorialContent',
  },
  {
    name: 'jmix:structuredContent', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: ['jmix:droppableContent'], mixins: [],
    properties: [],
    purpose: 'Group for structured content (entities with fields rather than page blocks).',
    whereUsed: 'Authors, products.',
    cms: '"Structured content" group.',
    cnd: '[lv:author] > jnt:content, jmix:structuredContent',
  },
  {
    name: 'jmix:multimediaContent', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: ['jmix:droppableContent'], mixins: [],
    properties: [],
    purpose: 'Group for media components.',
    whereUsed: 'Video, gallery.',
    cms: '"Multimedia" group.',
    cnd: '[lv:video] > jnt:content, jmix:multimediaContent',
  },
  {
    name: 'jmix:categorized', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:defaultCategory (weakreference, multiple)'],
    purpose: 'Category support.',
    whereUsed: 'lv:article',
    cms: 'Category picker.',
    cnd: '[lv:article] > jnt:content, jmix:categorized',
  },
  {
    name: 'jmix:tagged', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:tagList (string, multiple)'],
    purpose: 'Free-form tags.',
    whereUsed: 'lv:article',
    cms: 'Tag input.',
    cnd: '[lv:article] > jnt:content, jmix:tagged',
  },
  {
    name: 'jmix:cache', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: [], mixins: [],
    properties: ['j:expiration', 'j:perUser'],
    purpose: 'Per-node cache options — expiration, per-user caching.',
    whereUsed: 'Components whose output changes over time.',
    cms: 'Cache options section on components (if exposed).',
    cnd: '// usually set on views via cache.* view properties instead',
    version: 'Exposure in the editor varies',
  },
  {
    name: 'jmix:hiddenType', namespace: 'jmix', category: 'Mixin', scope: 'core',
    inheritance: [], mixins: [],
    properties: [],
    purpose: 'Hides a type from the "New content" picker — for child types only created through a parent.',
    whereUsed: 'lv:galleryItem',
    cms: 'Type does not appear in the picker.',
    cnd: '[lv:galleryItem] > jnt:content, jmix:hiddenType',
  },

  /* ── Module-provided (default module) ── */
  {
    name: 'jnt:text', namespace: 'jnt', category: 'Component', scope: 'module',
    inheritance: ['jnt:content'], mixins: ['jmix:basicContent'],
    properties: ['text (string, i18n)'],
    purpose: 'The simple text component.',
    whereUsed: 'Short text blocks.',
    cms: 'Text field.',
    cnd: '// from the default components module',
    version: 'Provided by the default module; shape may vary',
  },
  {
    name: 'jnt:bigText', namespace: 'jnt', category: 'Component', scope: 'module',
    inheritance: ['jnt:content'], mixins: ['jmix:basicContent'],
    properties: ['text (string, richtext, i18n)'],
    purpose: 'Rich text component — the one authors reach for most.',
    whereUsed: 'Body copy on pages.',
    cms: 'Rich text editor.',
    cnd: '// from the default components module',
    version: 'Provided by the default module; shape may vary',
  },
  {
    name: 'jnt:imageReference', namespace: 'jnt', category: 'Reference', scope: 'module',
    inheritance: ['jnt:content'], mixins: [],
    properties: ['j:node (weakreference → image)'],
    purpose: 'Places an existing image from Media onto a page.',
    whereUsed: 'Standalone images in content areas.',
    cms: 'Image picker.',
    cnd: '// from the default module',
    version: 'Name and properties depend on version',
  },
  {
    name: 'jnt:nodeLink / jnt:externalLink', namespace: 'jnt', category: 'Reference', scope: 'module',
    inheritance: ['jnt:content'], mixins: [],
    properties: ['j:node (weakreference) / j:url (string)'],
    purpose: 'Internal link to a node, or external URL link.',
    whereUsed: 'Menus, link lists.',
    cms: 'Page picker / URL field.',
    cnd: '// from the default module',
    version: 'Name and properties depend on version',
  },
  {
    name: 'Third-party module types', namespace: '—', category: 'Component', scope: 'module',
    inheritance: [], mixins: [],
    properties: ['Defined by that module'],
    purpose: 'Forms, personalisation, search, SEO and other modules add their own node types and mixins when installed — and they vanish when uninstalled.',
    whereUsed: 'Depends on your install.',
    cms: 'New entries in the type picker after the module is enabled.',
    cnd: '// check: Jahia Tools → Definitions browser',
    version: 'Install-specific',
  },

  /* ── Custom: the Learnverse News Portal ── */
  {
    name: 'lv:article', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:editorialContent', 'jmix:categorized', 'jmix:tagged'],
    properties: ['jcr:title', 'summary', 'body', 'image', 'author', 'publishedDate', 'related', 'isFeatured'],
    purpose: 'A news article — the centre of the course project.',
    whereUsed: '/sites/learnverse/contents/articles/*',
    cms: 'New content → Article.',
    cnd: "[lv:article] > jnt:content, jmix:editorialContent, jmix:categorized, jmix:tagged\n - jcr:title (string) i18n mandatory\n - summary (string, textarea) i18n\n - body (string, richtext) i18n\n - image (weakreference, picker[type='image']) < 'jmix:image'\n - author (weakreference) < 'lv:author'\n - publishedDate (date, datepicker)\n - related (weakreference) multiple < 'lv:article'\n - isFeatured (boolean) = false autocreated",
  },
  {
    name: 'lv:author', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:structuredContent'],
    properties: ['name', 'role', 'photo', 'bio'],
    purpose: 'An author, referenced by articles.',
    whereUsed: '/sites/learnverse/contents/authors/*',
    cms: 'New content → Author.',
    cnd: "[lv:author] > jnt:content, jmix:structuredContent\n - name (string) mandatory\n - role (string) i18n\n - photo (weakreference, picker[type='image']) < 'jmix:image'\n - bio (string, textarea) i18n",
  },
  {
    name: 'lv:hero', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:editorialContent'],
    properties: ['heading', 'subheading', 'background', 'cta'],
    purpose: 'Homepage hero banner.',
    whereUsed: 'Home page, main area.',
    cms: 'New content → Hero.',
    cnd: "[lv:hero] > jnt:content, jmix:editorialContent\n - heading (string) i18n mandatory\n - subheading (string, textarea) i18n\n - background (weakreference, picker[type='image']) < 'jmix:image'\n - ctaLabel (string) i18n\n - ctaTarget (weakreference, picker[type='page']) < 'jnt:page'",
  },
  {
    name: 'lv:video', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:multimediaContent'],
    properties: ['jcr:title', 'file', 'poster', 'externalUrl'],
    purpose: 'A video — an uploaded file or an external URL.',
    whereUsed: 'Article pages, home.',
    cms: 'New content → Video.',
    cnd: "[lv:video] > jnt:content, jmix:multimediaContent\n - jcr:title (string) i18n\n - file (weakreference, picker[type='file']) < 'jnt:file'\n - poster (weakreference, picker[type='image']) < 'jmix:image'\n - externalUrl (string)",
  },
  {
    name: 'lv:gallery', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:multimediaContent'],
    properties: ['jcr:title', '+ * (lv:galleryItem)'],
    purpose: 'An ordered set of images with captions.',
    whereUsed: 'Article pages.',
    cms: 'New content → Gallery, then add items.',
    cnd: "[lv:gallery] > jnt:content, jmix:multimediaContent orderable\n - jcr:title (string) i18n\n + * (lv:galleryItem)",
  },
  {
    name: 'lv:category', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:structuredContent'],
    properties: ['jcr:title', 'color', 'description'],
    purpose: 'Optional: a content-managed category when the core category tree is not enough (e.g. categories needing an image and colour).',
    whereUsed: '/sites/learnverse/contents/categories/*',
    cms: 'New content → Category.',
    cnd: "[lv:category] > jnt:content, jmix:structuredContent\n - jcr:title (string) i18n mandatory\n - description (string, textarea) i18n\n - accent (string, choicelist) < 'indigo', 'green', 'amber'",
  },
  {
    name: 'lv:cta', namespace: 'lv', category: 'Custom', scope: 'custom',
    inheritance: ['jnt:content'], mixins: ['jmix:editorialContent'],
    properties: ['label', 'target', 'style'],
    purpose: 'Call-to-action button block.',
    whereUsed: 'End of articles, home.',
    cms: 'New content → CTA.',
    cnd: "[lv:cta] > jnt:content, jmix:editorialContent\n - label (string) i18n mandatory\n - target (weakreference, picker[type='page']) < 'jnt:page'\n - style (string, choicelist) = 'primary' autocreated < 'primary', 'secondary'",
  },
];

/** Anchor id for a node type in the explorer (#nt-jnt-page). */
export function ntAnchor(name) {
  return `nt-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}
