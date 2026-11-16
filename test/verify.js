const assert = require("node:assert/strict");
const { courses } = require("../src/courses");
const views = require("../src/views");
const { LANGS, META } = require("../src/i18n");

function checkHtml(html, lang, label) {
  assert.ok(html.startsWith("<!doctype html>"), label + ": doctype");
  assert.ok(html.includes('<html lang="' + lang + '" dir="' + META[lang].dir + '"'), label + ": lang and dir");
  const prose = html.replace(/<pre[\s\S]*?<\/pre>/g, "").replace(/<code[\s\S]*?<\/code>/g, "").replace(/<meta name="description"[^>]*>/, "");
  assert.ok(!prose.includes("undefined"), label + ": template printed undefined");
  assert.ok(!html.includes("[object Object]"), label + ": contains object text");
}

function verifyRendering() {
  assert.equal(courses.length, 12, "expected twelve courses");
  let pages = 0;
  for (const lang of LANGS) {
    checkHtml(views.homePage(lang), lang, "home " + lang);
    checkHtml(views.errorPage(lang, 404), lang, "404 " + lang);
    checkHtml(views.errorPage(lang, 500), lang, "500 " + lang);
    pages += 3;
    for (const course of courses) {
      for (const lesson of course.lessons) {
        const html = views.lessonPage(lang, course, lesson.id);
        checkHtml(html, lang, course.id + "/" + lesson.id + " " + lang);
        assert.ok(html.includes("<pre>"), lesson.id + ": code block");
        assert.ok(html.includes('class="tk-'), lesson.id + ": syntax highlighting");
        pages += 1;
      }
    }
  }
  console.log("Rendered " + pages + " pages in both languages: OK");
}

async function verifyHttp() {
  try {
    require.resolve("express");
  } catch (error) {
    console.log("express is not installed, skipping HTTP checks (run npm install)");
    return;
  }

  const { createApp } = require("../src/app");
  const app = createApp({
    beforeFallbacks(instance) {
      instance.get("/boom", () => {
        throw new Error("test error");
      });
    },
  });
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const base = "http://127.0.0.1:" + server.address().port;
  const originalError = console.error;
  console.error = () => {};

  try {
    const root = await fetch(base + "/", { redirect: "manual" });
    assert.equal(root.status, 302);
    assert.match(root.headers.get("location"), /^\/(ar|en)\/$/);

    for (const lang of LANGS) {
      for (const course of courses) {
        const courseRes = await fetch(base + "/" + lang + "/courses/" + course.id, { redirect: "manual" });
        assert.equal(courseRes.status, 302);
        assert.equal(
          courseRes.headers.get("location"),
          "/" + lang + "/courses/" + course.id + "/" + course.lessons[0].id
        );
        for (const lesson of course.lessons) {
          const res = await fetch(base + "/" + lang + "/courses/" + course.id + "/" + lesson.id);
          assert.equal(res.status, 200);
        }
      }
    }

    const missingCourse = await fetch(base + "/en/courses/nope");
    assert.equal(missingCourse.status, 404);
    const missingLang = await fetch(base + "/fr/");
    assert.equal(missingLang.status, 404);
    const failure = await fetch(base + "/boom");
    assert.equal(failure.status, 500);
    console.log("HTTP checks (200, 302, 404, 500): OK");
  } finally {
    console.error = originalError;
    server.close();
  }
}

(async () => {
  verifyRendering();
  await verifyHttp();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
