// import FeaturedPosts from '../components/home/FeaturedPosts';
import Hero from '../components/home/Hero';
import styles from './home.module.scss';

export default async function Index() {
  return (
    <div className={styles.page__container}>
      <Hero />
      {/* <FeaturedPosts /> */}
    </div>
  );
}
