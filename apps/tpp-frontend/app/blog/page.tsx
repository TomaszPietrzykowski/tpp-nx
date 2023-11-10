import React from 'react';
import styles from './blog.module.scss';
import FeaturedPosts from '../../components/home/FeaturedPosts';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/users');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div className="">
      {posts?.length > 0 ? (
        <div className={styles.blog__container}>
          <FeaturedPosts posts={posts} />
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default BlogPage;
