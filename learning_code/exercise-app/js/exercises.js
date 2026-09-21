export const exercises = [
  {
    id: "data-types-01",
    title: "Kiểm tra 5 kiểu dữ liệu",
    purpose: "Hiểu typeof trả về tên kiểu dữ liệu nào cho từng giá trị JavaScript cơ bản.",
    requirements: [
      "Tạo biến userName chứa một string.",
      "Tạo biến age chứa một number.",
      "Tạo biến isStudent chứa một boolean.",
      "Khai báo biến message nhưng chưa gán giá trị.",
      "Tạo biến user chứa một object, sau đó in typeof của cả 5 biến.",
    ],
    concept: "<p><code>typeof value</code> kiểm tra kiểu của một giá trị và trả về chuỗi như <code>string</code>, <code>number</code> hoặc <code>boolean</code>.</p>",
    hint: "Bạn cần dùng const cho các giá trị không gán lại, let cho message, rồi viết console.log(typeof tenBien).",
    starterCode: `// Tạo 5 biến: userName, age, isStudent, message và user


// Dùng typeof và console.log để kiểm tra từng biến
`,
    requiredPatterns: [
      { pattern: "typeof", message: "Bạn chưa sử dụng toán tử typeof." },
      { pattern: "console\\.log", message: "Hãy dùng console.log để xem kết quả." },
    ],
    testCode: `
      const checks = [
        [typeof userName === "string", "userName cần là string"],
        [typeof age === "number", "age cần là number"],
        [typeof isStudent === "boolean", "isStudent cần là boolean"],
        [typeof message === "undefined", "message cần có kiểu undefined"],
        [typeof user === "object" && user !== null && !Array.isArray(user), "user cần là object"],
      ];
      const failed = checks.find(([passed]) => !passed);
      return failed
        ? { passed: false, message: failed[1] }
        : { passed: true, message: "Bạn đã tạo và kiểm tra đúng 5 kiểu dữ liệu." };
    `,
    solution: `const userName = "An";
const age = 20;
const isStudent = true;
let message;
const user = { id: 1 };

console.log(typeof userName);   // string
console.log(typeof age);        // number
console.log(typeof isStudent);  // boolean
console.log(typeof message);    // undefined
console.log(typeof user);       // object`,
    explanation: [
      "userName nằm trong dấu ngoặc kép nên là string.",
      "age là số không có ngoặc kép nên là number.",
      "isStudent nhận true nên là boolean.",
      "message chưa được gán giá trị nên là undefined.",
      "user chứa các cặp key-value nên là object.",
    ],
  },
  {
    id: "data-types-02",
    title: "Dự đoán kết quả typeof",
    purpose: "Phân biệt giá trị nhìn giống nhau nhưng có kiểu khác nhau, đặc biệt là chuỗi \"10\" và số 10.",
    requirements: [
      "Trước khi chạy, dự đoán kết quả của typeof \"10\", 10, true và undefined.",
      "Dùng console.log để in bốn kết quả theo đúng thứ tự trên.",
      "So sánh output thật với dự đoán của bạn.",
    ],
    concept: "<p>Dấu ngoặc kép tạo ra <code>string</code>. Vì vậy <code>\"10\"</code> là string, còn <code>10</code> là number.</p>",
    hint: "Mỗi dòng có dạng console.log(typeof giaTri). Chú ý xem giá trị có nằm trong dấu ngoặc kép không.",
    starterCode: `// Ghi dự đoán của bạn ở đây:
// typeof "10"     =>
// typeof 10       =>
// typeof true     =>
// typeof undefined =>

// Viết 4 lệnh console.log bên dưới
`,
    requiredPatterns: [
      { pattern: "typeof\\s*[(']?\\s*[\"']10", message: "Hãy kiểm tra typeof của chuỗi \"10\"." },
      { pattern: "typeof", message: "Bạn chưa sử dụng typeof." },
    ],
    testCode: `
      const expected = ["string", "number", "boolean", "undefined"];
      const actual = __logs.map(line => line.trim());
      const passed = expected.every((value, index) => actual[index] === value);
      return passed
        ? { passed: true, message: "Bạn đã dự đoán và in đúng cả 4 kiểu dữ liệu." }
        : { passed: false, message: "Output cần lần lượt là: string, number, boolean, undefined." };
    `,
    solution: `console.log(typeof "10");      // string
console.log(typeof 10);        // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined`,
    explanation: [
      "\"10\" có ngoặc kép nên là string dù bên trong là chữ số.",
      "10 không có ngoặc kép nên là number.",
      "true là giá trị boolean.",
      "undefined vừa là giá trị đặc biệt vừa cho kết quả typeof là undefined.",
    ],
  },
  {
    id: "data-types-03",
    title: "Đổi trạng thái đăng nhập",
    purpose: "Hiểu giá trị của biến có thể đổi trong khi kiểu dữ liệu vẫn giữ nguyên.",
    requirements: [
      "Khai báo isLoggedIn bằng let với giá trị false.",
      "In giá trị và typeof của isLoggedIn.",
      "Gán isLoggedIn thành true.",
      "In lại giá trị và typeof của biến.",
    ],
    concept: "<p><code>false</code> và <code>true</code> là hai giá trị khác nhau nhưng đều thuộc kiểu <code>boolean</code>. Dùng <code>let</code> khi cần gán lại biến.</p>",
    hint: "Sau khi console.log lần đầu, dùng isLoggedIn = true rồi console.log thêm lần nữa.",
    starterCode: `// Tạo biến isLoggedIn với giá trị false


// In giá trị và kiểu dữ liệu lần thứ nhất


// Đổi thành true rồi in lại
`,
    requiredPatterns: [
      { pattern: "let\\s+isLoggedIn", message: "Hãy khai báo isLoggedIn bằng let." },
      { pattern: "typeof\\s+isLoggedIn", message: "Hãy kiểm tra kiểu của isLoggedIn bằng typeof." },
      { pattern: "isLoggedIn\\s*=\\s*true", message: "Bạn chưa đổi isLoggedIn thành true." },
    ],
    testCode: `
      return typeof isLoggedIn === "boolean" && isLoggedIn === true
        ? { passed: true, message: "Đúng! Giá trị đã đổi thành true nhưng kiểu vẫn là boolean." }
        : { passed: false, message: "Sau khi chạy xong, isLoggedIn cần có giá trị true và kiểu boolean." };
    `,
    solution: `let isLoggedIn = false;

console.log(isLoggedIn);        // false
console.log(typeof isLoggedIn); // boolean

isLoggedIn = true;

console.log(isLoggedIn);        // true
console.log(typeof isLoggedIn); // boolean`,
    explanation: [
      "Dùng let vì biến được gán lại.",
      "Lần đầu biến có giá trị false và kiểu boolean.",
      "Phép gán thay giá trị false thành true.",
      "Cả false và true đều là boolean nên typeof không đổi.",
    ],
  },
  {
    id: "data-types-04",
    title: "Array và null",
    purpose: "Nhận biết hai trường hợp đặc biệt mà typeof trả về object và biết cách kiểm tra chính xác hơn.",
    requirements: [
      "Tạo biến tags chứa một array và selectedUser có giá trị null.",
      "In typeof của tags và selectedUser.",
      "Dùng Array.isArray(tags) để kiểm tra array.",
      "Dùng selectedUser === null để kiểm tra null.",
    ],
    concept: "<p><code>typeof []</code> và <code>typeof null</code> đều trả về <code>object</code>. Hãy dùng <code>Array.isArray()</code> cho array và <code>=== null</code> cho null.</p>",
    hint: "Tạo const tags = [...] và const selectedUser = null. Sau đó dùng cả typeof, Array.isArray và === null.",
    starterCode: `// Tạo tags là array và selectedUser là null


// Kiểm tra bằng typeof


// Kiểm tra lại bằng Array.isArray và === null
`,
    requiredPatterns: [
      { pattern: "Array\\.isArray\\s*\\(", message: "Hãy dùng Array.isArray() để kiểm tra array." },
      { pattern: "===\\s*null", message: "Hãy dùng === null để kiểm tra null." },
      { pattern: "typeof", message: "Hãy kiểm tra cả hai giá trị bằng typeof." },
    ],
    testCode: `
      const passed = Array.isArray(tags) && selectedUser === null;
      return passed
        ? { passed: true, message: "Chính xác! Bạn đã biết cách kiểm tra array và null." }
        : { passed: false, message: "tags cần là array và selectedUser cần có giá trị null." };
    `,
    solution: `const tags = ["javascript", "react"];
const selectedUser = null;

console.log(typeof tags);           // object
console.log(Array.isArray(tags));    // true
console.log(typeof selectedUser);   // object
console.log(selectedUser === null); // true`,
    explanation: [
      "typeof xem array như object nên không đủ để nhận biết array.",
      "Array.isArray(tags) trả về true và là cách kiểm tra array chính xác.",
      "typeof null trả về object do hành vi cũ của JavaScript.",
      "So sánh === null là cách kiểm tra null rõ ràng.",
    ],
  },
];
