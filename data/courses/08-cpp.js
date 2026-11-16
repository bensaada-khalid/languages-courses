module.exports = {
  id: "cpp",
  badge: "C++",
  color: "#00599c",
  title: { en: "C++", ar: "C++" },
  summary: {
    en: "Learn modern C++: types, functions, containers, and classes.",
    ar: "تعلّم C++ الحديثة: الأنواع والدوال والحاويات والأصناف.",
  },
  lessons: [
    {
      id: "first-program",
      title: { en: "Your first program", ar: "أول برنامج" },
      body: {
        en: [
          "C++ is a compiled language: you write source code, a compiler turns it into a program, then you run it. Install g++ or clang and compile with the C++17 standard.",
          "Every program starts at `main`. `std::cin` reads input and `std::cout` prints output.",
        ],
        ar: [
          "C++ لغة مُترجَمة: تكتب الشيفرة المصدرية، ثم يحولها المترجم (Compiler) إلى برنامج، ثم تشغّله. ثبّت g++ أو clang وترجم باستخدام معيار C++17.",
          "يبدأ كل برنامج من الدالة `main`. يقرأ `std::cin` المدخلات ويطبع `std::cout` المخرجات.",
        ],
      },
      code: [
        {
          lang: "cpp",
          file: "main.cpp",
          text: `#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Your name: ";
    std::getline(std::cin, name);

    int year = 2026;
    double pi = 3.14159;

    std::cout << "Hello, " << name << std::endl;
    std::cout << "Year: " << year << ", pi: " << pi << std::endl;
    return 0;
}`,
        },
        { lang: "bash", text: `g++ -std=c++17 main.cpp -o app
./app` },
      ],
    },
    {
      id: "functions-vectors",
      title: { en: "Functions, loops and vectors", ar: "الدوال والحلقات والمتجهات" },
      body: {
        en: [
          "Functions group reusable logic. `std::vector` is a resizable array and the container you will use most. A range-based `for` loop visits every element.",
          "Pass large objects by `const` reference to avoid copying them.",
        ],
        ar: [
          "تجمع الدوال المنطق القابل لإعادة الاستخدام. `std::vector` مصفوفة قابلة لتغيير الحجم وهي الحاوية الأكثر استخداماً. وتزور حلقة `for` المعتمدة على المدى كل عنصر.",
          "مرّر الكائنات الكبيرة بمرجع `const` لتجنب نسخها.",
        ],
      },
      code: [
        {
          lang: "cpp",
          file: "scores.cpp",
          text: `#include <iostream>
#include <numeric>
#include <vector>

double average(const std::vector<int>& values) {
    if (values.empty()) {
        return 0.0;
    }
    int sum = std::accumulate(values.begin(), values.end(), 0);
    return static_cast<double>(sum) / values.size();
}

int main() {
    std::vector<int> scores = {90, 75, 82};
    scores.push_back(100);

    for (int score : scores) {
        std::cout << score << std::endl;
    }

    std::cout << "Average: " << average(scores) << std::endl;
    return 0;
}`,
        },
      ],
    },
    {
      id: "classes",
      title: { en: "Classes and objects", ar: "الأصناف والكائنات" },
      body: {
        en: [
          "A class bundles data and the functions that work on it. Mark data `private` and expose a small public interface; this is called encapsulation.",
          "A constructor initializes the object. Objects are destroyed automatically when they go out of scope, which is the basis of RAII in C++.",
        ],
        ar: [
          "يجمع الصنف (Class) البيانات والدوال التي تعمل عليها. اجعل البيانات `private` واكشف واجهة عامة صغيرة، وهذا ما يسمى التغليف (Encapsulation).",
          "يهيّئ المُنشئ الكائن. ويُتلَف الكائن تلقائياً عند خروجه من نطاقه، وهذا أساس مبدأ RAII في C++.",
        ],
      },
      code: [
        {
          lang: "cpp",
          file: "account.cpp",
          text: `#include <iostream>
#include <string>
#include <utility>

class BankAccount {
public:
    BankAccount(std::string owner, double balance)
        : owner_(std::move(owner)), balance_(balance) {}

    void deposit(double amount) {
        if (amount > 0) {
            balance_ += amount;
        }
    }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance_) {
            return false;
        }
        balance_ -= amount;
        return true;
    }

    double balance() const { return balance_; }

private:
    std::string owner_;
    double balance_;
};

int main() {
    BankAccount account("Nora", 100.0);
    account.deposit(50.0);
    std::cout << account.balance() << std::endl;
    return 0;
}`,
        },
      ],
    },
  ],
};
