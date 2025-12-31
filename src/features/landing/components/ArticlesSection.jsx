import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useArticles } from '../../../hooks/useArticles';
import SectionHeader from '../../../components/ui/SectionHeader';

const ArticlesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { articles, sectionSettings, loading } = useArticles();
  const scrollRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Horizontal scroll functionality
  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Helpers
  const getSectionTitle = () => (sectionSettings ? (isRTL ? sectionSettings.sectionTitleAr : sectionSettings.sectionTitleEn) : t('articles.title'));
  const getSectionSubtitle = () => (sectionSettings ? (isRTL ? sectionSettings.sectionSubtitleAr : sectionSettings.sectionSubtitleEn) : null);
  const getArticleTitle = article => (isRTL ? article.titleAr : article.titleEn);
  const formatDate = dateString => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const getImageUrl = imageUrl => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imageUrl}`;
  };
  const handleArticleClick = article => {
    if (article.link) {
      if (article.link.startsWith('http')) window.open(article.link, '_blank');
      else if (article.link.startsWith('#')) window.location.hash = article.link.substring(1);
      else window.location.href = article.link;
    }
  };

  if (loading) return null;
  if (!articles || articles.length === 0) return null;

  return (
    <section className="w-full py-24 bg-[var(--color-bg)] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-card-surface2)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-card-surface2)]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-6 px-4 md:px-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <SectionHeader title={getSectionTitle()} subtitle={getSectionSubtitle()} align="left" />
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {articles.map((article, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={article.id || index}
                  initial={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative shrink-0 cursor-pointer w-[85vw] md:w-[450px] lg:w-[500px]"
                  onClick={() => handleArticleClick(article)}
                  whileHover={{ y: -10 }}
                >
                  {/* Card Container with Animated Border */}
                  <div className="group relative h-full rounded-3xl overflow-hidden bg-[var(--color-card)] backdrop-blur-sm border border-white/10 shadow-sm">
                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[var(--color-card-surface2)] via-[var(--color-bg-elev)] to-[var(--color-card-surface2)] blur-sm"
                      animate={{
                        opacity: isHovered ? 0.5 : 0,
                        backgroundPosition: isHovered ? ['0%', '100%'] : '0%',
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        backgroundPosition: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'linear',
                        },
                      }}
                    />

                    {/* Image Container - Unified Size */}
                    <div className="relative overflow-hidden h-[350px] md:h-[380px]">
                      <motion.img
                        src={getImageUrl(article.imageUrl)}
                        alt={getArticleTitle(article)}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Date Badge */}
                      <motion.div
                        className={`absolute top-6 ${
                          isRTL ? 'right-6' : 'left-6'
                        } bg-[var(--color-card-surface2)] backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 z-10 border border-white/10`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar size={16} className="text-white" />
                        <span className="text-xs font-bold text-white uppercase tracking-wide">{formatDate(article.date)}</span>
                      </motion.div>

                      {/* Floating Action Button */}
                      <motion.div
                        className="absolute bottom-6 right-6 w-14 h-14 bg-[var(--color-card-surface2)]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 z-10"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        <ArrowUpRight size={20} className="text-white" />
                      </motion.div>

                      {/* Title Overlay (on image) */}
                      <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <motion.h3
                          className="text-white font-bold leading-tight mb-2 text-xl md:text-2xl line-clamp-2 overflow-hidden"
                          animate={{
                            y: isHovered ? -5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {getArticleTitle(article)}
                        </motion.h3>
                      </div>
                    </div>

                    {/* Content Section Below Image */}
                    <div className={`p-6 md:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {/* Animated Progress Bar */}
                      <motion.div
                        className="h-1 bg-gradient-to-r from-[var(--color-text-muted)] to-[var(--color-card-surface2)] rounded-full mb-4"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                        style={{ originX: isRTL ? 1 : 0 }}
                      />

                      {/* Read More Link */}
                      <motion.div
                        className="flex items-center gap-2 text-[var(--color-text-muted)] font-semibold text-sm uppercase tracking-wide hover:text-[var(--color-text)] transition-colors"
                        animate={{
                          x: isHovered ? (isRTL ? -10 : 10) : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>{t('articles.readMore') || 'Read Article'}</span>
                        <ArrowUpRight size={16} className={isHovered ? 'rotate-45' : ''} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
