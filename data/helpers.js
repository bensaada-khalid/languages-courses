const t = (en, ar) => ({ en, ar });

const lesson = (id, section, title, en, ar, code, exercise, tip) => ({
  id,
  section,
  title,
  body: { en, ar },
  code,
  exercise,
  tip,
});

module.exports = { t, lesson };
