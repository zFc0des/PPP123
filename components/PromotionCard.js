import { useState } from 'react';
import Image from 'next/image';

const PromotionCard = ({ casino }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const logoSrc = `/images/logos/${casino.name.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-r from-brand-blue to-brand-hover p-6 border-b border-gray-200">
        <h3 className="text-xl text-white font-semibold">{casino.name}</h3>
      </div>
      
      <div className="p-6">
        <div className="w-32 h-16 mx-auto mb-4 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-200">
          <Image
            src={logoSrc}
            alt={`${casino.name} logo`}
            width={120}
            height={60}
            className="object-contain w-full h-full"
          />
        </div>
        
        {casino.vip_program && (
          <div className="flex justify-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              VIP Program
            </span>
          </div>
        )}
        
        <div className={`space-y-4 ${isExpanded ? 'h-auto' : 'h-60 overflow-hidden relative'}`}>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Welcome Bonus</h4>
            <p className="text-sm text-gray-600">{casino.promotions.sign_up_bonus}</p>
          </div>
          
          {casino.promotions.daily_login_bonus && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Daily Bonus</h4>
              <p className="text-sm text-gray-600">{casino.promotions.daily_login_bonus}</p>
            </div>
          )}
          
          {casino.promotions.additional_bonus && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Offers</h4>
              <p className="text-sm text-gray-600">{casino.promotions.additional_bonus}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Requirements & Limits</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Playthrough:</span>
                <span className="text-gray-800">{casino.wager_requirements.sweeps_playthrough}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Min Balance:</span>
                <span className="text-gray-800">{casino.limits.min_sweeps_balance}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Restrictions:</span>
                <span className="text-gray-800">{casino.limits.regional_limitations}</span>
              </li>
            </ul>
          </div>
          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
        
        <div className="mt-6 space-y-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'View More'}
          </button>
          <button 
            onClick={() => window.open(casino.url, '_blank')}
            className="w-full px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors uppercase"
          >
            CASINO SIGN-UP!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;