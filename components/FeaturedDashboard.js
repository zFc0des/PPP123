import React from 'react';
import Link from 'next/link';
import CasinoLogo from './ui/CasinoLogo';
import { Gift, Users, TrendingUp, Info, Star, ChevronRight } from 'lucide-react';

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
  const icons = {
    gift: <Gift className="h-8 w-8" />,
    users: <Users className="h-8 w-8" />,
    trending: <TrendingUp className="h-8 w-8" />,
    alert: <Info className="h-5 w-5" />
  };

  return <span className="text-blue-500">{icons[type]}</span>;
};

const FeaturedDashboard = ({ casinoData = [] }) => {
  // Helper function to extract numeric value from balance string
  const extractNumericValue = (str) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Calculate average minimum balance
  const calculateAverageMinBalance = (casinos) => {
    const validBalances = casinos
      .map(casino => {
        const balanceStr = casino.limits.min_sweeps_balance;
        return extractNumericValue(balanceStr);
      })
      .filter(balance => balance !== null);

    if (validBalances.length === 0) return 0;
    return Math.round(validBalances.reduce((sum, val) => sum + val, 0) / validBalances.length);
  };

  // Get featured promotions (top 3 by signup bonus value)
  const getFeaturedPromotions = (casinos) => {
    return casinos
      .filter(casino => casino.promotions.sign_up_bonus)
      .sort((a, b) => {
        const valueA = extractNumericValue(a.promotions.sign_up_bonus) || 0;
        const valueB = extractNumericValue(b.promotions.sign_up_bonus) || 0;
        return valueB - valueA;
      })
      .slice(0, 3);
  };

  // Calculate stats
  const stats = {
    totalCasinos: casinoData.length,
    vipPrograms: casinoData.filter(casino => casino.vip_program).length,
    avgMinBalance: calculateAverageMinBalance(casinoData)
  };

  const featuredPromotions = getFeaturedPromotions(casinoData);

  return (
    <div className="space-y-6 py-8">
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <StatsIcon type="alert" />
              <h2 className="text-xl font-bold text-gray-900">Featured Promotions</h2>
            </div>
            <Link 
              href="/promotions" 
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredPromotions.map((casino, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 relative">
                    <CasinoLogo
                      casinoSlug={casino.slug}
                      width={32}  
                      height={32}
                      className="rounded-full object-cover"
                    />
                    </div>
                    <h3 className="font-semibold text-gray-900">{casino.name}</h3>
                  </div>
                  {casino.vip_program && (
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {casino.promotions.sign_up_bonus}
                </p>
                <div className="mt-3 flex justify-end">
                  <Link
                    href={casino.referral_link || casino.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Claim Bonus <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedDashboard;