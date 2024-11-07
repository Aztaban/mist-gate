import { apiSlice } from '../../app/api/apiSlice';

export interface Product {
  id: string;
  name: string;
  productType: string;
  price: number;
  image: string;
  countInStock: number;
  details: {
    author: string;
    releaseDate: string;
    description: string;
  };
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? result.map((product) => ({
              type: 'Product',
              id: product.id,
            }))
          : [{ type: 'Product', id: 'List' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (productId) => `/products/${productId}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    addNewProduct: builder.mutation<void, Partial<Product>>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'List' }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddNewProductMutation } = extendedApiSlice;
