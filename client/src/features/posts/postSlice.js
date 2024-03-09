import { apiSlice } from '@/src/app/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = postsAdapter.getInitialState();
export const postsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (res, err, args) => {
        return res
          ? [
              { type: 'Posts', id: 'List' },
              ...res.ids.map(({ _id }) => ({ type: 'Posts', id: _id })),
            ]
          : ['Posts'];
      },
      transformResponse: (posts) => {
        return postsAdapter.setAll(initialState, posts);
      },
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (res, err, args) => [{ type: 'Posts', id: args.postId }],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: '/posts',
        method: 'post',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    editPost: builder.mutation({
      query: ({ userId, content, postId, toUpdateContent }) => ({
        url: `/posts/${postId}`,
        method: 'put',
        body: { content, userId, toUpdateContent },
      }),
      invalidatesTags: (res, err, args) => [
        'Posts',
        { type: 'Posts', id: args.postId },
      ],
    }),
    deletePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: 'delete',
      }),
      invalidatesTags: (res, err, args) => ['Posts'],
    }),
    interactToPost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/${postId}`,
        method: 'put',
        body: { userId: userId },
      }),
      invalidatesTags: (res, err, args) => [
        'Posts',
        { type: 'Posts', id: args.postId },
      ],
    }),
  }),
});

export const selectPostsResult = postsSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
  selectEntities,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useInteractToPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postsSlice;
