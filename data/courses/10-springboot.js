module.exports = {
  id: "springboot",
  badge: "Sb",
  color: "#6db33f",
  title: { en: "Spring Boot", ar: "Spring Boot" },
  summary: {
    en: "Create production-ready Java REST APIs with Spring Boot, dependency injection, and JPA.",
    ar: "أنشئ واجهات REST بلغة Java جاهزة للإنتاج باستخدام Spring Boot وحقن الاعتماديات وJPA.",
  },
  lessons: [
    {
      id: "first-app",
      title: { en: "Your first Spring Boot app", ar: "أول تطبيق Spring Boot" },
      body: {
        en: [
          "Spring Boot configures a Spring application for you so you can start quickly. Generate a project at start.spring.io with the Spring Web dependency, then unzip it and open it in your IDE.",
          "The main class is annotated with `@SpringBootApplication`. Run it and an embedded server starts on port 8080.",
        ],
        ar: [
          "يهيّئ Spring Boot تطبيق Spring نيابة عنك لتبدأ بسرعة. أنشئ مشروعاً من الموقع start.spring.io مع الاعتمادية Spring Web ثم فك الضغط وافتحه في بيئة التطوير.",
          "يحمل الصنف الرئيسي التوضيح `@SpringBootApplication`. شغّله فيبدأ خادم مدمج على المنفذ 8080.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "AcademyApplication.java",
          text: `package com.example.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AcademyApplication {
    public static void main(String[] args) {
        SpringApplication.run(AcademyApplication.class, args);
    }
}`,
        },
        { lang: "bash", text: `./mvnw spring-boot:run` },
      ],
    },
    {
      id: "rest-controller",
      title: { en: "REST controllers", ar: "متحكمات REST" },
      body: {
        en: [
          "A class annotated with `@RestController` handles web requests and returns JSON automatically. Use `@GetMapping` and `@PathVariable` to map URLs.",
          "Business logic belongs in a `@Service` class that Spring injects through the constructor.",
        ],
        ar: [
          "الصنف الذي يحمل `@RestController` يعالج طلبات الويب ويُرجع JSON تلقائياً. استخدم `@GetMapping` و`@PathVariable` لربط الروابط.",
          "ضع منطق العمل في صنف `@Service` يحقنه Spring عبر المُنشئ.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "GreetingService.java",
          text: `package com.example.academy;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public String greet(String name) {
        return "Hello, " + name;
    }
}`,
        },
        {
          lang: "java",
          file: "GreetingController.java",
          text: `package com.example.academy;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/greetings")
public class GreetingController {
    private final GreetingService service;

    public GreetingController(GreetingService service) {
        this.service = service;
    }

    @GetMapping("/{name}")
    public Map<String, String> greet(@PathVariable String name) {
        return Map.of("message", service.greet(name));
    }
}`,
        },
      ],
    },
    {
      id: "jpa",
      title: { en: "Persisting data with JPA", ar: "حفظ البيانات باستخدام JPA" },
      body: {
        en: [
          "Add the Spring Data JPA and H2 Database dependencies. An `@Entity` class maps to a table, and a repository interface gives you CRUD methods with no implementation code.",
          "The controller below saves a book from a JSON body and lists all books.",
        ],
        ar: [
          "أضف الاعتماديتين Spring Data JPA وH2 Database. يرتبط الصنف `@Entity` بجدول، وتمنحك واجهة المستودع (Repository) دوال CRUD دون كتابة تنفيذ.",
          "يحفظ المتحكم التالي كتاباً من جسم JSON ويعرض كل الكتب.",
        ],
      },
      code: [
        {
          lang: "java",
          file: "Book.java",
          text: `package com.example.academy;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}`,
        },
        {
          lang: "java",
          file: "BookRepository.java",
          text: `package com.example.academy;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}`,
        },
        {
          lang: "java",
          file: "BookController.java",
          text: `package com.example.academy;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Book> all() {
        return repository.findAll();
    }

    @PostMapping
    public Book create(@RequestBody Book book) {
        return repository.save(book);
    }
}`,
        },
      ],
    },
  ],
};
