let numbers = [3, 8, 2, 10, 5];
let max = numbers[0];

for(let i = 0; i < numbers.length; i++){
    if(numbers[i] > max){
        max = numbers[i];
    }
}

console.log(max);