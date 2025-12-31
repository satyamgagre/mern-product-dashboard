import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  // Create product
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.imageUrl ||
      !newProduct.price ||
      !newProduct.description
    ) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: "Product created successfully." };
  },

  // Delete product
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter(
        (product) => product._id !== pid
      ),
    }));

    return { success: true, message: data.message };
  },
}));
