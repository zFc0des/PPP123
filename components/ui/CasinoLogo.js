// components/ui/CasinoLogo.js
import Image from 'next/image';
import { useState } from 'react';

const CasinoLogo = ({ casinoSlug, ...props }) => {
  const [errorCount, setErrorCount] = useState(0);
  
  const getImagePath = (slug) => {
    // Try different suffixes based on error count
    switch(errorCount) {
      case 0:
        return `/images/logos/${slug}.png`;
      case 1:
        return `/images/logos/${slug}-casino.png`;
      case 2:
        return `/images/logos/${slug}-slots.png`;
      default:
        return '/images/placeholder-logo.png';
    }
  };

  return (
    <Image
      src={getImagePath(casinoSlug)}
      alt={`${casinoSlug} logo`}
      onError={() => setErrorCount(prev => prev + 1)}
      {...props}
    />
  );
};

export default CasinoLogo;