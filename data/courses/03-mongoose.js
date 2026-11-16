module.exports = {
  id: "mongoose",
  badge: "Mg",
  color: "#880000",
  title: { en: "Mongoose", ar: "Mongoose" },
  summary: {
    en: "Model your data and talk to MongoDB with schemas, CRUD operations, and validation.",
    ar: "صمّم بياناتك وتعامل مع MongoDB عبر المخططات وعمليات CRUD والتحقق.",
  },
  lessons: [
    {
      id: "schema",
      title: { en: "Connecting and defining a schema", ar: "الاتصال وتعريف المخطط" },
      body: {
        en: [
          "Mongoose is an object modeling library for MongoDB. A schema describes the shape of your documents, and a model gives you methods to query them.",
          "Install it with `npm install mongoose`, and make sure MongoDB is running locally or use a MongoDB Atlas connection string.",
        ],
        ar: [
          "Mongoose مكتبة لنمذجة الكائنات مع MongoDB. يصف المخطط (Schema) شكل مستنداتك، ويمنحك النموذج (Model) دوال للاستعلام عنها.",
          "ثبّتها بالأمر `npm install mongoose` وتأكد من تشغيل MongoDB محلياً أو استخدم رابط اتصال من MongoDB Atlas.",
        ],
      },
      code: [
        {
          lang: "js",
          file: "connect.js",
          text: `const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/academy");
  console.log("Connected, model:", User.modelName);
  await mongoose.disconnect();
}

main();`,
        },
      ],
    },
    {
      id: "crud",
      title: { en: "CRUD operations", ar: "عمليات CRUD" },
      body: {
        en: [
          "CRUD stands for create, read, update, and delete. Every Mongoose model method returns a promise, so use `await`.",
          "`findByIdAndUpdate` returns the old document unless you pass `{ new: true }`, and `runValidators` makes updates respect the schema rules.",
        ],
        ar: [
          "CRUD هي إنشاء وقراءة وتعديل وحذف. كل دالة في نموذج Mongoose تُرجع وعداً (Promise)، لذلك استخدم `await`.",
          "تُرجع `findByIdAndUpdate` المستند القديم ما لم تمرر `{ new: true }`، ويجعل الخيار `runValidators` التعديلات تحترم قواعد المخطط.",
        ],
      },
      code: [
        {
          lang: "js",
          file: "crud.js",
          text: `const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({ name: String, age: Number })
);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/academy");

  const created = await User.create({ name: "Omar", age: 30 });
  const found = await User.findById(created._id);
  const updated = await User.findByIdAndUpdate(
    created._id,
    { age: 31 },
    { new: true, runValidators: true }
  );
  await User.findByIdAndDelete(created._id);

  console.log(found.name, updated.age);
  await mongoose.disconnect();
}

main();`,
        },
      ],
    },
    {
      id: "queries-validation",
      title: { en: "Queries and validation", ar: "الاستعلامات والتحقق" },
      body: {
        en: [
          "Pass a filter object to `find` and chain `sort`, `limit`, and `select` to shape the result. Operators such as `$lte` express comparisons.",
          "Schemas can also hold custom validators. When validation fails, Mongoose throws a `ValidationError` that lists every invalid field.",
        ],
        ar: [
          "مرّر كائن مرشّح إلى `find` ثم سلسل `sort` و`limit` و`select` لتشكيل النتيجة. وتعبّر المعاملات مثل `$lte` عن المقارنات.",
          "يمكن أن يحتوي المخطط أيضاً على مدققات مخصصة. وعند فشل التحقق يرمي Mongoose الخطأ `ValidationError` الذي يسرد كل حقل غير صالح.",
        ],
      },
      code: [
        {
          lang: "js",
          file: "products.js",
          text: `const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: "Price must be positive",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shop");

  try {
    await Product.create({ title: "Pen", price: -1 });
  } catch (error) {
    console.log(error.errors.price.message);
  }

  const cheap = await Product.find({ price: { $lte: 20 } })
    .sort({ price: 1 })
    .limit(5)
    .select("title price");
  console.log(cheap);

  await mongoose.disconnect();
}

main();`,
        },
      ],
    },
  ],
};
