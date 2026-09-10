// Light, dependency-free syntax colouring for the file view of CodeBlock.
//
// Not a parser — a single regex pass per line that picks out comments,
// strings, keywords and a few language-specific shapes (CND node type
// brackets, GraphQL variables, JSX tags). Good enough to make a
// definitions.cnd or a GraphQL query readable at a glance, which is the job.

const KEYWORDS = {
  javascript:
    'import|from|export|default|const|let|var|function|return|async|await|if|else|for|of|in|new|try|catch|throw|class|extends|typeof|null|undefined|true|false',
  cnd:
    'mandatory|multiple|i18n|internationalized|hidden|protected|autocreated|mixin|orderable|abstract|noquery|indexed|extends|itemtype|nofulltext|primary|queryops',
  graphql: 'query|mutation|fragment|on|true|false|null',
  bash: 'mvn|docker|yarn|npm|npx|git|curl|cd|ls|compose|run|install|deploy',
  xml: '',
  properties: '',
  text: '',
};
KEYWORDS.jsx = KEYWORDS.javascript;
KEYWORDS.tsx = KEYWORDS.javascript;
KEYWORDS.typescript = KEYWORDS.javascript;
KEYWORDS.jsp = KEYWORDS.javascript;

const CND_TYPES =
  'string|long|double|decimal|boolean|date|weakreference|reference|binary|uri|name|path|richtext|textarea|choicelist|picker|datepicker|datetimepicker|color|category|resourceBundle';

const HASH_COMMENT = new Set(['graphql', 'bash', 'properties', 'yaml', 'text', 'dockerfile']);
const SLASH_COMMENT = new Set(['javascript', 'jsx', 'tsx', 'typescript', 'cnd', 'jsp', 'java']);

function patternFor(language) {
  const parts = [];
  if (SLASH_COMMENT.has(language)) parts.push('(?<comment>\\/\\/.*$|\\/\\*.*?\\*\\/)');
  if (HASH_COMMENT.has(language)) parts.push('(?<comment2>#.*$)');
  if (language === 'xml' || language === 'jsp' || language === 'html') parts.push('(?<comment3><!--.*?-->)');
  parts.push('(?<string>\'[^\']*\'|"[^"]*"|`[^`]*`)');
  if (language === 'cnd') {
    parts.push('(?<nodetype>\\[[a-zA-Z0-9]+:[a-zA-Z0-9_]+\\])');
    parts.push('(?<ns><[a-z]+\\s*=)');
    parts.push(`(?<type>\\b(?:${CND_TYPES})\\b)`);
    parts.push('(?<punct>^\\s*[-+]\\s)');
  }
  if (language === 'graphql') parts.push('(?<variable>\\$[A-Za-z_]+)');
  if (['jsx', 'tsx', 'javascript', 'jsp', 'xml', 'html'].includes(language)) {
    parts.push('(?<tag><\\/?[A-Za-z][A-Za-z0-9:.-]*|\\/?>)');
  }
  if (language === 'properties') parts.push('(?<key>^[^=#]+(?==))');
  const kw = KEYWORDS[language];
  if (kw) parts.push(`(?<keyword>\\b(?:${kw})\\b)`);
  return new RegExp(parts.join('|'), 'g');
}

const CACHE = new Map();
function regexFor(language) {
  if (!CACHE.has(language)) CACHE.set(language, patternFor(language));
  const rx = CACHE.get(language);
  rx.lastIndex = 0;
  return rx;
}

const TONE = {
  comment: 'text-slate-500 italic',
  comment2: 'text-slate-500 italic',
  comment3: 'text-slate-500 italic',
  string: 'text-emerald-300',
  nodetype: 'text-sky-300 font-semibold',
  ns: 'text-violet-300',
  type: 'text-amber-300',
  punct: 'text-slate-500',
  variable: 'text-orange-300',
  tag: 'text-sky-300',
  key: 'text-sky-300',
  keyword: 'text-violet-300',
};

/** One line of code, split into coloured spans. */
export function highlightLine(line, language = 'text') {
  if (!line) return ' ';
  const rx = regexFor(language);
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  while ((m = rx.exec(line)) !== null) {
    if (m[0] === '') {
      rx.lastIndex += 1;
      continue;
    }
    if (m.index > last) out.push(line.slice(last, m.index));
    const group = Object.keys(m.groups).find((g) => m.groups[g] !== undefined);
    out.push(
      <span key={k++} className={TONE[group] || ''}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}
