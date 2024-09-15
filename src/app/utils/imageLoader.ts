

import type { ImageLoader } from 'next/image';


export const customImageLoader: ImageLoader = ({ src, width, quality }) => {
  if (typeof src !== 'string') {
    console.error('Invalid image source:', src);
    return '/images/default-avatar.png'; // Fallback to a default image if src is invalid
  }
  return `${src}?w=${width}&q=${quality || 75}`;
};
