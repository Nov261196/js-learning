# Day 8

## Học gì

- Object
- Array of Objects
- Truy cập dữ liệu trong object
- Loop array object
- Function với object
- Tìm object có giá trị lớn nhất

## Khó chỗ nào

- Dễ nhầm giữa array và object
- Khó hiểu students[i]
- Khó hiểu students[i].age
- Dễ return sai vị trí trong loop

## Cách giải

- Dùng array để lưu nhiều object
- Dùng object để mô tả dữ liệu
- Dùng for để duyệt array
- Dùng dấu chấm để truy cập key

Ví dụ:

- students[i]
  - object hiện tại

- students[i].name
  - lấy name của object hiện tại

- students[i].age
  - lấy age của object hiện tại

Bài tìm tuổi lớn nhất:

- giả sử student đầu tiên lớn tuổi nhất
- loop các student còn lại
- nếu age lớn hơn thì cập nhật
- loop xong mới return kết quả

## Ghi chú

- Object lưu dữ liệu dạng key/value
- Array object rất phổ biến trong thực tế
- return không nên đặt bên trong loop
- Nên format code rõ ràng và dễ đọc
