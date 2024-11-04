import Layout from '../components/Layout';
import PromotionCard from '../components/PromotionCard';
import casinoData from '../data/casinos.json';
import { useState } from 'react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Casino Promotions</h1>
          <p className="mt-2 text-lg text-gray-600">Find the best casino bonus offers and promotions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search casinos or promotions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Bonus Types</option>
              <option value="sign up">Sign Up Bonus</option>
              <option value="daily">Daily Bonus</option>
              <option value="purchase">Purchase Bonus</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterPromotions().map((casino, index) => (
            <PromotionCard key={index} casino={casino} />
          ))}
        </div>

        {filterPromotions().length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No promotions found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Promotions;