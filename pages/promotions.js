// pages/promotions.js
import { useState } from 'react';
import Layout from '../components/Layout';
import PromotionCard from '../components/PromotionCard';
import styles from '../styles/sections.module.css';
import filterStyles from '../styles/filters.module.css';
import typographyStyles from '../styles/typography.module.css';
import casinoData from '../data/casinos.json';

const Promotions = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterPromotions = () => {
    return casinoData
      .filter(casino => {
        const matchesType = filterType === 'all' || 
                          (casino.promotions && Object.values(casino.promotions)
                            .some(promo => promo.toLowerCase().includes(filterType)));
                            
        const matchesSearch = casino.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            Object.values(casino.promotions).some(promo => 
                              promo.toLowerCase().includes(searchTerm.toLowerCase()));
                              
        return matchesType && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <Layout>
      <div className={styles.promotionsContainer}>
        <div className={styles.pageHeader}>
          <h1 className={typographyStyles.h2Styled}>Casino Promotions</h1>
          <p>Find the best casino bonus offers and promotions</p>
        </div>

        <div className={filterStyles.filtersSection}>
          <div className={filterStyles.filterGrid}>
            <input
              type="text"
              placeholder="Search casinos or promotions..."
              className={filterStyles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select 
              className={filterStyles.filterSelect}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Bonus Types</option>
              <option value="sign up">Sign Up Bonus</option>
              <option value="daily">Daily Bonus</option>
              <option value="purchase">Purchase Bonus</option>
            </select>
          </div>
        </div>

        <div className={styles.promotionsGrid}>
          {filterPromotions().map((casino, index) => (
            <PromotionCard key={index} casino={casino} />
          ))}
        </div>

        {filterPromotions().length === 0 && (
          <div className={styles.noResults}>
            <h3>No promotions found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Promotions;