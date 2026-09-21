// Model — dinh nghia cau truc du lieu sinh vien
export default class Student {
  constructor(id, name, className, score) {
    this.id = id;
    this.name = name;
    this.className = className;
    this.score = score;
  }
  // Method: Xep loai
  getResult() {
    if (this.score >= 8) return "Gioi";
    if (this.score >= 6.5) return "Kha";
    if (this.score >= 5) return "Trung binh";
    return "Yeu";
  }
  // Method: Kiem tra dat/khong dat
  isPassed() {
    return this.score >= 5;
  }
}
