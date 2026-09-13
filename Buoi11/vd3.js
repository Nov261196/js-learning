/**
* Hàm mô phỏng kiểm tra số dư và chuyển khoản ngân hàng
* @param {string} sender - Tên người gửi
* @param {number} amount - Số tiền chuyển
* @param {number} balance - Số dư hiện tại
* @returns {Promise<object>}
*/
function transferMoney(sender, amount, balance) {
    return new Promise((resolve, reject) => {
        console.log(`[Đang xử lý] Giao dịch chuyển khoản ${amount.toLocaleString()}đ...`);
        setTimeout(() => {
            if (amount <= 0) {
                reject(new Error("Số tiền chuyển khoản phải lớn hơn 0đ!"));
                return;
            }
            if (amount > balance) {
                reject(new Error(`Số dư không đủ! (Hiện có: ${balance.toLocaleString()}đ)`));
                return;
            }
            const transaction = {
                transactionId: "GD" + Math.floor(100000 + Math.random() * 900000),
                sender: sender,
                amount: amount,
                remainingBalance: balance - amount,
                timestamp: new Date().toLocaleTimeString("vi-VN")
            };
            resolve(transaction); // Thành công -> Trả về đối tượng giao dịch
        }, 1500);
    });
}

const currentBalance = 5000000;
transferMoney("Nguyễn Văn An", 6000000, currentBalance)
    .then((transaction) => {
        // Chỉ chạy khi Promise chuyển sang Fulfilled (resolve)
        console.log("✅ GIAO DỊCH THÀNH CÔNG!");
        console.log(`Mã GD: ${transaction.transactionId}`);
        console.log(`Số tiền trừ: ${transaction.amount.toLocaleString()}đ`);
        console.log(`Số dư còn lại: ${transaction.remainingBalance.toLocaleString()}đ`);
    })
    .catch((error) => {
        // Chạy khi Promise bị Rejected hoặc có lỗi quăng ra (throw)
        console.error("❌ GIAO DỊCH THẤT BẠI:", error.message);
    })
    .finally(() => {
        // LUÔN LUÔN chạy dù thành công hay thất bại (dùng để tắt loading, đóng kết nối)
        console.log("🏁 Kết thúc phiên giao dịch ngân hàng.\n");
    });

