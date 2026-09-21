const student = {
  name: "Nguyen Van An",
  age: 20,
  address: {
    city: "TP.HCM",
    district: "Thu Duc"
  }
};

const { name, email = "N/A", address: { city } } = student;

console.log("Ten:", name);   
console.log("Email:", email); 
console.log("TP:", city);    