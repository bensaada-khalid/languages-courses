const { t, lesson } = require("../helpers");

const S1 = t("Getting started", "البداية");
const S2 = t("Routing and requests", "التوجيه والطلبات");
const S3 = t("Middleware", "الوسائط Middleware");
const S4 = t("Building APIs", "بناء واجهات API");
const S5 = t("Production", "الإنتاج");

module.exports = {
  id: "express",
  badge: "Ex",
  color: "#4b5563",
  title: t("Express.js", "Express.js"),
  summary: t(
    "Build real REST APIs: routing, middleware, validation, errors, authentication, and testing.",
    "ابنِ واجهات REST حقيقية: التوجيه والوسائط والتحقق والأخطاء والمصادقة والاختبار."
  ),
  lessons: [
    lesson(
      "intro",
      S1,
      t("Introduction and first server", "المقدمة وأول خادم"),
      [
        "Express is the most popular web framework for Node.js. It adds routing, middleware, and helper methods on top of the `http` module, so you write much less code. You should know the basics of Node.js and JavaScript first.",
        "Create a folder, run `npm init -y`, and install Express. The code below creates an app, answers `GET /`, and starts listening on port 3000.",
      ],
      [
        "Express أشهر إطار ويب لـ Node.js. يضيف التوجيه والوسائط ودوال مساعدة فوق وحدة `http`، فتكتب شيفرة أقل بكثير. يجب أن تعرف أساسيات Node.js وJavaScript أولاً.",
        "أنشئ مجلداً ونفّذ `npm init -y` وثبّت Express. تنشئ الشيفرة التالية تطبيقاً وتجيب عن `GET /` وتبدأ الاستماع على المنفذ 3000.",
      ],
      [
        { lang: "bash", text: `npm init -y
npm install express` },
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});` },
        { lang: "bash", text: `node index.js`, output: "Server running on http://localhost:3000" },
      ],
      t("Add a second route `/hello` that sends your name.", "أضف مساراً ثانياً `/hello` يرسل اسمك.")
    ),
    lesson(
      "dev-workflow",
      S1,
      t("Development workflow", "أسلوب العمل أثناء التطوير"),
      [
        "By default you must stop and start the server after every change. A watcher restarts it for you. Node has one built in, the `--watch` flag, and `nodemon` is the popular package for the same job.",
        "Save the commands as scripts in `package.json`: `start` for production and `dev` for development.",
      ],
      [
        "افتراضياً عليك إيقاف الخادم وتشغيله بعد كل تعديل. المراقِب يعيد تشغيله عنك. لدى Node مراقب مدمج هو الخيار `--watch`، و`nodemon` حزمة شهيرة لنفس المهمة.",
        "احفظ الأوامر كسكربتات في `package.json`: `start` للإنتاج و`dev` للتطوير.",
      ],
      [
        { lang: "json", file: "package.json", text: `{
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}` },
        { lang: "bash", text: `npm run dev` },
        { lang: "bash", text: `npm install --save-dev nodemon` },
      ],
      t("Add the `dev` script and change the response text while the server is running.", "أضف سكربت `dev` وغيّر نص الاستجابة والخادم يعمل.")
    ),
    lesson(
      "routing",
      S2,
      t("Routing basics", "أساسيات التوجيه"),
      [
        "A route connects an HTTP method and a path to a handler function. The common methods are `GET` to read, `POST` to create, `PUT` to update, and `DELETE` to remove. The handler receives `req` and `res`.",
        "Express checks routes in the order you wrote them and uses the first one that matches.",
      ],
      [
        "يربط المسار (route) بين طريقة HTTP ومسار ودالة معالجة. الطرق الشائعة هي `GET` للقراءة و`POST` للإنشاء و`PUT` للتعديل و`DELETE` للحذف. وتستقبل الدالة `req` و`res`.",
        "يفحص Express المسارات بالترتيب الذي كتبته ويستخدم أول مسار مطابق.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("GET home"));
app.post("/", (req, res) => res.send("POST home"));
app.put("/", (req, res) => res.send("PUT home"));
app.delete("/", (req, res) => res.send("DELETE home"));
app.get("/about", (req, res) => res.send("About page"));

app.listen(3000);` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/`, output: "POST home" },
      ],
      t("Add a `/contact` route that answers to `GET` only.", "أضف مساراً `/contact` يجيب عن `GET` فقط.")
    ),
    lesson(
      "params-query",
      S2,
      t("Route parameters and query strings", "معاملات المسار وسلاسل الاستعلام"),
      [
        "A part of the path that starts with a colon, such as `:id`, is a route parameter. Its value is in `req.params`. A query string such as `?q=node&page=2` is in `req.query`.",
        "Both always arrive as text. Convert with `Number()` when you need a number.",
      ],
      [
        "الجزء من المسار الذي يبدأ بنقطتين مثل `:id` هو معامل مسار. قيمته في `req.params`. وسلسلة الاستعلام مثل `?q=node&page=2` تكون في `req.query`.",
        "كلاهما يصل نصاً دائماً. حوّل بـ `Number()` عندما تحتاج عدداً.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();

app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.get("/posts/:year/:month", (req, res) => {
  res.json(req.params);
});

app.get("/search", (req, res) => {
  res.json({ term: req.query.q, page: Number(req.query.page) || 1 });
});

app.listen(3000);` },
        { lang: "bash", text: `curl http://localhost:3000/users/42`, output: `{"id":"42"}` },
        { lang: "bash", text: `curl http://localhost:3000/posts/2026/11`, output: `{"year":"2026","month":"11"}` },
        { lang: "bash", text: `curl "http://localhost:3000/search?q=node&page=2"`, output: `{"term":"node","page":2}` },
      ],
      t("Create a route `/products/:category` that returns the category and an optional `sort` query.", "أنشئ مساراً `/products/:category` يُرجع الفئة ومعامل استعلام اختيارياً `sort`.")
    ),
    lesson(
      "request-body",
      S2,
      t("Reading the request body", "قراءة جسم الطلب"),
      [
        "Data sent with `POST` or `PUT` is in the request body. Express does not read it by default. Add `express.json()` to read JSON bodies and `express.urlencoded()` to read HTML form data. After that the data is in `req.body`.",
        "Always check what the client sent before you use it, and answer with status 400 when something is missing.",
      ],
      [
        "البيانات المرسلة مع `POST` أو `PUT` تكون في جسم الطلب. لا يقرؤه Express افتراضياً. أضف `express.json()` لقراءة JSON و`express.urlencoded()` لقراءة بيانات نماذج HTML. بعدها تكون البيانات في `req.body`.",
        "افحص دائماً ما أرسله العميل قبل استخدامه، وأجب بالحالة 400 عندما ينقص شيء.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/messages", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  res.status(201).json({ received: text });
});

