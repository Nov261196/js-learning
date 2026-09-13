class Person {
  constructor(name) {
    this.name = name;
  }

  //   introduce() {
  //     return `Toi la ${this.name}`;
  //   }
  //   static isValidName(name) {
  //     return name.trim().length >= 2;
  //   }

  static isValidName(name) {
    return name.trim().length >= 2;
  }
}

class Student extends Person {}

console.log(Student.isValidName("BLOS"));
console.log(Person.isValidName(""));
