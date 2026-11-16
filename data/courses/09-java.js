module.exports = {
  id: "java",
  badge: "Jv",
  color: "#e76f00",
  title: { en: "Java", ar: "Java" },
  summary: {
    en: "Object-oriented programming on the JVM: syntax, classes, collections, and streams.",
    ar: "البرمجة كائنية التوجه على JVM: الصياغة والأصناف والمجموعات والتدفقات.",
  },
  lessons: [
    {
      id: "first-program",
      title: { en: "Your first program", ar: "أول برنامج" },
      body: {
        en: [
          "Java code is compiled to bytecode that runs on the Java Virtual Machine. Install JDK 17 or newer, then compile with `javac` and run with `java`.",
          "Java is statically typed: every variable has a type such as `int`, `double`, `boolean`, or `String`.",
        ],
        ar: [
          "تُترجم شيفرة Java إلى بايت كود يعمل على آلة Java الافتراضية (JVM). ثبّت JDK 17 أو أحدث ثم ترجم بالأمر `javac` وشغّل بالأمر `java`.",
          "Java لغة ذات أنواع ثابتة: لكل متغير نوع مثل `int` و`double` و`boolean` و`String`.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "Main.java",
          text: `public class Main {
    public static void main(String[] args) {
        String name = "Karim";
        int age = 25;
        double height = 1.78;
        boolean student = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age + ", height: " + height);

        if (student) {
            System.out.println(name + " is a student");
        }

        for (int i = 1; i <= 3; i++) {
            System.out.println("Step " + i);
        }
    }
}`,
        },
        { lang: "bash", text: `javac Main.java
java Main` },
      ],
    },
    {
      id: "classes-collections",
      title: { en: "Classes and collections", ar: "الأصناف والمجموعات" },
      body: {
        en: [
          "A class defines the data and behavior of an object. `ArrayList` and `HashMap` are the collections you will use every day. A `record` is a short way to declare an immutable data class.",
          "Prefer interfaces such as `List` and `Map` for variable types.",
        ],
        ar: [
          "يعرّف الصنف بيانات الكائن وسلوكه. `ArrayList` و`HashMap` من المجموعات التي ستستخدمها يومياً. و`record` طريقة مختصرة لتعريف صنف بيانات غير قابل للتعديل.",
          "فضّل الواجهات مثل `List` و`Map` عند تحديد أنواع المتغيرات.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "Main.java",
          text: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    record Student(String name, int grade) {}

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Mona", 90));
        students.add(new Student("Adam", 72));

        Map<String, Integer> grades = new HashMap<>();
        for (Student student : students) {
            grades.put(student.name(), student.grade());
        }

        System.out.println(grades.get("Mona"));
        System.out.println(students.get(1));
    }
}`,
        },
      ],
    },
    {
      id: "interfaces-streams",
      title: { en: "Interfaces and streams", ar: "الواجهات والتدفقات" },
      body: {
        en: [
          "An interface defines a contract that classes implement, which lets you swap implementations easily. Streams process collections with a pipeline of operations such as `filter`, `map`, and `toList`.",
          "Streams do not change the original list; they produce a new result.",
        ],
        ar: [
          "تعرّف الواجهة عقداً تنفّذه الأصناف، مما يتيح تبديل التنفيذات بسهولة. وتعالج التدفقات (Streams) المجموعات عبر سلسلة عمليات مثل `filter` و`map` و`toList`.",
          "لا تغيّر التدفقات القائمة الأصلية؛ بل تنتج نتيجة جديدة.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "Main.java",
          text: `import java.util.List;

interface Discount {
    double apply(double price);
}

class TenPercent implements Discount {
    public double apply(double price) {
        return price * 0.9;
    }
}

public class Main {
    public static void main(String[] args) {
        Discount discount = new TenPercent();
        List<Double> prices = List.of(20.0, 55.5, 100.0, 8.0);

        List<Double> result = prices.stream()
            .filter(p -> p > 10)
            .map(discount::apply)
            .toList();

        System.out.println(result);
    }
}`,
        },
      ],
    },
  ],
};
