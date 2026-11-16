const esc = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const words = (text) => new Set(text.split(/\s+/).filter(Boolean));

const COMMENTS = {
  slash: /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
  hash: /#[^\n]*/,
  both: /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\//,
  none: /(?!)/,
};

const STRING = /"""[\s\S]*?"""|\$?"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/;
const NUMBER = /\b\d+(?:\.\d+)?\w*\b/;
const DECORATOR = /@[A-Za-z_]\w*/;
const VARIABLE = /\$[A-Za-z_]\w*/;
const IDENT = /[A-Za-z_]\w*/;
const INCLUDE_HEADER = /(?<=#include\s*)<[^>\n]+>/;
const PREPROCESSOR = /#\s*\w+/;

const SPECS = {
  js: {
    comment: COMMENTS.slash,
    decorators: true,
    keywords: words(
      "const let var function return if else for while do switch case break continue import from export default async await new class extends try catch finally throw true false null undefined typeof instanceof of in this require interface implements constructor private public protected readonly static type enum"
    ),
  },
  python: {
    comment: COMMENTS.hash,
    decorators: true,
    keywords: words(
      "def class return if elif else for while in import from as with try except finally raise lambda True False None pass not and or is yield async await"
    ),
  },
  java: {
    comment: COMMENTS.slash,
    decorators: true,
    keywords: words(
      "public private protected class interface extends implements static final void new return if else for while import package record var int long double float boolean char true false null this throws try catch throw"
    ),
  },
  cpp: {
    comment: COMMENTS.slash,
    preprocessor: true,
    keywords: words(
      "int double float char bool void auto const class struct public private protected return if else for while using namespace new delete true false nullptr static virtual override template typename"
    ),
  },
  php: {
    comment: COMMENTS.both,
    variables: true,
    decorators: true,
    keywords: words(
      "function return if else foreach for while as class public private protected static new use namespace extends implements fn echo true false null array"
    ),
  },
  csharp: {
    comment: COMMENTS.slash,
    keywords: words(
      "using namespace class public private static void var new return if else foreach for while in async await record string int bool double decimal true false null is readonly get set"
    ),
  },
  bash: {
    comment: COMMENTS.hash,
    keywords: words(
      "npm npx node nest composer php dotnet java javac python python3 pip mvn cd mkdir"
    ),
  },
  json: { comment: COMMENTS.none, keywords: words("true false null") },
};

const ALIASES = {
  javascript: "js",
  jsx: "js",
  ts: "js",
  typescript: "js",
  py: "python",
  "c++": "cpp",
  "c#": "csharp",
  cs: "csharp",
  sh: "bash",
  shell: "bash",
};

const cache = new Map();

function buildSource(spec) {
  const parts = [];
  if (spec.preprocessor) {
    parts.push("(?<header>" + INCLUDE_HEADER.source + ")");
  }
  parts.push("(?<comment>" + spec.comment.source + ")");
  parts.push("(?<string>" + STRING.source + ")");
  if (spec.preprocessor) parts.push("(?<pre>" + PREPROCESSOR.source + ")");
  parts.push("(?<number>" + NUMBER.source + ")");
  if (spec.decorators) parts.push("(?<decorator>" + DECORATOR.source + ")");
  if (spec.variables) parts.push("(?<variable>" + VARIABLE.source + ")");
  parts.push("(?<ident>" + IDENT.source + ")");
  return parts.join("|");
}

function wrap(kind, text) {
  return '<span class="tk-' + kind + '">' + esc(text) + "</span>";
}

function highlight(code, language) {
  const name = ALIASES[language] || language;
  const spec = SPECS[name];
  if (!spec) return esc(code);

  if (!cache.has(name)) cache.set(name, buildSource(spec));
  const regex = new RegExp(cache.get(name), "g");

  let output = "";
  let last = 0;

  for (const match of code.matchAll(regex)) {
    output += esc(code.slice(last, match.index));
    const text = match[0];
    const groups = match.groups;
    last = match.index + text.length;

    if (groups.comment) output += wrap("com", text);
    else if (groups.string || groups.header) output += wrap("str", text);
    else if (groups.pre) output += wrap("kw", text);
    else if (groups.decorator) output += wrap("dec", text);
    else if (groups.number) output += wrap("num", text);
    else if (groups.variable) output += wrap("var", text);
    else if (spec.keywords.has(text)) output += wrap("kw", text);
    else if (code[last] === "(") output += wrap("fn", text);
    else if (/^[A-Z]/.test(text) && text.length > 1) output += wrap("type", text);
    else output += esc(text);
  }

  return output + esc(code.slice(last));
}

module.exports = { highlight, esc };
