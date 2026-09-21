# Async Callback

## Mục tiêu

Học xong bài này, bạn có thể nhận kết quả bất đồng bộ qua callback và xử lý lỗi cơ bản.

## Lý thuyết

Async Callback được dùng để nhận kết quả bất đồng bộ qua callback và xử lý lỗi cơ bản. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Async Callback khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
function loadUser(callback) {
  setTimeout(() => callback({ id: 1, name: "An" }), 500);
}
loadUser(user => console.log(user));
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
function loadUser(callback) {
  setTimeout(() => callback({ id: 1, name: "An" }), 500);
}
loadUser(user => console.log(user));
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Async Callback để nhận kết quả bất đồng bộ qua callback và xử lý lỗi cơ bản. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
function loadData(callback) {
  setTimeout(() => callback(null, [1, 2]), 300);
}
loadData((error, data) => error ? console.error(error) : console.log(data));
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
