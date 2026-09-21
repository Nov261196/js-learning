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

## Áp dụng trong dự án thực tế

Bạn thường không dùng `typeof` như một tính năng riêng. Nó nằm bên trong bước **kiểm tra dữ liệu** trước khi ứng dụng tính toán hoặc hiển thị giao diện.

| Dữ liệu trong dự án | Kiểu thường gặp | Tác dụng của việc kiểm tra |
| --- | --- | --- |
| Giá trị nhập từ form | `string` | Chuyển thành number trước khi tính toán |
| Trạng thái đăng nhập | `boolean` | Quyết định giao diện nào được hiển thị |
| Danh sách từ API | `array` | Đảm bảo có thể dùng `map`, `filter` |
| Chưa chọn sản phẩm/user | `null` | Tránh đọc thuộc tính khi chưa có dữ liệu |
| Field bị thiếu từ API | `undefined` | Hiển thị giá trị mặc định hoặc thông báo lỗi |

### Tình huống 1 - Tính tổng từ form sản phẩm

Giá trị lấy từ ô input là string, kể cả khi người dùng nhập số:

```js
const priceInput = "100";
const quantityInput = "2";

console.log(typeof priceInput); // "string"

const price = Number(priceInput);
const quantity = Number(quantityInput);

if (typeof price === "number" && typeof quantity === "number") {
  console.log(price * quantity); // 200
}
```

Trong Product App hoặc giỏ hàng, bạn phải chuyển dữ liệu form thành number trước khi tính tổng.

### Tình huống 2 - Hiển thị theo trạng thái đăng nhập

```js
let isLoggedIn = false;

const buttonText = isLoggedIn ? "Đăng xuất" : "Đăng nhập";
console.log(buttonText); // "Đăng nhập"
```

Trong ứng dụng thật, boolean như `isLoggedIn` có thể quyết định hiển thị nút nào, cho phép mở trang nào hoặc có gọi API cá nhân hay không.

### Tình huống 3 - Kiểm tra dữ liệu từ API

```js
const products = [{ id: 1, name: "Bàn phím" }];
const selectedProduct = null;

if (Array.isArray(products)) {
  console.log(`Có ${products.length} sản phẩm`);
}

if (selectedProduct === null) {
  console.log("Chưa chọn sản phẩm");
}
```

Trong Product App, array chứa danh sách sản phẩm; `null` biểu thị chưa chọn sản phẩm nào. Kiểm tra trước giúp app không bị lỗi khi render.

### Luồng bạn sẽ gặp trong project

```text
Người dùng nhập / API trả dữ liệu
              ↓
Kiểm tra kiểu dữ liệu
              ↓
Chuyển đổi hoặc xử lý dữ liệu
              ↓
Hiển thị lên giao diện
```

`typeof` chủ yếu được dùng ở bước kiểm tra. Sau này khi học React, các biến boolean, array, object và null sẽ được dùng rất nhiều để quản lý state và render giao diện.

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
