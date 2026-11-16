module.exports = {
  id: "react",
  badge: "Re",
  color: "#087ea4",
  title: { en: "React.js", ar: "React.js" },
  summary: {
    en: "Build interactive interfaces with components, JSX, state, and effects.",
    ar: "ابنِ واجهات تفاعلية باستخدام المكونات وJSX والحالة والتأثيرات.",
  },
  lessons: [
    {
      id: "components",
      title: { en: "Components and JSX", ar: "المكونات وJSX" },
      body: {
        en: [
          "React builds interfaces from small, reusable functions called components. JSX lets you write markup inside JavaScript. Create a project with `npm create vite@latest my-app -- --template react`.",
          "Props pass data into a component. A component name must start with a capital letter.",
        ],
        ar: [
          "تبني React الواجهات من دوال صغيرة قابلة لإعادة الاستخدام تسمى مكونات (Components). يتيح JSX كتابة الوسوم داخل جافاسكربت. أنشئ مشروعاً بالأمر `npm create vite@latest my-app -- --template react`.",
          "تمرّر الخصائص (Props) البيانات إلى المكون. ويجب أن يبدأ اسم المكون بحرف كبير.",
        ],
      },
      code: [
        {
          lang: "jsx",
          file: "src/App.jsx",
          text: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <main>
      <Greeting name="Layla" />
      <Greeting name="Youssef" />
    </main>
  );
}`,
        },
      ],
    },
    {
      id: "state",
      title: { en: "State with useState", ar: "الحالة مع useState" },
      body: {
        en: [
          "State is data that changes over time. Calling the setter function from `useState` makes React render the component again with the new value.",
          "Never change state directly. Always call the setter, and use the previous value when the new one depends on it.",
        ],
        ar: [
          "الحالة (State) هي بيانات تتغير مع الوقت. استدعاء دالة التعيين من `useState` يجعل React يعيد رسم المكون بالقيمة الجديدة.",
          "لا تعدّل الحالة مباشرة. استدعِ دالة التعيين دائماً، واستخدم القيمة السابقة عندما تعتمد القيمة الجديدة عليها.",
        ],
      },
      code: [
        {
          lang: "jsx",
          file: "src/Counter.jsx",
          text: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Click me</button>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "effects-lists",
      title: { en: "Effects and rendering lists", ar: "التأثيرات وعرض القوائم" },
      body: {
        en: [
          "`useEffect` runs code after the component renders, which is the right place to fetch data. The dependency array controls when it runs again, and an empty array means once.",
          "Render lists with `map` and give every item a stable `key`.",
        ],
        ar: [
          "يشغّل `useEffect` شيفرة بعد رسم المكون، وهو المكان المناسب لجلب البيانات. تتحكم مصفوفة الاعتماديات في موعد التشغيل مجدداً، والمصفوفة الفارغة تعني مرة واحدة فقط.",
          "اعرض القوائم باستخدام `map` وأعطِ كل عنصر `key` ثابتاً.",
        ],
      },
      code: [
        {
          lang: "jsx",
          file: "src/Users.jsx",
          text: `import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
        },
      ],
    },
  ],
};
