function countA(text){
    let count = 0;
    for (let i = 0; i < text.length; i++){
        if(text[i] === "a" || text[i] === "A"){
            count++;
        }
    }
    return count;
}

console.log(countA("banana"));