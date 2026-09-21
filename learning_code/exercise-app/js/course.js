export const courseModules = [
  {
    id: "module-01-fundamentals",
    title: "JavaScript Fundamentals",
    lessons: [
      ["01-let-const", "let và const"],
      ["02-data-types", "Data Types và typeof"],
      ["03-operators", "Operators"],
      ["04-if-else", "if / else"],
      ["05-switch", "switch"],
      ["06-loops", "for và while"],
    ],
  },
  {
    id: "module-02-functions",
    title: "Functions",
    lessons: [
      ["01-function-declaration", "Function Declaration"],
      ["02-parameters-arguments", "Parameters và Arguments"],
      ["03-return", "return"],
      ["04-function-expression", "Function Expression"],
      ["05-scope", "Scope"],
    ],
  },
  {
    id: "module-03-arrays-objects",
    title: "Arrays & Objects",
    lessons: [
      ["01-arrays", "Array cơ bản"],
      ["02-array-crud", "Thêm, sửa và xóa Array"],
      ["03-objects", "Object cơ bản"],
      ["04-object-crud", "Truy cập và cập nhật Object"],
      ["05-loop-data", "Duyệt Array và Object"],
    ],
  },
  {
    id: "module-04-es6",
    title: "ES6+",
    lessons: [
      ["01-template-literals", "Template Literals"],
      ["02-arrow-functions", "Arrow Functions"],
      ["03-destructuring", "Destructuring"],
      ["04-rest-parameters", "Rest Parameters"],
      ["05-spread-operator", "Spread Operator"],
      ["06-enhanced-object-literals", "Enhanced Object Literals"],
      ["07-optional-chaining", "Optional Chaining"],
      ["08-nullish-coalescing", "Nullish Coalescing"],
    ],
  },
  {
    id: "module-05-array-methods",
    title: "Array Methods",
    lessons: [
      ["01-forEach", "forEach"],
      ["02-map", "map"],
      ["03-filter", "filter"],
      ["04-find", "find"],
      ["05-findIndex", "findIndex"],
      ["06-some-every", "some và every"],
      ["07-reduce", "reduce"],
      ["08-sort", "sort"],
    ],
  },
  {
    id: "module-06-advanced-functions",
    title: "Functions nâng cao",
    lessons: [
      ["01-callback", "Callback"],
      ["02-higher-order-functions", "Higher-order Functions"],
      ["03-lexical-scope", "Lexical Scope"],
      ["04-closure", "Closure"],
    ],
  },
  {
    id: "module-07-modules",
    title: "JavaScript Modules",
    lessons: [
      ["01-export-import", "Export và Import"],
      ["02-named-export", "Named Export"],
      ["03-default-export", "Default Export"],
    ],
  },
  {
    id: "module-08-dom",
    title: "DOM",
    lessons: [
      ["01-select-elements", "Chọn phần tử DOM"],
      ["02-content", "Thay đổi nội dung DOM"],
      ["03-classlist-style", "classList và style"],
      ["04-attributes", "DOM Attributes"],
      ["05-create-remove-elements", "Tạo và xóa phần tử"],
    ],
  },
  {
    id: "module-09-events-forms",
    title: "Events & Forms",
    lessons: [
      ["01-click-events", "Click Events"],
      ["02-event-object", "Event Object"],
      ["03-input-change", "Input và Change Events"],
      ["04-form-submit", "Form Submit"],
      ["05-prevent-default", "preventDefault"],
      ["06-form-validation", "Form Validation"],
    ],
  },
  {
    id: "module-10-async-js",
    title: "Asynchronous JavaScript",
    lessons: [
      ["01-sync-vs-async", "Synchronous và Asynchronous"],
      ["02-setTimeout", "setTimeout"],
      ["03-event-loop", "Event Loop cơ bản"],
      ["04-async-callback", "Async Callback"],
    ],
  },
  {
    id: "module-11-promises",
    title: "Promise",
    lessons: [
      ["01-promise-basics", "Promise cơ bản"],
      ["02-resolve-reject", "resolve và reject"],
      ["03-then-catch-finally", "then, catch và finally"],
      ["04-promise-all", "Promise.all"],
    ],
  },
  {
    id: "module-12-async-await",
    title: "Async / Await",
    lessons: [
      ["01-async", "async"],
      ["02-await", "await"],
      ["03-try-catch", "try / catch"],
      ["04-error-handling", "Error Handling"],
    ],
  },
  {
    id: "module-13-api-fetch",
    title: "API & Fetch",
    lessons: [
      ["01-http-json", "HTTP và JSON"],
      ["02-fetch-get", "Fetch GET"],
      ["03-post", "Fetch POST"],
      ["04-put-patch", "Fetch PUT và PATCH"],
      ["05-delete", "Fetch DELETE"],
      ["06-loading-error", "Loading và Error"],
    ],
  },
  {
    id: "module-14-browser-storage",
    title: "Browser Storage",
    lessons: [
      ["01-localStorage", "localStorage"],
      ["02-json-storage", "Lưu JSON"],
    ],
  },
  {
    id: "module-15-javascript-practice",
    title: "JavaScript Practice",
    lessons: [
      ["01-data-transformation", "Data Transformation"],
      ["02-search-filter-sort", "Search, Filter và Sort"],
      ["03-dom-practice", "DOM Practice"],
      ["04-api-practice", "API Practice"],
    ],
  },
  {
    id: "module-16-react-preparation",
    title: "React Preparation",
    lessons: [
      ["01-immutable-data", "Immutable Data"],
      ["02-array-object-patterns", "Array/Object Patterns cho UI"],
      ["03-modules", "Modules cho ứng dụng"],
      ["04-async-api", "Async API Flow"],
      ["05-npm", "npm cơ bản"],
      ["06-vite", "Vite cơ bản"],
    ],
  },
];

export const courseLessons = courseModules.flatMap(module =>
  module.lessons.map(([lessonId, title]) => ({
    id: `${module.id}/${lessonId}`,
    moduleId: module.id,
    lessonId,
    title,
  })),
);
