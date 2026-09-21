const findMax = (...numbers) => {
    let max = numbers[0];
    for (const num of numbers){
        if (num > max){
            max = num;
        }
    }
    return max;
}

console.log(findMax(4,8,1,20,6));