import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTestimonial } from '../../../hooks/useTestimonial';
import customerTrustImage from '../../../assets/customer-trust.jpg';

const CustomerTrustSection = () => {
  const { t, i18n } = useTranslation();
  const { testimonialData, loading } = useTestimonial();
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const profilesContainerRef = useRef(null);
  const autoRotateIntervalRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // Get profiles from API or fallback
  const profiles = testimonialData?.profiles || [];
  const hasMoreThanFive = profiles.length > 5;
  const activeProfile = profiles[activeProfileIndex] || null;
  
  // Calculate visible range (show 5 at a time)
  const profileWidth = 64; // w-16 = 64px
  const gap = 24; // gap-6 = 24px (md:gap-6)
  const scrollAmount = profileWidth + gap; // Scroll by one profile width + gap
  
  // Get image URL helper
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${apiBaseUrl}${imageUrl}`;
  };

  // Get section title based on language
  const getSectionTitle = () => {
    if (!testimonialData) return t('customerTrust.title');
    return isRTL ? testimonialData.sectionTitleAr : testimonialData.sectionTitleEn;
  };

  // Get active profile's testimonial text
  const getActiveTestimonialText = () => {
    if (!activeProfile) return '';
    return isRTL ? (activeProfile.testimonialTextAr || '') : (activeProfile.testimonialTextEn || '');
  };

  // Get active profile's testimonial image
  const getActiveTestimonialImage = () => {
    if (activeProfile?.testimonialImageUrl) {
      return getImageUrl(activeProfile.testimonialImageUrl);
    }
    return customerTrustImage; // Fallback
  };

  // Auto-rotate profiles every 3 seconds
  useEffect(() => {
    if (profiles.length === 0 || isPaused) {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      return;
    }

    autoRotateIntervalRef.current = setInterval(() => {
      setActiveProfileIndex((prev) => (prev + 1) % profiles.length);
    }, 5000);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [profiles.length, isPaused]);

  // Scroll handlers for profiles - scroll by one profile at a time
  const scrollProfiles = (direction) => {
    if (!profilesContainerRef.current) return;
    const container = profilesContainerRef.current;
    
    const currentScroll = container.scrollLeft;
    // 'prev' scrolls backward, 'next' scrolls forward
    const newPosition = direction === 'next' 
      ? currentScroll + scrollAmount 
      : currentScroll - scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
    
    setTimeout(() => {
      setScrollPosition(container.scrollLeft);
    }, 100);
  };

  // Check scroll capabilities
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = profilesContainerRef.current && 
    scrollPosition < (profilesContainerRef.current.scrollWidth - profilesContainerRef.current.clientWidth - 1);

  // Handle profile click
  const handleProfileClick = (index) => {
    setActiveProfileIndex(index);
    setIsPaused(true); // Pause auto-rotation when user clicks
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

  if (!testimonialData || profiles.length === 0) {
    return null; // Don't show section if no testimonial data or profiles
  }

  return (
    <section 
      className="w-full py-14 md:py-20 bg-[var(--color-bg)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--color-text)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {getSectionTitle()}
        </motion.h2>

        {/* Testimonial Image - from active profile */}
        <motion.div
          className="mb-4 flex justify-center items-center relative"
          key={activeProfileIndex} // Key change triggers animation
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Glassy layer behind the image */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[15px] backdrop-blur-md "
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 1,
              }}
            />
            
            {/* Image with fade mask at bottom to reveal glassy layer behind */}
            <div className="relative" style={{ zIndex: 2 }}>
              <img
                src={getActiveTestimonialImage()}
                alt={activeProfile?.name || getSectionTitle()}
                className="w-[720px] h-[458px] rounded-t-2xl md:rounded-t-3xl object-cover relative"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
                }}
              />
              {/* Subtle shadow for depth */}
              <div 
                className="absolute bottom-[-2px] left-0 right-0 h-[12px] "
                style={{
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0%, transparent 100%)',
                  filter: 'blur(4px)',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonial Text - from active profile */}
        <motion.p
          className="text-lg md:text-xl lg:text-xl text-center text-text font-normal mb-8 max-w-[700px] mx-auto leading-relaxed"
          key={`text-${activeProfileIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {getActiveTestimonialText()}
        </motion.p>

        {/* Profile Pictures Row */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Wrapper to contain profiles and arrows - centered */}
          <div className="relative flex items-center justify-center">
            {/* Left arrow - fixed: scrolls to next profiles (was reversed) */}
            {hasMoreThanFive && (
              <button
                onClick={() => scrollProfiles('next')}
                disabled={!canScrollRight}
                className={`absolute ${isRTL ? 'right-full' : 'left-full'} ${isRTL ? 'mr-4' : 'ml-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all ${
                  canScrollRight ? 'opacity-100 hover:bg-white' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Outer container - clips to show exactly 5 profiles */}
            <div 
              className={`${hasMoreThanFive ? 'overflow-hidden' : ''}`}
              style={{
                width: hasMoreThanFive ? `${(profileWidth + gap) * 5 - gap}px` : 'auto',
              }}
            >
              {/* Profiles Container - Scrollable inner container */}
              <div
                ref={profilesContainerRef}
                className={`flex items-center gap-4 md:gap-6 p-2 scrollbar-hide ${
                  hasMoreThanFive 
                    ? 'overflow-x-auto' 
                    : 'justify-center'
                }`}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
                onScroll={(e) => {
                  setScrollPosition(e.target.scrollLeft);
                }}
              >
                {profiles.map((profile, index) => {
                  const isHovered = hoveredIndex === index;
                  const isActive = activeProfileIndex === index;
                  
                  // For LTR: only shift pictures to the RIGHT of hovered one (shift right)
                  // For RTL: only shift pictures to the LEFT of hovered one (shift left)
                  const shouldShift = hoveredIndex !== null && !isHovered && (
                    isRTL ? index < hoveredIndex : index > hoveredIndex
                  );

                  // Calculate shift distance based on hovered card width
                  const shiftDistance = 200; // Width of expanded card + gap

                  return (
                    <motion.div
                      key={profile.id || index}
                      className="relative flex items-center shrink-0"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => handleProfileClick(index)}
                      animate={{
                        x: shouldShift ? (isRTL ? -shiftDistance : shiftDistance) : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {/* Profile Picture - Fix circular shape */}
                      <div className="relative shrink-0">
                        <img
                          src={getImageUrl(profile.imageUrl)}
                          alt={profile.name}
                          className={`w-16 h-16 rounded-full object-cover border-2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                            isActive ? 'border-[var(--color-brand)] ring-2 ring-[var(--color-brand)] ring-offset-2' : 'border-white'
                          }`}
                          style={{
                            aspectRatio: '1 / 1',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            console.error('Failed to load profile image:', profile.imageUrl);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Expanded Info Card */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className={`absolute bg-white rounded-lg shadow-xl p-4 min-w-[200px] z-50 pointer-events-none ${
                              isRTL ? 'right-full mr-4' : 'left-full ml-4'
                            }`}
                            initial={{ opacity: 0, x: isRTL ? 10 : -10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: isRTL ? 10 : -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          >
                            <h3 className="font-semibold text-[var(--color-text)] text-base mb-1 whitespace-nowrap">
                              {profile.name}
                            </h3>
                            <p className="text-sm text-[var(--color-text-muted)] whitespace-nowrap">
                              {profile.role}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right arrow - fixed: scrolls to previous profiles (was reversed) */}
            {hasMoreThanFive && (
              <button
                onClick={() => scrollProfiles('prev')}
                disabled={!canScrollLeft}
                className={`absolute ${isRTL ? 'left-full' : 'right-full'} ${isRTL ? 'ml-4' : 'mr-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all ${
                  canScrollLeft ? 'opacity-100 hover:bg-white' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTrustSection;
