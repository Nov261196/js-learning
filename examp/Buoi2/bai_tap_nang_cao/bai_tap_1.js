const applyOperation = ( a , b , operation = ( x , y) => x + y) => operation(a,b);
console.log(applyOperation(10, 3, (a, b) => a + b));
console.log(applyOperation(10, 3, (a, b) => a - b));
console.log(applyOperation(10, 3, (a, b) => a * b));
console.log(applyOperation(10, 3));