# Named Export

## Mục tiêu

Học xong bài này, bạn có thể xuất và nhập nhiều giá trị theo đúng tên.

## Lý thuyết

Named Export được dùng để xuất và nhập nhiều giá trị theo đúng tên. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Named Export khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
// user.js
export const role = "admin";
export function canEdit() { return role === "admin"; }
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
// user.js
export const role = "admin";
export function canEdit() { return role === "admin"; }
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Named Export để xuất và nhập nhiều giá trị theo đúng tên. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
// app.js
import { role, canEdit } from "./user.js";
console.log(role, canEdit());
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
