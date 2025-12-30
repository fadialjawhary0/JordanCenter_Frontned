import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';
import { useHeroSection } from '../../hooks/useHeroSection';
import HeroStats from '../../features/landing/components/HeroStats';
import HeroMediaCarousel from '../../features/landing/components/HeroMediaCarousel';
import CategoriesSection from '../../features/landing/components/CategoriesSection';
import SolutionsSection from '../../features/landing/components/SolutionsSection';
import BrandsSection from '../../features/landing/components/BrandsSection';
import ProjectsSection from '../../features/landing/components/ProjectsSection';
import CustomerTrustSection from '../../features/landing/components/CustomerTrustSection';
import StartProjectSection from '../../features/landing/components/StartProjectSection';
import ArticlesSection from '../../features/landing/components/ArticlesSection';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [isHeroButtonHovered, setIsHeroButtonHovered] = useState(false);
  const isRTL = i18n.language === 'ar';

  // Fetch hero section data from CMS
  const { heroData, loading } = useHeroSection();

  // Memoize text values to prevent unnecessary recalculations
  const heroTitle = useMemo(() => (heroData ? (isRTL ? heroData.titleAr : heroData.titleEn) : t('hero.mainHeading')), [heroData, isRTL, t]);
  const heroDescription = useMemo(() => (heroData ? (isRTL ? heroData.descriptionAr : heroData.descriptionEn) : t('hero.subheading')), [heroData, isRTL, t]);
  const heroButtonText = useMemo(() => (heroData ? (isRTL ? heroData.buttonTextAr : heroData.buttonTextEn) : t('hero.ctaButton')), [heroData, isRTL, t]);
  const heroMediaItems = useMemo(() => heroData?.mediaItems || [], [heroData?.mediaItems]);
  const heroStats = useMemo(() => heroData?.stats || [], [heroData?.stats]);

  // Split title and description into words for animation
  const titleWords = useMemo(() => {
    return heroTitle ? heroTitle.split(' ') : [];
  }, [heroTitle]);

  const descriptionWords = useMemo(() => {
    return heroDescription ? heroDescription.split(' ') : [];
  }, [heroDescription]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Modular Media Carousel */}
        <HeroMediaCarousel mediaItems={heroMediaItems} autoPlayInterval={heroData?.autoPlayInterval || 5000} fallbackVideo={heroVideo} pauseOnHover={true} />

        {/* Overlay - with pointer-events-none to allow clicks through to carousel controls */}
        <div className="absolute inset-0 w-full h-full bg-black/40 z-[2]" style={{ pointerEvents: 'none' }} />

        {/* Hero Content */}
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-56 md:pb-60">
          <motion.div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
              variants={itemVariants}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {heroTitle}
            </motion.h1>

            {/* Subheading with Word-by-Word Animation */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed line-clamp-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.7 }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {descriptionWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: 'blur(10px)',
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                    delay: 1.0 + 0.05 * index,
                  }}
                  className="inline-block text-2xl"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {/* CTA Button */}
            <motion.div className="pt-2 md:pt-4" variants={itemVariants}>
              <motion.button
                className="relative bg-[var(--color-text)] text-white px-12 py-4 rounded-lg font-semibold text-lg overflow-hidden mx-auto min-w-[280px] cursor-pointer"
                onMouseEnter={() => setIsHeroButtonHovered(true)}
                onMouseLeave={() => setIsHeroButtonHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Arrow with white circular background - travels left to right on hover */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  initial={false}
                  animate={{
                    left: isHeroButtonHovered ? (isRTL ? '16px' : 'calc(100% - 56px)') : isRTL ? 'calc(100% - 56px)' : '16px',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-center text-[var(--color-text)]">
                    <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    <ChevronRight size={20} className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>

                {/* Text - centered, shifts to make room for arrow */}
                <motion.span
                  className="block text-center text-lg relative z-10 px-8"
                  animate={{
                    x: isHeroButtonHovered ? (isRTL ? '16px' : '-16px') : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {heroButtonText}
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Statistics Section */}
          <HeroStats stats={heroStats} />
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Brands Section */}
      <BrandsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Customer Trust Section */}
      <CustomerTrustSection />

      {/* Start Project Section */}
      <StartProjectSection />

      {/* Articles Section */}
      <ArticlesSection />
    </div>
  );
};

export default LandingPage;
