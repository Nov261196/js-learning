/**
 * =========================================================
 * UI CONTROLLER MODULE (ES6 Module)
 * Quản lý trạng thái giao diện, DOM, sự kiện và tương tác người dùng
 * =========================================================
 */

import { ApiService } from './api.js';

// Application State
const state = {
  page: 1,
  limit: 4,
  categoryId: "",
  sort: "id",
  order: "asc",
  search: "",
  totalCount: 0,
  categories: [],
  editingProductId: null,
  searchAbortController: null
};

// DOM Elements Cache
const DOM = {
  tableBody: document.getElementById("product-tbody"),
  categoryFilter: document.getElementById("category-filter"),
  sortSelect: document.getElementById("sort-select"),
  searchInput: document.getElementById("search-input"),
  btnRefresh: document.getElementById("btn-refresh"),
  btnOpenAddModal: document.getElementById("btn-open-add-modal"),
  
  // Pagination
  pageInfo: document.getElementById("page-info"),
  btnPrev: document.getElementById("btn-prev"),
  btnNext: document.getElementById("btn-next"),
  
  // Modal
  modalBackdrop: document.getElementById("modal-backdrop"),
  modalTitle: document.getElementById("modal-title"),
  productForm: document.getElementById("product-form"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  btnCancelModal: document.getElementById("btn-cancel-modal"),
  btnSubmitModal: document.getElementById("btn-submit-modal"),
  formName: document.getElementById("form-name"),
  formPrice: document.getElementById("form-price"),
  formCategory: document.getElementById("form-category"),
  formStockQuantity: document.getElementById("form-stock-quantity"),
  formInStock: document.getElementById("form-instock"),
  formImage: document.getElementById("form-image"),

  // Server indicator
  serverDot: document.getElementById("server-dot"),
  serverText: document.getElementById("server-text"),
  toastContainer: document.getElementById("toast-container")
};

// Utility: Toast Notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icons[type] || "ℹ️"}</span>
    <span style="flex: 1;">${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-fadeout");
    toast.addEventListener("animationend", () => toast.remove());
  }, 3500);
}

// Utility: Debounce
function debounce(fn, delayMs = 350) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

// Render Skeleton Loading
function renderSkeleton(count = 4) {
  DOM.tableBody.innerHTML = Array.from({ length: count }).map(() => `
    <tr class="skeleton-row">
      <td><div class="skeleton-box" style="width: 28px;"></div></td>
      <td>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="skeleton-box" style="width: 48px; height: 48px; border-radius: 8px;"></div>
          <div style="flex: 1;">
            <div class="skeleton-box" style="width: 70%; height: 16px; margin-bottom: 6px;"></div>
            <div class="skeleton-box" style="width: 40%; height: 12px;"></div>
          </div>
        </div>
      </td>
      <td><div class="skeleton-box" style="width: 90px;"></div></td>
      <td><div class="skeleton-box" style="width: 110px;"></div></td>
      <td><div class="skeleton-box" style="width: 75px; border-radius: 999px;"></div></td>
      <td>
        <div style="display: flex; gap: 6px;">
          <div class="skeleton-box" style="width: 60px; height: 28px;"></div>
          <div class="skeleton-box" style="width: 60px; height: 28px;"></div>
        </div>
      </td>
    </tr>
  `).join("");
}

