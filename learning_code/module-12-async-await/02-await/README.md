# await

## Mục tiêu

Học xong bài này, bạn có thể chờ Promise bên trong async function theo cách dễ đọc.

## Lý thuyết

await được dùng để chờ Promise bên trong async function theo cách dễ đọc. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp await khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
async function showData() {
  const value = await Promise.resolve("Dữ liệu");
  console.log(value);
}
showData();
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
async function showData() {
  const value = await Promise.resolve("Dữ liệu");
  console.log(value);
}
showData();
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng await để chờ Promise bên trong async function theo cách dễ đọc. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
async function calculate() {
  const a = await Promise.resolve(2);
  const b = await Promise.resolve(3);
  return a + b;
}
calculate().then(console.log);
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
