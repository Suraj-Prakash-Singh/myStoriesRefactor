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
      query: (id) => `/posts/${id}`,
      providesTags: (res, err, args) => [{ type: 'Posts', id: args.id }],
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

export const { useGetPostsQuery, useGetPostQuery } = postsSlice;
