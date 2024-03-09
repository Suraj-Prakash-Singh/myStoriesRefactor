import { postsSlice } from '../posts/postSlice';

export const commentsSlice = postsSlice.injectEndpoints({
  endpoints: (builder) => ({
    commentOnPost: builder.mutation({
      query: ({ postId, userId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'post',
        body: { userId: userId, content },
      }),
      invalidatesTags: (res, err, args) => [
        'Posts',
        { type: 'Posts', id: args.postId },
      ],
    }),
    editCommentOnPost: builder.mutation({
      query: ({ postId, commentId, content }) => ({
        url: `posts/${postId}/comments/${commentId}`,
        body: { content },
        method: 'put',
      }),
      invalidatesTags: (res, err, args) => [
        'Posts',
        { type: 'Posts', id: args.postId },
      ],
    }),
    deleteCommentOnPost: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comments/${commentId}`,
        method: 'delete',
      }),
      invalidatesTags: (res, err, args) => [
        'Posts',
        { type: 'Posts', id: args.postId },
      ],
    }),
  }),
});

export const {
  useCommentOnPostMutation,
  useEditCommentOnPostMutation,
  useDeleteCommentOnPostMutation,
} = commentsSlice;
