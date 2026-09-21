const numbers = [ 10, 20 , 30 , 40];
const [firstNumber , , thirdNumber , fourthNumber , fifthNumber = 0] = numbers;

console.log(firstNumber);
console.log(thirdNumber);
console.log(fifthNumber);

