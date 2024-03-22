import { apiSlice } from '../api/apiSlice';

interface Product {
  id: string;
  name: string;
  productType: string;
  price: number;
  image: string;
  details: {
    author: string;
    releaseDate: string;
    description: string;
  };
}

interface ProductList {
  products: Product[];
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductList, void>({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? result.products.map((product) => ({
              type: 'Product',
              id: product.id,
            }))
          : [{ type: 'Product', id: 'List' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = extendedApiSlice;
