import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTestimonial } from '../../../hooks/useTestimonial';
import { AnimatedTestimonials } from '../../../components/ui/animated-testimonials';
import customerTrustImage from '../../../assets/customer-trust.jpg';

const CustomerTrustSection = () => {
  const { t, i18n } = useTranslation();
  const { testimonialData, loading } = useTestimonial();
  const isRTL = i18n.language === 'ar';

  // Get image URL helper (kept from your original code)
  const getImageUrl = imageUrl => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${apiBaseUrl}${imageUrl}`;
  };

  if (loading) {
    return (
      <section className="w-full py-14 md:py-20 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
          </div>
        </div>
      </section>
    );
  }

  // Handle No Data
  const profiles = testimonialData?.profiles || [];
  if (!testimonialData || profiles.length === 0) {
    return null;
  }

  // Map CMS data to AnimatedTestimonials format
  const formattedTestimonials = profiles.map(profile => ({
    name: profile.name,
    designation: profile.role,
    // Use Translation logic
    quote: isRTL ? profile.testimonialTextAr || '' : profile.testimonialTextEn || '',
    // Use the BIG image for the 3D card
    src: getImageUrl(profile.testimonialImageUrl) || customerTrustImage,
    // Use the SMALL profile image for the avatar
    avatar: getImageUrl(profile.imageUrl) || 'https://via.placeholder.com/150',
  }));

  // Get section title
  const sectionTitle = isRTL ? testimonialData.sectionTitleAr : testimonialData.sectionTitleEn;

  return (
    <section className="w-full py-14 md:py-20 bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-[var(--color-text)] px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {sectionTitle || t('customerTrust.title')}
        </motion.h2>

        {/* The New Component */}
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} isRTL={isRTL} />
      </div>
    </section>
  );
};

export default CustomerTrustSection;
