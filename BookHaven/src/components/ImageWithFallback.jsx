import React, { useEffect, useState } from 'react';

const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900'>
    <rect width='600' height='900' fill='#f8f1e6' />
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='36' fill='#8a6b4a'>No cover</text>
  </svg>`,
);

const ImageWithFallback = ({ src, alt, className = '', ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGE);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== FALLBACK_IMAGE) {
      setCurrentSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || 'Image'}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
