# Lưu JSON

## Mục tiêu

Học xong bài này, bạn có thể chuyển array hoặc object thành chuỗi và khôi phục lại.

## Lý thuyết

Lưu JSON được dùng để chuyển array hoặc object thành chuỗi và khôi phục lại. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Lưu JSON khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const cart = [{ id: 1, quantity: 2 }];
localStorage.setItem("cart", JSON.stringify(cart));
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const cart = [{ id: 1, quantity: 2 }];
localStorage.setItem("cart", JSON.stringify(cart));
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Lưu JSON để chuyển array hoặc object thành chuỗi và khôi phục lại. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const saved = localStorage.getItem("cart");
const cart = saved ? JSON.parse(saved) : [];
console.log(cart);
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
