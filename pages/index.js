import Layout from '../components/Layout';
import styles from '../styles/sections.module.css';
import typographyStyles from '../styles/typography.module.css';
import FeaturedDashboard from '../components/FeaturedDashboard';
import casinoData from '../data/casinos.json';

export default function Home() {
  return (
    <Layout>
      <FeaturedDashboard casinoData={casinoData} />

      <section className={styles.promotions}>
        <h2 className={typographyStyles.h2Styled}>Latest Promotions</h2>
        <h3 className={typographyStyles.h3Styled}>Promotion Title</h3>
        <p>Description of the promotion goes here.</p>
      </section>
      <section className={styles.reviews}>
        <h2 className={typographyStyles.h2Styled}>User Reviews</h2>
        <h3 className={typographyStyles.h3Styled}>Review Title</h3>
        <p>Details of the review go here.</p>
      </section>
      <section className={styles.blog}>
        <h2 className={typographyStyles.h2Styled}>Latest Blog Posts</h2>
        <h3 className={typographyStyles.h3Styled}>Blog Post Title</h3>
        <p>Excerpt or details of the blog post go here.</p>
      </section>
    </Layout>
  );
}