app.listen(3000);` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{"text":"hi"}'`, output: `{"received":"hi"}` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{}'`, output: `{"error":"text is required"}` },
      ],
      t("Create a `POST /users` route that requires `name` and `email`.", "أنشئ مساراً `POST /users` يتطلب `name` و`email`."),
      t("In Express 5, `req.body` is `undefined` when the client sends no body or the wrong `Content-Type`, so destructuring it directly can fail.", "في Express 5 تكون `req.body` غير معرّفة (`undefined`) عندما لا يرسل العميل جسماً أو يرسل `Content-Type` خاطئاً، لذلك قد يفشل تفكيكها مباشرة.")
    ),
    lesson(
      "responses",
      S2,
      t("Sending responses", "إرسال الاستجابات"),
      [
        "`res.send()` sends text or HTML and `res.json()` sends JSON. `res.status()` sets the status code and can be chained. `res.sendStatus()` sends only a status, and `res.redirect()` sends the browser to another URL.",
        "Use the right status code: `200` for success, `201` for created, `204` for no content, `400` for a bad request, `401` for not logged in, `403` for forbidden, `404` for not found, and `500` for a server error.",
      ],
      [
        "ترسل `res.send()` نصاً أو HTML وترسل `res.json()` ملف JSON. وتحدد `res.status()` رمز الحالة ويمكن ربطها بغيرها. وترسل `res.sendStatus()` الحالة فقط، وتوجّه `res.redirect()` المتصفح إلى رابط آخر.",
        "استخدم رمز الحالة المناسب: `200` للنجاح و`201` للإنشاء و`204` لعدم وجود محتوى و`400` لطلب خاطئ و`401` لغير مسجّل الدخول و`403` للممنوع و`404` لغير موجود و`500` لخطأ في الخادم.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();

app.get("/text", (req, res) => res.send("plain text"));
app.get("/json", (req, res) => res.json({ ok: true }));
app.get("/created", (req, res) => res.status(201).json({ id: 1 }));
app.get("/old", (req, res) => res.redirect(301, "/json"));
app.get("/empty", (req, res) => res.sendStatus(204));
app.get("/custom", (req, res) => {
  res.set("X-App", "academy");
  res.type("text/plain").send("custom header");
});

app.listen(3000);` },
      ],
      t("Create a route that returns status 404 with a JSON message.", "أنشئ مساراً يُرجع الحالة 404 مع رسالة JSON.")
    ),
    lesson(
      "router",
      S2,
      t("Organizing routes with Router", "تنظيم المسارات باستخدام Router"),
      [
        "When an app grows, a single file becomes hard to read. `express.Router()` creates a small group of routes in its own file. You mount it in the main app with `app.use()` and a prefix.",
        "In the example, the route `/` inside the router becomes `/users`, and `/:id` becomes `/users/:id`.",
      ],
      [
        "عندما يكبر التطبيق يصعب قراءة ملف واحد. ينشئ `express.Router()` مجموعة مسارات صغيرة في ملفها الخاص. وتركّبها في التطبيق الرئيسي بـ `app.use()` مع بادئة.",
        "في المثال يصبح المسار `/` داخل الـ router هو `/users`، ويصبح `/:id` هو `/users/:id`.",
      ],
      [
        { lang: "js", file: "routes/users.js", text: `const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Ali" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: Number(req.params.id), name: "Ali" });
});

