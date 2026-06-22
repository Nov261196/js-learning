const student = {
  name: "Nguyen Van An",
  age: 20,
  address: {
    city: "TP.HCM",
    district: "Thu Duc",
  },
};

const { name, email = "N/A", age, address: { city, district } } = student;

console.log(name); // "Nguyen Van An"
console.log(email); // "N/A"
console.log(age); // 20
console.log(city); // "TP.HCM"
console.log(district); // "Thu Duc"