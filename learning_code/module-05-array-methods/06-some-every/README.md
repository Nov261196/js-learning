# some và every

## Mục tiêu

Học xong bài này, bạn có thể kiểm tra một hoặc tất cả phần tử theo điều kiện.

## Lý thuyết

some và every được dùng để kiểm tra một hoặc tất cả phần tử theo điều kiện. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp some và every khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const ages = [17, 20, 25];
console.log(ages.some(age => age >= 18)); // true
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const ages = [17, 20, 25];
console.log(ages.some(age => age >= 18)); // true
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng some và every để kiểm tra một hoặc tất cả phần tử theo điều kiện. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const cart = [{ stock: 2 }, { stock: 1 }];
console.log(cart.every(item => item.stock > 0)); // true
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
