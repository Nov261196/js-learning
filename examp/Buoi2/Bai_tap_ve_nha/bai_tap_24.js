// 24. calcAverage(...scores) — tính điểm trung bình (dùng rest parameter nếu đã biết, hoặc nhận
// mảng).

// const calcAverage = (scores )


function calcAverage(numbers){
    let sum = 0;
    for (let i = 0; i < numbers.length; i++){
        sum += numbers[i];
    }
    return sum / numbers.length; 
}

console.log(calcAverage([10,20,30]));

