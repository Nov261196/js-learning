# Exercises - Data Types và `typeof`

> Làm bài trước trong các file `exercise-*.js`. Chỉ mở `SOLUTIONS.md` sau khi bạn đã tự thử.

## Bài 1 - Kiểm tra năm kiểu dữ liệu

### Bài này để làm gì?

Giúp bạn nhận biết giá trị đang thuộc kiểu dữ liệu nào và làm quen với kết quả của `typeof`.

**Trong dự án:** dùng để kiểm tra giá, số lượng, thông tin user hoặc field nhận từ API trước khi xử lý.

### Yêu cầu

Tạo năm biến thuộc năm kiểu khác nhau và dùng `typeof` để kiểm tra:

1. Một `string`.
2. Một `number`.
3. Một `boolean`.
4. Một `undefined`.
5. Một `object`.

In tên biến, giá trị và kiểu dữ liệu ra console.

Làm bài tại: `exercise-01.js`.

## Bài 2 - Dự đoán kết quả

### Bài này để làm gì?

Giúp bạn phân biệt giá trị nhìn giống nhau nhưng có kiểu khác nhau, đặc biệt là `"10"` và `10`.

**Trong dự án:** dữ liệu lấy từ input, URL và localStorage thường là string; bạn cần nhận biết để chuyển thành number trước khi tính toán.

### Yêu cầu

Không chạy code ngay. Hãy ghi dự đoán của bạn cho từng dòng, sau đó mới chạy để kiểm tra:

```js
console.log(typeof "10");
console.log(typeof 10);
console.log(typeof true);
console.log(typeof undefined);
```

Làm bài tại: `exercise-02.js`.

## Bài 3 - Giá trị và kiểu dữ liệu

### Bài này để làm gì?

Giúp bạn hiểu rằng giá trị của biến có thể thay đổi trong khi kiểu dữ liệu vẫn giữ nguyên.

**Trong dự án:** boolean như `isLoggedIn`, `isLoading` hoặc `isModalOpen` dùng để điều khiển trạng thái và giao diện.

### Yêu cầu

1. Tạo biến `isLoggedIn` với giá trị `false`.
2. In giá trị và kiểu dữ liệu của biến.
3. Đổi giá trị thành `true`.
4. In lại giá trị và kiểu dữ liệu.
5. Giải thích vì sao hai lần dùng `typeof` có cùng kết quả.

Làm bài tại: `exercise-03.js`.

## Bài 4 - Array và null

### Bài này để làm gì?

Giúp bạn nhận biết hai trường hợp đặc biệt mà người mới thường hiểu nhầm khi sử dụng `typeof`.

**Trong dự án:** array thường chứa danh sách API để render; `null` thường biểu thị chưa chọn hoặc chưa có một đối tượng.

### Yêu cầu

1. Tạo một array và một biến có giá trị `null`.
2. Kiểm tra cả hai bằng `typeof`.
3. Kiểm tra array bằng `Array.isArray()`.
4. Kiểm tra `null` bằng phép so sánh `=== null`.
5. So sánh kết quả của các cách kiểm tra.

Làm bài tại: `exercise-04.js`.

## Tự kiểm tra

- [ ] Tôi hiểu `typeof` trả về một chuỗi tên kiểu dữ liệu.
- [ ] Tôi phân biệt được `"10"` và `10`.
- [ ] Tôi biết `typeof array` trả về `"object"`.
- [ ] Tôi biết cách kiểm tra array bằng `Array.isArray()`.
- [ ] Tôi biết cách kiểm tra `null` bằng `=== null`.
