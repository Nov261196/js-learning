class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Toi la ${this.name}, ${this.age} tuoi`;
  }
}

class Student extends Person {
  constructor(name, age, className) {
    super(name, age);
    this.className = className;
  }
}

const sv = new Student("AN", 20, "CDJS01");
console.log(sv.name);
console.log(sv.className);
console.log(sv.introduce());
