import { apiSlice } from "../../app/api/apiSlice";

export interface ProductType {
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

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => '/products',
      transformResponse: (response: any) => {
        const products: ProductType[] = response.map((product: any) => {
          const { _id, ...rest } = product;
          return { id: _id, ...rest};
        })
        return products;
      },
      providesTags: (result) =>
        result
          ? result.map((product) => ({
              type: 'Product',
              id: product.id,
            }))
          : [{ type: 'Product', id: 'List' }],
    }),
    getProductById: builder.query<ProductType, string>({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = extendedApiSlice;
