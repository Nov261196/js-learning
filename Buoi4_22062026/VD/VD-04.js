const product = {
    id: "P01",
    name: "keyboard",
    price: "250000",
    stock: 12,
    category: "Phu kien"
};

const { id , name , price , stock = 0 } = product;
const total  = price * stock;
console.log(`${name} (${id}): ${total.toLocaleString()} VND`);