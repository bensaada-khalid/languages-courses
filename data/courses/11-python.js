const t = (en, ar) => ({ en, ar });

const S1 = t("Python basics", "أساسيات Python");
const S2 = t("Input and control flow", "الإدخال وتدفق التحكم");
const S3 = t("Data structures", "هياكل البيانات");
const S4 = t("Functions", "الدوال");
const S5 = t("Beyond the basics", "ما بعد الأساسيات");

const lesson = (id, section, title, en, ar, code, exercise, tip) => ({
  id,
  section,
  title,
  body: { en, ar },
  code,
  exercise,
  tip,
});

module.exports = {
  id: "python",
  badge: "Py",
  color: "#3776ab",
  title: t("Python", "Python"),
  summary: t(
    "A complete beginner course: variables, loops, functions, data structures, files, and classes.",
    "دورة كاملة للمبتدئين: المتغيرات والحلقات والدوال وهياكل البيانات والملفات والأصناف."
  ),
  lessons: [
    lesson(
      "intro",
      S1,
      t("Introduction", "المقدمة"),
      [
        "Python is a popular programming language created by Guido van Rossum and released in 1991. It is used for web development, data analysis, automation, artificial intelligence, and scripting.",
        "Python is easy to read because it uses simple English-like words and indentation instead of braces. It runs on Windows, macOS, and Linux.",
        "Install Python from python.org, then open a terminal and check the version. Write your code in any text editor and save it in a file that ends with `.py`.",
      ],
      [
        "Python لغة برمجة شهيرة أنشأها جيدو فان روسوم وصدرت عام 1991. تُستخدم في تطوير الويب وتحليل البيانات والأتمتة والذكاء الاصطناعي وكتابة السكربتات.",
        "Python سهلة القراءة لأنها تستخدم كلمات قريبة من الإنجليزية والمسافة البادئة بدل الأقواس المعقوفة. وهي تعمل على Windows وmacOS وLinux.",
        "ثبّت Python من الموقع python.org ثم افتح الطرفية وتحقق من الإصدار. اكتب شيفرتك في أي محرر نصوص واحفظها في ملف ينتهي بـ `.py`.",
      ],
      [
        { lang: "bash", text: `python --version` },
        { lang: "python", file: "hello.py", text: `print("Hello, World!")`, output: "Hello, World!" },
        { lang: "bash", text: `python hello.py` },
      ],
      t("Write a program that prints your name.", "اكتب برنامجاً يطبع اسمك."),
      t("On some systems the command is `python3` instead of `python`.", "في بعض الأنظمة يكون الأمر `python3` بدل `python`.")
    ),
    lesson(
      "syntax",
      S1,
      t("Syntax and indentation", "الصياغة والمسافة البادئة"),
      [
        "Python uses indentation (spaces at the start of a line) to mark a block of code. Other languages use braces, but in Python the spaces are part of the syntax. Use four spaces for each level.",
        "If you forget the indentation, Python stops and shows an error. Python is also case sensitive, so `age` and `Age` are different names.",
        "Anything after the `#` sign on a line is a comment. Python ignores it, and you can use it to leave notes for yourself.",
      ],
      [
        "تستخدم Python المسافة البادئة (المسافات في بداية السطر) لتحديد كتلة الشيفرة. اللغات الأخرى تستخدم الأقواس المعقوفة، أما في Python فالمسافات جزء من الصياغة. استخدم أربع مسافات لكل مستوى.",
        "إذا نسيت المسافة البادئة تتوقف Python وتعرض خطأ. وPython حساسة لحالة الأحرف، فالاسمان `age` و`Age` مختلفان.",
        "أي نص بعد علامة `#` في السطر هو تعليق. تتجاهله Python ويمكنك استخدامه لكتابة ملاحظات لنفسك.",
      ],
      [
        { lang: "python", text: `if 5 > 2:
    print("Five is greater than two")`, output: "Five is greater than two" },
        { lang: "python", text: `if 5 > 2:
print("Five is greater than two")`, output: "IndentationError: expected an indented block after 'if' statement on line 1" },
        { lang: "python", text: `age = 20
Age = 30
print(age, Age)`, output: "20 30" },
      ],
      t("Write an `if` statement that prints `Yes` when 10 is greater than 3.", "اكتب جملة `if` تطبع `Yes` عندما يكون 10 أكبر من 3.")
    ),
    lesson(
      "variables",
      S1,
      t("Variables", "المتغيرات"),
      [
        "A variable is a name that stores a value. You create it by writing the name, an equals sign, and the value. Python decides the type of the variable from the value, so you do not declare it first.",
        "A variable name must start with a letter or an underscore, cannot contain spaces, and cannot start with a number. The common style is lowercase words joined by underscores, like `user_name`.",
        "You can change the value of a variable at any time, even to a value of a different type. You can also assign several variables in one line.",
      ],
      [
        "المتغير اسم يخزّن قيمة. تنشئه بكتابة الاسم ثم علامة المساواة ثم القيمة. تحدد Python نوع المتغير من القيمة، فلا تحتاج إلى تعريفه مسبقاً.",
        "يجب أن يبدأ اسم المتغير بحرف أو شرطة سفلية، ولا يحتوي على مسافات، ولا يبدأ برقم. الأسلوب الشائع كلمات صغيرة تفصل بينها شرطة سفلية مثل `user_name`.",
        "يمكنك تغيير قيمة المتغير في أي وقت، حتى إلى قيمة من نوع مختلف. ويمكنك أيضاً إسناد عدة متغيرات في سطر واحد.",
      ],
      [
        { lang: "python", text: `name = "Huda"
age = 21
price = 9.99
print(name)
print(age)
print(price)`, output: `Huda
21
9.99` },
        { lang: "python", text: `x = 5
x = "five"
a, b, c = 1, 2, 3
print(x)
print(a + b + c)`, output: `five
6` },
      ],
      t("Create two variables, `city` and `population`, and print them.", "أنشئ متغيرين `city` و`population` ثم اطبعهما.")
    ),
    lesson(
      "data-types",
      S1,
      t("Data types", "أنواع البيانات"),
      [
        "Every value has a type. The basic types are `str` for text, `int` for whole numbers, `float` for decimal numbers, and `bool` for `True` or `False`. `None` means no value.",
        "Use the `type()` function to see the type of a value. You can convert between types with `int()`, `float()`, and `str()`.",
      ],
      [
        "لكل قيمة نوع. الأنواع الأساسية هي `str` للنص و`int` للأعداد الصحيحة و`float` للأعداد العشرية و`bool` للقيمتين `True` أو `False`. وتعني `None` عدم وجود قيمة.",
        "استخدم الدالة `type()` لمعرفة نوع القيمة. ويمكنك التحويل بين الأنواع بالدوال `int()` و`float()` و`str()`.",
      ],
      [
        { lang: "python", text: `print(type("hello"))
print(type(10))
print(type(3.14))
print(type(True))
print(type([1, 2]))
print(type(None))`, output: `<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
<class 'list'>
<class 'NoneType'>` },
        { lang: "python", text: `a = int("42")
b = float(3)
c = str(100)
print(a + 1, b, c + "!")`, output: "43 3.0 100!" },
      ],
      t("Convert the text `\"7\"` to a number and print it plus 3.", "حوّل النص `\"7\"` إلى عدد واطبعه مضافاً إليه 3.")
    ),
    lesson(
      "numbers",
      S1,
      t("Numbers and operators", "الأعداد والمعاملات"),
      [
        "Python can work as a calculator. The operators are `+`, `-`, `*`, and `/` for division. `//` gives the whole part of a division, `%` gives the remainder, and `**` is the power.",
        "Division with `/` always returns a `float`. Short forms such as `x += 2` add to the variable. Built-in functions such as `round()`, `abs()`, and `max()` help with common tasks.",
      ],
      [
        "تعمل Python كآلة حاسبة. المعاملات هي `+` و`-` و`*` و`/` للقسمة. ويعطي `//` الجزء الصحيح من القسمة، ويعطي `%` الباقي، ويمثل `**` القوة.",
        "القسمة بالمعامل `/` تُرجع دائماً `float`. والصيغ المختصرة مثل `x += 2` تضيف إلى المتغير. وتساعدك دوال مدمجة مثل `round()` و`abs()` و`max()` في المهام الشائعة.",
      ],
      [
        { lang: "python", text: `print(10 + 3)
print(10 - 3)
print(10 * 3)
print(10 / 3)
print(10 // 3)
print(10 % 3)
print(2 ** 3)`, output: `13
7
30
3.3333333333333335
3
1
8` },
        { lang: "python", text: `print(round(3.14159, 2))
print(abs(-7))
print(max(4, 9, 2))
x = 5
x += 2
print(x)`, output: `3.14
7
9
7` },
      ],
      t("Calculate the area of a circle with radius 4 using `3.14`.", "احسب مساحة دائرة نصف قطرها 4 باستخدام `3.14`.")
    ),
    lesson(
      "strings",
      S1,
      t("Strings", "السلاسل النصية"),
      [
        "A string is text inside single or double quotes. Each character has a position called an index, and the first index is `0`. A negative index counts from the end.",
        "A slice such as `text[0:3]` takes part of a string. Use `len()` for the length and `in` to check if a part exists. An f-string, written as `f\"...\"`, puts variables inside text.",
      ],
      [
        "السلسلة النصية هي نص داخل علامتي اقتباس مفردتين أو مزدوجتين. لكل حرف موضع يسمى الفهرس، وأول فهرس هو `0`. والفهرس السالب يعدّ من النهاية.",
        "الشريحة مثل `text[0:3]` تأخذ جزءاً من النص. استخدم `len()` للطول و`in` للتحقق من وجود جزء. وسلسلة f-string وتُكتب `f\"...\"` تضع المتغيرات داخل النص.",
      ],
      [
        { lang: "python", text: `text = "Python"
print(text[0])
print(text[-1])
print(text[0:3])
print(len(text))
print("Py" in text)`, output: `P
n
Pyt
6
True` },
        { lang: "python", text: `name = "Sara"
score = 95
print(f"{name} scored {score}%")
print("Hello " + name)
print("ha" * 3)`, output: `Sara scored 95%
Hello Sara
hahaha` },
      ],
      t("Print the first and last letters of your name.", "اطبع أول حرف وآخر حرف من اسمك.")
    ),
    lesson(
      "string-methods",
      S1,
      t("String methods", "دوال السلاسل النصية"),
      [
        "Strings have many built-in methods. A method is called with a dot after the value. Methods never change the original string, they return a new one.",
        "The most useful ones are `strip()` to remove spaces, `upper()` and `lower()` to change the case, `replace()`, `split()` to break text into a list, and `join()` to build text from a list.",
      ],
      [
        "للسلاسل النصية دوال مدمجة كثيرة. تُستدعى الدالة بنقطة بعد القيمة. ولا تغيّر الدوال السلسلة الأصلية، بل تُرجع سلسلة جديدة.",
        "أكثرها فائدة `strip()` لحذف المسافات و`upper()` و`lower()` لتغيير حالة الأحرف و`replace()` و`split()` لتقسيم النص إلى قائمة و`join()` لبناء نص من قائمة.",
      ],
      [
        { lang: "python", text: `s = "  Hello, Python  "
print(s.strip())
print(s.upper())
print(s.lower())
print(s.replace("Python", "World"))
print(s.strip().split(", "))`, output: `Hello, Python
  HELLO, PYTHON  
  hello, python  
  Hello, World  
['Hello', 'Python']` },
        { lang: "python", text: `words = ["a", "b", "c"]
print("-".join(words))
print("python".capitalize())
print("banana".count("a"))
print("banana".find("n"))
print("python".startswith("py"))`, output: `a-b-c
Python
3
2
True` },
      ],
      t("Take the text `\"  hello  \"`, remove the spaces, and print it in capital letters.", "خذ النص `\"  hello  \"` واحذف مسافاته واطبعه بأحرف كبيرة.")
    ),
    lesson(
      "booleans",
      S1,
      t("Booleans and comparisons", "القيم المنطقية والمقارنات"),
      [
        "A boolean has only two values: `True` and `False`. Comparison operators such as `>`, `<`, `>=`, `<=`, `==` (equal), and `!=` (not equal) return a boolean.",
        "Use `and`, `or`, and `not` to combine conditions. Empty values such as `0`, `\"\"`, and `[]` count as `False`, and most other values count as `True`.",
      ],
      [
        "للقيمة المنطقية قيمتان فقط: `True` و`False`. وتُرجع معاملات المقارنة مثل `>` و`<` و`>=` و`<=` و`==` (يساوي) و`!=` (لا يساوي) قيمة منطقية.",
        "استخدم `and` و`or` و`not` لدمج الشروط. القيم الفارغة مثل `0` و`\"\"` و`[]` تُعد `False`، وأغلب القيم الأخرى تُعد `True`.",
      ],
      [
        { lang: "python", text: `print(5 > 3)
print(5 == 3)
print(5 != 3)
print(bool(0), bool("hi"), bool([]))`, output: `True
False
True
False True False` },
        { lang: "python", text: `age = 25
has_id = True
print(age >= 18 and has_id)
print(age < 18 or has_id)
print(not has_id)`, output: `True
True
False` },
      ],
      t("Print whether `7` is an even number using `%`.", "اطبع هل العدد `7` زوجي باستخدام `%`.")
    ),
    lesson(
      "input",
      S2,
      t("User input", "إدخال المستخدم"),
      [
        "The `input()` function shows a message and waits for the user to type. It always returns a string, even when the user types digits.",
        "To do math with the input, convert it with `int()` or `float()` first.",
      ],
      [
        "تعرض الدالة `input()` رسالة وتنتظر من المستخدم الكتابة. وهي تُرجع دائماً سلسلة نصية حتى لو كتب المستخدم أرقاماً.",
        "لإجراء عمليات حسابية على المُدخل حوّله أولاً بالدالة `int()` أو `float()`.",
      ],
      [
        { lang: "python", text: `name = input("Your name: ")
age = int(input("Your age: "))
print(f"Hello {name}, next year you will be {age + 1}")`, output: `Your name: Omar
Your age: 20
Hello Omar, next year you will be 21` },
      ],
      t("Ask for two numbers and print their sum.", "اطلب من المستخدم عددين واطبع مجموعهما."),
      t("If the user types letters where you expect a number, `int()` raises an error. You will learn to handle this in the exceptions lesson.", "إذا كتب المستخدم حروفاً حيث تتوقع عدداً فإن `int()` يسبب خطأً. ستتعلم معالجة ذلك في درس الاستثناءات.")
    ),
    lesson(
      "if-else",
      S2,
      t("If, elif and else", "الشروط if وelif وelse"),
      [
        "Conditions let your program choose what to do. The code under `if` runs when the condition is true. Use `elif` for more conditions, and `else` for everything else.",
        "Python checks the conditions from top to bottom and runs only the first block that is true. A short form called a conditional expression puts the whole choice on one line.",
      ],
      [
        "تتيح الشروط لبرنامجك أن يختار ما يفعله. تُنفَّذ الشيفرة تحت `if` عندما يكون الشرط صحيحاً. استخدم `elif` لشروط إضافية و`else` لكل ما عدا ذلك.",
        "تفحص Python الشروط من الأعلى إلى الأسفل وتنفّذ أول كتلة صحيحة فقط. وهناك صيغة مختصرة تسمى التعبير الشرطي تضع الاختيار كله في سطر واحد.",
      ],
      [
        { lang: "python", text: `temperature = 28
if temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
else:
    print("Cold")`, output: "Warm" },
        { lang: "python", text: `age = 17
status = "adult" if age >= 18 else "minor"
print(status)`, output: "minor" },
      ],
      t("Write a program that prints `Pass` if a score is 50 or more, and `Fail` otherwise.", "اكتب برنامجاً يطبع `Pass` إذا كانت الدرجة 50 أو أكثر وإلا يطبع `Fail`.")
    ),
    lesson(
      "while-loop",
      S2,
      t("While loops", "حلقة while"),
      [
        "A `while` loop repeats a block of code as long as its condition is true. You must change something inside the loop so the condition becomes false at some point.",
        "If the condition never becomes false the loop runs forever. You can stop a program from the terminal with Ctrl+C.",
      ],
      [
        "تكرر حلقة `while` كتلة من الشيفرة طالما كان شرطها صحيحاً. يجب أن تغيّر شيئاً داخل الحلقة ليصبح الشرط خاطئاً في وقت ما.",
        "إذا لم يصبح الشرط خاطئاً فستعمل الحلقة إلى الأبد. ويمكنك إيقاف البرنامج من الطرفية بالضغط على Ctrl+C.",
      ],
      [
        { lang: "python", text: `count = 1
while count <= 3:
    print("Count:", count)
    count += 1`, output: `Count: 1
Count: 2
Count: 3` },
      ],
      t("Print the numbers from 10 down to 1 with a `while` loop.", "اطبع الأعداد من 10 نزولاً إلى 1 باستخدام حلقة `while`.")
    ),
    lesson(
      "for-loop",
      S2,
      t("For loops and range", "حلقة for والدالة range"),
      [
        "A `for` loop goes through each item of a sequence such as a list or a string. It is the loop you will use most often.",
        "The `range()` function creates a sequence of numbers. `range(1, 6, 2)` starts at 1, stops before 6, and moves by 2. Use `enumerate()` when you also need the position of each item.",
      ],
      [
        "تمر حلقة `for` على كل عنصر في تسلسل مثل قائمة أو نص. وهي الحلقة التي ستستخدمها أكثر من غيرها.",
        "تنشئ الدالة `range()` تسلسلاً من الأعداد. فالتعبير `range(1, 6, 2)` يبدأ من 1 ويتوقف قبل 6 ويتقدم بخطوة 2. استخدم `enumerate()` عندما تحتاج أيضاً إلى موضع كل عنصر.",
      ],
      [
        { lang: "python", text: `for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

for i in range(1, 6, 2):
    print(i)`, output: `apple
banana
cherry
1
3
5` },
        { lang: "python", text: `for i, letter in enumerate("abc"):
    print(i, letter)`, output: `0 a
1 b
2 c` },
      ],
      t("Print the multiplication table of 5 from 1 to 10.", "اطبع جدول ضرب العدد 5 من 1 إلى 10.")
    ),
    lesson(
      "break-continue",
      S2,
      t("Break, continue and pass", "break وcontinue وpass"),
      [
        "`break` stops the loop completely. `continue` skips the rest of the current round and goes to the next one. `pass` does nothing and is used when Python needs a block but you have no code yet.",
      ],
      [
        "يوقف `break` الحلقة تماماً. ويتخطى `continue` بقية الدورة الحالية وينتقل إلى التالية. أما `pass` فلا يفعل شيئاً ويُستخدم عندما تطلب Python كتلة وليس لديك شيفرة بعد.",
      ],
      [
        { lang: "python", text: `for n in range(1, 10):
    if n == 3:
        continue
    if n == 6:
        break
    print(n)`, output: `1
2
4
5` },
        { lang: "python", text: `for n in range(3):
    pass
print("done")`, output: "done" },
      ],
      t("Loop over 1 to 20 and stop at the first number divisible by 7.", "مرّ على الأعداد من 1 إلى 20 وتوقف عند أول عدد يقبل القسمة على 7.")
    ),
    lesson(
      "lists",
      S3,
      t("Lists", "القوائم"),
      [
        "A list stores many items in order inside square brackets. Lists can be changed, they can hold any type, and they can have duplicates. The first item has index `0`.",
        "Use `append()` to add at the end, `insert()` to add at a position, `remove()` to delete a value, and `pop()` to remove the last item. `sort()` orders the list in place.",
      ],
      [
        "تخزّن القائمة عناصر كثيرة بترتيب داخل أقواس مربعة. يمكن تعديل القوائم، وتحتوي أي نوع، ويمكن أن تتكرر فيها العناصر. أول عنصر فهرسه `0`.",
        "استخدم `append()` للإضافة في النهاية و`insert()` للإضافة في موضع محدد و`remove()` لحذف قيمة و`pop()` لإزالة آخر عنصر. وتُرتّب `sort()` القائمة نفسها.",
      ],
      [
        { lang: "python", text: `fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits.insert(1, "kiwi")
fruits.remove("banana")
print(fruits)
print(fruits[0], fruits[-1])
print(len(fruits))`, output: `['apple', 'kiwi', 'cherry', 'orange']
apple orange
4` },
        { lang: "python", text: `numbers = [5, 2, 9, 1]
numbers.sort()
print(numbers)
print(numbers[1:3])
print(sum(numbers))
last = numbers.pop()
print(last, numbers)`, output: `[1, 2, 5, 9]
[2, 5]
17
9 [1, 2, 5]` },
      ],
      t("Create a list of five names and print the third one.", "أنشئ قائمة من خمسة أسماء واطبع الاسم الثالث.")
    ),
    lesson(
      "tuples",
      S3,
      t("Tuples", "المجموعات المرتبة tuples"),
      [
        "A tuple is like a list but it cannot be changed after it is created. It is written with round brackets and is good for values that belong together, such as a point with x and y.",
        "You can unpack a tuple into several variables in one line.",
      ],
      [
        "الـ tuple يشبه القائمة لكنه لا يمكن تغييره بعد إنشائه. يُكتب بأقواس دائرية ويناسب القيم المترابطة مثل نقطة لها x وy.",
        "ويمكنك فك الـ tuple إلى عدة متغيرات في سطر واحد.",
      ],
      [
        { lang: "python", text: `point = (3, 4)
print(point[0])
x, y = point
print(x + y)`, output: `3
7` },
        { lang: "python", text: `point = (3, 4)
point[0] = 10`, output: "TypeError: 'tuple' object does not support item assignment" },
      ],
      t("Create a tuple with a name and an age, then unpack it into two variables.", "أنشئ tuple فيه اسم وعمر ثم فكّه إلى متغيرين.")
    ),
    lesson(
      "dictionaries",
      S3,
      t("Dictionaries", "القواميس"),
      [
        "A dictionary stores data as key and value pairs inside curly braces. You read a value by its key instead of a position. Keys must be unique.",
        "`get()` reads a key safely and returns a default if the key is missing. Use `items()` to loop over keys and values together, and `del` to delete a key.",
      ],
      [
        "يخزّن القاموس البيانات على شكل أزواج مفتاح وقيمة داخل أقواس معقوفة. تقرأ القيمة بمفتاحها بدل موضعها. ويجب أن تكون المفاتيح فريدة.",
        "تقرأ `get()` مفتاحاً بأمان وتُرجع قيمة افتراضية إن لم يوجد. استخدم `items()` للمرور على المفاتيح والقيم معاً و`del` لحذف مفتاح.",
      ],
      [
        { lang: "python", text: `student = {"name": "Lina", "age": 20}
student["city"] = "Rabat"
print(student["name"])
print(student.get("grade", "none"))
print(student)`, output: `Lina
none
{'name': 'Lina', 'age': 20, 'city': 'Rabat'}` },
        { lang: "python", text: `prices = {"tea": 5, "coffee": 8}
for item, price in prices.items():
    print(item, price)
print(list(prices.keys()))
del prices["tea"]
print(prices)`, output: `tea 5
coffee 8
['tea', 'coffee']
{'coffee': 8}` },
      ],
      t("Create a dictionary for a book with a title and a year, then add an author.", "أنشئ قاموساً لكتاب فيه عنوان وسنة ثم أضف إليه المؤلف.")
    ),
    lesson(
      "sets",
      S3,
      t("Sets", "المجموعات sets"),
      [
        "A set stores unique items without a fixed order. Adding a duplicate does nothing. Sets are fast for checking if a value exists.",
        "Sets support math operations: `|` for the union, `&` for the items in both sets, and `-` for the difference.",
      ],
      [
        "تخزّن المجموعة (set) عناصر فريدة دون ترتيب ثابت. إضافة عنصر مكرر لا تفعل شيئاً. والمجموعات سريعة في التحقق من وجود قيمة.",
        "تدعم المجموعات عمليات رياضية: `|` للاتحاد و`&` للعناصر المشتركة و`-` للفرق.",
      ],
      [
        { lang: "python", text: `colors = {"red", "green", "red", "blue"}
print(len(colors))
colors.add("yellow")
print("red" in colors)
a = {1, 2, 3}
b = {3, 4}
print(a | b)
print(a & b)`, output: `3
True
{1, 2, 3, 4}
{3}` },
      ],
      t("Remove the duplicates from `[1, 2, 2, 3, 3, 3]` using a set.", "احذف التكرار من `[1, 2, 2, 3, 3, 3]` باستخدام set.")
    ),
    lesson(
      "functions",
      S4,
      t("Functions", "الدوال"),
      [
        "A function is a named block of code that you can run many times. You create it with `def`, give it parameters, and send a result back with `return`.",
        "A function that has no `return` gives back `None`. A function can return several values, which Python packs into a tuple.",
      ],
      [
        "الدالة كتلة شيفرة لها اسم يمكنك تشغيلها مرات كثيرة. تنشئها بـ `def` وتعطيها معاملات وتُرجع النتيجة بـ `return`.",
        "الدالة التي ليس فيها `return` تُرجع `None`. ويمكن للدالة أن تُرجع عدة قيم تجمعها Python في tuple.",
      ],
      [
        { lang: "python", text: `def greet(name):
    return "Hello, " + name

def add(a, b):
    return a + b

print(greet("Ali"))
print(add(2, 3))`, output: `Hello, Ali
5` },
        { lang: "python", text: `def min_max(values):
    return min(values), max(values)

low, high = min_max([4, 8, 1])
print(low, high)`, output: "1 8" },
      ],
      t("Write a function `square(n)` that returns `n * n`.", "اكتب دالة `square(n)` تُرجع `n * n`.")
    ),
    lesson(
      "arguments",
      S4,
      t("Function arguments", "معاملات الدوال"),
      [
        "A parameter can have a default value, so the caller may skip it. You can also call a function with keyword arguments in any order.",
        "Use `*args` to accept any number of positional values, and `**kwargs` to accept any number of named values.",
      ],
      [
        "يمكن أن يكون للمعامل قيمة افتراضية فيستطيع المستدعي تجاهله. ويمكنك أيضاً استدعاء الدالة بمعاملات مسماة بأي ترتيب.",
        "استخدم `*args` لقبول أي عدد من القيم الموضعية و`**kwargs` لقبول أي عدد من القيم المسماة.",
      ],
      [
        { lang: "python", text: `def power(base, exponent=2):
    return base ** exponent

print(power(4))
print(power(2, 5))
print(power(exponent=3, base=2))`, output: `16
32
8` },
        { lang: "python", text: `def total(*numbers):
    return sum(numbers)

def show(**info):
    for key, value in info.items():
        print(key, value)

print(total(1, 2, 3))
show(name="Sam", age=30)`, output: `6
name Sam
age 30` },
      ],
      t("Write a function `welcome(name, greeting=\"Hello\")` that returns the full message.", "اكتب دالة `welcome(name, greeting=\"Hello\")` تُرجع الرسالة كاملة.")
    ),
    lesson(
      "lambda-comprehensions",
      S4,
      t("Lambda and comprehensions", "lambda والاشتمالات"),
      [
        "A `lambda` is a small function written in one line without a name. It is often used as a short helper, for example as the `key` of `sorted()`.",
        "A comprehension builds a new list, dictionary, or set from a loop in one readable line. You can add `if` at the end to filter the items.",
      ],
      [
        "الـ `lambda` دالة صغيرة تُكتب في سطر واحد دون اسم. وتُستخدم غالباً كمساعد قصير، مثل `key` في `sorted()`.",
        "يبني الاشتمال قائمة أو قاموساً أو مجموعة جديدة من حلقة في سطر واحد مقروء. ويمكنك إضافة `if` في النهاية لتصفية العناصر.",
      ],
      [
        { lang: "python", text: `double = lambda x: x * 2
print(double(5))

nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]
squares = {n: n * n for n in range(1, 4)}
print(evens)
print(squares)
print(sorted(["pear", "fig", "apple"], key=lambda w: len(w)))`, output: `10
[2, 4, 6]
{1: 1, 2: 4, 3: 9}
['fig', 'pear', 'apple']` },
      ],
      t("Use a comprehension to make a list of the squares of 1 to 5.", "استخدم اشتمالاً لإنشاء قائمة مربعات الأعداد من 1 إلى 5.")
    ),
    lesson(
      "modules",
      S5,
      t("Modules", "الوحدات modules"),
      [
        "A module is a file of Python code that you can reuse. Python comes with many modules, such as `math` and `datetime`. You load a module with `import`, or load a single name with `from ... import`.",
        "Your own files are modules too. Put functions in one file and import that file from another file in the same folder.",
      ],
      [
        "الوحدة (module) ملف شيفرة Python يمكنك إعادة استخدامه. تأتي Python مع وحدات كثيرة مثل `math` و`datetime`. تحمّل الوحدة بـ `import` أو تحمّل اسماً واحداً بـ `from ... import`.",
        "ملفاتك أنت وحدات أيضاً. ضع الدوال في ملف واحد ثم استورد ذلك الملف من ملف آخر في المجلد نفسه.",
      ],
      [
        { lang: "python", text: `import math
from datetime import date

print(math.sqrt(16))
print(math.floor(3.7))
print(math.pi)
print(date(2026, 1, 15).strftime("%d/%m/%Y"))`, output: `4.0
3
3.141592653589793
15/01/2026` },
        { lang: "python", file: "helpers.py", text: `def square(n):
    return n * n` },
        { lang: "python", file: "main.py", text: `import helpers

print(helpers.square(6))`, output: "36" },
      ],
      t("Use `math.ceil` to round `4.2` up.", "استخدم `math.ceil` لتقريب `4.2` إلى الأعلى.")
    ),
    lesson(
      "files",
      S5,
      t("Reading and writing files", "قراءة الملفات وكتابتها"),
      [
        "Use `open()` with a mode: `\"r\"` to read, `\"w\"` to write (it replaces the old content), and `\"a\"` to append. Always open files with `with`, because it closes the file for you even if an error happens.",
        "A file object can be looped over line by line. Use `encoding=\"utf-8\"` so that Arabic and other languages are saved correctly.",
      ],
      [
        "استخدم `open()` مع نمط: `\"r\"` للقراءة و`\"w\"` للكتابة (تستبدل المحتوى القديم) و`\"a\"` للإضافة في النهاية. افتح الملفات دائماً بـ `with` لأنها تغلق الملف عنك حتى لو حدث خطأ.",
        "يمكنك المرور على كائن الملف سطراً بسطر. واستخدم `encoding=\"utf-8\"` لتُحفظ العربية واللغات الأخرى بشكل صحيح.",
      ],
      [
        { lang: "python", text: `with open("notes.txt", "w", encoding="utf-8") as file:
    print("First line", file=file)
    print("Second line", file=file)

with open("notes.txt", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`, output: `First line
Second line` },
        { lang: "python", text: `with open("notes.txt", "a", encoding="utf-8") as file:
    print("Third line", file=file)

with open("notes.txt", encoding="utf-8") as file:
    content = file.read()
print(len(content.splitlines()))`, output: "3" },
      ],
      t("Write three names to a file and read them back.", "اكتب ثلاثة أسماء في ملف ثم اقرأها.")
    ),
    lesson(
      "exceptions",
      S5,
      t("Exceptions", "الاستثناءات ومعالجة الأخطاء"),
      [
        "When an error happens at runtime, Python raises an exception and stops. Use `try` and `except` to catch the error and continue. The `finally` block always runs at the end.",
        "Catch specific errors such as `ValueError` instead of all errors. You can raise your own error with `raise`.",
      ],
      [
        "عندما يحدث خطأ أثناء التشغيل ترفع Python استثناءً وتتوقف. استخدم `try` و`except` لالتقاط الخطأ ومتابعة البرنامج. وتُنفَّذ كتلة `finally` دائماً في النهاية.",
        "التقط أخطاء محددة مثل `ValueError` بدل التقاط كل الأخطاء. ويمكنك رفع خطأ خاص بك باستخدام `raise`.",
      ],
      [
        { lang: "python", text: `try:
    number = int("abc")
except ValueError:
    print("Not a valid number")
finally:
    print("Done")`, output: `Not a valid number
Done` },
        { lang: "python", text: `def divide(a, b):
    if b == 0:
        raise ValueError("b must not be zero")
    return a / b

try:
    print(divide(10, 0))
except ValueError as error:
    print("Error:", error)`, output: "Error: b must not be zero" },
      ],
      t("Ask for a number with `input()` and print `Invalid` if the user types text.", "اطلب عدداً بـ `input()` واطبع `Invalid` إذا كتب المستخدم نصاً.")
    ),
    lesson(
      "classes",
      S5,
      t("Classes and objects", "الأصناف والكائنات"),
      [
        "A class is a blueprint for objects. The `__init__` method runs when you create an object and sets its data. `self` is the object itself, and the data stored on it are called attributes.",
        "A class can inherit from another class. The child class gets everything from the parent and can replace methods with its own version.",
      ],
      [
        "الصنف (class) مخطط لإنشاء كائنات. تعمل الدالة `__init__` عند إنشاء الكائن وتضبط بياناته. و`self` هو الكائن نفسه، والبيانات المخزنة فيه تسمى خصائص.",
        "يمكن لصنف أن يرث من صنف آخر. يحصل الصنف الابن على كل ما في الأب ويمكنه استبدال الدوال بنسخته الخاصة.",
      ],
      [
        { lang: "python", text: `class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return self.name + " says woof"

dog = Dog("Rex", 3)
print(dog.name)
print(dog.bark())`, output: `Rex
Rex says woof` },
        { lang: "python", text: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return self.name + " says meow"

print(Cat("Mimi").speak())
print(Animal("Generic").speak())`, output: `Mimi says meow
...` },
      ],
      t("Create a class `Car` with a brand and a method that returns a description.", "أنشئ صنفاً `Car` له ماركة ودالة تُرجع وصفاً.")
    ),
    lesson(
      "project",
      S5,
      t("Mini project: grades report", "مشروع صغير: تقرير الدرجات"),
      [
        "Let us combine what you learned: a dictionary, a function, a loop, a condition, and an f-string. The program calculates the average of each student and prints the result.",
        "In the f-string, `:.1f` means one digit after the decimal point.",
      ],
      [
        "لنجمع ما تعلمته: قاموس ودالة وحلقة وشرط وf-string. يحسب البرنامج متوسط كل طالب ويطبع النتيجة.",
        "في الـ f-string تعني `:.1f` رقماً واحداً بعد الفاصلة العشرية.",
      ],
      [
        { lang: "python", file: "grades.py", text: `grades = {"Amal": [90, 85], "Bilal": [70, 65, 80]}

def average(values):
    return sum(values) / len(values)

for name, values in grades.items():
    avg = average(values)
    status = "pass" if avg >= 60 else "fail"
    print(f"{name}: {avg:.1f} ({status})")`, output: `Amal: 87.5 (pass)
Bilal: 71.7 (pass)` },
      ],
      t("Add a third student and show the highest average at the end.", "أضف طالباً ثالثاً واعرض أعلى متوسط في النهاية.")
    ),
  ],
};
