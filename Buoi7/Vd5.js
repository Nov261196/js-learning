class Employee {
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  getSalary() {
    return this.salary;
  }

  getInfo() {
    return `${this.id} | ${this.name} | Luong: ${this.getSalary().toLocaleString()} VND`;
  }
}

class Manager extends Employee {
  constructor(id, name, salary, allowance) {
    super(id, name, salary); // Goi constructor Employee
    this.allowance = allowance; // Them thuoc tinh rieng
  }
  // OVERRIDE getSalary() — luong + phu cap
  getSalary() {
    return super.getSalary() + this.allowance;
  }
  // OVERRIDE getInfo() — them chuc vu
  getInfo() {
    return `${super.getInfo()} (Quan ly)`;
  }
}
// Su dung
const emp = new Employee("NV01", "An", 10000000);
const mgr = new Manager("NV02", "Phong", 15000000, 5000000);
console.log(emp.getInfo());
// "NV01 | An | Luong: 10,000,000 VND"
console.log(mgr.getInfo());
// "NV02 | Phong | Luong: 20,000,000 VND (Quan ly)"
console.log(mgr.getSalary());
// 20000000 (15tr + 5tr phu cap)
