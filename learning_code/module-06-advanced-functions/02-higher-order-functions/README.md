# Higher-order Functions

## Mục tiêu

Học xong bài này, bạn có thể tạo function nhận hoặc trả về function.

## Lý thuyết

Higher-order Functions được dùng để tạo function nhận hoặc trả về function. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Higher-order Functions khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
function createMultiplier(factor) {
  return number => number * factor;
}
const double = createMultiplier(2);
console.log(double(5)); // 10
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
function createMultiplier(factor) {
  return number => number * factor;
}
const double = createMultiplier(2);
console.log(double(5)); // 10
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Higher-order Functions để tạo function nhận hoặc trả về function. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
function withLog(action) {
  return value => { console.log("Input:", value); return action(value); };
}
const square = withLog(x => x * x);
console.log(square(3));
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
