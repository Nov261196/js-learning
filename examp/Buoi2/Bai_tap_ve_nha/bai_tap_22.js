// 22. isPassed(score, passScore = 5) — kiểm tra đạt/không đạt, trả về true/false.

const isPassed =( score , passScore = 5 ) =>  score >= passScore;

console.log(isPassed(10,5));
console.log(isPassed(22,9));
console.log(isPassed(21,12));



