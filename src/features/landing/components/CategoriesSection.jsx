import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCategories } from '../../../hooks/useCategories';

const CategoriesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { categories, loading, error } = useCategories();

  // Get title based on current language
  const getCategoryTitle = (category) => {
    return isRTL ? category.titleAr : category.titleEn;
  };

  // Construct image URL from backend
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) return imageUrl;
    // Otherwise, prepend API base URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imageUrl}`;
  };

  // Parse gridClasses and convert to inline styles (works even if Tailwind purges classes)
  const parseGridClasses = (classes) => {
    const style = {};
    if (!classes) return style;
    
    // Parse col-span-X
    const colSpanMatch = classes.match(/col-span-(\d+)/);
    const colSpan = colSpanMatch ? parseInt(colSpanMatch[1]) : null;
    
    // Parse col-start-X
    const colStartMatch = classes.match(/col-start-(\d+)/);
    const colStart = colStartMatch ? parseInt(colStartMatch[1]) : null;
    
    // Parse row-span-X
    const rowSpanMatch = classes.match(/row-span-(\d+)/);
    const rowSpan = rowSpanMatch ? parseInt(rowSpanMatch[1]) : null;
    
    // Parse row-start-X
    const rowStartMatch = classes.match(/row-start-(\d+)/);
    const rowStart = rowStartMatch ? parseInt(rowStartMatch[1]) : null;
    
    // Build gridColumn: if both start and span, use "start / span X", otherwise use individual properties
    if (colStart !== null && colSpan !== null) {
      style.gridColumn = `${colStart} / span ${colSpan}`;
    } else if (colStart !== null) {
      style.gridColumnStart = colStart;
    } else if (colSpan !== null) {
      style.gridColumn = `span ${colSpan}`;
    }
    
    // Build gridRow: if both start and span, use "start / span X", otherwise use individual properties
    if (rowStart !== null && rowSpan !== null) {
      style.gridRow = `${rowStart} / span ${rowSpan}`;
    } else if (rowStart !== null) {
      style.gridRowStart = rowStart;
    } else if (rowSpan !== null) {
      style.gridRow = `span ${rowSpan}`;
    }
    
    return style;
  };

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[var(--color-bg)]">
        <div className="text-center">
          <p className="text-[var(--color-text)]">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[var(--color-bg)]">
        <div className="text-center">
          <p className="text-[var(--color-text)]">Failed to load categories.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[var(--color-bg)]">
      <div>
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--color-text)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('categories.title')}
        </motion.h2>

        <div 
          className="grid grid-cols-4 gap-2 h-[1300px]"
          style={{
            gridTemplateRows: 'repeat(4, minmax(0, 1fr))'
          }}
        >
          {categories.map((category, index) => {
            const gridClasses = (category.gridClasses || '').trim();
            const gridStyle = parseGridClasses(gridClasses);
            
            // Debug: Log styles for first 2 categories
            if (index < 2) {
              console.log(`Category ${index} "${category.titleEn}":`, {
                gridClasses,
                computedStyle: gridStyle
              });
            }
            
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                style={gridStyle}
                data-debug-grid={gridClasses}
              >
                {/* Image */}
                <img
                  src={getImageUrl(category.imageUrl)}
                  alt={getCategoryTitle(category)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Initial Bottom Gradient Overlay (Always Visible) */}
                <div 
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  }}
                />

                {/* Default Text Overlay (Bottom Left) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transition-all duration-500 group-hover:opacity-0">
                  <h3 className="text-lg md:text-3xl font-bold mb-1">
                    {getCategoryTitle(category)}
                  </h3>
                  <p className="text-sm md:text-base font-semibold opacity-90">
                    +{category.productCount} {t('categories.products')}
                  </p>
                </div>

                {/* Hover Overlay (Black Transparent Blurred - Bottom to Top) */}
                <div 
                  className="absolute bottom-0 left-0 right-0 backdrop-blur-sm transition-all duration-500 ease-out h-0 group-hover:h-full"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)',
                  }}
                />

                {/* Hover Content (Text on Right/Left + Button in Center) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-10">
                  {/* Text on Far Right/Left */}
                  <div
                    className={`absolute top-1/3 -translate-y-1/2 ${isRTL ? 'right-6' : 'left-6'}`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {getCategoryTitle(category)}
                    </h3>
                    <p className="text-base md:text-lg font-semibold text-white/90">
                      +{category.productCount} {t('categories.products')}
                    </p>
                  </div>

                  {/* Button in Center */}
                  <button className="bg-white text-[var(--color-text)] px-6 py-3 rounded-lg font-semibold text-base md:text-lg shadow-lg">
                    {t('categories.viewProducts')} (+{category.productCount})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
