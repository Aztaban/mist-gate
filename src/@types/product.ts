export interface ProductDetails {
  author: string;
  releaseDate: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  productType: string;
  price: number;
  image: string;
  countInStock: number;
  unitsSold: number;
  details: ProductDetails | Partial<ProductDetails>;
}