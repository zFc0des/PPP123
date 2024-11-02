// pages/reviews.js
import { useState } from 'react';
import Layout from '../components/Layout';
import ReviewCard from '../components/ReviewCard';
import styles from '../styles/sections.module.css';
import filterStyles from '../styles/filters.module.css';
import typographyStyles from '../styles/typography.module.css';
import casinoData from '../data/casinos.json';

const Reviews = () => {
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterCasinos = () => {
    return casinoData
      .filter(casino => {
        const matchesType = filterType === 'all' || 
                          (filterType === 'vip' ? casino.vip_program : true);
                          
        const matchesSearch = casino.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'minBalance') {
          return parseInt(a.limits.min_sweeps_balance) - parseInt(b.limits.min_sweeps_balance);
        }
        return 0;
      });
  };

  return (
    <Layout>
      <div className={styles.reviewsContainer}>
        <div className={styles.pageHeader}>
          <h1 className={typographyStyles.h2Styled}>Casino Reviews</h1>
          <p>Detailed reviews and comparisons of top sweepstakes casinos</p>
        </div>

        <div className={filterStyles.filtersSection}>
          <div className={filterStyles.filterGrid}>
            <input
              type="text"
              placeholder="Search casinos..."
              className={filterStyles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select 
              className={filterStyles.filterSelect}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Casinos</option>
              <option value="vip">VIP Program</option>
            </select>
            
            <select
              className={filterStyles.filterSelect}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="minBalance">Sort by Min Balance</option>
            </select>
          </div>
        </div>

        <div className={styles.reviewsGrid}>
          {filterCasinos().map((casino, index) => (
            <ReviewCard key={index} casino={casino} />
          ))}
        </div>

        {filterCasinos().length === 0 && (
          <div className={styles.noResults}>
            <h3>No casinos found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reviews;