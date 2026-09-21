# Lời giải tham khảo - API Practice

> Đây là lời giải tham khảo, không phải cách giải duy nhất. Hãy so sánh ý tưởng và tự gõ lại code thay vì copy nguyên đoạn.

## Lời giải Bài 01

```js
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Không tải được user");
  return response.json();
}
console.log(await loadUsers());
```

### Code hoạt động như thế nào?

- **Input:** Ví dụ bắt đầu với dữ liệu nhỏ để bạn tập trung vào cú pháp chính.
- **Xử lý:** Code dùng API Practice để ghép fetch, xử lý dữ liệu và render thành một luồng hoàn chỉnh.
- **Kết quả:** Giá trị được trả về, cập nhật trên giao diện hoặc in bằng `console.log` để kiểm tra.
- **Dùng để làm gì:** Giúp bạn hiểu luồng từ input đến output, thay vì chỉ ghi nhớ cú pháp.

### Bạn nên thử thêm

Thay dữ liệu đầu vào, chạy lại code và kiểm tra xem output có đúng với dự đoán không.

## Lời giải Bài 02

```js
const normalizeUser = ({ id, name, email }) => ({ id, name, email });
const users = (await loadUsers()).map(normalizeUser);
console.log(users);
```

### Code hoạt động như thế nào?

- **Input:** Ví dụ dùng dữ liệu gần với ứng dụng để cho thấy kiến thức có thể ghép vào code thực tế.
- **Xử lý:** Code dùng API Practice để ghép fetch, xử lý dữ liệu và render thành một luồng hoàn chỉnh.
- **Kết quả:** Giá trị được trả về, cập nhật trên giao diện hoặc in bằng `console.log` để kiểm tra.
- **Dùng để làm gì:** Giúp bạn hiểu luồng từ input đến output, thay vì chỉ ghi nhớ cú pháp.

### Bạn nên thử thêm

Thêm một trường hợp dữ liệu rỗng, không hợp lệ hoặc nằm ở giới hạn để xem chương trình phản ứng thế nào.

## Sau khi xem lời giải

- [ ] Tôi hiểu input của từng lời giải.
- [ ] Tôi xác định được phần code xử lý chính.
- [ ] Tôi biết kết quả được trả về hoặc hiển thị ở đâu.
- [ ] Tôi đã đóng lời giải và tự viết lại bằng cách của mình.
