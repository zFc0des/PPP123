// components/ReviewCard.js
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components.module.css'; // Component-specific styles
import cardStyles from '../styles/cards.module.css'; // Card layout styles
import buttonStyles from '../styles/buttons.module.css'; // Button styles

const ReviewCard = ({ casino }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Convert casino name to image filename format
  const logoSrc = `/images/logos/${casino.name.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <div className={cardStyles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewLogo}>
          <Image
            src={logoSrc}
            alt={`${casino.name} logo`}
            width={120}
            height={60}
            className={styles.casinoLogo}
          />
        </div>
        {casino.vip_program && (
          <span className={styles.vipBadge}>VIP Program</span>
        )}
      </div>

      <div className={styles.quickStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Min Redemption</span>
          <span className={styles.statValue}>{casino.limits.min_sweeps_balance}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Playthrough</span>
          <span className={styles.statValue}>{casino.wager_requirements.sweeps_playthrough}</span>
        </div>
      </div>

      <div className={styles.reviewContent}>
        <div className={styles.bonusSection}>
          <h4>Available Bonuses</h4>
          <ul className={styles.bonusList}>
            {casino.promotions.sign_up_bonus && (
              <li>
                <span className={styles.bonusType}>Sign Up:</span>
                <span className={styles.bonusValue}>{casino.promotions.sign_up_bonus}</span>
              </li>
            )}
            {casino.promotions.daily_login_bonus && (
              <li>
                <span className={styles.bonusType}>Daily:</span>
                <span className={styles.bonusValue}>{casino.promotions.daily_login_bonus}</span>
              </li>
            )}
            {casino.promotions.additional_bonus && (
              <li>
                <span className={styles.bonusType}>Additional:</span>
                <span className={styles.bonusValue}>{casino.promotions.additional_bonus}</span>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.requirementsSection}>
          <h4>Requirements & Limits</h4>
          <ul>
            <li>
              <strong>Wagering:</strong> {casino.wager_requirements.sweeps_playthrough}
            </li>
            <li>
              <strong>Min Balance:</strong> {casino.limits.min_sweeps_balance}
            </li>
            <li>
              <strong>Restrictions:</strong> {casino.limits.regional_limitations}
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.reviewActions}>
        <button 
          className={buttonStyles.viewMoreButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'View Details'}
        </button>
        <button 
          className={buttonStyles.visitButton}
          onClick={() => window.open(casino.url, '_blank')}
        >
          Visit Casino
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;