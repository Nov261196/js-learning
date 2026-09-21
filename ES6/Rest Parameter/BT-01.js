const sumAll = (...numbers) => {
    let sum = 0;
    for (const number of numbers){
        sum += number;
    }
    return sum;
};

console.log(sumAll(5,10,15));