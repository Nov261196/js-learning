const storeProducts = [
  { id: "P01", name: "Chuột Máy Tính", price: 250000, stock: 15, category: "Phụ kiện" },
  { id: "P02", name: "Bàn Phím Cơ", price: 1200000, stock: 8, category: "Phụ kiện" },
  { id: "P03", name: "Màn Hình 4K", price: 8500000, stock: 3, category: "Linh kiện" },
  { id: "P04", name: "Tai Nghe Gaming", price: 650000, category: "Phụ kiện" },
  { id: "P05", name: "Ghế Công Thái Học", price: 3500000, stock: 5, category: "Nội thất" }
];

let totalWarehouseValue = 0;
let maxProduct = storeProducts[0]; 

console.log("=== DANH SÁCH SẢN PHẨM IN BẰNG DESTRUCTURING ===");
console.log("ID | Tên sản phẩm | Giá bán | Tồn kho | Thành tiền");
console.log("-------------------------------------------------------");

for (const product of storeProducts) {
  const { id, name, price, stock = 0 } = product;
  
  const itemTotalValue = price * stock;
  
  totalWarehouseValue += itemTotalValue;
  
  const { price: currentPrice } = product;
  const { price: maxPrice } = maxProduct;
  
  if (currentPrice > maxPrice) {
    maxProduct = product; 
  }

  console.log(`${id} | ${name} | ${price.toLocaleString()}đ | ${stock} | ${itemTotalValue.toLocaleString()}đ`);
}

const { name: maxName, price: maxOutPrice } = maxProduct;

console.log("-------------------------------------------------------");
console.log(`=> Tổng giá trị toàn bộ hàng hóa trong kho: ${totalWarehouseValue.toLocaleString()} VNĐ`);
console.log(`=> Sản phẩm đắt nhất cửa hàng: ${maxName} (${maxOutPrice.toLocaleString()} VNĐ)`);