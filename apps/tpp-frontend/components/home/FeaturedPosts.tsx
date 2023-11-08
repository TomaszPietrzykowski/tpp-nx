import React from 'react';
import { Post } from '@tpp-nx/shared-types';
import styles from '../../app/home.module.scss';

const FeaturedPosts = () => {
  const post: Post = {
    id: 1,
    title: 'Przykładowy post',
    message:
      'This is meant as a blog content: In May and June 2020, the death of 350 elephants in Botswana’s Okavango delta baffled conservationists and sparked global speculation about what had caused it. Elephants of all ages and both sexes were affected, with many walking in circles before dying suddenly, collapsing on their faces. Two months later, 35 more elephants died in north-western Zimbabwe.The bacterial infection has not previously been linked to elephant deaths, according to the paper published in the Nature Communications journal. Researchers believe it could have been the same one responsible for the deaths in neighbouring countries. This represents an important conservation concern for elephants in the largest remaining meta-population of this endangered species,” researchers wrote in the paper. It was written by an international team of researchers from the Victoria Falls Wildlife Trust, the University of Surrey, laboratories in South Africa and the UK government’s Animal and Plant Health Agency (APHA).',
    author: 'Majk',
  };

  return (
    <div className={styles.featured__grid}>
      <div className={styles.featured__post}>
        <h3>{post.title}</h3>
        <p>{post.message}</p>
        <small>
          <i>Author: {post.author}</i>
        </small>
      </div>
    </div>
  );
};

export default FeaturedPosts;
