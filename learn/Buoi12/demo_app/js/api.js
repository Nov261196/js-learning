/**
 * =========================================================
 * API SERVICE MODULE (ES6 Module)
 * Giao tiếp với JSON-Server bằng Fetch API + Async/Await
 * =========================================================
 */

const BASE_URL = "http://localhost:3000";

/**
 * Hàm HTTP request dùng chung
 */
async function sendRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    Accept: "application/json",
    ...(options.body ? {"Content-Type": "application/json"} : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Request thất bại
    if (!response.ok) {
      let errorMessage = "";

      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorData?.error || JSON.stringify(errorData);
      } catch {
        errorMessage = await response.text();
      }

      throw new Error(`HTTP ${response.status} ${response.statusText}` + (errorMessage ? `: ${errorMessage}` : ""));
    }

    /**
     * JSON-Server cũ có thể trả X-Total-Count.
     * JSON-Server v1 thường trả pagination metadata trong body.
     */
    const totalCountHeader = response.headers.get("X-Total-Count");

    const totalCount = totalCountHeader !== null ? Number.parseInt(totalCountHeader, 10) : null;

    // 204 No Content
    if (response.status === 204) {
      return {
        data: null,
        totalCount,
      };
    }

    /**
     * DELETE hoặc một số response có thể không có body.
     * Không gọi response.json() trực tiếp để tránh:
     *
     * SyntaxError: Unexpected end of JSON input
     */
    const text = await response.text();

    if (!text) {
      return {
        data: null,
        totalCount,
      };
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return {
      data,
      totalCount,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn(`[ApiService] Request tới "${endpoint}" đã bị hủy.`);
    } else {
      console.error(`[ApiService] Request "${endpoint}" thất bại:`, error);
    }

    throw error;
  }
}

/**
 * Chuẩn hóa response danh sách giữa:
 *
 * JSON Server v1:
 * {
 *   first: 1,
 *   prev: null,
 *   next: 2,
 *   last: 10,
 *   pages: 10,
 *   items: 40,
 *   data: [...]
 * }
 *
 * và JSON Server cũ:
 * [...]
 */
function normalizeListResponse(response) {
  const body = response.data;

  // JSON-Server kiểu cũ trả array trực tiếp
  if (Array.isArray(body)) {
    return {
      data: body,
      totalCount: response.totalCount !== null ? response.totalCount : body.length,
    };
  }

  // JSON-Server v1 pagination
  if (body && Array.isArray(body.data)) {
    return {
      data: body.data,
      totalCount: typeof body.items === "number" ? body.items : (response.totalCount ?? body.data.length),
    };
  }

  return {
    data: [],
    totalCount: 0,
  };
}

export const ApiService = {
  /**
   * =========================================================
   * GET PRODUCTS
   * =========================================================
   *
   * Hỗ trợ:
   * - Pagination
   * - Category filter
   * - Sort
   * - Search
   * - AbortController
   */
  async getProducts({
    page = 1,
    limit = 4,
    categoryId = "",
    sort = "id",
    order = "asc",
    search = "",
    signal = undefined,
  } = {}) {
    // Validate page / limit
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || 4);

    // JSON Server v1:
    // ASC  => _sort=price
    // DESC => _sort=-price
    const sortParam = order.toLowerCase() === "desc" ? `-${sort}` : sort;

    const params = new URLSearchParams();

    params.set("_sort", sortParam);

    if (categoryId !== "" && categoryId !== null) {
      params.set("categoryId", categoryId);
    }

    const keyword = String(search || "")
      .trim()
      .toLowerCase();

    /**
     * =====================================================
     * SEARCH
     * =====================================================
     *
     * Vì cần tìm trên name + description + brand nên
     * lấy dữ liệu đã filter/category/sort rồi search client.
     */
    if (keyword) {
      const response = await sendRequest(`/products?${params.toString()}`, {signal});

      const normalized = normalizeListResponse(response);

      const filteredProducts = normalized.data.filter((product) => {
        const name = String(product?.name || "").toLowerCase();
        const description = String(product?.description || "").toLowerCase();
        const brand = String(product?.brand || "").toLowerCase();

        return name.includes(keyword) || description.includes(keyword) || brand.includes(keyword);
      });

      const totalCount = filteredProducts.length;

      const startIndex = (safePage - 1) * safeLimit;
      const endIndex = startIndex + safeLimit;

      return {
        data: filteredProducts.slice(startIndex, endIndex),
        totalCount,
      };
    }

    /**
     * =====================================================
     * NORMAL PAGINATION
     * =====================================================
     */

    params.set("_page", safePage);
    params.set("_per_page", safeLimit);

    const response = await sendRequest(`/products?${params.toString()}`, {signal});

    return normalizeListResponse(response);
  },

  /**
   * =========================================================
   * GET PRODUCT BY ID
   * =========================================================
   */
  async getProductById(id, {signal} = {}) {
    if (id === undefined || id === null || id === "") {
      throw new Error("Product ID không hợp lệ.");
    }

    const params = new URLSearchParams();

    params.set("_expand", "category");
    params.set("_embed", "reviews");

    const response = await sendRequest(`/products/${encodeURIComponent(id)}?${params.toString()}`, {signal});

    return response.data;
  },

  /**
   * =========================================================
   * GET CATEGORIES
   * =========================================================
   */
  async getCategories({signal} = {}) {
    const response = await sendRequest("/categories", {
      signal,
    });

    const body = response.data;

    if (Array.isArray(body)) {
      return body;
    }

    if (body && Array.isArray(body.data)) {
      return body.data;
    }

    return [];
  },

  /**
   * =========================================================
   * CREATE PRODUCT
   * =========================================================
   */
  async createProduct(productData) {
    if (!productData || typeof productData !== "object") {
      throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    }

    const response = await sendRequest("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });

    return response.data;
  },

  /**
   * =========================================================
   * UPDATE PRODUCT - PUT
   * =========================================================
   *
   * PUT thay thế toàn bộ object.
   */
  async updateProduct(id, productData) {
    if (id === undefined || id === null || id === "") {
      throw new Error("Product ID không hợp lệ.");
    }

    if (!productData || typeof productData !== "object") {
      throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    }

    const response = await sendRequest(`/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });

    return response.data;
  },

  /**
   * =========================================================
   * PATCH PRODUCT
   * =========================================================
   *
   * Chỉ cập nhật các field được truyền vào.
   */
  async patchProduct(id, partialData) {
    if (id === undefined || id === null || id === "") {
      throw new Error("Product ID không hợp lệ.");
    }

    if (!partialData || typeof partialData !== "object") {
      throw new Error("Dữ liệu cập nhật không hợp lệ.");
    }

    const response = await sendRequest(`/products/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(partialData),
    });

    return response.data;
  },

  /**
   * =========================================================
   * DELETE PRODUCT
   * =========================================================
   */
  async deleteProduct(id) {
    if (id === undefined || id === null || id === "") {
      throw new Error("Product ID không hợp lệ.");
    }

    const response = await sendRequest(`/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    return response.data;
  },

  /**
   * =========================================================
   * HEALTH CHECK
   * =========================================================
   */
  async checkHealth() {
    try {
      const response = await fetch(`${BASE_URL}/categories?_page=1&_per_page=1`, {
        headers: {
          Accept: "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("[ApiService] Không thể kết nối JSON-Server:", error.message);

      return false;
    }
  },
};
