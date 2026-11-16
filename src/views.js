const { UI, META, LANGS, otherLang } = require("./i18n");
const { courses, getLessonIndex } = require("./courses");
const { highlight, esc } = require("./highlight");

const THEME_INIT =
  'try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}';

const LANGUAGE_LABELS = {
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  php: "PHP",
  csharp: "C#",
  blade: "Blade",
  json: "JSON",
};

const inline = (text) => esc(text).replace(/`([^`]+)`/g, "<code>$1</code>");

function layout({ lang, title, description, suffix, body, currentCourse }) {
  const t = UI[lang];
  const alt = otherLang(lang);
  const fullTitle = title ? title + " | " + t.siteName : t.siteName;
  const alternates = LANGS.map(
    (code) => '<link rel="alternate" hreflang="' + code + '" href="/' + code + suffix + '">'
  ).join("\n");
  const tabs = courses
    .map(
      (course) =>
        `<a href="/${lang}/courses/${esc(course.id)}"${course.id === currentCourse ? ' aria-current="page"' : ""}><bdi>${esc(course.title[lang])}</bdi></a>`
    )
    .join("");

  return `<!doctype html>
<html lang="${lang}" dir="${META[lang].dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || t.heroText)}">
${alternates}
<script>${THEME_INIT}</script>
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="topbar">
  <div class="bar">
    <a class="brand" href="/${lang}/">${esc(t.siteName)}</a>
    <div class="actions">
      <a class="pill" href="/${alt}${suffix}" hreflang="${alt}" lang="${alt}">${esc(META[alt].name)}</a>
      <button id="theme-toggle" class="pill" type="button" aria-label="${esc(t.toggleTheme)}">&#9680;</button>
    </div>
  </div>
  <nav class="tabs" aria-label="${esc(t.courses)}">${tabs}</nav>
</header>
<main id="main">${body}</main>
<footer class="site-footer">${esc(t.footer)}</footer>
</body>
</html>`;
}

function codeBlock(block, t) {
  const label =
    block.file || (block.lang === "bash" ? t.terminal : LANGUAGE_LABELS[block.lang] || block.lang);
  const output = block.output
    ? `<div class="output"><div class="output-label">${esc(t.output)}</div><pre>${esc(block.output)}</pre></div>`
    : "";
  return `<figure class="code" data-copy="${esc(t.copy)}" data-copied="${esc(t.copied)}">
<figcaption><bdi>${esc(label)}</bdi></figcaption>
<pre><code class="lang-${esc(block.lang)}">${highlight(block.text, block.lang)}</code></pre>${output}
</figure>`;
}

function homePage(lang) {
  const t = UI[lang];
  const cards = courses
    .map(
      (course) => `<a class="card" href="/${lang}/courses/${esc(course.id)}">
  <h3><bdi>${esc(course.title[lang])}</bdi></h3>
  <p>${esc(course.summary[lang])}</p>
  <span class="meta">${esc(t.lessonsCount(course.lessons.length))}</span>
</a>`
    )
    .join("\n");

  const body = `<section class="hero">
  <h1>${esc(t.heroTitle)}</h1>
  <p>${esc(t.heroText)}</p>
</section>
<section id="courses" class="wrap">
  <h2>${esc(t.courses)}</h2>
  <div class="grid">${cards}</div>
</section>`;

  return layout({ lang, title: "", suffix: "/", body });
}

function sidebar(lang, course, index) {
  const base = "/" + lang + "/courses/" + course.id;
  let html = "";
  let section = null;
  course.lessons.forEach((item, i) => {
    const name = item.section ? item.section[lang] : null;
    if (name && name !== section) {
      section = name;
      html += `<li class="group">${esc(name)}</li>`;
    }
    html += `<li><a href="${base}/${esc(item.id)}"${i === index ? ' aria-current="page"' : ""}>${esc(item.title[lang])}</a></li>`;
  });
  return html;
}

function lessonPage(lang, course, lessonId) {
  const t = UI[lang];
  const index = getLessonIndex(course, lessonId);
  const lesson = course.lessons[index];
  const base = "/" + lang + "/courses/" + course.id;

  const paragraphs = lesson.body[lang].map((p) => "<p>" + inline(p) + "</p>").join("\n");
  const blocks = lesson.code.map((block) => codeBlock(block, t)).join("\n");
  const tip = lesson.tip
    ? `<div class="box tip"><strong>${esc(t.tip)}</strong> ${inline(lesson.tip[lang])}</div>`
    : "";
  const exercise = lesson.exercise
    ? `<div class="box exercise"><strong>${esc(t.exercise)}</strong> ${inline(lesson.exercise[lang])}</div>`
    : "";

  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  const prevLink = prev
    ? `<a class="btn" href="${base}/${esc(prev.id)}">${lang === "ar" ? "&rarr;" : "&larr;"} ${esc(t.prev)}</a>`
    : `<span></span>`;
  const nextLink = next
    ? `<a class="btn primary" href="${base}/${esc(next.id)}">${esc(t.next)} ${lang === "ar" ? "&larr;" : "&rarr;"}</a>`
    : `<a class="btn primary" href="/${lang}/#courses">${esc(t.allCourses)}</a>`;

  const body = `<div class="layout">
  <aside class="sidebar">
    <details class="side" open>
      <summary>${esc(t.lessons)}: <bdi>${esc(course.title[lang])}</bdi></summary>
      <ul>${sidebar(lang, course, index)}</ul>
    </details>
  </aside>
  <article class="lesson">
    <p class="eyebrow"><bdi>${esc(course.title[lang])}</bdi> &middot; ${index + 1} / ${course.lessons.length}</p>
    <h1>${esc(lesson.title[lang])}</h1>
    ${paragraphs}
    ${blocks}
    ${tip}
    ${exercise}
    <div class="pager">${prevLink}${nextLink}</div>
  </article>
</div>`;

  return layout({
    lang,
    title: lesson.title[lang] + " - " + course.title[lang],
    description: lesson.body[lang][0],
    suffix: "/courses/" + course.id + "/" + lesson.id,
    body,
    currentCourse: course.id,
  });
}

function errorPage(lang, status) {
  const t = UI[lang];
  const notFound = status === 404;
  const title = notFound ? t.notFoundTitle : t.errorTitle;
  const text = notFound ? t.notFoundText : t.errorText;
  const body = `<section class="wrap center">
  <p class="code-big">${status}</p>
  <h1>${esc(title)}</h1>
  <p>${esc(text)}</p>
  <a class="btn primary" href="/${lang}/">${esc(t.backHome)}</a>
</section>`;
  return layout({ lang, title, suffix: "/", body });
}

module.exports = { homePage, lessonPage, errorPage };
