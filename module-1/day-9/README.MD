# Day 9

## Học gì

- Debug code
- Đọc lỗi
- Fix bug
- Clean code
- Format code
- Tư duy sửa lỗi

## Khó chỗ nào

- Dễ loop sai điều kiện
- Dễ return sai vị trí
- Dễ dùng sai điều kiện chẵn/lẻ
- Dễ typo như:
  - length
  - console.log

## Cách sửa bug

- Đọc kỹ lỗi trước
- Kiểm tra syntax
- Dùng console.log để debug
- Test từng phần nhỏ
- So sánh output thực tế với output mong muốn

Ví dụ:

- i <= numbers.length
  - loop dư 1 lần

- let max = 0
  - sai nếu array toàn số âm

- return bên trong loop
  - function dừng quá sớm

- user[name]
  - JS tưởng name là biến

- user["name"]
  - đúng key string

## Ghi chú

- Bug logic khó hơn bug syntax
- Clean code giúp dễ debug hơn
- Nên format code rõ ràng
- Tên biến nên dễ hiểu
- Không nên panic khi gặp lỗi
