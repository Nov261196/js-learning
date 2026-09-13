/**
 * =========================================================
 * API SERVICE MODULE (ES6 Module)
 * Giao tiếp mạng với JSON-Server bằng Fetch API & Async/Await
 * =========================================================
 */

const BASE_URL = "http://localhost:3000";

/**
 * Hàm gọi HTTP request dùng chung, bọc try...catch và xử lý response status
 */
async function sendRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);

    // Kiểm tra nếu HTTP status không thành công (400, 404, 500,...)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Máy chủ trả về lỗi ${response.status} (${response.statusText}): ${errorText}`);
    }

    // Đọc header tổng số lượng bản ghi phục vụ phân trang
    const totalCount = response.headers.get("X-Total-Count");

    // Xử lý status 204 No Content
    if (response.status === 204) {
      return { data: null, totalCount: 0 };
    }

    const data = await response.json();
    return {
      data,
      totalCount: totalCount !== null ? parseInt(totalCount, 10) : null
    };

  } catch (error) {
    if (error.name === "AbortError") {
      console.warn(`[ApiService] Request tới ${endpoint} đã bị hủy chủ động.`);
    } else {
      console.error(`[ApiService Error] Thao tác thất bại trên ${endpoint}:`, error.message);
    }
    throw error;
  }
}

export const ApiService = {
  /**
   * 1. GET: Lấy danh sách sản phẩm với Phân trang, Bộ lọc danh mục, Sắp xếp, Tìm kiếm
   */
  async getProducts({ page = 1, limit = 4, categoryId = "", sort = "id", order = "asc", search = "", signal = null } = {}) {
    let query = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&_expand=category`;
    
    if (categoryId) {
      query += `&categoryId=${encodeURIComponent(categoryId)}`;
    }
    if (search) {
      query += `&q=${encodeURIComponent(search)}`;
    }

    return await sendRequest(`/products${query}`, { signal });
  },

  /**
   * 2. GET: Lấy thông tin chi tiết một sản phẩm theo ID
   */
  async getProductById(id) {
    const res = await sendRequest(`/products/${id}?_expand=category&_embed=reviews`);
    return res.data;
  },

  /**
   * 3. GET: Lấy danh sách tất cả các danh mục
   */
  async getCategories() {
    const res = await sendRequest(`/categories`);
    return res.data;
  },

  /**
   * 4. POST: Thêm mới sản phẩm
   */
  async createProduct(productData) {
    const res = await sendRequest(`/products`, {
      method: "POST",
      body: JSON.stringify(productData)
    });
    return res.data;
  },

  /**
   * 5. PUT: Cập nhật toàn bộ bản ghi sản phẩm
   */
  async updateProduct(id, productData) {
    const res = await sendRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData)
    });
    return res.data;
  },

  /**
   * 6. PATCH: Cập nhật một phần thuộc tính (ví dụ trạng thái tồn kho)
   */
  async patchProduct(id, partialData) {
    const res = await sendRequest(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(partialData)
    });
    return res.data;
  },

  /**
   * 7. DELETE: Xóa sản phẩm theo ID
   */
  async deleteProduct(id) {
    const res = await sendRequest(`/products/${id}`, {
      method: "DELETE"
    });
    return res.data;
  },

  /**
   * 8. Kiểm tra kết nối máy chủ
   */
  async checkHealth() {
    try {
      const response = await fetch(`${BASE_URL}/categories`, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }
};
