function countOdd(numbers){
    let count = 0;

    for(let i = 0 ; i < numbers.length; i++){
        if(numbers[i] % 2 !== 0){
            console.log(numbers[i]);
            count++;
        }
    }
    return count;
}
console.log(countOdd([1 , 2, 4, 5, 3]));