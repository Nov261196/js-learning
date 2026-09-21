# for và while

## Mục tiêu

Học xong bài này, bạn có thể lặp lại công việc có kiểm soát và tránh vòng lặp vô hạn.

## Lý thuyết

for và while được dùng để lặp lại công việc có kiểm soát và tránh vòng lặp vô hạn. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp for và while khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng for và while để lặp lại công việc có kiểm soát và tránh vòng lặp vô hạn. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
let stock = 3;
while (stock > 0) {
  console.log(`Còn ${stock} sản phẩm`);
  stock--;
}
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
