// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/header.module.css';

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/promotions">Promotions</Link></li>
        <li><Link href="/reviews">Reviews</Link></li>
        <li><Link href="/blog">Blog</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;