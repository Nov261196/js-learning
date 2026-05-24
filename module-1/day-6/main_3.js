function findMin(numbers){
    let min = numbers[0];

    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] < min){
            min = numbers[i];
        }
    }
    return min;
}

console.log(findMin([122 ,211 ,32 , 992 , 1020 ]));
