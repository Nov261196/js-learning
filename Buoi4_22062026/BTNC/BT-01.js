// // const points = [[1, 2], [3, 4], [5, 6]];

// // const [[pointA_x, pointA_y], [pointB_x, pointB_y], [pointC_x, pointC_y]] = points;

// // console.log(`pointA_x = ${pointA_x}, pointA_y = ${pointA_y}`);
// // console.log(`pointB_x = ${pointB_x}, pointB_y = ${pointB_y}`);
// // console.log(`pointC_x = ${pointC_x}, pointC_y = ${pointC_y}`);


// // const points = [[1, 2], [3, 4], [5, 6]];

// // for (const [x, y] of points) {
// //   console.log(`Tọa độ điểm: x = ${x}, y = ${y}`);
// // }

// const points = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];

// const [[firstX, firstY], ...otherPoints] = points;

// console.log(`Điểm đầu tiên: x = ${firstX}, y = ${firstY}`);
// console.log(otherPoints);


const points = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];

const [[pointA_x, pointA_y], [pointB_x, pointB_y], [pointC_x, pointC_y]] = points;

console.log(`pointA_x = ${pointA_x}, pointA_y = ${pointA_y}`);
console.log(`pointB_x = ${pointB_x}, pointB_y = ${pointB_y}`);
console.log(`pointC_x = ${pointC_x}, pointC_y = ${pointC_y}`);

for (const [x, y] of points) {
  console.log(`Tọa độ điểm duyệt qua: x = ${x}, y = ${y}`);
}

const [[firstX, firstY], ...otherPoints] = points;

console.log(`Điểm đầu tiên trích xuất: x = ${firstX}, y = ${firstY}`);
console.log(otherPoints);