# Fetch GET

## Mục tiêu

Học xong bài này, bạn có thể lấy dữ liệu từ API và kiểm tra response.

## Lý thuyết

Fetch GET được dùng để lấy dữ liệu từ API và kiểm tra response. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Fetch GET khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const response = await fetch("https://jsonplaceholder.typicode.com/users");
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const users = await response.json();
console.log(users);
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const response = await fetch("https://jsonplaceholder.typicode.com/users");
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const users = await response.json();
console.log(users);
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Fetch GET để lấy dữ liệu từ API và kiểm tra response. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(todo => console.log(todo));
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.

## Exercises

- [Đề bài và file thực hành](./exercises/README.md)
- [Lời giải có giải thích](./exercises/SOLUTIONS.md)

> Tự làm trước, chỉ mở lời giải khi bạn đã thử ít nhất một lần.
