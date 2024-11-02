// components/SeoFooter.js
import Link from 'next/link';
import styles from '../styles/footer.module.css';

const SeoFooter = () => {
  return (
    <footer className={styles.seoFooter}>
      <div className={styles.seoGridContainer}>
        {/* Popular Casinos */}
        <div className={styles.seoSection}>
          <h4>Popular Sweepstakes Casinos</h4>
          <ul>
            <li><Link href="/reviews/chumba-casino">Chumba Casino Review</Link></li>
            <li><Link href="/reviews/luckland-slots">Luckland Slots Review</Link></li>
            <li><Link href="/reviews/pulsz-casino">McLuck Casino Review</Link></li>
            <li><Link href="/reviews/stake-us">Sportzino Casino Review</Link></li>
          </ul>
        </div>

        {/* Bonus Types */}
        <div className={styles.seoSection}>
          <h4>Casino Bonuses</h4>
          <ul>
            <li><Link href="/promotions/sign-up-bonus">Sign Up Bonuses</Link></li>
            <li><Link href="/promotions/daily-bonus">Daily Login Rewards</Link></li>
            <li><Link href="/promotions/vip-program">VIP Programs</Link></li>
            <li><Link href="/promotions/purchase-bonus">Purchase Bonuses</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className={styles.seoSection}>
          <h4>Resources</h4>
          <ul>
            <li><Link href="/blog/how-sweepstakes-work">How Sweepstakes Work</Link></li>
            <li><Link href="/blog/casino-comparison">Casino Comparison Guide</Link></li>
            <li><Link href="/blog/redeem-prizes">How to Redeem Prizes</Link></li>
            <li><Link href="/blog/gaming-tips">Gaming Tips & Strategies</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.seoSection}>
          <h4>Legal</h4>
          <ul>
            <li><Link href="/legal/terms">Terms of Service</Link></li>
            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link href="/legal/disclaimer">Disclaimer</Link></li>
            <li><Link href="/legal/responsible-gaming">Responsible Gaming</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.seoDisclaimer}>
        <p>
          Disclaimer: This website provides information about sweepstakes casinos and their promotions. 
          We are not affiliated with any casino. Gaming can be addictive, please play responsibly.
        </p>
        <p>
          © {new Date().getFullYear()} Promo Profit Play. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SeoFooter;