module.exports = router;` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

app.use("/users", usersRouter);

app.listen(3000);` },
        { lang: "bash", text: `curl http://localhost:3000/users/1`, output: `{"id":1,"name":"Ali"}` },
      ],
      t("Create a second router for `/products` and mount it.", "أنشئ router ثانياً لـ `/products` وركّبه.")
    ),
    lesson(
      "middleware",
      S3,
      t("What is middleware", "ما هو الـ Middleware"),
      [
        "Middleware is a function with three parameters: `req`, `res`, and `next`. It runs between the request and the final route. It can read or change the request, end the response, or call `next()` to pass control to the next function.",
        "Order matters. Express runs middleware in the order you register it. Add a middleware to every route with `app.use()`, or to one route by placing it before the handler.",
      ],
      [
        "الـ Middleware دالة بثلاثة معاملات: `req` و`res` و`next`. تعمل بين الطلب والمسار النهائي. يمكنها قراءة الطلب أو تعديله أو إنهاء الاستجابة أو استدعاء `next()` لتمرير التحكم إلى الدالة التالية.",
        "الترتيب مهم. ينفّذ Express الوسائط بالترتيب الذي سجّلتها به. أضف وسيطاً لكل المسارات بـ `app.use()`، أو لمسار واحد بوضعه قبل دالة المعالجة.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();

function logger(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
}

function requireKey(req, res, next) {
  if (req.get("x-api-key") !== "secret") {
    return res.status(401).json({ error: "Invalid key" });
  }
  next();
}

app.use(logger);

app.get("/", (req, res) => res.send("Public"));
app.get("/private", requireKey, (req, res) => res.send("Private data"));

app.listen(3000);` },
        { lang: "bash", text: `curl http://localhost:3000/private`, output: `{"error":"Invalid key"}` },
        { lang: "bash", text: `curl http://localhost:3000/private -H "x-api-key: secret"`, output: "Private data" },
      ],
      t("Write a middleware that adds the current time to `req.time`.", "اكتب وسيطاً يضيف الوقت الحالي إلى `req.time`.")
    ),
    lesson(
      "common-middleware",
      S3,
      t("Common middleware packages", "حزم الوسائط الشائعة"),
      [
        "You do not have to write everything yourself. `cors` allows browsers on other domains to call your API. `morgan` logs every request in the terminal. Together with `express.json()` they are in almost every API.",
        "Install them with npm and add them with `app.use()` before your routes.",
      ],
      [
        "لا تحتاج إلى كتابة كل شيء بنفسك. تسمح `cors` للمتصفحات على نطاقات أخرى باستدعاء واجهتك. وتسجّل `morgan` كل طلب في الطرفية. ومع `express.json()` تجدها في معظم الواجهات.",
        "ثبّتها بـ npm وأضفها بـ `app.use()` قبل مساراتك.",
      ],
      [
        { lang: "bash", text: `npm install cors morgan` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(3000);` },
      ],
      t("Allow only `http://localhost:5173` with `cors({ origin: \"http://localhost:5173\" })`.", "اسمح لـ `http://localhost:5173` فقط باستخدام `cors({ origin: \"http://localhost:5173\" })`.")
    ),
    lesson(
      "static-files",
      S3,
      t("Serving static files", "تقديم الملفات الثابتة"),
      [
        "`express.static()` serves a whole folder of files such as HTML, CSS, images, and JavaScript. A file at `public/style.css` becomes available at `/style.css`.",
        "Use `res.sendFile()` to send one file, with an absolute path built by `path.join(__dirname, ...)`.",
      ],
      [
        "تقدّم `express.static()` مجلداً كاملاً من الملفات مثل HTML وCSS والصور وJavaScript. الملف `public/style.css` يصبح متاحاً على `/style.css`.",
        "استخدم `res.sendFile()` لإرسال ملف واحد، مع مسار مطلق يبنيه `path.join(__dirname, ...)`.",
      ],
      [
        { lang: "text", text: `my-site/
  index.js
  public/
    index.html
    style.css
  views/
    about.html` },
        { lang: "js", file: "index.js", text: `const path = require("node:path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(3000);` },
      ],
      t("Put an `index.html` in `public` and open http://localhost:3000.", "ضع ملف `index.html` في `public` وافتح http://localhost:3000.")
    ),
    lesson(
      "crud",
      S4,
      t("A complete CRUD API", "واجهة CRUD كاملة"),
      [
        "REST APIs map the four operations to HTTP methods: `POST` creates, `GET` reads, `PUT` updates, and `DELETE` removes. A good API uses nouns in the paths, like `/notes`, and the right status codes.",
        "This notes API keeps data in an array so you can focus on the routes. Replace the array with a database later.",
      ],
      [
        "تربط واجهات REST العمليات الأربع بطرق HTTP: `POST` تنشئ و`GET` تقرأ و`PUT` تعدّل و`DELETE` تحذف. الواجهة الجيدة تستخدم أسماء في المسارات مثل `/notes` ورموز الحالة المناسبة.",
        "تحفظ واجهة الملاحظات هذه البيانات في مصفوفة لتركّز على المسارات. استبدل المصفوفة بقاعدة بيانات لاحقاً.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();
app.use(express.json());

let notes = [{ id: 1, text: "Learn Express" }];
let nextId = 2;

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

app.post("/notes", (req, res) => {
  const note = { id: nextId++, text: req.body.text };
  notes.push(note);
  res.status(201).json(note);
});

app.put("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });
  note.text = req.body.text;
  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  notes = notes.filter((n) => n.id !== Number(req.params.id));
  res.sendStatus(204);
});

app.listen(3000);` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"Buy milk"}'`, output: `{"id":2,"text":"Buy milk"}` },
        { lang: "bash", text: `curl http://localhost:3000/notes`, output: `[{"id":1,"text":"Learn Express"},{"id":2,"text":"Buy milk"}]` },
      ],
      t("Add a `done` field to notes and a route that marks a note as done.", "أضف حقل `done` للملاحظات ومساراً يضع علامة الإنجاز على ملاحظة.")
    ),
    lesson(
      "validation",
      S4,
      t("Validating input", "التحقق من المُدخلات"),
      [
        "Never trust data from the client. A validation library checks the shape of the data before your route runs. Zod describes the rules in a schema, and `safeParse()` returns a result instead of throwing.",
        "Wrap the check in a reusable middleware, so every route can use it with one line.",
      ],
      [
        "لا تثق أبداً ببيانات العميل. تفحص مكتبة التحقق شكل البيانات قبل أن يعمل مسارك. تصف Zod القواعد في مخطط (schema)، وتُرجع `safeParse()` نتيجة بدل أن ترمي خطأً.",
        "ضع الفحص في وسيط قابل لإعادة الاستخدام ليستعمله أي مسار بسطر واحد.",
      ],
      [
        { lang: "bash", text: `npm install zod` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const { z } = require("zod");

const app = express();
app.use(express.json());

const noteSchema = z.object({
  text: z.string().min(3, "text must have at least 3 characters"),
  done: z.boolean().optional(),
});

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => issue.message),
      });
    }
    req.body = result.data;
    next();
  };
}

