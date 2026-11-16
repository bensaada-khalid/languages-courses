module.exports = {
  id: "nestjs",
  badge: "Ne",
  color: "#e0234e",
  title: { en: "NestJS", ar: "NestJS" },
  summary: {
    en: "Structure scalable server apps with TypeScript, modules, controllers, providers, and validation.",
    ar: "نظّم تطبيقات الخادم القابلة للتوسع باستخدام TypeScript والوحدات والمتحكمات والمزودات والتحقق.",
  },
  lessons: [
    {
      id: "first-app",
      title: { en: "Your first Nest application", ar: "أول تطبيق Nest" },
      body: {
        en: [
          "NestJS is a TypeScript framework that organizes server code into modules, controllers, and providers. Install the CLI and generate a project.",
          "The entry file creates the application from the root module and starts listening.",
        ],
        ar: [
          "NestJS إطار عمل بلغة TypeScript ينظّم شيفرة الخادم في وحدات ومتحكمات ومزودات. ثبّت أداة سطر الأوامر ثم أنشئ مشروعاً.",
          "ينشئ ملف الدخول التطبيق من الوحدة الجذر ثم يبدأ الاستماع للطلبات.",
        ],
      },
      code: [
        { lang: "bash", text: `npm install -g @nestjs/cli
nest new academy-api
cd academy-api
npm run start:dev` },
        {
          lang: "ts",
          file: "src/main.ts",
          text: `import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();`,
        },
      ],
    },
    {
      id: "controllers-providers",
      title: { en: "Controllers and providers", ar: "المتحكمات والمزودات" },
      body: {
        en: [
          "A controller handles incoming requests and a provider holds the business logic. Nest injects providers into controllers through the constructor, which is called dependency injection.",
          "Register both in a module so that Nest knows how to build them, then add `TasksModule` to the `imports` of `AppModule`.",
        ],
        ar: [
          "يتعامل المتحكم (Controller) مع الطلبات الواردة، ويحتفظ المزود (Provider) بمنطق العمل. يحقن Nest المزودات في المتحكمات عبر المُنشئ، وهذا ما يسمى حقن الاعتماديات (Dependency Injection).",
          "سجّل الاثنين في وحدة (Module) ليعرف Nest كيف ينشئهما، ثم أضف `TasksModule` إلى `imports` في `AppModule`.",
        ],
      },
      code: [
        {
          lang: "ts",
          file: "src/tasks/tasks.service.ts",
          text: `import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TasksService {
  private tasks = [{ id: 1, title: "Learn Nest", done: false }];

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }
}`,
        },
        {
          lang: "ts",
          file: "src/tasks/tasks.controller.ts",
          text: `import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }
}`,
        },
        {
          lang: "ts",
          file: "src/tasks/tasks.module.ts",
          text: `import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}`,
        },
      ],
    },
    {
      id: "validation",
      title: { en: "DTOs and validation", ar: "كائنات النقل والتحقق" },
      body: {
        en: [
          "A DTO describes the shape of incoming data. With `class-validator` decorators and the global `ValidationPipe`, invalid requests are rejected with a 400 response automatically.",
          "Install the packages with `npm install class-validator class-transformer`, then use the DTO as the type of the `@Body()` parameter.",
        ],
        ar: [
          "يصف كائن نقل البيانات (DTO) شكل البيانات الواردة. وباستخدام مزخرفات `class-validator` و`ValidationPipe` العام تُرفض الطلبات غير الصالحة تلقائياً برد 400.",
          "ثبّت الحزم بالأمر `npm install class-validator class-transformer` ثم استخدم الـ DTO نوعاً للمعامل `@Body()`.",
        ],
      },
      code: [
        {
          lang: "ts",
          file: "src/tasks/create-task.dto.ts",
          text: `import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}`,
        },
        {
          lang: "ts",
          file: "src/main.ts",
          text: `import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}

bootstrap();`,
        },
        {
          lang: "ts",
          file: "src/tasks/tasks.controller.ts (excerpt)",
          text: `@Post()
create(@Body() dto: CreateTaskDto) {
  return dto;
}`,
        },
      ],
    },
  ],
};
