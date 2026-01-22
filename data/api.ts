// Fake Store API types
interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Your existing Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "men" | "women" | "kids" | "accessories";
  description?: string;
}

// Map Fake Store API categories to your categories
const mapCategory = (apiCategory: string): Product['category'] => {
  switch (apiCategory) {
    case "men's clothing":
      return "men";
    case "women's clothing":
      return "women";
    case "jewelery":
      return "accessories";
    case "electronics":
      return "accessories";
    default:
      return "accessories";
  }
};

// Convert Fake Store API product to your Product interface
const mapProduct = (apiProduct: FakeStoreProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.title,
  price: apiProduct.price,
  image: apiProduct.image,
  category: mapCategory(apiProduct.category),
  description: apiProduct.description,
});

// API service functions
export const productApi = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const apiProducts: FakeStoreProduct[] = await response.json();
      return apiProducts.map(mapProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const apiProduct: FakeStoreProduct = await response.json();
      return mapProduct(apiProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      const apiProducts: FakeStoreProduct[] = await response.json();
      return apiProducts.map(mapProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get available categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};