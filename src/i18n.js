const LANGS = ["ar", "en"];
const DEFAULT_LANG = "en";

const META = {
  ar: { dir: "rtl", name: "العربية" },
  en: { dir: "ltr", name: "English" },
};

const UI = {
  en: {
    siteName: "Code Academy",
    skip: "Skip to content",
    courses: "Courses",
    heroTitle: "Learn programming, one small lesson at a time",
    heroText:
      "Twelve free courses, from your first line of code to real-world projects. Every lesson is available in Arabic and English.",
    startCourse: "Start course",
    lessons: "Lessons",
    lessonLabel: "Lesson",
    next: "Next lesson",
    prev: "Previous lesson",
    backToCourse: "Back to course",
    allCourses: "All courses",
    toggleTheme: "Toggle dark mode",
    terminal: "Terminal",
    output: "Output",
    exercise: "Exercise",
    tip: "Tip",
    tryIt: "Try it yourself",
    copy: "Copy",
    copied: "Copied",
    notFoundTitle: "Page not found",
    notFoundText: "The page you are looking for does not exist or was moved.",
    errorTitle: "Something went wrong",
    errorText: "An unexpected error occurred. Please try again in a moment.",
    backHome: "Back to home",
    footer: "Built with Node.js and Express.",
    lessonsCount: (n) => (n === 1 ? "1 lesson" : n + " lessons"),
  },
  ar: {
    siteName: "أكاديمية الكود",
    skip: "تخطَّ إلى المحتوى",
    courses: "الدورات",
    heroTitle: "تعلّم البرمجة درساً صغيراً بعد درس",
    heroText:
      "اثنتا عشرة دورة مجانية، من أول سطر برمجي حتى المشاريع الواقعية. كل درس متوفر بالعربية والإنجليزية.",
    startCourse: "ابدأ الدورة",
    lessons: "الدروس",
    lessonLabel: "الدرس",
    next: "الدرس التالي",
    prev: "الدرس السابق",
    backToCourse: "العودة إلى الدورة",
    allCourses: "كل الدورات",
    toggleTheme: "تبديل الوضع الداكن",
    terminal: "الطرفية",
    output: "النتيجة",
    exercise: "تمرين",
    tip: "نصيحة",
    tryIt: "جرّب بنفسك",
    copy: "نسخ",
    copied: "تم النسخ",
    notFoundTitle: "الصفحة غير موجودة",
    notFoundText: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    errorTitle: "حدث خطأ ما",
    errorText: "وقع خطأ غير متوقع. حاول مرة أخرى بعد قليل.",
    backHome: "العودة إلى الرئيسية",
    footer: "بُني باستخدام Node.js وExpress.",
    lessonsCount: (n) => {
      if (n === 1) return "درس واحد";
      if (n === 2) return "درسان";
      if (n <= 10) return n + " دروس";
      return n + " درساً";
    },
  },
};

const isLang = (value) => LANGS.includes(value);
const otherLang = (lang) => (lang === "ar" ? "en" : "ar");

module.exports = { LANGS, DEFAULT_LANG, META, UI, isLang, otherLang };
