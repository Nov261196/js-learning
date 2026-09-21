class Shape {
  constructor(name) {
    this.name = name;
  }

  area() {
    throw new Error("area() must be overridden");
  }

  perimeter() {
    throw new Error("perimeter() must be overridden");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Hinh tron");
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super("Hinh chu nhat");
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super("Hinh tam giac");
    this.base = base;
    this.height = height;
  }

  area() {
    return 0.5 * this.base * this.height;
  }

  // Giả sử tam giác vuông
  perimeter() {
    const c = Math.sqrt(this.base ** 2 + this.height ** 2);
    return this.base + this.height + c;
  }
}

const shapes = [new Circle(5), new Rectangle(4, 6), new Triangle(3, 8)];

for (const shape of shapes) {
  console.log(`${shape.name}: ${shape.area()}`);
  //   console.log(`${shape.name}`);
  //   console.log("Area:", shape.area().toFixed(2));
  //   console.log("Perimeter:", shape.perimeter().toFixed(2));
}
