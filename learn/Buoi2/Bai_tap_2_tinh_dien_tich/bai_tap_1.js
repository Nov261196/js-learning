// function rectangleAre (height, width){
//     return height * width;
// }

// console.log(rectangleAre(10,5));


const rectangleAre = (width, height = width) => width * height;

console.log(rectangleAre(5,3));
console.log(rectangleAre(4));
console.log(rectangleAre(7,2));
