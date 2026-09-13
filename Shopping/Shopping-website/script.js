// 1. Mảng dữ liệu chứa thông tin các mẫu Mustang và Dodge
const products = [
    {
        id: 1,
        name: "Ford Mustang 1969 Boss 429",
        category: "classic",
        price: "4.850.000.000 đ",
        image: "https://images.unsplash.com/photo-1650634179095-cac904c35b63?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: "Ford Mustang GT Premium",
        category: "mustang",
        price: "5.250.000.000 đ",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        name: "Ford Mustang Shelby GT500",
        category: "mustang",
        price: "8.900.000.000 đ",
        image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 4,
        name: "Ford Mustang Dark Horse",
        category: "mustang",
        price: "5.600.000.000 đ",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 5,
        name: "Dodge Challenger SRT Hellcat",
        category: "dodge",
        price: "6.950.000.000 đ",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 6,
        name: "Dodge Charger Scat Pack",
        category: "dodge",
        price: "5.950.000.000 đ",
        image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 7,
        name: "Dodge Challenger R/T Classic",
        category: "classic",
        price: "4.990.000.000 đ",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 8,
        name: "Dodge Charger Daytona",
        category: "dodge",
        price: "7.750.000.000 đ",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80"
    }
];

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const productGrid = document.getElementById("productGrid");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartItems = [];

function parsePrice(priceText) {
    return Number(priceText.replaceAll(".", "").replace(" đ", ""));
}

function formatPrice(price) {
    return `${price.toLocaleString("vi-VN")} đ`;
}

// 2. Hàm hiển thị sản phẩm động theo dữ liệu truyền vào
function renderProducts(productsList) {
    if (!productGrid) return;

    if (productsList.length === 0) {
        productGrid.innerHTML = `<div class="empty-state">Không tìm thấy sản phẩm phù hợp.</div>`;
        return;
    }

    productGrid.innerHTML = "";

    productsList.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <button class="btn-add" onclick="addToCart('${product.id}')">Thêm vào giỏ</button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// 3. Hàm lọc sản phẩm kết hợp tìm kiếm và danh mục
function filterProducts() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filterValue = filterSelect ? filterSelect.value : "all";

    const filtered = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchValue);
        const matchesFilter = filterValue === "all" || product.category === filterValue;
        return matchesSearch && matchesFilter;
    });

    renderProducts(filtered);
}

// 4. Lắng nghe sự kiện người dùng nhập dữ liệu hoặc lựa chọn bộ lọc
if (searchInput) searchInput.addEventListener("input", filterProducts);
if (filterSelect) filterSelect.addEventListener("change", filterProducts);

function renderCart() {
    if (!cartList || !cartCount || !cartTotal) return;

    if (cartItems.length === 0) {
        cartList.innerHTML = `<p class="empty-state">Chưa có sản phẩm nào trong giỏ hàng.</p>`;
        cartCount.textContent = "0";
        cartTotal.textContent = "0 đ";
        return;
    }

    let totalQuantity = 0;
    let totalPrice = 0;

    cartList.innerHTML = "";

    cartItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.priceValue;

        const cartItem = document.createElement("article");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-meta">Số lượng: ${item.quantity}</p>
                <p class="cart-item-meta">Đơn giá: ${item.price}</p>
            </div>
            <div class="cart-item-total">${formatPrice(item.quantity * item.priceValue)}</div>
        `;

        cartList.appendChild(cartItem);
    });

    cartCount.textContent = String(totalQuantity);
    cartTotal.textContent = formatPrice(totalPrice);
}

// Hàm giả lập chức năng thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const product = products.find((p) => p.id === Number(productId));
    if (!product) return;

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1,
            priceValue: parsePrice(product.price)
        });
    }

    renderCart();
    alert(`Đã thêm thành công sản phẩm "${product.name}" vào giỏ hàng của bạn!`);
}

// Hiển thị tất cả sản phẩm ban đầu khi tải trang
renderProducts(products);
renderCart();
