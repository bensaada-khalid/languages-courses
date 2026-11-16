const path = require("node:path");
const express = require("express");
const { getCourse, getLessonIndex } = require("./courses");
const { LANGS, DEFAULT_LANG, isLang } = require("./i18n");
const views = require("./views");

function preferredLang(req) {
  return req.acceptsLanguages("en", "ar") || DEFAULT_LANG;
}

function langOf(req) {
  const first = req.path.split("/")[1];
  return isLang(first) ? first : preferredLang(req);
}

function createPages() {
  const pages = express.Router({ mergeParams: true });

  pages.get("/", (req, res) => {
    res.send(views.homePage(req.params.lang));
  });

  pages.get("/courses/:course", (req, res, next) => {
    const course = getCourse(req.params.course);
    if (!course) return next();
    res.redirect(302, "/" + req.params.lang + "/courses/" + course.id + "/" + course.lessons[0].id);
  });

  pages.get("/courses/:course/:lesson", (req, res, next) => {
    const course = getCourse(req.params.course);
    if (!course || getLessonIndex(course, req.params.lesson) === -1) return next();
    res.send(views.lessonPage(req.params.lang, course, req.params.lesson));
  });

  return pages;
}

function createApp({ beforeFallbacks } = {}) {
  const app = express();
  const pages = createPages();

  app.disable("x-powered-by");
  app.use(express.static(path.join(__dirname, "..", "public"), { maxAge: "1h" }));

  app.get("/", (req, res) => {
    res.redirect(302, "/" + preferredLang(req) + "/");
  });

  app.use("/:lang", (req, res, next) => {
    if (!isLang(req.params.lang)) return next();
    pages(req, res, next);
  });

  if (beforeFallbacks) beforeFallbacks(app);

  app.use((req, res) => {
    res.status(404).send(views.errorPage(langOf(req), 404));
  });

  app.use((error, req, res, next) => {
    console.error(error);
    if (res.headersSent) return next(error);
    res.status(500).send(views.errorPage(langOf(req), 500));
  });

  return app;
}

module.exports = { createApp, LANGS };
