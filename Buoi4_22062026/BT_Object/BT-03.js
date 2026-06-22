const products = [
  { id: "P01", name: "Mouse", price: 150000, stock: 10 },
  { id: "P02", name: "Keyboard", price: 300000, stock: 5 },
  { id: "P03", name: "Monitor", price: 4500000, stock: 2 },
];


for (const product of products) {
    const { id, name, price, stock } = product;
    console.log(`ID: ${id}, Name: ${name}, Price: ${price}, Stock: ${stock}`);
    }

const [firstProduct, secondProduct, thirdProduct] = products;

const { name: firstProductName, price: firstProductPrice } = firstProduct;
const { name: secondProductName, price: secondProductPrice } = secondProduct;
const { name: thirdProductName, price: thirdProductPrice } = thirdProduct;

console.log(`San pham 1: ${firstProductName} - Gia: ${firstProductPrice}`);
console.log(`San pham 2: ${secondProductName} - Gia: ${secondProductPrice}`);
console.log(`San pham 3: ${thirdProductName} - Gia: ${thirdProductPrice}`);
