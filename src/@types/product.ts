import { Category } from './category';

export interface ProductDetails {
  author: string;
  releaseDate?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  countInStock: number;
  unitsSold: number;
  details: ProductDetails;
}

export interface ProductExpanded extends Omit<Product, 'category'> {
  category: Category;
}

export interface CreateProductPayload {
  name: string;
  category: string; // categoryId
  price: number;
  image: string;
  countInStock?: number;
  details: {
    author: string;
    releaseDate?: string;
    description?: string;
  };
}

export interface UpdateProductPayload {
  // send only what changed
  name?: string;
  category?: string; // categoryId
  price?: number;
  image?: string;
  countInStock?: number;
  details?: {
    author?: string;
    releaseDate?: string;
    description?: string;
  };
}

export interface UpdateProductResponse {
  message: string;
  updatedProduct: Product;
}
