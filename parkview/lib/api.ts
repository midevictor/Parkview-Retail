import { Product } from "@/type";

const API_URL = "https://fakestoreapi.com";

//Get all products
export const getProducts = async (): Promise<Product[]> => {
   try{
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
   }catch (error) {
       console.error("Error fetching products:", error);
         throw error;
   }
}

//get products by ID
export const getProductById = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${id}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}


//get all categories
export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/products/categories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}
