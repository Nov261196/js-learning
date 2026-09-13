class Vehicle {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
  describe() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
  getAge() {
    return new Date().getFullYear() - this.year;
  }
}
class Car extends Vehicle {
  constructor(brand, model, year, seats) {
    super(brand, model, year);
    this.seats = seats;
  }
  describe() {
    return `${super.describe()} - Oto ${this.seats} cho`;
  }
}
class Motorbike extends Vehicle {
  constructor(brand, model, year, cc) {
    super(brand, model, year);
    this.cc = cc;
  }
  describe() {
    return `${super.describe()} - Xe may ${this.cc}cc`;
  }
}
// Su dung
const car = new Car("Toyota", "Camry", 2022, 5);
const moto = new Motorbike("Honda", "Wave", 2020, 110);
console.log(car.describe());
// "Toyota Camry (2022) - Oto 5 cho"
console.log(moto.describe());
// "Honda Wave (2020) - Xe may 110cc"
console.log(car.getAge()); // 4 (ke thua tu Vehicle)
console.log(moto.getAge()); // 6 (ke thua tu Vehicle)
