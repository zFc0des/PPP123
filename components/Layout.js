// components/Layout.js
import Image from 'next/image';
import Navbar from './Navbar';
import SeoFooter from './SeoFooter';
import styles from '../styles/layout.module.css';
import headerStyles from '../styles/header.module.css';


const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerContent}>
          <Image
            src="/images/logo.png"  // Place your logo in public/images/
            alt="Promo Profit Play"
            width={300}  // Original size
            height={80}  // Original size
            className={headerStyles.headerLogo}
            priority  // Loads logo first
          />
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <SeoFooter />
    </div>
  );
};

export default Layout;