import React from 'react';
import { IPost } from '@tpp-nx/shared-types';
import styles from '../../app/home.module.scss';
import PostsGrid from '../blog/PostsGrid';

const FeaturedPosts = async ({ posts }: { posts: Array<IPost> }) => {
  return (
    <div className={styles.featured__grid}>
      <h2>Featured posts</h2>
      <PostsGrid posts={posts} />
    </div>
  );
};

export default FeaturedPosts;
