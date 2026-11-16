module.exports = {
  id: "dotnet",
  badge: "C#",
  color: "#512bd4",
  title: { en: ".NET", ar: ".NET" },
  summary: {
    en: "Build modern applications with C# and .NET: console apps, minimal APIs, and LINQ.",
    ar: "ابنِ تطبيقات حديثة باستخدام C# و.NET: تطبيقات الكونسول وواجهات API المبسطة وLINQ.",
  },
  lessons: [
    {
      id: "first-app",
      title: { en: "Your first .NET app", ar: "أول تطبيق .NET" },
      body: {
        en: [
          "Install the .NET SDK, then create a console app with the `dotnet` command line tool. Modern C# supports top-level statements, so a program can be a few lines.",
          "C# is statically typed, and `var` lets the compiler infer the type.",
        ],
        ar: [
          "ثبّت حزمة تطوير .NET SDK ثم أنشئ تطبيق كونسول بأداة سطر الأوامر `dotnet`. تدعم C# الحديثة العبارات ذات المستوى الأعلى، فيمكن أن يكون البرنامج أسطراً قليلة.",
          "C# لغة ذات أنواع ثابتة، ويتيح `var` للمترجم استنتاج النوع.",
        ],
      },
      code: [
        { lang: "bash", text: `dotnet new console -o Academy
cd Academy
dotnet run` },
        {
          lang: "csharp",
          file: "Program.cs",
          text: `var name = "Zeina";
int age = 24;

Console.WriteLine($"Hello, {name}! You are {age}.");

for (var i = 1; i <= 3; i++)
{
    Console.WriteLine($"Lesson {i}");
}`,
        },
      ],
    },
    {
      id: "minimal-api",
      title: { en: "Minimal APIs", ar: "واجهات API المبسطة" },
      body: {
        en: [
          "Minimal APIs let you build HTTP endpoints with very little code. Create a project with `dotnet new web`. Each `Map` method connects a route to a handler.",
          "Records give you concise, immutable models, and ASP.NET Core serializes them to JSON for you.",
        ],
        ar: [
          "تتيح واجهات API المبسطة بناء نقاط نهاية HTTP بشيفرة قليلة جداً. أنشئ مشروعاً بالأمر `dotnet new web`. تربط كل دالة `Map` مساراً بمعالج.",
          "تمنحك السجلات (Records) نماذج موجزة غير قابلة للتعديل، ويحوّلها ASP.NET Core إلى JSON تلقائياً.",
        ],
      },
      code: [
        {
          lang: "csharp",
          file: "Program.cs",
          text: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var products = new List<Product>
{
    new(1, "Laptop", 1200m),
    new(2, "Mouse", 25m)
};

app.MapGet("/products", () => products);

app.MapGet("/products/{id:int}", (int id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);
    return product is null ? Results.NotFound() : Results.Ok(product);
});

app.MapPost("/products", (Product product) =>
{
    products.Add(product);
    return Results.Created("/products/" + product.Id, product);
});

app.Run();

record Product(int Id, string Name, decimal Price);`,
        },
      ],
    },
    {
      id: "linq-async",
      title: { en: "LINQ and async", ar: "LINQ والبرمجة غير المتزامنة" },
      body: {
        en: [
          "LINQ queries collections with readable methods such as `Where`, `Select`, and `OrderBy`. `async` and `await` keep your app responsive while it waits for I/O.",
          "The example downloads a web page without blocking the thread.",
        ],
        ar: [
          "يستعلم LINQ عن المجموعات بدوال مقروءة مثل `Where` و`Select` و`OrderBy`. ويُبقي `async` و`await` تطبيقك مستجيباً أثناء انتظار عمليات الإدخال والإخراج.",
          "ينزّل المثال صفحة ويب دون تعطيل الخيط.",
        ],
      },
      code: [
        {
          lang: "csharp",
          file: "Program.cs",
          text: `var scores = new[] { 55, 92, 78, 61, 99 };

var topScores = scores
    .Where(s => s >= 70)
    .OrderByDescending(s => s)
    .Select(s => $"Score: {s}");

foreach (var line in topScores)
{
    Console.WriteLine(line);
}

using var client = new HttpClient();
var html = await client.GetStringAsync("https://example.com");
Console.WriteLine($"Downloaded {html.Length} characters");`,
        },
      ],
    },
  ],
};
