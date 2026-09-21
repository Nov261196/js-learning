# if / else

## Mục tiêu

Học xong bài này, bạn có thể rẽ nhánh chương trình dựa trên điều kiện.

## Lý thuyết

if / else được dùng để rẽ nhánh chương trình dựa trên điều kiện. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp if / else khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const score = 8;
if (score >= 5) {
  console.log("Đạt");
} else {
  console.log("Chưa đạt");
}
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const score = 8;
if (score >= 5) {
  console.log("Đạt");
} else {
  console.log("Chưa đạt");
}
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng if / else để rẽ nhánh chương trình dựa trên điều kiện. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const stock = 0;
const message = stock > 0 ? "Còn hàng" : "Hết hàng";
console.log(message);
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
