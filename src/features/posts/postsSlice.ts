import { apiSlice } from '../api/apiSlice';

export interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      transformResponse: (responseData: any) => {
        const data: Post[] = responseData.map((post: any) => {
          post.id = post._id;
          return post;
        });
        const sortedData = data
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
      transformResponse: (responseData: any) => {
        responseData.id = responseData._id;
        return responseData;
      },
      providesTags: (result, error, id) => [{ type: 'Post', id }],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
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
