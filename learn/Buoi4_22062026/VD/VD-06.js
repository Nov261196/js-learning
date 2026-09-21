const user = {
  name: "Lan",
  address: {
    city: "TP.HCM",
    district: "Quan 1",
  },
};
const {
  address: { city, district },
} = user;
console.log(city); // "TP.HCM"
console.log(district); // "Quan 1"
