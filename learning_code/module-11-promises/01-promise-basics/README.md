# Promise cơ bản

## Mục tiêu

Học xong bài này, bạn có thể hiểu ba trạng thái và cách Promise biểu diễn kết quả trong tương lai.

## Lý thuyết

Promise cơ bản được dùng để hiểu ba trạng thái và cách Promise biểu diễn kết quả trong tương lai. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Promise cơ bản khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const result = new Promise(resolve => {
  setTimeout(() => resolve("Hoàn thành"), 500);
});
result.then(value => console.log(value));
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const result = new Promise(resolve => {
  setTimeout(() => resolve("Hoàn thành"), 500);
});
result.then(value => console.log(value));
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Promise cơ bản để hiểu ba trạng thái và cách Promise biểu diễn kết quả trong tương lai. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const ready = Promise.resolve(true);
ready.then(value => console.log(value));
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
