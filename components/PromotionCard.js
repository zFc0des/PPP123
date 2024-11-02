// components/PromotionCard.js
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/cards.module.css';
import utilStyles from '../styles/utils.module.css';
import buttonStyles from '../styles/buttons.module.css';
import componentStyles from '../styles/components.module.css';

const PromotionCard = ({ casino }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Convert casino name to image filename format
  const logoSrc = `/images/logos/${casino.name.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <div className={styles.promotionCard}>
      <div className={componentStyles.promotionHeader}>
        <h3>{casino.name}</h3>
      </div>
      
      <div className={componentStyles.promotionContent}>
        <div className={componentStyles.logoContainer}>
          <Image
            src={logoSrc}
            alt={`${casino.name} logo`}
            width={120}
            height={60}
            className={styles.casinoLogo}
          />
        </div>
        
        <div className={componentStyles.tagContainer}>
          {casino.vip_program && (
            <span className={`${utilStyles.promotionTag} ${utilStyles.bonus}`}>
              VIP Program
            </span>
          )}
        </div>
        
        <div className={`${styles.promotionDetails} ${isExpanded ? styles.expanded : ''}`}>
          <div className={styles.bonusSection}>
            <h4>Welcome Bonus</h4>
            <p>{casino.promotions.sign_up_bonus}</p>
            
            {!isExpanded && <div className={styles.fadeOverlay} />}
            
            <div className={styles.expandableContent}>
              {casino.promotions.daily_login_bonus && (
                <>
                  <h4>Daily Bonus</h4>
                  <p>{casino.promotions.daily_login_bonus}</p>
                </>
              )}
              
              {casino.promotions.additional_bonus && (
                <>
                  <h4>Additional Offers</h4>
                  <p>{casino.promotions.additional_bonus}</p>
                </>
              )}

              <div className={styles.requirementsSection}>
                <h4>Requirements & Limits</h4>
                <ul>
                  <li><strong>Playthrough:</strong> {casino.wager_requirements.sweeps_playthrough}</li>
                  <li><strong>Min Balance:</strong> {casino.limits.min_sweeps_balance}</li>
                  <li><strong>Restrictions:</strong> {casino.limits.regional_limitations}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.promotionFooter}>
          <button 
            className={buttonStyles.viewMoreButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'View More'}
          </button>
          <button 
            className={buttonStyles.promotionButton}
            onClick={() => window.open(casino.url, '_blank')}
          >
            Casino Sign-up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;