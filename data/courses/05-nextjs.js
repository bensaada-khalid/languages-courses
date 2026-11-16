module.exports = {
  id: "nextjs",
  badge: "Nx",
  color: "#111111",
  title: { en: "Next.js", ar: "Next.js" },
  summary: {
    en: "Create full-stack React apps with the App Router, dynamic routes, and route handlers.",
    ar: "أنشئ تطبيقات React متكاملة باستخدام App Router والمسارات الديناميكية ومعالجات المسارات.",
  },
  lessons: [
    {
      id: "app-router",
      title: { en: "Pages and layouts", ar: "الصفحات والتخطيطات" },
      body: {
        en: [
          "Next.js is a React framework with file-based routing. Create a project with `npx create-next-app@latest`. Every `page.js` inside the `app` folder becomes a route.",
          "A `layout.js` wraps its pages and stays mounted while the user navigates. Pages are Server Components by default, so they render on the server.",
        ],
        ar: [
          "Next.js إطار عمل مبني على React يعتمد التوجيه عبر الملفات. أنشئ مشروعاً بالأمر `npx create-next-app@latest`. كل ملف `page.js` داخل المجلد `app` يصبح مساراً.",
          "يغلّف الملف `layout.js` صفحاته ويبقى قائماً أثناء تنقل المستخدم. الصفحات مكونات خادم (Server Components) افتراضياً، أي أنها تُرسم على الخادم.",
        ],
      },
      code: [
        { lang: "bash", text: `npx create-next-app@latest my-site
cd my-site
npm run dev` },
        {
          lang: "jsx",
          file: "app/layout.js",
          text: `export const metadata = { title: "My Site" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
        },
        {
          lang: "jsx",
          file: "app/page.js",
          text: `import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <Link href="/courses/1">Open a course</Link>
    </main>
  );
}`,
        },
      ],
    },
    {
      id: "dynamic-routes",
      title: { en: "Dynamic routes and data", ar: "المسارات الديناميكية والبيانات" },
      body: {
        en: [
          "A folder named `[slug]` creates a dynamic segment. In recent versions `params` is a promise, so you read it with `await`.",
          "Because Server Components can be `async`, you can fetch data directly inside the page.",
        ],
        ar: [
          "ينشئ المجلد المسمى `[slug]` جزءاً ديناميكياً من المسار. في الإصدارات الحديثة تكون `params` وعداً (Promise)، لذلك تقرؤها بـ `await`.",
          "ولأن مكونات الخادم يمكن أن تكون `async`، تستطيع جلب البيانات مباشرة داخل الصفحة.",
        ],
      },
      code: [
        {
          lang: "jsx",
          file: "app/courses/[slug]/page.js",
          text: `import { notFound } from "next/navigation";

export default async function CoursePage({ params }) {
  const { slug } = await params;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + slug);
  if (!response.ok) {
    notFound();
  }
  const post = await response.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
        },
      ],
    },
    {
      id: "route-handlers",
      title: { en: "Route handlers and client components", ar: "معالجات المسارات ومكونات العميل" },
      body: {
        en: [
          "A `route.js` file defines an API endpoint using the Web `Request` and `Response` objects. Export a function named after the HTTP method.",
          'Add "use client" at the top of a file when you need state or browser events.',
        ],
        ar: [
          "يعرّف الملف `route.js` نقطة نهاية API باستخدام كائني الويب `Request` و`Response`. صدّر دالة تحمل اسم طريقة HTTP.",
          'أضف "use client" في أعلى الملف عندما تحتاج إلى حالة أو أحداث المتصفح.',
        ],
      },
      code: [
        {
          lang: "js",
          file: "app/api/hello/route.js",
          text: `export async function GET() {
  return Response.json({ message: "Hello from Next.js" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body }, { status: 201 });
}`,
        },
        {
          lang: "jsx",
          file: "app/like-button.js",
          text: `"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>Likes: {likes}</button>;
}`,
        },
      ],
    },
  ],
};
