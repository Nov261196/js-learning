# Data Types và `typeof`

## Mục tiêu

Học xong bài này, bạn có thể:

- Nhận biết các kiểu dữ liệu JavaScript cơ bản.
- Hiểu `typeof` là gì và dùng để làm gì.
- Đọc đúng kết quả mà `typeof` trả về.
- Phân biệt giá trị của biến với kiểu dữ liệu của biến.

## Lý thuyết

### Data type là gì?

Data type là **kiểu của một giá trị**. Kiểu dữ liệu cho JavaScript biết giá trị đó là chữ, số, đúng/sai hay một dạng dữ liệu khác.

```js
const userName = "An";  // string: chuỗi ký tự
const age = 20;         // number: số
const isStudent = true; // boolean: đúng hoặc sai
```

Cùng nhìn giống một con số nhưng `"10"` và `10` có kiểu khác nhau:

```js
"10" // string vì nằm trong dấu ngoặc kép
10   // number vì không có dấu ngoặc kép
```

### `typeof` là gì?

`typeof` là một **toán tử** của JavaScript. Nó kiểm tra kiểu dữ liệu của một giá trị và trả về tên kiểu dưới dạng chuỗi.

```js
typeof value
```

Ví dụ:

```js
const age = 20;
const result = typeof age;

console.log(result); // "number"
```

Code chạy theo thứ tự:

1. `age` lưu giá trị `20`.
2. `typeof age` kiểm tra kiểu của `20`.
3. Kết quả là chuỗi `"number"` và được lưu vào `result`.
4. `console.log(result)` in `number` ra console.

> `typeof` không thay đổi giá trị. Nó chỉ trả lời câu hỏi: “Giá trị này thuộc kiểu gì?”.

### `typeof` dùng để làm gì?

- Kiểm tra dữ liệu trước khi tính toán.
- Phát hiện dữ liệu nhận sai kiểu.
- Debug khi kết quả chương trình không đúng.
- Chọn cách xử lý phù hợp với từng kiểu dữ liệu.

Ví dụ thực tế, hàm chỉ chấp nhận số:

```js
function double(number) {
  if (typeof number !== "number") {
    return "Dữ liệu phải là number";
  }

  return number * 2;
}

console.log(double(5));   // 10
console.log(double("5")); // Dữ liệu phải là number
```

`double(5)` nhận number nên thực hiện phép nhân. `double("5")` nhận string nên trả thông báo thay vì tiếp tục tính.

## Các kết quả thường gặp

| Giá trị | Kết quả `typeof` | Ý nghĩa |
| --- | --- | --- |
| `"Hello"` | `"string"` | Chuỗi ký tự |
| `10`, `2.5`, `NaN` | `"number"` | Số |
| `true`, `false` | `"boolean"` | Đúng hoặc sai |
| `undefined` | `"undefined"` | Chưa có giá trị |
| `123n` | `"bigint"` | Số nguyên rất lớn |
| `Symbol("id")` | `"symbol"` | Giá trị định danh duy nhất |
| `{ name: "An" }` | `"object"` | Object |
| `[1, 2, 3]` | `"object"` | Array cũng được `typeof` xem là object |
| `function hello() {}` | `"function"` | Function |
| `null` | `"object"` | Trường hợp đặc biệt của JavaScript |

### Hai trường hợp dễ nhầm

#### Array

`typeof` không phân biệt được array với object vì cả hai đều trả về `"object"`.

```js
const tags = ["javascript", "react"];

console.log(typeof tags);         // "object"
console.log(Array.isArray(tags)); // true
```

Khi muốn kiểm tra array, hãy dùng `Array.isArray()`.

#### null

```js
const selectedUser = null;

console.log(typeof selectedUser); // "object"
```

Đây là một hành vi cũ của JavaScript. Khi cần kiểm tra `null`, hãy so sánh trực tiếp:

```js
console.log(selectedUser === null); // true
```

## Cú pháp

Hai cách dưới đây cho kết quả giống nhau:

```js
typeof value;
typeof(value);
```

Cách `typeof value` thường được dùng hơn vì `typeof` là toán tử, không phải function.

## Code ví dụ

### Ví dụ 1 - Kiểm tra các kiểu cơ bản

```js
const userName = "An";
const age = 20;
const isLoggedIn = false;
let message;

console.log(typeof userName);   // "string"
console.log(typeof age);        // "number"
console.log(typeof isLoggedIn); // "boolean"
console.log(typeof message);    // "undefined"
```

- `userName` chứa chữ nên có kiểu `string`.
- `age` chứa số nên có kiểu `number`.
- `isLoggedIn` chỉ có `true` hoặc `false` nên có kiểu `boolean`.
- `message` đã được khai báo nhưng chưa có giá trị nên có kiểu `undefined`.

### Ví dụ 2 - Giá trị thay đổi nhưng kiểu có thể giữ nguyên

```js
let isLoggedIn = false;

console.log(isLoggedIn);        // false
console.log(typeof isLoggedIn); // "boolean"

isLoggedIn = true;

console.log(isLoggedIn);        // true
console.log(typeof isLoggedIn); // "boolean"
```

Giá trị đổi từ `false` thành `true`, nhưng cả hai đều là boolean nên `typeof isLoggedIn` vẫn trả về `"boolean"`.

### Ví dụ 3 - Kiểm tra dữ liệu trước khi sử dụng

```js
const price = "100";

if (typeof price === "number") {
  console.log(price * 2);
} else {
  console.log("price chưa phải là number");
}
```

`price` nằm trong dấu ngoặc kép nên là string. Điều kiện trả về `false`, vì vậy chương trình chạy nhánh `else`.

## Exercises

- [Đề bài và file thực hành](./exercises/README.md)
- [Lời giải có giải thích](./exercises/SOLUTIONS.md)

> Hãy tự dự đoán kết quả và làm bài trước khi mở lời giải.
