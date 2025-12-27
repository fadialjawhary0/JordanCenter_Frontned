import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBrandsSection } from '../../../hooks/useBrandsSection';
import companyLogo from '../../../assets/Company logo.png';

const BrandsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef(null);
  
  // Fetch brands section data from CMS
  const { brandsData, loading } = useBrandsSection();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Use dynamic data if available, otherwise fall back to static content
  const sectionTitle = brandsData ? (isRTL ? brandsData.sectionTitleAr : brandsData.sectionTitleEn) : t('brands.title');
  const logos = brandsData?.logos || [];
  
  // Fallback to static logo if no CMS data
  const displayLogos = logos.length > 0 ? logos : Array(6).fill({ imageUrl: companyLogo });

  // InfiniteRow Component - renders a single row with infinite scroll effect
  const InfiniteRow = ({ direction = 'right', speed = 1 }) => {
    // Calculate movement based on scroll progress
    // speed determines how fast the row moves relative to scroll
    const x = useTransform(
      scrollYProgress,
      [0, 1],
      direction === 'right' ? [0, speed * 1000] : [0, -speed * 1000]
    );

    // Get API base URL for images
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const getImageUrl = (imageUrl) => {
      if (!imageUrl) return companyLogo;
      // If it's already a full URL, return as is
      if (imageUrl.startsWith('http')) return imageUrl;
      // Otherwise, prepend API base URL
      return `${apiBaseUrl}${imageUrl}`;
    };

    return (
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6"
          style={{ x }}
        >
          {/* Render logos 6 times to ensure seamless infinite loop */}
          {/* Even with extreme scrolling, logos will always be visible */}
          {[...Array(6)].map((_, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {displayLogos.map((logo, logoIndex) => (
                <div
                  key={`${groupIndex}-${logoIndex}`}
                  className="shrink-0 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-white border border-[#93C5FD] rounded-lg flex items-center justify-center p-4"
                >
                  <img
                    src={getImageUrl(logo.imageUrl || logo)}
                    alt={`Brand ${logoIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-32 bg-[var(--color-bg)]"
   
    >
      <div>
        {/* Title */}
        {!loading && (
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--color-text)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {sectionTitle}
          </motion.h2>
        )}

        {/* Logo Grid - 3 Rows with different speeds */}
        <div className="space-y-6 md:space-y-8">
          {/* Top Row - Moves Right */}
          <InfiniteRow direction="right" speed={0.6} />
          
          {/* Middle Row - Moves Left */}
          <InfiniteRow direction="left" speed={0.8} />
          
          {/* Bottom Row - Moves Right */}
          <InfiniteRow direction="right" speed={0.7} />
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
