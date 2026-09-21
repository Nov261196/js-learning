// Hàm kiểm tra xem sản phẩm có thoả mãn TẤT CẢ các tiêu chí không
const filterProduct = (product, ...filters) => {
    // filters bây giờ là một mảng chứa tất cả  tiêu chí được truyền vào
    for (const filter of filters){
        // Kiểm tra nếu không có tag này thì loại luôn
        if(!product.tags.includes(filter)){
            return false; //Nếu thiếu 1 tiêu chí thì loại
        }
    }
    return true;
}

// Sửa 'tag' thành 'tags' ở đây
const shirt = { name: "Ao So Mi", tags: ["M", "Red", "Nike"]}; 


// Truyền vào bao nhiêu bộ lọc cũng được, Rest sẽ gom lại thành mảng
const isMatch = filterProduct(shirt, "M", "Red");
// const isMatch = filterProduct(shirt, "L", "Blue");
console.log(isMatch); // Kết quả sẽ ra: true