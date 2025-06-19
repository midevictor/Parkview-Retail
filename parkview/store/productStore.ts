import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/type";
import { getProducts, getCategories } from "@/lib/api";

interface ProductsState {
  products: Product[];
  categories: string[];
  filteredProducts?: Product[];
  // setProducts: (products: any[]) => void;
  // setCategories: (categories: string[]) => void;
  loading: boolean;
  error: string | null;

  //[roduct functions]
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useProductStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      loading: false,
      error: null,
      filteredProducts: [],

      fetchProducts: async () => {
        try {
          set({ loading: true, error: null });
          const products = await getProducts();
          set({ products, loading: false, error: null ,filteredProducts: products });
        } catch (error: any) {
          set({ error: error.message, loading : false });
        }
      },
      fetchCategories: async () => {
        try {
            set({loading: true, error: null });
            const categories = await getCategories();
            set({ categories, loading: false, error: null }); 

        }catch(error: any) {
          set({ error: error.message, loading:false });
        }

      }
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
