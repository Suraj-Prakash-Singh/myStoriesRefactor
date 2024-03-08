import React from 'react';
import Posts from '../features/posts/Posts';
import WritePost from '../features/posts/WritePost';

const Home = () => {
  return (
    <div>
      <WritePost />
      <Posts />
    </div>
  );
};

export default Home;
