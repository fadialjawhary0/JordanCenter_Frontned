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
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return backgroundImage;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${apiBaseUrl}${imageUrl}`;
  };

  // Use dynamic data if available, otherwise fall back to static content
  const sectionTitle = startProjectData ? (isRTL ? startProjectData.titleAr : startProjectData.titleEn) : t('startProject.title');
  const sectionDescription = startProjectData ? (isRTL ? startProjectData.descriptionAr : startProjectData.descriptionEn) : t('startProject.description');
  const backgroundImageUrl = startProjectData?.backgroundImageUrl ? getImageUrl(startProjectData.backgroundImageUrl) : backgroundImage;
  const button1Text = startProjectData ? (isRTL ? startProjectData.button1TextAr : startProjectData.button1TextEn) : t('startProject.talkToExpert');
  const button1Link = startProjectData?.button1Link || null;
  const button2Text = startProjectData ? (isRTL ? startProjectData.button2TextAr : startProjectData.button2TextEn) : t('startProject.startOrder');
  const button2Link = startProjectData?.button2Link || null;

  // Don't render if loading and no data
  if (loading && !startProjectData) {
    return null;
  }

  // Don't render if section is inactive
  if (startProjectData && !startProjectData.isActive) {
    return null;
  }

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <img
          src={backgroundImageUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Glassy overlay container */}
      <div className="relative max-w-[90%] z-10 mx-auto px-4 md:px-8">
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sectionTitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-white/90 text-center mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sectionDescription}
          </motion.p>

          {/* Buttons Container */}
          <motion.div
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Talk to Expert Button (Dark) */}
            <motion.button
              className="group relative bg-[#020617] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg overflow-hidden w-full sm:w-auto min-w-[200px] md:min-w-[240px]"
              onMouseEnter={() => setHoveredButton('expert')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (button1Link) {
                  if (button1Link.startsWith('#')) {
                    document.querySelector(button1Link)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = button1Link;
                  }
                }
              }}
            >
              {/* Arrow with white circular background - travels left to right on hover */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center"
                initial={false}
                animate={{
                  left: hoveredButton === 'expert'
                    ? isRTL
                      ? '16px'
                      : 'calc(100% - 56px)'
                    : isRTL
                    ? 'calc(100% - 56px)'
                    : '16px',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="flex items-center text-[#020617]">
                  <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                  <ChevronRight
                    size={20}
                    className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`}
                  />
                </div>
              </motion.div>

              {/* Text - centered, shifts to make room for arrow */}
              <motion.span
                className="block text-center relative z-10"
                animate={{
                  x: hoveredButton === 'expert' ? (isRTL ? '16px' : '-16px') : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {button1Text}
              </motion.span>
            </motion.button>

            {/* Start Order Button (Light) */}
            <motion.button
              className="group relative bg-white text-[#020617] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg overflow-hidden w-full sm:w-auto min-w-[200px] md:min-w-[240px]"
              onMouseEnter={() => setHoveredButton('order')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (button2Link) {
                  if (button2Link.startsWith('#')) {
                    document.querySelector(button2Link)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = button2Link;
                  }
                }
              }}
            >
              {/* Arrow with black circular background - travels left to right on hover */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-[#020617] rounded-full flex items-center justify-center"
                initial={false}
                animate={{
                  left: hoveredButton === 'order'
                    ? isRTL
                      ? '16px'
                      : 'calc(100% - 56px)'
                    : isRTL
                    ? 'calc(100% - 56px)'
                    : '16px',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="flex items-center text-white">
                  <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
                  <ChevronRight
                    size={20}
                    className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`}
                  />
                </div>
              </motion.div>

              {/* Text - centered, shifts to make room for arrow */}
              <motion.span
                className="block text-center relative z-10"
                animate={{
                  x: hoveredButton === 'order' ? (isRTL ? '16px' : '-16px') : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {button2Text}
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartProjectSection;