app.post("/notes", validate(noteSchema), (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000);` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"hi"}'`, output: `{"errors":["text must have at least 3 characters"]}` },
      ],
      t("Add a schema for users with a valid `email` using `z.string().email()`.", "أضف مخططاً للمستخدمين فيه `email` صالح باستخدام `z.string().email()`.")
    ),
    lesson(
      "errors",
      S4,
      t("Error handling", "معالجة الأخطاء"),
      [
        "Express has special error middleware with four parameters: `err`, `req`, `res`, `next`. Register it after all routes. In Express 5, errors thrown inside `async` handlers reach it automatically.",
        "A custom error class with a `status` lets you throw clear errors from anywhere. Do not send internal error details to the client. Log them on the server and send a general message.",
      ],
      [
        "لدى Express وسيط أخطاء خاص بأربعة معاملات: `err` و`req` و`res` و`next`. سجّله بعد كل المسارات. وفي Express 5 تصل إليه الأخطاء المرمية داخل معالجات `async` تلقائياً.",
        "يتيح صنف خطأ مخصص له `status` رمي أخطاء واضحة من أي مكان. لا ترسل تفاصيل الأخطاء الداخلية إلى العميل. سجّلها في الخادم وأرسل رسالة عامة.",
      ],
      [
        { lang: "js", file: "index.js", text: `const express = require("express");

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const app = express();

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    throw new AppError("Invalid id", 400);
  }
  if (id !== 1) {
    throw new AppError("User not found", 404);
  }
  res.json({ id: 1, name: "Ali" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  if (status === 500) console.error(err);
  res.status(status).json({ error: message });
});

app.listen(3000);` },
        { lang: "bash", text: `curl http://localhost:3000/users/abc`, output: `{"error":"Invalid id"}` },
        { lang: "bash", text: `curl http://localhost:3000/users/9`, output: `{"error":"User not found"}` },
      ],
      t("Add a `ForbiddenError` status 403 and throw it from a route.", "أضف خطأً بالحالة 403 وارمِه من أحد المسارات.")
    ),
    lesson(
      "environment",
      S5,
      t("Configuration and environment variables", "الإعدادات ومتغيرات البيئة"),
      [
        "Settings that change between your computer and the real server, such as the port, database address, and secret keys, belong in environment variables. Read them from `process.env` and always provide a safe default for development.",
        "Save them in a `.env` file and load it with `node --env-file=.env`, available from Node 20.6. On older versions use the `dotenv` package. Never commit the `.env` file to Git.",
      ],
      [
        "الإعدادات التي تختلف بين حاسوبك والخادم الحقيقي مثل المنفذ وعنوان قاعدة البيانات والمفاتيح السرية مكانها متغيرات البيئة. اقرأها من `process.env` وأعطِ دائماً قيمة افتراضية آمنة للتطوير.",
        "احفظها في ملف `.env` وحمّله بـ `node --env-file=.env` المتوفر من Node 20.6. وفي الإصدارات الأقدم استخدم حزمة `dotenv`. لا ترفع ملف `.env` إلى Git أبداً.",
      ],
      [
        { lang: "ini", file: ".env", text: `PORT=4000
NODE_ENV=production` },
        { lang: "js", file: "index.js", text: `const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
  res.json({ mode });
});

app.listen(port, () => {
  console.log("Running in " + mode + " mode on port " + port);
});` },
        { lang: "bash", text: `node --env-file=.env index.js`, output: "Running in production mode on port 4000" },
      ],
      t("Move a secret value to `.env` and read it with `process.env`.", "انقل قيمة سرية إلى `.env` واقرأها بـ `process.env`.")
    ),
    lesson(
      "jwt-auth",
      S5,
      t("Authentication with JWT", "المصادقة باستخدام JWT"),
      [
        "A JSON Web Token (JWT) is a signed string that proves who the user is. After a successful login the server signs a token with a secret key and sends it. The client sends it back in the `Authorization` header, and a middleware verifies it.",
        "The example uses one fixed user to stay short. In a real app, read users from a database and store only hashed passwords, for example with `bcrypt`. Never keep plain passwords.",
      ],
      [
        "رمز JSON Web Token (JWT) نص موقّع يثبت هوية المستخدم. بعد تسجيل دخول ناجح يوقّع الخادم رمزاً بمفتاح سري ويرسله. يعيده العميل في ترويسة `Authorization` ويتحقق منه وسيط.",
        "يستخدم المثال مستخدماً ثابتاً للاختصار. في تطبيق حقيقي اقرأ المستخدمين من قاعدة بيانات واحفظ كلمات المرور مشفّرة بالتجزئة فقط، مثلاً بـ `bcrypt`. لا تحفظ كلمات مرور نصية أبداً.",
      ],
      [
        { lang: "bash", text: `npm install jsonwebtoken` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "dev-secret";

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email !== "ali@example.com" || password !== "1234") {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  const token = jwt.sign({ sub: 1, email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function auth(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or missing token" });
  }
}

app.get("/profile", auth, (req, res) => {
  res.json({ email: req.user.email });
});

app.listen(3000);` },
        { lang: "bash", text: `curl http://localhost:3000/profile`, output: `{"error":"Invalid or missing token"}` },
      ],
      t("Log in with curl, copy the token, and call `/profile` with the `Authorization` header.", "سجّل الدخول بـ curl وانسخ الرمز ثم استدعِ `/profile` مع ترويسة `Authorization`.")
    ),
    lesson(
      "database",
      S5,
      t("Connecting a database", "ربط قاعدة بيانات"),
      [
        "To keep data after a restart, connect a database. With MongoDB you can use Mongoose, which is covered in its own course here. Connect first, and start listening only after the connection succeeds.",
        "Database calls are asynchronous, so the handlers are `async` functions. In Express 5, a failed `await` goes to your error middleware without extra code.",
      ],
      [
        "للاحتفاظ بالبيانات بعد إعادة التشغيل اربط قاعدة بيانات. مع MongoDB يمكنك استخدام Mongoose وله دورة مستقلة هنا. اتصل أولاً، ثم ابدأ الاستماع بعد نجاح الاتصال فقط.",
        "استدعاءات قاعدة البيانات غير متزامنة، لذلك تكون المعالجات دوال `async`. وفي Express 5 يذهب أي `await` فاشل إلى وسيط الأخطاء دون شيفرة إضافية.",
      ],
      [
        { lang: "bash", text: `npm install mongoose` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const mongoose = require("mongoose");

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({ text: { type: String, required: true } }, { timestamps: true })
);

const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
  res.json(await Note.find().sort({ createdAt: -1 }));
});

app.post("/notes", async (req, res) => {
  const note = await Note.create({ text: req.body.text });
  res.status(201).json(note);
});

async function start() {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/notes");
  app.listen(3000, () => console.log("Ready on port 3000"));
}

start();` },
      ],
      t("Add `GET /notes/:id` that returns 404 when the note does not exist.", "أضف `GET /notes/:id` يُرجع 404 عندما لا توجد الملاحظة."),
      t("Mongoose throws a `ValidationError` for invalid data. Catch it in your error middleware and answer with status 400.", "يرمي Mongoose الخطأ `ValidationError` عند البيانات غير الصالحة. التقطه في وسيط الأخطاء وأجب بالحالة 400.")
    ),
    lesson(
      "security",
      S5,
      t("Security basics", "أساسيات الأمان"),
      [
        "`helmet` adds HTTP headers that protect against common attacks. `express-rate-limit` limits how many requests one client can send, which slows down brute force attacks. Limiting the body size with `express.json({ limit })` stops huge requests.",
        "Also keep dependencies updated with `npm audit`, always validate input, never put secrets in the code, and use HTTPS in production.",
      ],
      [
        "تضيف `helmet` ترويسات HTTP تحمي من الهجمات الشائعة. وتحدّ `express-rate-limit` من عدد الطلبات التي يرسلها عميل واحد، مما يبطئ هجمات التخمين. وتحديد حجم الجسم بـ `express.json({ limit })` يمنع الطلبات الضخمة.",
        "وحدّث الاعتماديات دائماً بـ `npm audit` وتحقق من المُدخلات دائماً ولا تضع الأسرار في الشيفرة واستخدم HTTPS في الإنتاج.",
      ],
      [
        { lang: "bash", text: `npm install helmet express-rate-limit` },
        { lang: "js", file: "index.js", text: `const express = require("express");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const app = express();

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => res.send("Protected"));

app.listen(3000);` },
      ],
      t("Add a stricter limit of 5 requests per minute to the `/login` route only.", "أضف حدّاً أشد قدره 5 طلبات في الدقيقة لمسار `/login` فقط.")
    ),
    lesson(
      "structure-testing",
      S5,
      t("Project structure and testing", "هيكل المشروع والاختبار"),
      [
        "Split the app into small files: `app.js` creates and exports the app, and `server.js` only starts listening. This lets tests use the app without opening a real port.",
        "`supertest` sends fake requests to the app, and Node has a built-in test runner. Run the tests with `node --test`.",
      ],
      [
        "قسّم التطبيق إلى ملفات صغيرة: ينشئ `app.js` التطبيق ويصدّره، ويبدأ `server.js` الاستماع فقط. هذا يتيح للاختبارات استخدام التطبيق دون فتح منفذ حقيقي.",
        "ترسل `supertest` طلبات وهمية إلى التطبيق، ولدى Node مشغّل اختبارات مدمج. شغّل الاختبارات بـ `node --test`.",
      ],
      [
        { lang: "text", text: `my-api/
  src/
    app.js
    server.js
    routes/
      notes.js
    middleware/
      errors.js
  test/
    app.test.js
  package.json` },
        { lang: "js", file: "src/app.js", text: `const express = require("express");
const notesRouter = require("./routes/notes");

const app = express();

app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/notes", notesRouter);

module.exports = app;` },
        { lang: "js", file: "src/server.js", text: `const app = require("./app");

app.listen(process.env.PORT || 3000);` },
        { lang: "bash", text: `npm install --save-dev supertest` },
        { lang: "js", file: "test/app.test.js", text: `const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

test("GET /health returns ok", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});` },
        { lang: "bash", text: `node --test` },
      ],
      t("Write a second test that checks that an unknown route returns 404.", "اكتب اختباراً ثانياً يتحقق أن مساراً غير موجود يُرجع 404.")
    ),
  ],
};
