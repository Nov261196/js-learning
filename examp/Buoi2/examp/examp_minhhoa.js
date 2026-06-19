// Dinh nghia ham tinh diem tong ket
// - attendance: diem chuyen can (mac dinh 0)
// - midterm: diem giua ky (mac dinh 0)
// - finalExam: diem cuoi ky (mac dinh 0)
const calculateFinalScore = (attendance = 0, midterm = 0, finalExam = 0) => {
// Cong thuc: CC*10% + GK*30% + CK*60%
const result = attendance * 0.1 + midterm * 0.3 + finalExam * 0.6;
return result;
};
// Truong hop 1: Truyen du 3 tham so
console.log(calculateFinalScore(8, 7, 9));
// Tinh: 8*0.1 + 7*0.3 + 9*0.6 = 0.8 + 2.1 + 5.4 = 8.3
// Truong hop 2: Chi truyen 2 tham so (finalExam = 0 mac dinh)
console.log(calculateFinalScore(8, 7));
// Tinh: 8*0.1 + 7*0.3 + 0*0.6 = 0.8 + 2.1 + 0 = 2.9
// Truong hop 3: Khong truyen gi (tat ca = 0)
console.log(calculateFinalScore());
// Tinh: 0*0.1 + 0*0.3 + 0*0.6 = 0