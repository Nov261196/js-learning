console.log("A - Đồng bộ 1");
setTimeout(() => {
    console.log("B - Macrotask (setTimeout 1000ms)");
}, 1000);
Promise.resolve().then(() => {
    console.log("C - Microtask (Promise .then 1)");
}).then(() => {
    console.log("D - Microtask (Promise .then 2)");
});
console.log("E - Đồng bộ 2");
// Thứ tự in ra chính xác:
// A - Đồng bộ 1
// E - Đồng bộ 2
// C - Microtask (Promise .then 1)
// D - Microtask (Promise .then 2)
// B - Macrotask (setTimeout 0ms)