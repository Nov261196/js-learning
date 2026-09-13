const products = [
  { id: "P01", name: "Mouse", price: 150000, stock: 10 },
  { id: "P02", name: "Keyboard", price: 300000, stock: 5 },
  { id: "P03", name: "Monitor", price: 4500000, stock: 2 }
];

console.log("ID | Ten | Gia | SL | Thanh tien");
console.log("---------------------------------");

for (const { id, name, price, stock } of products) {
  const total = price * stock;
  console.log(`${id} | ${name} | ${price} | ${stock} | ${total}`);
}