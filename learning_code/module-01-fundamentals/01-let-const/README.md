# let và const

## Mục tiêu

Học xong bài này, bạn có thể khai báo biến đúng cách và phân biệt giá trị có thể gán lại với giá trị không nên gán lại.

## Lý thuyết

let và const được dùng để khai báo biến đúng cách và phân biệt giá trị có thể gán lại với giá trị không nên gán lại. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp let và const khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
let score = 0;
score = score + 10;
console.log(score); // 10
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
let score = 0;
score = score + 10;
console.log(score); // 10
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng let và const để khai báo biến đúng cách và phân biệt giá trị có thể gán lại với giá trị không nên gán lại. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const userName = "An";
console.log(`Xin chào ${userName}`); // Xin chào An
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
