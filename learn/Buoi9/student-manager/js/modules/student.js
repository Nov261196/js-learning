export default class Student {
  constructor(id, name, className, score) {
    this.id = id;
    this.name = name;
    this.className = className;
    this.score = score;
  }
  isPassed() {
    return this.score >= 5;
  }
  getResult() {
    if (this.score >= 8) return "Giỏi";
    if (this.score >= 6.5) return "Khá";
    if (this.score >= 5) return "Trung bình";
    return "Yếu";
  }
}
