# findIndex

## Mục tiêu

Học xong bài này, bạn có thể tìm vị trí đầu tiên của phần tử đạt điều kiện.

## Lý thuyết

findIndex được dùng để tìm vị trí đầu tiên của phần tử đạt điều kiện. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp findIndex khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const ids = [10, 20, 30];
console.log(ids.findIndex(id => id === 20)); // 1
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const ids = [10, 20, 30];
console.log(ids.findIndex(id => id === 20)); // 1
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng findIndex để tìm vị trí đầu tiên của phần tử đạt điều kiện. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const tasks = [{ id: 1 }, { id: 2 }];
const index = tasks.findIndex(task => task.id === 2);
if (index !== -1) tasks[index].done = true;
console.log(tasks);
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
