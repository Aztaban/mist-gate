import { apiSlice } from '../apiSlice';
import { Product } from '../../types';

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
    updateProduct: builder.mutation<
      void,
      { id: string; updates: Partial<Product> }
    >({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Product', id: arg.id },
      ],
    }),
    uploadImage: builder.mutation<{ image: string }, File>({
      query: (image) => {
        const formData = new FormData();
        formData.append('image', image);
        return {
          url: '/products/imageUpload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateProductImage: builder.mutation<
      { image: string },
      { id: string; image: File }
    >({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append('image', image);

        return {
          url: `/products/${id}/image`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Product', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useUpdateProductImageMutation,
} = extendedApiSlice;