// Render Product Table Rows
function renderProducts(products) {
  if (!products || products.length === 0) {
    DOM.tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--dark);">Không tìm thấy sản phẩm nào!</div>
          <p style="font-size: 0.875rem; margin-top: 4px;">Hãy thử đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc danh mục.</p>
        </td>
      </tr>
    `;
    return;
  }

  DOM.tableBody.innerHTML = products.map((p, index) => {
    const formattedPrice = Number(p.price).toLocaleString("vi-VN") + " đ";
    const foundCategory = state.categories.find(c => c.id === p.categoryId);
    const categoryName = foundCategory ? foundCategory.name : (p.category ? p.category.name : "Chưa phân loại");
    const isInStock = Boolean(p.inStock);

    return `
      <tr id="row-${p.id}">
        <td style="font-weight: 600; color: var(--text-muted);">${(state.page - 1) * state.limit + index + 1}</td>
        <td>
          <div class="product-item">
            <img src="${p.image || 'https://via.placeholder.com/50'}" alt="${p.name}" class="product-img" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'"/>
            <div>
              <div class="product-name">${p.name}</div>
              <div class="product-id">Mã: #${p.id} • Tồn: ${p.stockQuantity ?? 0} cái</div>
            </div>
          </div>
        </td>
        <td><span class="price-tag">${formattedPrice}</span></td>
        <td><span class="badge badge-blue">${categoryName}</span></td>
        <td>
          <button class="btn btn-sm ${isInStock ? 'badge-stock-in' : 'badge-stock-out'} btn-toggle-stock" 
                  data-id="${p.id}" 
                  data-status="${isInStock}" 
                  style="cursor: pointer; border: none; font-weight: 600;">
            ${isInStock ? "● Còn hàng" : "○ Hết hàng"}
          </button>
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-outline btn-sm btn-edit" data-id="${p.id}">✏️ Sửa</button>
            <button class="btn btn-danger btn-sm btn-delete" data-id="${p.id}" data-name="${p.name}">🗑️ Xóa</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Update Pagination Controls
function updatePagination() {
  const totalPages = Math.ceil(state.totalCount / state.limit) || 1;
  DOM.pageInfo.innerText = `Trang ${state.page} / ${totalPages} (Tổng: ${state.totalCount} sản phẩm)`;
  DOM.btnPrev.disabled = state.page <= 1;
  DOM.btnNext.disabled = state.page >= totalPages;
}

// Load Products from API
async function loadProducts() {
  // Cancel previous search if running
  if (state.searchAbortController) {
    state.searchAbortController.abort();
  }
  state.searchAbortController = new AbortController();

  renderSkeleton(state.limit);

  try {
    const { data, totalCount } = await ApiService.getProducts({
      page: state.page,
      limit: state.limit,
      categoryId: state.categoryId,
      sort: state.sort,
      order: state.order,
      search: state.search,
      signal: state.searchAbortController.signal
    });

    state.totalCount = totalCount !== null ? totalCount : data.length;
    renderProducts(data);
    updatePagination();

  } catch (error) {
    if (error.name === "AbortError") return;
    showToast(`Không thể tải dữ liệu: ${error.message}`, "error");
    DOM.tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 32px; color: var(--danger);">
          ❌ Đã xảy ra lỗi kết nối API. Vui lòng kiểm tra xem json-server đã bật ở cổng 3000 chưa!
        </td>
      </tr>
    `;
  }
}

// Load Categories for Select Dropdowns
async function loadCategories() {
  try {
    const categories = await ApiService.getCategories();
    state.categories = categories;

    // Populate filter dropdown
    const filterOptions = `<option value="">Tất cả danh mục (${categories.length})</option>` +
      categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    DOM.categoryFilter.innerHTML = filterOptions;

    // Populate modal form dropdown
    const formOptions = `<option value="">-- Chọn danh mục --</option>` +
      categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    DOM.formCategory.innerHTML = formOptions;

  } catch (error) {
    console.error("Không thể tải danh mục:", error);
  }
}

// Check Server Health
async function checkServer() {
  const isHealthy = await ApiService.checkHealth();
  if (isHealthy) {
    DOM.serverDot.className = "status-dot online";
    DOM.serverText.innerText = "JSON-Server Online (:3000)";
  } else {
    DOM.serverDot.className = "status-dot";
    DOM.serverText.innerText = "Mất kết nối máy chủ";
  }
}

// Modal Form Management
function openModal(isEdit = false, product = null) {
  state.editingProductId = isEdit && product ? product.id : null;
  DOM.modalTitle.innerText = isEdit ? `Sửa Sản Phẩm (#${product.id})` : "Thêm Sản Phẩm Mới";
  DOM.btnSubmitModal.innerText = isEdit ? "Lưu Thay Đổi" : "Thêm Mới";

  if (isEdit && product) {
    DOM.formName.value = product.name;
    DOM.formPrice.value = product.price;
    DOM.formCategory.value = product.categoryId || "";
    DOM.formStockQuantity.value = product.stockQuantity ?? 10;
    DOM.formInStock.checked = Boolean(product.inStock);
    DOM.formImage.value = product.image || "";
  } else {
    DOM.productForm.reset();
    DOM.formInStock.checked = true;
    DOM.formStockQuantity.value = 10;
  }

  DOM.modalBackdrop.classList.add("active");
}

function closeModal() {
  DOM.modalBackdrop.classList.remove("active");
  state.editingProductId = null;
  DOM.productForm.reset();
}

// Handle Form Submission (POST / PUT)
async function handleFormSubmit(e) {
  e.preventDefault();

  const name = DOM.formName.value.trim();
  const price = Number(DOM.formPrice.value);
  const categoryId = DOM.formCategory.value;
  const stockQuantity = Number(DOM.formStockQuantity.value) || 0;
  const inStock = DOM.formInStock.checked;
  const image = DOM.formImage.value.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";

  // Validate
  if (!name || name.length < 3) {
    showToast("Tên sản phẩm phải có ít nhất 3 ký tự!", "warning");
    return;
  }
  if (isNaN(price) || price <= 0) {
    showToast("Giá sản phẩm phải là số dương lớn hơn 0!", "warning");
    return;
  }
  if (!categoryId) {
    showToast("Vui lòng chọn danh mục sản phẩm!", "warning");
    return;
  }

  const payload = {
    name,
    price,
    categoryId,
    stockQuantity,
    inStock,
    image,
    rating: 5.0
  };

  DOM.btnSubmitModal.disabled = true;
  DOM.btnSubmitModal.innerText = "Đang lưu...";

  try {
    if (state.editingProductId) {
      // Update (PUT or PATCH)
      await ApiService.patchProduct(state.editingProductId, payload);
      showToast(`Đã cập nhật thông tin sản phẩm thành công!`, "success");
    } else {
      // Create (POST)
      await ApiService.createProduct(payload);
      showToast(`Đã thêm mới sản phẩm "${name}" thành công!`, "success");
    }

    closeModal();
    await loadProducts();

  } catch (error) {
    showToast(`Lỗi khi lưu sản phẩm: ${error.message}`, "error");
  } finally {
    DOM.btnSubmitModal.disabled = false;
  }
}

// Handle Stock Status Toggle (PATCH)
async function handleToggleStock(id, currentStatus) {
  const newStatus = !currentStatus;
  try {
    await ApiService.patchProduct(id, { inStock: newStatus });
    showToast(`Đã đổi trạng thái tồn kho thành công!`, "info");
    await loadProducts();
  } catch (error) {
    showToast(`Lỗi đổi trạng thái: ${error.message}`, "error");
  }
}

// Handle Delete Product (DELETE)
async function handleDelete(id, name) {
  const confirmed = confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm "${name}" (ID: #${id})?`);
  if (!confirmed) return;

  try {
    await ApiService.deleteProduct(id);
    showToast(`Đã xóa thành công sản phẩm #${id}`, "success");
    
    // Check if we deleted the last item on the page
    if (state.page > 1 && (state.totalCount - 1) <= (state.page - 1) * state.limit) {
      state.page--;
    }

    await loadProducts();
  } catch (error) {
    showToast(`Xóa thất bại: ${error.message}`, "error");
  }
}

// Attach Event Listeners
function setupEventListeners() {
  // Search input with debounce
  DOM.searchInput.addEventListener("input", debounce((e) => {
    state.search = e.target.value.trim();
    state.page = 1;
    loadProducts();
  }, 400));

  // Category filter
  DOM.categoryFilter.addEventListener("change", (e) => {
    state.categoryId = e.target.value;
    state.page = 1;
    loadProducts();
  });

  // Sorting
  DOM.sortSelect.addEventListener("change", (e) => {
    const [sort, order] = e.target.value.split("-");
    state.sort = sort;
    state.order = order;
    state.page = 1;
    loadProducts();
  });

  // Refresh
  DOM.btnRefresh.addEventListener("click", () => {
    showToast("Đang làm mới dữ liệu...", "info");
    loadProducts();
    checkServer();
  });

  // Pagination
  DOM.btnPrev.addEventListener("click", () => {
    if (state.page > 1) {
      state.page--;
      loadProducts();
    }
  });

  DOM.btnNext.addEventListener("click", () => {
    const totalPages = Math.ceil(state.totalCount / state.limit);
    if (state.page < totalPages) {
      state.page++;
      loadProducts();
    }
  });

  // Modal actions
  DOM.btnOpenAddModal.addEventListener("click", () => openModal(false));
  DOM.btnCloseModal.addEventListener("click", closeModal);
  DOM.btnCancelModal.addEventListener("click", closeModal);
  DOM.productForm.addEventListener("submit", handleFormSubmit);

  // Table action delegation
  DOM.tableBody.addEventListener("click", async (e) => {
    const target = e.target.closest("button");
    if (!target) return;

    const id = target.dataset.id;

    // Toggle stock
    if (target.classList.contains("btn-toggle-stock")) {
      const currentStatus = target.dataset.status === "true";
      await handleToggleStock(id, currentStatus);
    }

    // Edit
    if (target.classList.contains("btn-edit")) {
      try {
        const product = await ApiService.getProductById(id);
        openModal(true, product);
      } catch (error) {
        showToast(`Không thể lấy chi tiết sản phẩm: ${error.message}`, "error");
      }
    }

    // Delete
    if (target.classList.contains("btn-delete")) {
      const name = target.dataset.name;
      await handleDelete(id, name);
    }
  });
}

// Bootstrap Application
async function initApp() {
  setupEventListeners();
  await checkServer();
  await loadCategories();
  await loadProducts();
}

// Start on DOM ready
document.addEventListener("DOMContentLoaded", initApp);
