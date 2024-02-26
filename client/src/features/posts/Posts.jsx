import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PostExcerpt from './PostExcerpt';
import { useGetPostsQuery, selectPostsIds } from './postSlice';
import { useSelector } from 'react-redux';
import PostExcerptSkeleton from './PostExcerptSkeleton';
const Posts = () => {
  const { isLoading, isError, isSuccess } = useGetPostsQuery();
  const postsIds = useSelector(selectPostsIds);
  let content;
  if (isLoading) return (content = <PostExcerptSkeleton />);
  if (isError) return (content = <p>Something went wrong</p>);
  if (isSuccess) {
    content = postsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  }
  return content;
};

export default Posts;
