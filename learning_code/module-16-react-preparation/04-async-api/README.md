# Async API Flow

## Mục tiêu

Học xong bài này, bạn có thể tổ chức loading, data và error cho một request.

## Lý thuyết

Async API Flow được dùng để tổ chức loading, data và error cho một request. Đây là kiến thức thường gặp khi viết JavaScript và là nền tảng cho các bài xử lý dữ liệu hoặc giao diện ở những module sau.

Khi học, hãy xác định dữ liệu đầu vào, thứ tự các câu lệnh và kết quả đầu ra. Trong thực tế, bạn sẽ gặp Async API Flow khi tổ chức logic, xử lý dữ liệu hoặc cập nhật giao diện. Hãy đổi input của ví dụ để quan sát code phản ứng như thế nào.

## Cú pháp

```js
const state = { data: [], loading: false, error: null };
async function load() {
  state.loading = true;
  try { state.data = await Promise.resolve([1, 2]); }
  catch (error) { state.error = error.message; }
  finally { state.loading = false; }
}
await load();
```

## Code ví dụ

### Ví dụ 1 - Cú pháp cơ bản

```js
const state = { data: [], loading: false, error: null };
async function load() {
  state.loading = true;
  try { state.data = await Promise.resolve([1, 2]); }
  catch (error) { state.error = error.message; }
  finally { state.loading = false; }
}
await load();
```

Đầu tiên code tạo dữ liệu đầu vào, sau đó dùng Async API Flow để tổ chức loading, data và error cho một request. Các lệnh `console.log` cho biết kết quả sau khi dữ liệu được xử lý.

### Ví dụ 2 - Tình huống thực tế

```js
const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Request failed");
  return response.json();
};
```

Ví dụ này áp dụng cùng kiến thức vào dữ liệu gần với ứng dụng thực tế. Code chạy từ phần khai báo dữ liệu đến phần xử lý; kết quả cuối cùng được trả về hoặc in ra để phần khác của chương trình có thể sử dụng.

## Bài tập

- [ ] Chạy lại hai ví dụ và dự đoán output trước khi xem console.
- [ ] Thay dữ liệu đầu vào bằng ít nhất hai trường hợp khác.
- [ ] Viết một ví dụ mới trong `index.js` mà không sao chép code mẫu.
- [ ] Giải thích lại bài bằng lời của bạn.
