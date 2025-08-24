import { apiSlice } from '@features/apiSlice';
import { Category } from '@types';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? [{ type: 'Category' as const, id: 'List' }, ...result.map((c) => ({ type: 'Category' as const, id: c.id }))]
          : [{ type: 'Category' as const, id: 'List' }],
    }),

    addNewCategory: builder.mutation<Category, { name: string }>({
      query: (newCategory) => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category', id: 'List' }],
    }),

    updateCategory: builder.mutation<Category, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (_result, _err, arg) => [{ type: 'Category', id: arg.id }],
    }),

    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'List' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendedApiSlice;
