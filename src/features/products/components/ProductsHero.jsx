import React from 'react';
import { motion } from 'framer-motion';

const ProductsHero = ({ settings }) => {
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${apiBaseUrl}${imageUrl}`;
  };

  const heroTitle = settings ? (settings.heroTitleAr || settings.heroTitleEn) : 'Products';
  const heroImageUrl = settings?.heroImageUrl ? getImageUrl(settings.heroImageUrl) : null;

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {heroImageUrl && (
        <img
          src={heroImageUrl}
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {heroTitle}
        </motion.h1>
      </div>
    </section>
  );
};

export default ProductsHero;
