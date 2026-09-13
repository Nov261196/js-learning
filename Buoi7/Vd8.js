class Person {
  constructor(name, age, className) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Toi la ${this.name}, ${this.age} tuoi`;
  }
}

class Employee extends Person {
  constructor(name, age, id, salary) {
    super(name, age);
    this.id = id;
    this.salary = salary;
  }

  introduce() {
    const base = super.introduce();
    return `${base}, phong ban ${this.department}, phu cap ${this.allowance}`;
  }
}

class Manager extends Employee {
  constructor(name, age, id, salary, department, allowance) {
    super(name, age, id, salary);
    this.department = department;
    this.allowance = allowance;
  }

  introduce() {
    const base = super.introduce();

    const totalSalary = this.salary + this.allowance;

    return `${base}, phong ${this.department}, luong ${totalSalary.toLocaleString()} VND (Quan ly)`;
  }
}

const mgr = new Manager("Phong", 35, "NV01", 20000000, "IT", 5000000);

console.log(mgr.introduce());
