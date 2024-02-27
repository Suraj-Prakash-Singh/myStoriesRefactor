import React from 'react';
import Posts from '../features/posts/Posts';
import WritePost from '../features/posts/WritePost';
import { formatDateTime } from '../utils/formatDate';

const Home = () => {
  return (
    <div>
      <WritePost />
      <Posts />
    </div>
  );
};

export default Home;
