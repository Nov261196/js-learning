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

  introduce() {
    const base = super.introduce();
    return `${base}, lop ${this.className}`;
  }
}

const sv = new Student("An", 20, "CDJS01");
console.log(sv.introduce());
