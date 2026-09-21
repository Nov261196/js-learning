# Lời giải tham khảo - Promise.all

> Đây là lời giải tham khảo, không phải cách giải duy nhất. Hãy so sánh ý tưởng và tự gõ lại code thay vì copy nguyên đoạn.

## Lời giải Bài 01

```js
const user = Promise.resolve({ id: 1 });
const posts = Promise.resolve(["Bài viết"]);
Promise.all([user, posts]).then(([userData, postData]) => {
  console.log(userData, postData);
});
```

### Code hoạt động như thế nào?

- **Input:** Ví dụ bắt đầu với dữ liệu nhỏ để bạn tập trung vào cú pháp chính.
- **Xử lý:** Code dùng Promise.all để chạy song song nhiều Promise độc lập.
- **Kết quả:** Giá trị được trả về, cập nhật trên giao diện hoặc in bằng `console.log` để kiểm tra.
- **Dùng để làm gì:** Giúp bạn hiểu luồng từ input đến output, thay vì chỉ ghi nhớ cú pháp.

### Bạn nên thử thêm

Thay dữ liệu đầu vào, chạy lại code và kiểm tra xem output có đúng với dự đoán không.

## Lời giải Bài 02

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then(values => console.log(values)); // [1, 2]
```

### Code hoạt động như thế nào?

- **Input:** Ví dụ dùng dữ liệu gần với ứng dụng để cho thấy kiến thức có thể ghép vào code thực tế.
- **Xử lý:** Code dùng Promise.all để chạy song song nhiều Promise độc lập.
- **Kết quả:** Giá trị được trả về, cập nhật trên giao diện hoặc in bằng `console.log` để kiểm tra.
- **Dùng để làm gì:** Giúp bạn hiểu luồng từ input đến output, thay vì chỉ ghi nhớ cú pháp.

### Bạn nên thử thêm

Thêm một trường hợp dữ liệu rỗng, không hợp lệ hoặc nằm ở giới hạn để xem chương trình phản ứng thế nào.

## Sau khi xem lời giải

- [ ] Tôi hiểu input của từng lời giải.
- [ ] Tôi xác định được phần code xử lý chính.
- [ ] Tôi biết kết quả được trả về hoặc hiển thị ở đâu.
- [ ] Tôi đã đóng lời giải và tự viết lại bằng cách của mình.
