// components/ReviewCard.js
import { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CasinoLogo from './ui/CasinoLogo';
import ReferralLink from './ui/card/ReferralLink';

const ReviewCard = ({ casino }) => {
  const logoSrc = `/images/logos/${casino.name.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-hover p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-white font-semibold">{casino.name}</h3>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">Top Rated</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Casino Logo */}
        <div className="w-32 h-16 mx-auto bg-white rounded-lg p-2 flex items-center justify-center border border-gray-200">
          <CasinoLogo
            casinoSlug={casino.slug}
            width={32}  
            height={32}
            className="rounded-full object-cover"
          />
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Welcome Bonus</h4>
            <p className="text-sm text-gray-600">{casino.promotions.sign_up_bonus}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Info</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Playthrough:</span>
                <span className="text-gray-800">{casino.wager_requirements.sweeps_playthrough}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Min Balance:</span>
                <span className="text-gray-800">{casino.limits.min_sweeps_balance}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <ReferralLink
            casino={casino}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            trackingId={`review-${casino.slug}`}
          >
            Play Now
          </ReferralLink>

          <Link
            href={`/reviews/${casino.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors text-center block"
          >
            Read Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;