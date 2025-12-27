import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const ProjectsGrid = ({ projects }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Get API base URL for images
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${apiBaseUrl}${imageUrl}`;
  };

  // Get project title based on language
  const getProjectTitle = (project) => {
    return isRTL ? project.titleAr : project.titleEn;
  };

  // Dynamic grid layout based on number of projects
  const getGridLayout = (count) => {
    if (count === 2) {
      return 'grid-cols-1 md:grid-cols-2';
    } else if (count === 3) {
      return 'grid-cols-1 md:grid-cols-3';
    } else if (count === 4) {
      return 'grid-cols-1 md:grid-cols-3';
    } else if (count === 5) {
      return 'grid-cols-1 md:grid-cols-3';
    } else {
      // 6+ projects: 3 columns
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const gridClass = getGridLayout(projects.length);
  
  // Determine card span classes for special cases
  const getCardSpanClass = (index, total) => {
    // 4th project in 4-project layout: full width
    if (total === 4 && index === 3) {
      return 'md:col-span-3';
    }
    // 5th project in 5-project layout: takes 2 columns (rectangular)
    if (total === 5 && index === 4) {
      return 'md:col-span-2';
    }
    // 4th project in 5-project layout: takes 1 column (square)
    if (total === 5 && index === 3) {
      return 'md:col-span-1';
    }
    return '';
  };

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {projects.map((project, index) => {
        const title = getProjectTitle(project);
        const spanClass = getCardSpanClass(index, projects.length);

        return (
          <motion.div
            key={project.id}
            className={spanClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProjectCard project={project} title={title} getImageUrl={getImageUrl} isRTL={isRTL} />
          </motion.div>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project, title, getImageUrl, isRTL }) => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden group cursor-pointer">
      {/* Project Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={getImageUrl(project.imageUrl)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Dark Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
          <div className={`flex items-end justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Left Side - Supplied Products */}
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-white text-sm mb-1">
                {isRTL ? 'المنتجات الموردة:' : 'Supplied Products:'}
              </p>
              <p className="text-white text-2xl font-bold">
                {project.productsCount || 0} {isRTL ? 'منتج' : 'products'}
              </p>
            </div>

            {/* Right Side - Project Details */}
            <div className={`${isRTL ? 'text-right' : 'text-left'} flex-1 ${isRTL ? 'mr-4' : 'ml-4'}`}>
              {/* Project Title */}
              <h3 className="text-white text-xl font-bold mb-3 line-clamp-2">
                {title}
              </h3>

              {/* Location and Year (if available) */}
              <div className="space-y-2">
                {/* Location */}
                {project.locationEn || project.locationAr ? (
                  <div className={`flex items-center gap-2 text-white/90 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin size={16} className="flex-shrink-0" />
                    <span>{isRTL ? project.locationAr : project.locationEn}</span>
                  </div>
                ) : null}

                {/* Year */}
                {project.year ? (
                  <div className={`flex items-center gap-2 text-white/90 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar size={16} className="flex-shrink-0" />
                    <span>{project.year}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
