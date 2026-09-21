# Modules cho ứng dụng

## Mục tiêu

Học xong bài này, bạn có thể tách component-like function, data và utility thành module.

## Lý thuyết

Modules cho ứng dụng được dùng để tách component-like function, data và utility thành module. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Modules cho ứng dụng khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
// userService.js
export async function getUsers() { return []; }

// app.js
import { getUsers } from "./userService.js";
console.log(await getUsers());
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
// userService.js
export async function getUsers() { return []; }

// app.js
import { getUsers } from "./userService.js";
console.log(await getUsers());
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Modules cho ứng dụng để tách component-like function, data và utility thành module. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
// utils.js
export const byId = id => item => item.id === id;

// app.js
import { byId } from "./utils.js";
console.log([{ id: 1 }].find(byId(1)));
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
