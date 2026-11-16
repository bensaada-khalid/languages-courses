const fs = require("node:fs");
const path = require("node:path");
const { LANGS } = require("./i18n");

const COURSES_DIR = path.join(__dirname, "..", "data", "courses");

function assertText(value, where) {
  for (const lang of LANGS) {
    const text = value && value[lang];
    if (typeof text !== "string" || !text.trim()) {
      throw new Error("Missing " + lang + " text at " + where);
    }
  }
}

function validateLesson(lesson, where) {
  if (!lesson.id) throw new Error("Lesson without id in " + where);
  assertText(lesson.title, where + " title");
  for (const lang of LANGS) {
    const paragraphs = lesson.body && lesson.body[lang];
    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      throw new Error("Missing " + lang + " body at " + where);
    }
  }
  if (lesson.section) assertText(lesson.section, where + " section");
  if (lesson.exercise) assertText(lesson.exercise, where + " exercise");
  if (lesson.tip) assertText(lesson.tip, where + " tip");
  if (!Array.isArray(lesson.code) || lesson.code.length === 0) {
    throw new Error("Missing code at " + where);
  }
  for (const block of lesson.code) {
    if (!block.lang || !block.text) throw new Error("Bad code block at " + where);
  }
}

function validateCourse(course, file) {
  for (const key of ["id", "badge", "color"]) {
    if (!course[key]) throw new Error("Missing " + key + " in " + file);
  }
  assertText(course.title, file + " title");
  assertText(course.summary, file + " summary");
  if (!Array.isArray(course.lessons) || course.lessons.length === 0) {
    throw new Error("No lessons in " + file);
  }
  const ids = new Set();
  for (const lesson of course.lessons) {
    validateLesson(lesson, file + "/" + lesson.id);
    if (ids.has(lesson.id)) throw new Error("Duplicate lesson id " + lesson.id);
    ids.add(lesson.id);
  }
  return course;
}

function loadCourses() {
  const files = fs
    .readdirSync(COURSES_DIR)
    .filter((file) => file.endsWith(".js"))
    .sort();
  const list = files.map((file) =>
    validateCourse(require(path.join(COURSES_DIR, file)), file)
  );
  const ids = new Set();
  for (const course of list) {
    if (ids.has(course.id)) throw new Error("Duplicate course id " + course.id);
    ids.add(course.id);
  }
  return list;
}

const courses = loadCourses();

const getCourse = (id) => courses.find((course) => course.id === id);

const getLessonIndex = (course, id) =>
  course.lessons.findIndex((lesson) => lesson.id === id);

module.exports = { courses, getCourse, getLessonIndex };
