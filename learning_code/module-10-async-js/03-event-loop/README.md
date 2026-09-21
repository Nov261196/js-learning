# Event Loop cơ bản

## Mục tiêu

Học xong bài này, bạn có thể dự đoán thứ tự chạy giữa call stack, task và microtask.

## Lý thuyết

Event Loop cơ bản được dùng để dự đoán thứ tự chạy giữa call stack, task và microtask. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Event Loop cơ bản khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
console.log("start");
setTimeout(() => console.log("task"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("end");
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
console.log("start");
setTimeout(() => console.log("task"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("end");
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Event Loop cơ bản để dự đoán thứ tự chạy giữa call stack, task và microtask. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
setTimeout(() => console.log("sau"), 0);
for (let i = 0; i < 2; i++) console.log(i);
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
