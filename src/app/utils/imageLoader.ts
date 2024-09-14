import type { ImageLoader } from 'next/image';

export const customImageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
