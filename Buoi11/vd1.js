console.log("1. Bắt đầu");


// setTimeout là hàm bất đồng bộ do môi trường Web API cung cấp
setTimeout(() => {
    console.log("2. Tác vụ hẹn giờ sau 1000ms hoàn thành");

    console.log("3. Kết thúc dòng lệnh chính");
}, 1000);


// Promise.resolve().then(() => {
//     console.log("3. Kết thúc dòng lệnh chính");
// })


// setTimeout(() => {
//     console.log("2. Tác vụ hẹn giờ sau 1000ms hoàn thành");

//     // Đưa Promise vào đây để đảm bảo dòng 3 chỉ chạy sau khi dòng 2 đã in ra
//     Promise.resolve().then(() => {
//         console.log("3. Kết thúc dòng lệnh chính");
//     });

// }, 1000);



// Promise.resolve().then(() => {
//     console.log("3. Kết thúc dòng lệnh chính");
// })
// Kết quả in ra Console:
// 1. Bắt đầu
// 3. Kết thúc dòng lệnh chính
// 2. Tác vụ hẹn giờ sau 1000ms hoàn thành (xuất hiện sau 1 giây)