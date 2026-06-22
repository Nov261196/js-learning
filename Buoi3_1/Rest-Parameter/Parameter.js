const sum =  (...numbers) => {

    let total = 0;
    for (const num of numbers){
        total += num;
    }
    return total;
};

console.log(sum(1,2,3));
console.log(sum(5,10,15,20));
