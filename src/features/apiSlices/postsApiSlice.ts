import { apiSlice } from '../apiSlice';
import { Post } from '@types';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      transformResponse: (responseData: Post[]) => {
        const sortedData = responseData
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date));
        return sortedData;
      },
      providesTags: (result) =>
        result
          ? result.map((post) => ({ type: 'Post', id: post.id.toString() }))
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getPostById: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    addNewPost: builder.mutation<Post, Partial<Post>>({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (updatedPost) => ({
        url: `/posts/${updatedPost.id}`,
        method: 'PUT',
        body: {
          ...updatedPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = extendedApiSlice;
