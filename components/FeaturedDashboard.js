import React from 'react';
import casinoData from '../data/casinos.json';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const StatsIcon = ({ type }) => {
  // Simple SVG icons as fallback
  const icons = {
    gift: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    trending: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    alert: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return <span className="text-blue-500">{icons[type]}</span>;
};

const FeaturedDashboard = ({ casinoData }) => {
  // Get top promotions by sign-up bonus value
  const topPromotions = casinoData
    .filter(casino => casino.promotions.sign_up_bonus)
    .slice(0, 3);

  const stats = {
    totalCasinos: casinoData.length,
    vipPrograms: casinoData.filter(c => c.vip_program).length,
    avgMinBalance: Math.round(
      casinoData.reduce((acc, c) => {
        const min = parseInt(c.limits.min_sweeps_balance);
        return acc + (isNaN(min) ? 0 : min);
      }, 0) / casinoData.length
    )
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <StatsIcon type="gift" />
              <div>
                <p className="text-sm font-medium text-gray-500">Active Casinos</p>
                <h3 className="text-2xl font-bold">{stats.totalCasinos}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <StatsIcon type="users" />
              <div>
                <p className="text-sm font-medium text-gray-500">VIP Programs</p>
                <h3 className="text-2xl font-bold">{stats.vipPrograms}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <StatsIcon type="trending" />
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Min Balance</p>
                <h3 className="text-2xl font-bold">{stats.avgMinBalance} SC</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Promotions */}
      <Card>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <StatsIcon type="alert" />
            <h2 className="text-xl font-bold">Featured Promotions</h2>
          </div>
          <div className="space-y-4">
            {topPromotions.map((casino, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{casino.name}</h3>
                  {casino.vip_program && (
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {casino.promotions.sign_up_bonus}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedDashboard;