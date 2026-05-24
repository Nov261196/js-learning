function findMax(numbers){
    let max = numbers[0];


    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] > max){
            max = numbers[i];
        }
    }
    return max;
}

console.log(findMax([1 , 2 , 10 , 30, 90]));
