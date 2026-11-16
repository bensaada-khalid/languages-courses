module.exports = {
  id: "laravel",
  badge: "La",
  color: "#ff2d20",
  title: { en: "Laravel", ar: "Laravel" },
  summary: {
    en: "Build web applications with PHP: routes, controllers, Blade views, and Eloquent models.",
    ar: "ابنِ تطبيقات الويب باستخدام PHP: المسارات والمتحكمات وقوالب Blade ونماذج Eloquent.",
  },
  lessons: [
    {
      id: "install-routes",
      title: { en: "Installation and routing", ar: "التثبيت والتوجيه" },
      body: {
        en: [
          "Laravel is a PHP framework with an expressive syntax. You need PHP 8.2 or newer and Composer. Create a project and start the development server.",
          "Routes live in `routes/web.php`. A route can return a string, an array that Laravel turns into JSON, or a view.",
        ],
        ar: [
          "Laravel إطار عمل PHP ذو صياغة معبّرة. تحتاج إلى PHP 8.2 أو أحدث وإلى Composer. أنشئ مشروعاً ثم شغّل خادم التطوير.",
          "توجد المسارات في الملف `routes/web.php`. يمكن للمسار أن يُرجع نصاً أو مصفوفة يحولها Laravel إلى JSON أو واجهة عرض.",
        ],
      },
      code: [
        { lang: "bash", text: `composer create-project laravel/laravel academy
cd academy
php artisan serve` },
        {
          lang: "php",
          file: "routes/web.php",
          text: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello/{name}', function (string $name) {
    return "Hello, " . $name;
});

Route::get('/api-demo', function () {
    return ['status' => 'ok', 'framework' => 'Laravel'];
});`,
        },
      ],
    },
    {
      id: "controllers-blade",
      title: { en: "Controllers and Blade views", ar: "المتحكمات وقوالب Blade" },
      body: {
        en: [
          "Controllers group related request logic. Create one with `php artisan make:controller PostController`. Blade is the Laravel template engine, and the double curly braces print a value and escape it safely.",
          "Save the view as `resources/views/posts/index.blade.php` and point a route at the controller.",
        ],
        ar: [
          "تجمع المتحكمات منطق الطلبات المترابطة. أنشئ واحداً بالأمر `php artisan make:controller PostController`. وBlade هو محرك القوالب في Laravel، وتطبع الأقواس المعقوفة المزدوجة القيمة مع تهريبها بأمان.",
          "احفظ الواجهة في `resources/views/posts/index.blade.php` ووجّه مساراً إلى المتحكم.",
        ],
      },
      code: [
        {
          lang: "php",
          file: "app/Http/Controllers/PostController.php",
          text: `<?php

namespace App\\Http\\Controllers;

class PostController extends Controller
{
    public function index()
    {
        $posts = [
            ['title' => 'First post', 'author' => 'Hana'],
            ['title' => 'Second post', 'author' => 'Ali'],
        ];

        return view('posts.index', ['posts' => $posts]);
    }
}`,
        },
        {
          lang: "php",
          file: "routes/web.php",
          text: `<?php

use App\\Http\\Controllers\\PostController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/posts', [PostController::class, 'index']);`,
        },
        {
          lang: "blade",
          file: "resources/views/posts/index.blade.php",
          text: `<h1>Posts</h1>

@foreach ($posts as $post)
    <article>
        <h2>{{ $post['title'] }}</h2>
        <p>By {{ $post['author'] }}</p>
    </article>
@endforeach`,
        },
      ],
    },
    {
      id: "eloquent",
      title: { en: "Eloquent models and migrations", ar: "نماذج Eloquent والترحيلات" },
      body: {
        en: [
          "Eloquent maps a database table to a PHP class. Generate a model and its migration together with `php artisan make:model Post -m`, then run `php artisan migrate`.",
          "Use the model to query the table without writing SQL.",
        ],
        ar: [
          "يربط Eloquent جدول قاعدة بيانات بصنف PHP. ولّد النموذج وملف الترحيل معاً بالأمر `php artisan make:model Post -m` ثم شغّل `php artisan migrate`.",
          "استخدم النموذج للاستعلام عن الجدول دون كتابة SQL.",
        ],
      },
      code: [
        {
          lang: "php",
          file: "database/migrations/create_posts_table.php",
          text: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};`,
        },
        {
          lang: "php",
          file: "app/Models/Post.php",
          text: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    protected $fillable = ['title', 'body'];
}`,
        },
        {
          lang: "php",
          text: `$post = Post::create(['title' => 'Hello', 'body' => 'My first post']);
$latest = Post::latest()->take(5)->get();
$found = Post::findOrFail($post->id);`,
        },
      ],
    },
  ],
};
