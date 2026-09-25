export const solutionSources = {
  "module-01-javascript-fundamentals": { directory: "module-01-fundamentals", lessons: [["01-let-const"], ["02-data-types"], ["03-operators"], ["04-if-else"], ["05-switch"], ["06-loops"]] },
  "module-02-functions": { directory: "module-02-functions", lessons: [["01-function-declaration"], ["02-parameters-arguments"], ["03-return"], ["04-function-expression"], ["05-scope"]] },
  "module-03-arrays-objects": { directory: "module-03-arrays-objects", lessons: [["01-arrays"], ["02-array-crud"], ["03-objects"], ["04-object-crud"], ["05-loop-data"]] },
  "module-04-es6": { directory: "module-04-es6", lessons: [["01-template-literals"], ["02-arrow-functions"], ["03-destructuring"], ["04-rest-parameters"], ["05-spread-operator"], ["06-enhanced-object-literals"], ["07-optional-chaining"], ["08-nullish-coalescing"]] },
  "module-05-array-methods": { directory: "module-05-array-methods", lessons: [["01-forEach"], ["02-map"], ["03-filter"], ["04-find", "05-findIndex"], ["06-some-every"], ["07-reduce"], ["08-sort"]] },
  "module-06-advanced-functions": { directory: "module-06-advanced-functions", lessons: [["01-callback"], ["02-higher-order-functions"], ["03-lexical-scope"], ["04-closure"]] },
  "module-07-es-modules": { directory: "module-07-modules", lessons: [["01-export-import", "02-named-export"], ["03-default-export"], []] },
  "module-08-dom": { directory: "module-08-dom", lessons: [["01-select-elements"], ["02-content"], ["03-classlist-style"], ["04-attributes"], ["05-create-remove-elements"]] },
  "module-09-events-forms": { directory: "module-09-events-forms", lessons: [["01-click-events"], ["02-event-object"], ["03-input-change"], ["04-form-submit", "05-prevent-default"], ["06-form-validation"]] },
  "module-10-asynchronous-javascript": { directory: "module-10-async-js", lessons: [["01-sync-vs-async"], ["02-setTimeout"], ["03-event-loop"], ["04-async-callback"]] },
  "module-11-promises": { directory: "module-11-promises", lessons: [["01-promise-basics"], ["02-resolve-reject"], ["03-then-catch-finally"], ["04-promise-all"]] },
  "module-12-async-await": { directory: "module-12-async-await", lessons: [["01-async"], ["02-await"], ["03-try-catch"], ["04-error-handling"]] },
  "module-13-api-fetch": { directory: "module-13-api-fetch", lessons: [["01-http-json"], ["02-fetch-get"], ["03-post"], ["04-put-patch", "05-delete"], ["06-loading-error"]] },
  "module-14-browser-storage": { directory: "module-14-browser-storage", lessons: [["01-localStorage"], ["02-json-storage"]] },
  "module-15-javascript-practice": { directory: "module-15-javascript-practice", lessons: [["01-data-transformation"], ["02-search-filter-sort"], ["03-dom-practice"], ["04-api-practice"]] },
  "module-16-react-preparation": { directory: "module-16-react-preparation", lessons: [["01-immutable-data"], ["02-array-object-patterns"], ["03-modules"], ["04-async-api"], ["05-npm"], ["06-vite"], []] },
};

export const customSolutions = {
  "module-01-javascript-fundamentals/01-01-let-const": `## Bài 1

\`\`\`js
const name = "Minh";
let age = 18;
age++;
console.log(name); // Minh
console.log(age);  // 19
\`\`\`

\`name\` không cần gán lại nên dùng \`const\`. \`age\` thay đổi nên dùng \`let\`.

## Bài 2

\`\`\`js
let cartCount = 0;
cartCount += 1;
cartCount += 2;
console.log(cartCount); // 3
\`\`\`

## Bài 3

\`\`\`js
const button = document.querySelector("button");
\`\`\`

DOM element được giữ trong cùng một biến tham chiếu; thường không cần gán một element khác vào \`button\`. Dùng \`const\` không làm element bất biến, bạn vẫn có thể thay đổi nội dung hoặc class của element.`,
  "module-07-es-modules/07-03-module-setup-in-browser": `## Ví dụ cấu trúc module chạy trên trình duyệt

\`\`\`html
<script type="module" src="./js/app.js"></script>
\`\`\`

\`\`\`js
// js/utils.js
export const formatName = (name) => name.trim();

// js/app.js
import { formatName } from "./utils.js";
console.log(formatName(" Minh "));
\`\`\`

Đặt \`type="module"\` ở script để trình duyệt cho phép \`import/export\`. Đường dẫn import được tính tương đối từ file đang import.`,
  "module-16-react-preparation/16-07-react-readiness-checkpoint": `## Ví dụ tổng hợp

\`\`\`js
const loadActiveProducts = async () => {
  const products = await fetchProducts();
  return products
    .filter((product) => product.active)
    .map((product) => ({ ...product, label: product.name.toUpperCase() }));
};
\`\`\`

Ví dụ kết hợp async/await, function, filter, map và spread để biến đổi dữ liệu mà không sửa array hoặc object ban đầu. Dùng cấu trúc tương tự với dữ liệu của riêng bạn, rồi giải thích vai trò từng bước.`,
};
