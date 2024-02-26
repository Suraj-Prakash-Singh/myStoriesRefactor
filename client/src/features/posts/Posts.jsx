import React from 'react';
import PostExcerpt from './PostExcerpt';
import { useGetPostsQuery, selectPostsIds, selectEntities } from './postSlice';
import { useSelector } from 'react-redux';
const Posts = () => {
  const { isLoading, isError, isSuccess } = useGetPostsQuery();
  const postsIds = useSelector(selectPostsIds);
  let content;
  if (isLoading) return (content = <p>Loading...</p>);
  if (isError) return (content = <p>Something went wrong</p>);
  if (isSuccess) {
    content = postsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  }
  return content;
};

export default Posts;

