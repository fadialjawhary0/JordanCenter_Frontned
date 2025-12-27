import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HeroStats = ({ stats = [] }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1,
      },
    },
  };

  return (
    <motion.div
      className="absolute bottom-4 md:bottom-8 left-0 right-0 px-4 md:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id || index}
            className="text-white text-center bg-black/30 backdrop-blur-md rounded-lg p-3 md:p-4 lg:p-6 border border-white/10"
            variants={statsVariants}
          >
            <div className="text-sm md:text-[20px] font-bold mb-1 md:mb-2 whitespace-nowrap leading-tight">
              {isRTL ? stat.numberAr : stat.numberEn}
            </div>
            <div className="text-[14px] text-white/80 leading-tight">
              {isRTL ? stat.descriptionAr : stat.descriptionEn}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroStats;
