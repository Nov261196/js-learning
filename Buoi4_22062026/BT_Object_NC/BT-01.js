const separateId = (obj) => {
  const { id, ...rest } = obj; 
  return { id, rest };
};

const input = { id: "SV01", name: "An", score: 8, class: "JS01" };
const { id, rest } = separateId(input);
console.log("Tách ID:", id);   
console.log("Phần còn lại:", rest); 


const omitKeys = (obj, ...keysToOmit) => {
  let result = { ...obj };
  for (const key of keysToOmit) {
    delete result[key]; 
  }
  return result;
};

const sampleData = { id: "P01", name: "Laptop", price: 20000000, brand: "Dell" };
const cleanedData = omitKeys(sampleData, "id", "brand");
console.log("Sau khi bỏ id và brand:", cleanedData); 