class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Toi la ${this.name}`;
  }
}

class Student extends Person {
  constructor(name, className) {
    super(name);
    this.className = className;
  }
  // OVERRIDE — ghi de method introduce()
  introduce() {
    return `Toi la ${this.name}, lop ${this.className}`;
  }
}
const p = new Person("Phong");
const sv = new Student("An", "CDJS01");
console.log(p.introduce()); // "Toi la Phong"
console.log(sv.introduce()); // "Toi la An, lop CDJS01" — phien ban ghi de
