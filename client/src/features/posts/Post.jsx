import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  const nav = useNavigate();
  if (!postId) return nav('/');
  //   const post = useSelector((state) => selectPostById(state, postId));
  return <div>Post</div>;
};

export default Post;
