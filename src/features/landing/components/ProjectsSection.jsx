import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useProjectsSection } from '../../../hooks/useProjectsSection';

const ProjectsSection = ({ hideTitle = false, projectsPage = false }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { projectsData, loading } = useProjectsSection();

  // Get API base URL for images
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${apiBaseUrl}${imageUrl}`;
  };

  // Get section title based on language
  const getSectionTitle = () => {
    if (projectsData) {
      return isRTL ? projectsData.sectionTitleAr : projectsData.sectionTitleEn;
    }
    return t('projects.title');
  };

  // Get project title based on language
  const getProjectTitle = (project) => {
    return isRTL ? project.titleAr : project.titleEn;
  };

  // Get button text based on language
  const getButtonText = (project) => {
    if (project.buttonTextEn || project.buttonTextAr) {
      return isRTL ? (project.buttonTextAr || project.buttonTextEn) : (project.buttonTextEn || project.buttonTextAr);
    }
    return t('projects.viewDetails');
  };

  // Get CTA button text based on language
  const getCtaButtonText = () => {
    if (projectsData) {
      return isRTL ? (projectsData.ctaButtonTextAr || projectsData.ctaButtonTextEn) : (projectsData.ctaButtonTextEn || projectsData.ctaButtonTextAr);
    }
    return t('projects.viewMore');
  };

  // Use API data if available, otherwise use fallback
  const projects = projectsData?.projects || [];

  if (loading) {
    return (
      <section className="w-full bg-[#020617] py-20">
        <div className="text-center text-white">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null; // Don't show section if no projects
  }

  return (
    <section className="w-full bg-[#020617]">
      {/* Title */}
      {!loading && !hideTitle && (
        <div className="py-20 md:py-32">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {getSectionTitle()}
          </motion.h2>
        </div>
      )}

      <div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            // Wrapper must be TALLER than the viewport so the sticky child has room to stick
            className={index === projects.length - 1 ? 'h-[100vh]' : 'h-[200vh]'}
            style={{ marginTop: index === 0 ? '0' : '-100vh', padding: projectsPage ? '0 16px' : '0'}}
          >
            {/* This is the sticky thing that pauses at the top */}
            <div 
              className="sticky top-0 h-screen w-full"
              style={{ zIndex: 50 + index }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-b-[48px]">
                {/* Background image */}
                <img
                  src={getImageUrl(project.imageUrl)}
                  alt={getProjectTitle(project)}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: projectsPage ? '12px' : '0' }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="bg-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl mx-4 text-center"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Logos */}
                    {project.logos && project.logos.length > 0 && (
                      <div className="flex items-center justify-center gap-6 mb-6">
                        {project.logos.map((logo, logoIndex) => (
                          <React.Fragment key={logo.id}>
                            <img 
                              src={getImageUrl(logo.imageUrl)} 
                              alt={`Logo ${logoIndex + 1}`} 
                              className="h-8 md:h-10 w-auto object-contain" 
                            />
                            {logoIndex < project.logos.length - 1 && (
                              <div className="w-px h-8 md:h-10 bg-white/30" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                      {getProjectTitle(project)}
                    </h3>

                    {/* Supplied products */}
                    <p className="text-white/80 text-base md:text-lg mb-6">
                      {t('projects.suppliedProducts')}{' '}
                      <span className="font-semibold text-white">
                        {project.productsCount} {t('projects.products')}
                      </span>
                    </p>

                    {/* Button */}
                    <motion.button
                      className="group bg-white text-[#020617] px-8 py-3 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 mx-auto hover:bg-gray-100 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (project.buttonLink) {
                          window.location.href = project.buttonLink;
                        }
                      }}
                    >
                      {getButtonText(project)}
                      <ChevronRight
                        size={20}
                        className={`group-hover:translate-x-1 transition-transform duration-200 ${isRTL ? 'rotate-180' : ''}`}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      {projectsData && (
        <div className={`flex justify-center ${hideTitle ? 'pt-12 pb-20' : 'py-20'}`}>
          <motion.button
            className="group bg-white text-[#020617] px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-3 hover:bg-gray-100 transition-colors duration-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (projectsData.ctaButtonLink) {
                window.location.href = projectsData.ctaButtonLink;
              }
            }}
          >
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
              <ChevronRight size={20} className={isRTL ? 'mr-3 rotate-180' : '-ml-3'} />
            </div>
            {getCtaButtonText()}
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
