const { t, lesson } = require("../helpers");

const S0 = t("Getting started", "البداية");
const S1 = t("JavaScript basics", "أساسيات JavaScript");
const S2 = t("Asynchronous JavaScript", "JavaScript غير المتزامنة");
const S3 = t("Node.js essentials", "أساسيات Node.js");

module.exports = {
  id: "node",
  badge: "JS",
  color: "#3c873a",
  title: t("Node.js", "Node.js"),
  summary: t(
    "JavaScript from zero, then Node.js: modules, files, events, and your own HTTP server.",
    "JavaScript من الصفر ثم Node.js: الوحدات والملفات والأحداث وخادم HTTP خاص بك."
  ),
  lessons: [
    lesson(
      "intro",
      S0,
      t("What is Node.js", "ما هو Node.js"),
      [
        "Node.js lets you run JavaScript outside the browser, directly on your computer. It is built on the V8 engine from Chrome. Developers use it to build web servers, APIs, command line tools, and automation scripts.",
        "Download the LTS version from nodejs.org. It also installs `npm`, the package manager. Check both from a terminal, then create a file named `hello.js` and run it with the `node` command.",
      ],
      [
        "يتيح لك Node.js تشغيل JavaScript خارج المتصفح مباشرة على حاسوبك. وهو مبني على محرك V8 من Chrome. يستخدمه المطورون لبناء خوادم الويب وواجهات API وأدوات سطر الأوامر وسكربتات الأتمتة.",
        "نزّل نسخة LTS من الموقع nodejs.org. وهي تثبّت معها `npm` مدير الحزم. تحقق منهما من الطرفية، ثم أنشئ ملفاً باسم `hello.js` وشغّله بالأمر `node`.",
      ],
      [
        { lang: "bash", text: `node --version
npm --version` },
        { lang: "js", file: "hello.js", text: `console.log("Hello from Node.js");`, output: "Hello from Node.js" },
        { lang: "bash", text: `node hello.js` },
      ],
      t("Print your name and your city on two lines.", "اطبع اسمك ومدينتك في سطرين."),
      t("Type `node` alone to open an interactive shell (REPL) where you can test code line by line.", "اكتب `node` وحدها لفتح صدفة تفاعلية (REPL) تجرّب فيها الشيفرة سطراً بسطر.")
    ),
    lesson(
      "variables",
      S1,
      t("Variables", "المتغيرات"),
      [
        "A variable stores a value under a name. Use `const` for values that never get a new value, and `let` for values that change. Avoid the old `var` keyword.",
        "Trying to assign a new value to a `const` throws an error. Names are case sensitive and the common style is camelCase, like `userName`.",
      ],
      [
        "يخزّن المتغير قيمة تحت اسم. استخدم `const` للقيم التي لا تُسند لها قيمة جديدة، و`let` للقيم التي تتغير. وتجنب الكلمة القديمة `var`.",
        "محاولة إسناد قيمة جديدة إلى `const` ترمي خطأً. الأسماء حساسة لحالة الأحرف والأسلوب الشائع camelCase مثل `userName`.",
      ],
      [
        { lang: "js", text: `const name = "Huda";
let score = 10;
score = score + 5;
console.log(name, score);`, output: "Huda 15" },
        { lang: "js", text: `const limit = 5;
limit = 10;`, output: "TypeError: Assignment to constant variable." },
      ],
      t("Create a `const` for your age and a `let` for a counter, then increase the counter by 1.", "أنشئ `const` لعمرك و`let` لعدّاد، ثم زد العدّاد بمقدار 1.")
    ),
    lesson(
      "data-types",
      S1,
      t("Data types", "أنواع البيانات"),
      [
        "The basic types are string for text, number for all numbers, boolean for `true` or `false`, `undefined` for a variable without a value, and `null` for an empty value on purpose. Arrays and objects have the type `object`.",
        "Use `typeof` to see a type. Convert with `Number()`, `String()`, `parseInt()`, and `parseFloat()`. Converting text that is not a number gives `NaN`, which means not a number.",
      ],
      [
        "الأنواع الأساسية هي string للنص وnumber لكل الأعداد وboolean للقيمتين `true` أو `false` و`undefined` لمتغير بلا قيمة و`null` لقيمة فارغة عن قصد. أما المصفوفات والكائنات فنوعها `object`.",
        "استخدم `typeof` لمعرفة النوع. وحوّل بالدوال `Number()` و`String()` و`parseInt()` و`parseFloat()`. تحويل نص ليس عدداً يعطي `NaN` أي ليس عدداً.",
      ],
      [
        { lang: "js", text: `console.log(typeof "text");
console.log(typeof 42);
console.log(typeof 3.14);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof [1, 2]);
console.log(typeof { a: 1 });`, output: `string
number
number
boolean
undefined
object
object
object` },
        { lang: "js", text: `console.log(Number("42") + 1);
console.log(String(100) + "!");
console.log(parseInt("12px"));
console.log(parseFloat("3.5kg"));
console.log(Number("abc"));`, output: `43
100!
12
3.5
NaN` },
      ],
      t("Convert the text `\"8\"` to a number and print it multiplied by 2.", "حوّل النص `\"8\"` إلى عدد واطبعه مضروباً في 2."),
      t("`typeof null` returns `\"object\"`. This is an old mistake in the language that was never fixed.", "`typeof null` تُرجع `\"object\"`. هذا خطأ قديم في اللغة لم يُصحَّح.")
    ),
    lesson(
      "operators",
      S1,
      t("Operators", "المعاملات"),
      [
        "The math operators are `+`, `-`, `*`, `/`, `%` for the remainder, and `**` for the power. `++` adds one and `+=` adds a value to a variable.",
        "Always compare with `===` and `!==`, which check the value and the type. The loose `==` converts types and gives surprising results. Combine conditions with `&&` (and), `||` (or), and `!` (not). The `??` operator gives a default when the left side is `null` or `undefined`.",
      ],
      [
        "معاملات الحساب هي `+` و`-` و`*` و`/` و`%` للباقي و`**` للقوة. و`++` تضيف واحداً و`+=` تضيف قيمة إلى متغير.",
        "قارن دائماً بـ `===` و`!==` اللتين تفحصان القيمة والنوع. أما `==` فتحوّل الأنواع وتعطي نتائج مفاجئة. ادمج الشروط بـ `&&` (و) و`||` (أو) و`!` (ليس). وتعطي `??` قيمة افتراضية عندما يكون الطرف الأيسر `null` أو `undefined`.",
      ],
      [
        { lang: "js", text: `console.log(10 + 3, 10 - 3, 10 * 3);
console.log(10 / 4);
console.log(10 % 3);
console.log(2 ** 5);
let n = 5;
n++;
n += 10;
console.log(n);`, output: `13 7 30
2.5
1
32
16` },
        { lang: "js", text: `console.log(5 == "5");
console.log(5 === "5");
console.log(5 !== 6);
console.log(true && false, true || false, !true);
console.log(null ?? "default");`, output: `true
false
true
false true false
default` },
      ],
      t("Print whether `15` is divisible by 5 using `%` and `===`.", "اطبع هل العدد `15` يقبل القسمة على 5 باستخدام `%` و`===`.")
    ),
    lesson(
      "strings",
      S1,
      t("Strings", "النصوص"),
      [
        "A string is text inside single quotes, double quotes, or backticks. Backticks create a template literal, where `${...}` puts any expression inside the text, and it can span several lines.",
        "Each character has an index that starts at `0`. Useful tools are `length`, `at()`, `toUpperCase()`, `trim()`, `includes()`, `replace()`, `slice()`, `split()`, `repeat()`, and `padStart()`.",
      ],
      [
        "النص هو كلام داخل علامات اقتباس مفردة أو مزدوجة أو backticks. تنشئ الـ backticks قالباً نصياً (template literal) يضع فيه `${...}` أي تعبير داخل النص، ويمكن أن يمتد على عدة أسطر.",
        "لكل حرف فهرس يبدأ من `0`. ومن الأدوات المفيدة `length` و`at()` و`toUpperCase()` و`trim()` و`includes()` و`replace()` و`slice()` و`split()` و`repeat()` و`padStart()`.",
      ],
      [
        { lang: "js", text: `const name = "Sara";
const age = 30;
console.log(\`\${name} is \${age} years old\`);
console.log(name.length);
console.log(name[0], name.at(-1));
console.log(name.toUpperCase());
console.log("a,b,c".split(","));`, output: `Sara is 30 years old
4
S a
SARA
[ 'a', 'b', 'c' ]` },
        { lang: "js", text: `const text = "  Learn Node.js  ";
console.log(text.trim());
console.log(text.includes("Node"));
console.log(text.replace("Node.js", "JavaScript").trim());
console.log("ab".repeat(3));
console.log("Hello".slice(1, 4));
console.log("5".padStart(3, "0"));`, output: `Learn Node.js
true
Learn JavaScript
ababab
ell
005` },
      ],
      t("Use a template literal to print a sentence with your name and age.", "استخدم قالباً نصياً لطباعة جملة فيها اسمك وعمرك.")
    ),
    lesson(
      "conditions",
      S1,
      t("Conditions", "الشروط"),
      [
        "`if`, `else if`, and `else` run different code depending on a condition. JavaScript runs the first block whose condition is true. Use `switch` when you compare one value against many options, and `break` to stop after a case.",
        "The ternary operator `condition ? a : b` is a short way to pick between two values.",
      ],
      [
        "تنفّذ `if` و`else if` و`else` شيفرة مختلفة بحسب الشرط. تنفّذ JavaScript أول كتلة شرطها صحيح. استخدم `switch` عندما تقارن قيمة واحدة بعدة خيارات، و`break` للتوقف بعد كل حالة.",
        "المعامل الثلاثي `condition ? a : b` طريقة مختصرة للاختيار بين قيمتين.",
      ],
      [
        { lang: "js", text: `const hour = 14;
if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}`, output: "Good afternoon" },
        { lang: "js", text: `const day = "Fri";
switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}
const age = 20;
console.log(age >= 18 ? "adult" : "minor");`, output: `Weekday
adult` },
      ],
      t("Print `Pass` when a score is at least 50 and `Fail` otherwise.", "اطبع `Pass` عندما تكون الدرجة 50 على الأقل وإلا `Fail`.")
    ),
    lesson(
      "loops",
      S1,
      t("Loops", "الحلقات"),
      [
        "A `for` loop has three parts: a start, a condition, and a step. A `while` loop repeats as long as its condition is true. `for...of` goes through every item of an array or a string.",
        "`break` leaves the loop completely and `continue` jumps to the next round.",
      ],
      [
        "لحلقة `for` ثلاثة أجزاء: بداية وشرط وخطوة. وتكرر حلقة `while` ما دام شرطها صحيحاً. وتمر `for...of` على كل عنصر في مصفوفة أو نص.",
        "يخرج `break` من الحلقة تماماً، وينتقل `continue` إلى الدورة التالية.",
      ],
      [
        { lang: "js", text: `for (let i = 1; i <= 3; i++) {
  console.log("Round", i);
}
let count = 3;
while (count > 0) {
  console.log(count);
  count--;
}`, output: `Round 1
Round 2
Round 3
3
2
1` },
        { lang: "js", text: `const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
for (let i = 1; i <= 5; i++) {
  if (i === 2) continue;
  if (i === 4) break;
  console.log(i);
}`, output: `apple
banana
cherry
1
3` },
      ],
      t("Print the multiplication table of 3 from 1 to 10.", "اطبع جدول ضرب العدد 3 من 1 إلى 10.")
    ),
    lesson(
      "arrays",
      S1,
      t("Arrays", "المصفوفات"),
      [
        "An array holds an ordered list of values. Use `push()` and `pop()` to add or remove at the end, and `unshift()` and `shift()` at the start. `indexOf()` finds a position and `includes()` checks if a value exists.",
        "`slice()` copies part of an array without changing it. `sort()` changes the array itself, and without a function it sorts as text, so pass `(a, b) => a - b` for numbers.",
      ],
      [
        "تحمل المصفوفة قائمة مرتبة من القيم. استخدم `push()` و`pop()` للإضافة أو الحذف من النهاية، و`unshift()` و`shift()` من البداية. وتجد `indexOf()` الموضع وتتحقق `includes()` من وجود قيمة.",
        "تنسخ `slice()` جزءاً من المصفوفة دون تغييرها. أما `sort()` فتغيّر المصفوفة نفسها، وبلا دالة ترتّب كنصوص، لذلك مرّر `(a, b) => a - b` للأعداد.",
      ],
      [
        { lang: "js", text: `const colors = ["red", "green"];
colors.push("blue");
colors.unshift("black");
console.log(colors);
console.log(colors[1], colors.length);
const last = colors.pop();
console.log(last, colors);
console.log(colors.indexOf("green"), colors.includes("pink"));`, output: `[ 'black', 'red', 'green', 'blue' ]
red 4
blue [ 'black', 'red', 'green' ]
2 false` },
        { lang: "js", text: `const nums = [5, 1, 4];
console.log(nums.slice(0, 2));
nums.sort((a, b) => a - b);
console.log(nums);
console.log(nums.reverse().join("-"));`, output: `[ 5, 1 ]
[ 1, 4, 5 ]
5-4-1` },
      ],
      t("Create an array of four names and print the second and the last one.", "أنشئ مصفوفة من أربعة أسماء واطبع الاسم الثاني والأخير.")
    ),
    lesson(
      "array-methods",
      S1,
      t("map, filter and reduce", "map وfilter وreduce"),
      [
        "Modern JavaScript processes arrays with methods that take a function. `map()` builds a new array by changing each item. `filter()` keeps only the items that pass a test. `reduce()` combines all items into one value. `find()` returns the first match, and `some()` and `every()` return true or false.",
        "These methods never change the original array and they can be chained one after another.",
      ],
      [
        "تعالج JavaScript الحديثة المصفوفات بدوال تأخذ دالة. تبني `map()` مصفوفة جديدة بتغيير كل عنصر. وتُبقي `filter()` العناصر التي تجتاز اختباراً فقط. وتدمج `reduce()` كل العناصر في قيمة واحدة. وتُرجع `find()` أول عنصر مطابق، وتُرجع `some()` و`every()` قيمة true أو false.",
        "هذه الدوال لا تغيّر المصفوفة الأصلية ويمكن ربطها واحدة بعد أخرى.",
      ],
      [
        { lang: "js", text: `const nums = [1, 2, 3, 4, 5];
console.log(nums.map((n) => n * 2));
console.log(nums.filter((n) => n % 2 === 0));
console.log(nums.reduce((sum, n) => sum + n, 0));
console.log(nums.find((n) => n > 3));
console.log(nums.some((n) => n > 4), nums.every((n) => n > 4));`, output: `[ 2, 4, 6, 8, 10 ]
[ 2, 4 ]
15
4
true false` },
        { lang: "js", text: `const users = [
  { name: "Ali", age: 17 },
  { name: "Noor", age: 25 },
  { name: "Omar", age: 31 },
];
const adults = users.filter((u) => u.age >= 18).map((u) => u.name);
console.log(adults);
users.forEach((u) => console.log(u.name));`, output: `[ 'Noor', 'Omar' ]
Ali
Noor
Omar` },
      ],
      t("From `[3, 8, 12, 5]`, keep the numbers above 4 and double them.", "من `[3, 8, 12, 5]` احتفظ بالأعداد الأكبر من 4 وضاعفها.")
    ),
    lesson(
      "objects",
      S1,
      t("Objects", "الكائنات"),
      [
        "An object stores related data as key and value pairs. Read a property with a dot or with square brackets. Add a property by assigning it, and remove one with `delete`. `Object.keys()` lists the keys.",
        "A function inside an object is called a method, and `this` refers to the object. `JSON.stringify()` turns an object into text and `JSON.parse()` turns it back.",
      ],
      [
        "يخزّن الكائن بيانات مترابطة على شكل أزواج مفتاح وقيمة. اقرأ الخاصية بنقطة أو بأقواس مربعة. وأضف خاصية بإسنادها، واحذفها بـ `delete`. وتسرد `Object.keys()` المفاتيح.",
        "الدالة داخل الكائن تسمى method، وتشير `this` إلى الكائن. وتحوّل `JSON.stringify()` الكائن إلى نص وتعيده `JSON.parse()` إلى كائن.",
      ],
      [
        { lang: "js", text: `const user = { name: "Lina", age: 20, skills: ["js", "css"] };
user.city = "Rabat";
console.log(user.name, user["age"]);
console.log(user);
delete user.age;
console.log(Object.keys(user));`, output: `Lina 20
{ name: 'Lina', age: 20, skills: [ 'js', 'css' ], city: 'Rabat' }
[ 'name', 'skills', 'city' ]` },
        { lang: "js", text: `const car = {
  brand: "Toyota",
  year: 2020,
  describe() {
    return this.brand + " " + this.year;
  },
};
console.log(car.describe());
const text = JSON.stringify({ id: 1, ok: true });
console.log(text);
console.log(JSON.parse(text).id);`, output: `Toyota 2020
{"id":1,"ok":true}
1` },
      ],
      t("Create an object for a book with a title and a year, then add an author.", "أنشئ كائناً لكتاب فيه عنوان وسنة ثم أضف إليه المؤلف.")
    ),
    lesson(
      "functions",
      S1,
      t("Functions", "الدوال"),
      [
        "A function is a reusable block of code. You can write it with the `function` keyword or as an arrow function `(a, b) => a + b`. A parameter can have a default value.",
        "The rest parameter `...numbers` collects any number of arguments into an array. Functions are values, so you can pass one to another function. That passed function is called a callback.",
      ],
      [
        "الدالة كتلة شيفرة قابلة لإعادة الاستخدام. يمكنك كتابتها بالكلمة `function` أو كدالة سهمية `(a, b) => a + b`. ويمكن أن يكون للمعامل قيمة افتراضية.",
        "يجمع معامل الباقي `...numbers` أي عدد من الوسائط في مصفوفة. والدوال قيم، فيمكنك تمرير دالة إلى دالة أخرى، وتسمى الدالة الممررة callback.",
      ],
      [
        { lang: "js", text: `function add(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b;
const greet = (name = "friend") => "Hello, " + name;
console.log(add(2, 3), multiply(4, 5));
console.log(greet());
console.log(greet("Sam"));`, output: `5 20
Hello, friend
Hello, Sam` },
        { lang: "js", text: `function total(...numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
console.log(total(1, 2, 3, 4));
repeat(2, (i) => console.log("call", i));`, output: `10
call 0
call 1` },
      ],
      t("Write an arrow function `isEven(n)` that returns true for even numbers.", "اكتب دالة سهمية `isEven(n)` تُرجع true للأعداد الزوجية.")
    ),
    lesson(
      "destructuring-spread",
      S1,
      t("Destructuring and spread", "التفكيك والنشر"),
      [
        "Destructuring takes values out of an object or an array into variables in one line. For objects you use the property names, and for arrays you use the position.",
        "The spread operator `...` copies the items of an array or the properties of an object into a new one. It is the standard way to make an updated copy without changing the original.",
      ],
      [
        "يخرج التفكيك القيم من كائن أو مصفوفة إلى متغيرات في سطر واحد. للكائنات تستخدم أسماء الخصائص وللمصفوفات تستخدم الموضع.",
        "ينسخ معامل النشر `...` عناصر المصفوفة أو خصائص الكائن إلى مصفوفة أو كائن جديد. وهي الطريقة المعتادة لعمل نسخة محدّثة دون تغيير الأصل.",
      ],
      [
        { lang: "js", text: `const user = { name: "Mona", age: 28, city: "Fes" };
const { name, city } = user;
const [first, second] = [10, 20, 30];
console.log(name, city, first, second);`, output: "Mona Fes 10 20" },
        { lang: "js", text: `const base = [1, 2];
const more = [...base, 3, 4];
const user = { name: "Mona", age: 28 };
const updated = { ...user, age: 29 };
console.log(more);
console.log(updated);`, output: `[ 1, 2, 3, 4 ]
{ name: 'Mona', age: 29 }` },
      ],
      t("Copy an object and change one property without changing the original.", "انسخ كائناً وغيّر خاصية فيه دون تغيير الأصل.")
    ),
    lesson(
      "classes",
      S1,
      t("Classes", "الأصناف"),
      [
        "A class is a blueprint for creating objects. The `constructor` runs when you create an object with `new`. A class can inherit from another with `extends` and replace its methods.",
        "A name that starts with `#` is private and can be used only inside the class. `get` creates a property that runs code when read, and `static` methods belong to the class itself.",
      ],
      [
        "الصنف (class) مخطط لإنشاء الكائنات. يعمل `constructor` عند إنشاء كائن بـ `new`. ويمكن لصنف أن يرث من آخر بـ `extends` ويستبدل دوالَه.",
        "الاسم الذي يبدأ بـ `#` خاص ولا يُستخدم إلا داخل الصنف. وينشئ `get` خاصية تنفّذ شيفرة عند قراءتها، والدوال `static` تتبع الصنف نفسه.",
      ],
      [
        { lang: "js", text: `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}
class Dog extends Animal {
  speak() {
    return this.name + " barks";
  }
}
console.log(new Animal("Generic").speak());
console.log(new Dog("Rex").speak());`, output: `Generic makes a sound
Rex barks` },
        { lang: "js", text: `class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this;
  }
  get value() {
    return this.#count;
  }
  static create() {
    return new Counter();
  }
}
const counter = Counter.create();
counter.increment().increment();
console.log(counter.value);`, output: "2" },
      ],
      t("Create a class `Rectangle` with width and height and a method `area()`.", "أنشئ صنفاً `Rectangle` له عرض وارتفاع ودالة `area()`.")
    ),
    lesson(
      "errors",
      S1,
      t("Error handling", "معالجة الأخطاء"),
      [
        "Use `try` and `catch` to handle errors without stopping the program. The `finally` block always runs. Every error has a `name` and a `message`.",
        "Create your own error with `throw new Error(\"message\")`. Throw errors for situations your code cannot continue from, such as wrong input.",
      ],
      [
        "استخدم `try` و`catch` لمعالجة الأخطاء دون إيقاف البرنامج. وتُنفَّذ كتلة `finally` دائماً. لكل خطأ `name` و`message`.",
        "أنشئ خطأً خاصاً بـ `throw new Error(\"message\")`. ارمِ الأخطاء في المواقف التي لا تستطيع شيفرتك متابعتها، مثل المُدخل الخاطئ.",
      ],
      [
        { lang: "js", text: `try {
  JSON.parse("{bad json}");
} catch (error) {
  console.log("Caught:", error.name);
} finally {
  console.log("Finished");
}`, output: `Caught: SyntaxError
Finished` },
        { lang: "js", text: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
try {
  console.log(divide(10, 2));
  console.log(divide(1, 0));
} catch (error) {
  console.log(error.message);
}`, output: `5
Cannot divide by zero` },
      ],
      t("Write a function that throws an error when a name is empty.", "اكتب دالة ترمي خطأً عندما يكون الاسم فارغاً.")
    ),
    lesson(
      "timers",
      S2,
      t("Timers and callbacks", "المؤقتات والـ callbacks"),
      [
        "Some work takes time, such as reading a file or calling a server. JavaScript does not wait for it. It continues with the next lines and comes back when the result is ready. This is called asynchronous code.",
        "`setTimeout()` runs a function once after a delay in milliseconds. In the oldest style, a function receives a callback and calls it when the work finishes.",
      ],
      [
        "بعض الأعمال تستغرق وقتاً مثل قراءة ملف أو استدعاء خادم. لا تنتظرها JavaScript، بل تتابع الأسطر التالية وتعود عندما تجهز النتيجة. هذا ما يسمى الشيفرة غير المتزامنة.",
        "تنفّذ `setTimeout()` دالة مرة واحدة بعد تأخير بالمللي ثانية. وفي الأسلوب الأقدم تستقبل الدالة callback وتستدعيه عند انتهاء العمل.",
      ],
      [
        { lang: "js", text: `console.log("Start");
setTimeout(() => console.log("After 1 second"), 1000);
console.log("End");`, output: `Start
End
After 1 second` },
        { lang: "js", text: `function loadUser(id, callback) {
  setTimeout(() => callback({ id, name: "User " + id }), 100);
}
loadUser(7, (user) => console.log(user));`, output: "{ id: 7, name: 'User 7' }" },
      ],
      t("Print three messages with delays of 1, 2, and 3 seconds.", "اطبع ثلاث رسائل بتأخير 1 و2 و3 ثوانٍ.")
    ),
    lesson(
      "promises",
      S2,
      t("Promises", "الوعود Promises"),
      [
        "A promise represents a result that will arrive later. It can succeed with `resolve` or fail with `reject`. You read the result with `.then()`, handle errors with `.catch()`, and run final code with `.finally()`.",
        "`Promise.all()` waits for several promises together and gives all results in an array. If one fails, the whole thing fails.",
      ],
      [
        "الوعد (Promise) يمثل نتيجة ستصل لاحقاً. قد ينجح بـ `resolve` أو يفشل بـ `reject`. تقرأ النتيجة بـ `.then()` وتعالج الأخطاء بـ `.catch()` وتنفّذ الشيفرة الأخيرة بـ `.finally()`.",
        "تنتظر `Promise.all()` عدة وعود معاً وتعطي كل النتائج في مصفوفة. وإذا فشل واحد منها يفشل الكل.",
      ],
      [
        { lang: "js", text: `const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

wait(100)
  .then(() => {
    console.log("Waited");
    return 42;
  })
  .then((value) => console.log("Value:", value))
  .catch((error) => console.log("Error:", error.message))
  .finally(() => console.log("Done"));`, output: `Waited
Value: 42
Done` },
        { lang: "js", text: `const ok = Promise.resolve("A");
const slow = new Promise((resolve) => setTimeout(() => resolve("B"), 50));
Promise.all([ok, slow]).then((results) => console.log(results));
Promise.reject(new Error("failed")).catch((e) => console.log(e.message));`, output: `failed
[ 'A', 'B' ]` },
      ],
      t("Create a promise that resolves with `\"ready\"` after 500 milliseconds and print the value.", "أنشئ وعداً ينجح بالقيمة `\"ready\"` بعد 500 مللي ثانية واطبع القيمة.")
    ),
    lesson(
      "async-await",
      S2,
      t("async and await", "async وawait"),
      [
        "`async` and `await` let you write promise code that reads like normal code from top to bottom. A function marked `async` always returns a promise. Inside it, `await` pauses until a promise finishes.",
        "Use `try` and `catch` for errors. To run tasks at the same time, start them together and `await Promise.all()`, which is much faster than awaiting them one by one.",
      ],
      [
        "تتيح `async` و`await` كتابة شيفرة الوعود بحيث تُقرأ كشيفرة عادية من الأعلى إلى الأسفل. الدالة المعلّمة بـ `async` تُرجع وعداً دائماً. وداخلها توقف `await` التنفيذ حتى ينتهي الوعد.",
        "استخدم `try` و`catch` للأخطاء. ولتشغيل مهام في الوقت نفسه ابدأها معاً ثم `await Promise.all()`، وهذا أسرع كثيراً من انتظارها واحدة بعد أخرى.",
      ],
      [
        { lang: "js", text: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getNumber() {
  await wait(100);
  return 7;
}

async function main() {
  try {
    const n = await getNumber();
    console.log("Number:", n);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

main();`, output: "Number: 7" },
        { lang: "js", text: `const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main() {
  const [a, b] = await Promise.all([wait(100, "first"), wait(100, "second")]);
  console.log(a, b);
}

main();`, output: "first second" },
      ],
      t("Write an async function that waits one second and returns `\"done\"`, then print it.", "اكتب دالة async تنتظر ثانية وتُرجع `\"done\"` ثم اطبعها.")
    ),
    lesson(
      "modules",
      S3,
      t("Modules", "الوحدات Modules"),
      [
        "A module is a file that exports code for other files. Node supports two systems. CommonJS is the classic one: you export with `module.exports` and import with `require()`. ES modules use `export` and `import` and need the `.mjs` extension, or `\"type\": \"module\"` in `package.json`.",
        "Paths that start with `./` point to your own files, and names without a path point to built-in modules or installed packages. Built-in modules are written with the `node:` prefix.",
      ],
      [
        "الوحدة (module) ملف يصدّر شيفرة لملفات أخرى. يدعم Node نظامين. الأول CommonJS الكلاسيكي: تصدّر بـ `module.exports` وتستورد بـ `require()`. والثاني ES modules ويستخدم `export` و`import` ويحتاج الامتداد `.mjs` أو `\"type\": \"module\"` في `package.json`.",
        "المسارات التي تبدأ بـ `./` تشير إلى ملفاتك أنت، والأسماء بلا مسار تشير إلى وحدات مدمجة أو حزم مثبّتة. وتُكتب الوحدات المدمجة بالبادئة `node:`.",
      ],
      [
        { lang: "js", file: "math.js", text: `function add(a, b) {
  return a + b;
}

module.exports = { add, PI: 3.14 };` },
        { lang: "js", file: "main.js", text: `const { add, PI } = require("./math");

console.log(add(2, 3), PI);`, output: "5 3.14" },
        { lang: "js", file: "square.mjs", text: `export const square = (n) => n * n;` },
        { lang: "js", file: "main.mjs", text: `import { square } from "./square.mjs";

console.log(square(6));`, output: "36" },
      ],
      t("Create a file `greet.js` that exports a `greet(name)` function and use it from another file.", "أنشئ ملفاً `greet.js` يصدّر الدالة `greet(name)` واستخدمها من ملف آخر.")
    ),
    lesson(
      "path-os",
      S3,
      t("The path and os modules", "الوحدتان path وos"),
      [
        "The `path` module builds and reads file paths in a way that works on every operating system. Never join paths by hand with `+` and slashes.",
        "The `os` module gives information about the machine, such as the platform, the number of CPU cores, and the home folder.",
      ],
      [
        "تبني الوحدة `path` مسارات الملفات وتقرأها بطريقة تعمل على كل أنظمة التشغيل. لا تدمج المسارات يدوياً بـ `+` والشرطات المائلة.",
        "تعطي الوحدة `os` معلومات عن الجهاز مثل المنصة وعدد أنوية المعالج والمجلد الرئيسي.",
      ],
      [
        { lang: "js", text: `const path = require("node:path");

console.log(path.join("folder", "sub", "file.txt"));
console.log(path.basename("/a/b/notes.txt"));
console.log(path.extname("photo.png"));
console.log(path.dirname("/a/b/notes.txt"));`, output: `folder/sub/file.txt
notes.txt
.png
/a/b` },
        { lang: "js", text: `const os = require("node:os");

console.log(os.platform());
console.log(os.cpus().length);
console.log(os.homedir());` },
      ],
      t("Print the file extension of `report.final.pdf`.", "اطبع امتداد الملف `report.final.pdf`."),
      t("On Windows, `path.join` uses backslashes. That is exactly why you should use it.", "في Windows تستخدم `path.join` الشرطة المائلة العكسية. وهذا بالضبط سبب استخدامها.")
    ),
    lesson(
      "fs",
      S3,
      t("Working with files", "التعامل مع الملفات"),
      [
        "The `node:fs/promises` module reads and writes files with `async` and `await`, so the program is not blocked. `writeFile()` replaces the content, `appendFile()` adds to it, `readFile()` reads it, and `unlink()` deletes it.",
        "Use `mkdir()` to create a folder, `readdir()` to list a folder, and `rm()` to remove it. Wrap file work in `try` and `catch`, because a file may be missing.",
      ],
      [
        "تقرأ الوحدة `node:fs/promises` الملفات وتكتبها مع `async` و`await` فلا يتعطل البرنامج. تستبدل `writeFile()` المحتوى وتضيف `appendFile()` إليه وتقرؤه `readFile()` وتحذفه `unlink()`.",
        "استخدم `mkdir()` لإنشاء مجلد و`readdir()` لعرض محتوياته و`rm()` لحذفه. وضع عمل الملفات داخل `try` و`catch` لأن الملف قد يكون مفقوداً.",
      ],
      [
        { lang: "js", text: `const fs = require("node:fs/promises");

async function main() {
  await fs.writeFile("note.txt", "Hello file");
  await fs.appendFile("note.txt", " and more");
  const text = await fs.readFile("note.txt", "utf8");
  console.log(text);
  await fs.unlink("note.txt");
}

main();`, output: "Hello file and more" },
        { lang: "js", text: `const fs = require("node:fs/promises");

async function main() {
  await fs.mkdir("demo", { recursive: true });
  await fs.writeFile("demo/a.txt", "A");
  await fs.writeFile("demo/b.txt", "B");
  console.log(await fs.readdir("demo"));
  await fs.rm("demo", { recursive: true });
}

main();`, output: "[ 'a.txt', 'b.txt' ]" },
      ],
      t("Write a JSON file with your data, read it back, and print one property.", "اكتب ملف JSON ببياناتك ثم اقرأه واطبع خاصية واحدة.")
    ),
    lesson(
      "npm",
      S3,
      t("npm and packages", "npm والحزم"),
      [
        "`npm` installs packages written by other developers. `npm init -y` creates a `package.json` file that describes your project. `npm install name` downloads a package into the `node_modules` folder and adds it to `dependencies`.",
        "Tools used only while developing, such as `nodemon`, are installed with `--save-dev`. The `scripts` section lets you save commands and run them with `npm run`. Never upload `node_modules` to Git, list it in `.gitignore` instead.",
      ],
      [
        "يثبّت `npm` حزماً كتبها مطورون آخرون. ينشئ `npm init -y` ملف `package.json` الذي يصف مشروعك. وينزّل `npm install name` الحزمة إلى المجلد `node_modules` ويضيفها إلى `dependencies`.",
        "الأدوات التي تُستخدم أثناء التطوير فقط مثل `nodemon` تُثبَّت بالخيار `--save-dev`. ويتيح قسم `scripts` حفظ الأوامر وتشغيلها بـ `npm run`. لا ترفع `node_modules` إلى Git، بل ضعها في `.gitignore`.",
      ],
      [
        { lang: "bash", text: `npm init -y
npm install express
npm install --save-dev nodemon
npm uninstall express` },
        { lang: "json", file: "package.json", text: `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}` },
        { lang: "bash", text: `npm run dev` },
      ],
      t("Create a new folder, run `npm init -y`, and add a `start` script that prints a message.", "أنشئ مجلداً جديداً ونفّذ `npm init -y` وأضف سكربت `start` يطبع رسالة.")
    ),
    lesson(
      "process-env",
      S3,
      t("Arguments and environment variables", "الوسائط ومتغيرات البيئة"),
      [
        "`process.argv` is an array of the command line arguments. The first two items are the Node path and the file path, so use `slice(2)` to get your own arguments.",
        "`process.env` holds environment variables. Put settings such as ports and secret keys there, not inside the code. Node can load a `.env` file with the `--env-file` flag, available since version 20.6.",
      ],
      [
        "`process.argv` مصفوفة بوسائط سطر الأوامر. أول عنصرين هما مسار Node ومسار الملف، لذلك استخدم `slice(2)` لتحصل على وسائطك أنت.",
        "يحتوي `process.env` على متغيرات البيئة. ضع فيها الإعدادات مثل المنافذ والمفاتيح السرية، لا داخل الشيفرة. ويستطيع Node تحميل ملف `.env` بالخيار `--env-file` المتوفر منذ الإصدار 20.6.",
      ],
      [
        { lang: "js", file: "args.js", text: `console.log(process.argv.slice(2));
console.log(process.env.APP_MODE || "development");` },
        { lang: "bash", text: `node args.js hello 42`, output: `[ 'hello', '42' ]
development` },
        { lang: "ini", file: ".env", text: `APP_MODE=production
PORT=3000` },
        { lang: "bash", text: `node --env-file=.env args.js` },
      ],
      t("Write a program that prints `Hello` followed by the first argument.", "اكتب برنامجاً يطبع `Hello` ثم الوسيط الأول.")
    ),
    lesson(
      "events",
      S3,
      t("Events", "الأحداث Events"),
      [
        "Much of Node is built on events. An `EventEmitter` lets one part of your program announce that something happened with `emit()`, and other parts react to it with `on()`. `once()` reacts only the first time.",
        "Events keep parts of the program separate: the code that sends the event does not need to know who listens.",
      ],
      [
        "الكثير من Node مبني على الأحداث. يتيح `EventEmitter` لجزء من برنامجك أن يعلن عن وقوع شيء بـ `emit()`، وتتفاعل أجزاء أخرى معه بـ `on()`. وتتفاعل `once()` في المرة الأولى فقط.",
        "تُبقي الأحداث أجزاء البرنامج منفصلة: الشيفرة التي ترسل الحدث لا تحتاج إلى معرفة من يستمع.",
      ],
      [
        { lang: "js", text: `const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("order", (item, qty) => {
  console.log("Order received:", item, qty);
});
emitter.once("order", () => console.log("First order only"));

emitter.emit("order", "pizza", 2);
emitter.emit("order", "cake", 1);`, output: `Order received: pizza 2
First order only
Order received: cake 1` },
      ],
      t("Create an emitter that prints a welcome message when a `login` event is emitted.", "أنشئ emitter يطبع رسالة ترحيب عند إطلاق الحدث `login`.")
    ),
    lesson(
      "http-server",
      S3,
      t("Your first HTTP server", "أول خادم HTTP"),
      [
        "The `node:http` module creates a web server. The function you give to `createServer()` runs for every request and receives `req` (the request) and `res` (the response). You choose the status code and headers with `writeHead()` and send the body with `end()`.",
        "`req.url` and `req.method` tell you what the browser asked for. Return status 404 when the path does not exist. Run the file and open http://localhost:3000.",
      ],
      [
        "تنشئ الوحدة `node:http` خادم ويب. الدالة التي تعطيها لـ `createServer()` تُنفَّذ مع كل طلب وتستقبل `req` (الطلب) و`res` (الاستجابة). تحدد رمز الحالة والترويسات بـ `writeHead()` وترسل المحتوى بـ `end()`.",
        "يخبرك `req.url` و`req.method` بما طلبه المتصفح. أرجع الحالة 404 عندما لا يوجد المسار. شغّل الملف وافتح http://localhost:3000.",
      ],
      [
        { lang: "js", file: "server.js", text: `const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Home page");
  } else if (req.url === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ time: new Date().toISOString() }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, () => console.log("http://localhost:3000"));` },
      ],
      t("Add a route `/about` that returns a short text.", "أضف مساراً `/about` يُرجع نصاً قصيراً.")
    ),
    lesson(
      "json-api",
      S3,
      t("A small JSON API", "واجهة JSON صغيرة"),
      [
        "A request body arrives in pieces. Listen to the `data` event to collect the chunks and to the `end` event to know that the body is complete. Then parse it with `JSON.parse()`.",
        "This server stores items in memory. `POST /items` adds one and `GET /items` lists them. This is the work that Express will do for you in a few lines.",
      ],
      [
        "يصل جسم الطلب على قطع. استمع إلى الحدث `data` لتجمع القطع وإلى الحدث `end` لتعرف أن الجسم اكتمل. ثم حلّله بـ `JSON.parse()`.",
        "يخزّن هذا الخادم العناصر في الذاكرة. يضيف `POST /items` عنصراً ويعرضها `GET /items`. وهذا العمل سيؤديه Express عنك في أسطر قليلة.",
      ],
      [
        { lang: "js", file: "api.js", text: `const http = require("node:http");

const items = [];

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/items") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const item = JSON.parse(body);
      items.push(item);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item));
    });
  } else if (req.method === "GET" && req.url === "/items") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000);` },
        { lang: "bash", text: `curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"pen"}'`, output: `{"name":"pen"}` },
        { lang: "bash", text: `curl http://localhost:3000/items`, output: `[{"name":"pen"}]` },
      ],
      t("Add a `try` and `catch` around `JSON.parse` and return status 400 for invalid JSON.", "أضف `try` و`catch` حول `JSON.parse` وأرجع الحالة 400 عند JSON غير صالح."),
      t("Data in memory disappears when the server restarts. A database fixes this, and the Mongoose course shows how.", "البيانات في الذاكرة تضيع عند إعادة تشغيل الخادم. وقاعدة البيانات تحل هذه المشكلة، وتشرح دورة Mongoose كيف.")
    ),
    lesson(
      "project",
      S3,
      t("Mini project: word counter", "مشروع صغير: عدّاد الكلمات"),
      [
        "Let us combine files, objects, loops, and sorting. The program writes a text file, reads it, counts how many times each word appears, and prints the words from the most common to the least common.",
        "`Object.entries()` turns an object into an array of `[key, value]` pairs, which can be sorted by the count.",
      ],
      [
        "لنجمع الملفات والكائنات والحلقات والترتيب. يكتب البرنامج ملفاً نصياً ثم يقرؤه ويعدّ كم مرة ظهرت كل كلمة ويطبع الكلمات من الأكثر تكراراً إلى الأقل.",
        "تحوّل `Object.entries()` الكائن إلى مصفوفة أزواج `[key, value]` يمكن ترتيبها بحسب العدد.",
      ],
      [
        { lang: "js", file: "words.js", text: `const fs = require("node:fs/promises");

async function main() {
  await fs.writeFile("story.txt", "the cat and the dog and the bird");
  const text = await fs.readFile("story.txt", "utf8");
  const counts = {};
  for (const word of text.split(" ")) {
    counts[word] = (counts[word] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  for (const [word, count] of sorted) {
    console.log(word + ": " + count);
  }
  await fs.unlink("story.txt");
}

main();`, output: `the: 3
and: 2
cat: 1
dog: 1
bird: 1` },
      ],
      t("Change the program to print only the three most common words.", "غيّر البرنامج ليطبع الكلمات الثلاث الأكثر تكراراً فقط.")
    ),
  ],
};
