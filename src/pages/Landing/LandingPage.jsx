import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';
import { useHeroSection } from '../../hooks/useHeroSection';
import HeroStats from '../../features/landing/components/HeroStats';
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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const isRTL = i18n.language === 'ar';
  
  // Fetch hero section data from CMS
  const { heroData, loading } = useHeroSection();
  
  // Use dynamic data if available, otherwise fall back to static content
  const heroTitle = heroData ? (isRTL ? heroData.titleAr : heroData.titleEn) : t('hero.mainHeading');
  const heroDescription = heroData ? (isRTL ? heroData.descriptionAr : heroData.descriptionEn) : t('hero.subheading');
  const heroButtonText = heroData ? (isRTL ? heroData.buttonTextAr : heroData.buttonTextEn) : t('hero.ctaButton');
  const heroMediaItems = heroData?.mediaItems || [];
  const heroStats = heroData?.stats || [];

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
      <section className="relative w-full min-h-screen overflow-hidden" >
        {/* Media Background (video or images) */}
        {heroMediaItems.length > 0 ? (
          <>
            {heroMediaItems.map((media, index) => {
              const isActive = index === currentMediaIndex;
              if (media.type === 'video') {
                return (
                  <video
                    key={media.id}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <source src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${media.url}`} type="video/mp4" />
                  </video>
                );
              } else {
                return (
                  <img
                    key={media.id}
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${media.url}`}
                    alt="Hero background"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                );
              }
            })}
          </>
        ) : (
          // Fallback to static video
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 w-full h-full bg-black/40 z-1" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-2 flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-20 pb-56 md:pb-60">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              {heroTitle}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {heroDescription}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="pt-2 md:pt-4"
              variants={itemVariants}
            >
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
                    left: isHeroButtonHovered
                      ? isRTL
                        ? '16px'
                        : 'calc(100% - 56px)'
                      : isRTL
                      ? 'calc(100% - 56px)'
                      : '16px',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-center text-[var(--color-text)]">
                    <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    <ChevronRight
                      size={20}
                      className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`}
                    />
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
          
          {/* Media Navigation - Only show if multiple media items */}
          {heroMediaItems.length > 1 && (
            <div className="absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
              <button
                onClick={() => setCurrentMediaIndex((prev) => (prev === 0 ? heroMediaItems.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={20} className="text-white rotate-180" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {heroMediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMediaIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentMediaIndex((prev) => (prev === heroMediaItems.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          )}
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
