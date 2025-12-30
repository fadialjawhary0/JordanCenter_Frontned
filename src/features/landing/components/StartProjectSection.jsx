import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useStartProjectSection } from '../../../hooks/useStartProjectSection';
import backgroundImage from '../../../assets/categories/9.jpg';

const StartProjectSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [hoveredButton, setHoveredButton] = useState(null);
  const { startProjectData, loading } = useStartProjectSection();

  // Get API base URL for images
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getImageUrl = imageUrl => {
    if (!imageUrl) return backgroundImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${apiBaseUrl}${imageUrl}`;
  };

  // Data Extraction
  const sectionTitle = startProjectData ? (isRTL ? startProjectData.titleAr : startProjectData.titleEn) : t('startProject.title');
  const sectionDescription = startProjectData ? (isRTL ? startProjectData.descriptionAr : startProjectData.descriptionEn) : t('startProject.description');
  const backgroundImageUrl = startProjectData?.backgroundImageUrl ? getImageUrl(startProjectData.backgroundImageUrl) : backgroundImage;
  const button1Text = startProjectData ? (isRTL ? startProjectData.button1TextAr : startProjectData.button1TextEn) : t('startProject.talkToExpert');
  const button1Link = startProjectData?.button1Link || null;
  const button2Text = startProjectData ? (isRTL ? startProjectData.button2TextAr : startProjectData.button2TextEn) : t('startProject.startOrder');
  const button2Link = startProjectData?.button2Link || null;

  if (loading && !startProjectData) return null;
  if (startProjectData && !startProjectData.isActive) return null;

  return (
    <section className="relative w-full py-24 md:py-36 overflow-hidden flex items-center justify-center">
      {/* 1. Immersive Background with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Heavy Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </motion.div>
      </div>

      {/* 2. The Main "Magic Border" Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-4"
        initial={{ y: 150, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          type: 'spring',
          stiffness: 40,
          damping: 15,
          mass: 1.2,
        }}
      >
        {/* The Moving Border Layer */}
        {/* We create a div slightly larger than content, with a spinning gradient */}
        <div className="absolute -inset-[2px] rounded-[32px] overflow-hidden">
          <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#333333_50%,#ffffff_100%)] opacity-70" />
        </div>

        {/* The Content Layer (Sits on top of the moving border) */}
        <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[30px] p-8 md:p-14 lg:p-16 border border-white/10 shadow-2xl">
          {/* Content Inner */}
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Title with Shine Effect */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {sectionTitle}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light">{sectionDescription}</p>

            {/* Separator Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

            {/* Buttons Container */}
            <div className={`flex flex-col sm:flex-row gap-5 w-full md:w-auto mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* BUTTON 1: EXPERT (Primary Dark) */}
              <motion.button
                className="group relative bg-slate-950 border border-white/10 text-white px-8 py-4 rounded-full font-medium text-lg overflow-hidden w-full sm:w-[260px] shadow-lg hover:shadow-white/5 transition-all"
                onMouseEnter={() => setHoveredButton('expert')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  button1Link &&
                  (button1Link.startsWith('#')
                    ? document.querySelector(button1Link)?.scrollIntoView({ behavior: 'smooth' })
                    : (window.location.href = button1Link))
                }
              >
                {/* Your Arrow Logic */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black z-10"
                  initial={false}
                  animate={{
                    left: hoveredButton === 'expert' ? (isRTL ? '16px' : 'calc(100% - 56px)') : isRTL ? 'calc(100% - 56px)' : '16px',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-center">
                    <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    <ChevronRight size={20} className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>

                {/* Text Logic */}
                <motion.span
                  className="block text-center relative z-0"
                  animate={{ x: hoveredButton === 'expert' ? (isRTL ? '16px' : '-16px') : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {button1Text}
                </motion.span>
              </motion.button>

              {/* BUTTON 2: START ORDER (White/Brand) */}
              <motion.button
                className="group relative bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg overflow-hidden w-full sm:w-[260px] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                onMouseEnter={() => setHoveredButton('order')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  button2Link &&
                  (button2Link.startsWith('#')
                    ? document.querySelector(button2Link)?.scrollIntoView({ behavior: 'smooth' })
                    : (window.location.href = button2Link))
                }
              >
                {/* Your Arrow Logic - Inverted Colors */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center text-white z-10"
                  initial={false}
                  animate={{
                    left: hoveredButton === 'order' ? (isRTL ? '16px' : 'calc(100% - 56px)') : isRTL ? 'calc(100% - 56px)' : '16px',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-center">
                    <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                    <ChevronRight size={20} className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>

                {/* Text Logic */}
                <motion.span
                  className="block text-center relative z-0 text-sm"
                  animate={{ x: hoveredButton === 'order' ? (isRTL ? '16px' : '-16px') : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {button2Text}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StartProjectSection;
