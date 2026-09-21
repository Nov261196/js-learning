# Lời giải tham khảo - Data Types và `typeof`

> Hãy tự làm trước. Lời giải có thể khác code của bạn nhưng vẫn đúng nếu kết quả và cách giải thích hợp lý.

## Lời giải Bài 1

```js
const userName = "An";
const age = 20;
const isStudent = true;
let message;
const user = { id: 1 };

console.log(userName, typeof userName);   // An string
console.log(age, typeof age);             // 20 number
console.log(isStudent, typeof isStudent); // true boolean
console.log(message, typeof message);     // undefined undefined
console.log(user, typeof user);           // { id: 1 } object
```

### Giải thích từng phần

- `userName` chứa chữ trong dấu ngoặc kép nên là `string`.
- `age` chứa số không có ngoặc kép nên là `number`.
- `isStudent` chứa `true` nên là `boolean`.
- `message` được khai báo nhưng chưa được gán giá trị nên là `undefined`.
- `user` chứa các cặp key-value nên là `object`.
- Mỗi `console.log` in cả giá trị và kết quả do `typeof` trả về.

## Lời giải Bài 2

```js
console.log(typeof "10");      // "string"
console.log(typeof 10);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
```

### Giải thích từng phần

- `"10"` có dấu ngoặc kép nên JavaScript xem nó là chuỗi, dù bên trong là chữ số.
- `10` không có dấu ngoặc kép nên là number.
- `true` là một trong hai giá trị của boolean.
- `undefined` có nghĩa là chưa có giá trị và `typeof` cũng trả về `"undefined"`.

## Lời giải Bài 3

```js
let isLoggedIn = false;

console.log(isLoggedIn);        // false
console.log(typeof isLoggedIn); // "boolean"

isLoggedIn = true;

console.log(isLoggedIn);        // true
console.log(typeof isLoggedIn); // "boolean"
```

### Giải thích từng phần

- Dùng `let` vì biến sẽ được gán lại.
- Ban đầu, `isLoggedIn` có giá trị `false` và kiểu `boolean`.
- `isLoggedIn = true` chỉ thay đổi giá trị của biến.
- `false` và `true` đều thuộc kiểu boolean nên kết quả của `typeof` không đổi.

## Lời giải Bài 4

```js
const tags = ["javascript", "react"];
const selectedUser = null;

console.log(typeof tags);           // "object"
console.log(Array.isArray(tags));    // true

console.log(typeof selectedUser);   // "object"
console.log(selectedUser === null); // true
```

### Giải thích từng phần

- `typeof tags` trả về `"object"`, vì `typeof` không nhận biết riêng array.
- `Array.isArray(tags)` trả về `true`, nên đây là cách đúng để kiểm tra array.
- `typeof null` trả về `"object"` vì một hành vi cũ của JavaScript.
- `selectedUser === null` mới là cách kiểm tra chính xác giá trị `null`.

## Ghi nhớ

```js
typeof value;          // Kiểm tra kiểu dữ liệu chung
Array.isArray(value);  // Kiểm tra array
value === null;        // Kiểm tra null
```
