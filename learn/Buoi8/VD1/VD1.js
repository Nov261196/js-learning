// Module quản lý điểm — đóng gói bằng IIFE
const ScoreModule = (() => {
  // Dữ liệu PRIVATE — không truy cập trực tiếp từ bên ngoài
  let scores = [];
  // Hàm PRIVATE — chỉ dùng nội bộ
  const calculateAverage = () => {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, s) => sum + s, 0);
    return total / scores.length;
  };
  // PUBLIC API — những gì được export
  return {
    add(score) {
      if (score >= 0 && score <= 10) {
        scores.push(score);
        return true;
      }
      return false;
    },
    getAll() {
      return [...scores]; // Trả về bản sao, không cho sửa trực tiếp mảng gốc
    },
    getAverage() {
      return calculateAverage();
    },
    getCount() {
      return scores.length;
    },
  };
})();
// Sử dụng
ScoreModule.add(8);
ScoreModule.add(7);
ScoreModule.add(9);
console.log(ScoreModule.getAll()); // [8, 7, 9]
console.log(ScoreModule.getAverage()); // 8
// Không truy cập được private state
// console.log(ScoreModule.scores); // undefined
