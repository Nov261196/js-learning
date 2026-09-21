const students = ["Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Cường"];
const sendSMS = (name) => new Promise(res => setTimeout(() => {
    console.log(` -> Đã gửi SMS cho: ${name}`);
    res(`OK_${name}`);
}, 400));
// ==========================================
// CÁCH 1: Dùng Promise
// Cơn ác mộng: Buộc phải dùng Array.prototype.reduce cực kỳ khó hiểu!
// ==========================================
function sendBatchPromise() {
    console.log("=== Bắt đầu gửi SMS (Promise Reduce) ===");
    students.reduce((prevPromise, student) => {
        return prevPromise.then(() => sendSMS(student));
    }, Promise.resolve()).then(() => {
        console.log("✓ [Promise] Đã gửi hết toàn bộ danh sách!\n");
    });
}
// ==========================================
// CÁCH 2: Dùng Async / Await
// Đơn giản tuyệt đối: Chỉ cần 1 vòng lặp for...of với await!
// ==========================================
async function sendBatchAsyncAwait() {
    console.log("=== Bắt đầu gửi SMS (Async/Await for...of) ===");
    for (const student of students) {
        await sendSMS(student); // Chờ từng bạn xong mới sang bạn tiếp theo
    }
    console.log("✓ [Async/Await] Đã gửi hết toàn bộ danh sách!");
}
// CHẠY KIỂM THỬ:
sendBatchPromise();
setTimeout(sendBatchAsyncAwait, 1800);