# DOM Attributes

## Mục tiêu

Học xong bài này, bạn có thể đọc, đặt và xóa attribute của element.

## Lý thuyết

DOM Attributes được dùng để đọc, đặt và xóa attribute của element. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp DOM Attributes khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const image = document.querySelector("img");
image.setAttribute("alt", "Ảnh sản phẩm");
console.log(image.getAttribute("alt"));
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const image = document.querySelector("img");
image.setAttribute("alt", "Ảnh sản phẩm");
console.log(image.getAttribute("alt"));
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng DOM Attributes để đọc, đặt và xóa attribute của element. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const button = document.querySelector("button");
button.disabled = true;
button.removeAttribute("disabled");
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
