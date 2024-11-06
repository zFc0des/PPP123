import { ExternalLink } from 'lucide-react';

const ReferralLink = ({
  casino,
  className,
  children,
  showIcon = true,
  trackingId = null
}) => {
  const handleClick = () => {
    const destinationUrl = casino.referral_link || casino.url;
    
    if (window.gtag) {
      window.gtag('event', 'casino_click', {
        casino_name: casino.name,
        link_type: casino.referral_link ? 'referral' : 'direct',
        tracking_id: trackingId,
        timestamp: new Date().toISOString()
      });
    }
    
    window.open(destinationUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      rel="sponsored noopener noreferrer"
    >
      <span>{children}</span>
      {showIcon && <ExternalLink className="h-4 w-4 ml-2" />}
    </button>
  );
};

export default ReferralLink;