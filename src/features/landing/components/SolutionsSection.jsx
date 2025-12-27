import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, ChevronRight } from "lucide-react";
import { useSolutions } from "../../../hooks/useSolutions";

const SolutionsSection = () => {
  const { t, i18n } = useTranslation();
  const { solutions, sectionSettings, loading } = useSolutions();
  const [activeId, setActiveId] = useState(null); // All cards collapsed by default

  const handleCardClick = (cardId) => {
    // Toggle: if already active, collapse it; otherwise expand it
    setActiveId(activeId === cardId ? null : cardId);
  };

  // Get image URL helper
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  // Get title based on language
  const getTitle = (solution) => {
    return i18n.language === 'ar' ? solution.titleAr : solution.titleEn;
  };

  // Get description based on language
  const getDescription = (solution) => {
    return i18n.language === 'ar' ? solution.descriptionAr : solution.descriptionEn;
  };

  // Get section title based on language
  const getSectionTitle = () => {
    if (!sectionSettings) return t("solutions.title");
    return i18n.language === 'ar' ? sectionSettings.sectionTitleAr : sectionSettings.sectionTitleEn;
  };

  // Parse tags helper
  const parseTags = (tags) => {
    if (!tags) return [];
    if (typeof tags === 'string') {
      try {
        return JSON.parse(tags);
      } catch {
        return [];
      }
    }
    return Array.isArray(tags) ? tags : [];
  };

  // Convert Tailwind height class to pixel value
  const getHeightValue = (heightClass) => {
    if (!heightClass) return '632px';
    // Extract pixel value from classes like "h-[532px]" or "h-[632px]"
    const match = heightClass.match(/\[(\d+)px\]/);
    return match ? `${match[1]}px` : '632px';
  };

  if (loading) {
    return (
      <section className="w-full py-24 bg-[#020617]">
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-24 bg-[#020617]">
      <div className="px-4 md:px-8">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-white mb-16">
          {getSectionTitle()}
        </h2>

        {/* Cards Row - Full Width */}
        <div className="flex gap-6 w-full">
          {solutions.map((solution) => {
            const isActive = solution.id === activeId;
            const imageUrl = getImageUrl(solution.imageUrl);
            const tags = parseTags(solution.tags);

            return (
              <button
                key={solution.id}
                type="button"
                onClick={() => handleCardClick(solution.id)}
                className={`
                  group flex flex-col items-center shrink-0 
                  transition-all duration-500 ease-out
                  ${isActive ? "flex-[2]" : "flex-1"}
                  min-w-0
                `}
              >
                {/* Image card */}
                <div
                  className="relative w-full rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.35)] cursor-pointer"
                  style={{
                    height: getHeightValue(solution.height)
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={getTitle(solution)}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer pointer-events-auto"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Expanded content - shown when card is active */}
                  {isActive && (
                    <>
                      {/* Show more button - Top Center */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/85 text-white text-sm backdrop-blur-sm">
                          {t("solutions.showMoreDetails")}
                          <ChevronRight size={16} />
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                        <h3 className="text-2xl font-semibold mb-3">
                          {getTitle(solution)}
                        </h3>
                        {getDescription(solution) && (
                          <p className="text-sm text-white/85 mb-4 max-w-xl">
                            {getDescription(solution)}
                          </p>
                        )}
                        {(tags.length > 0 || solution.extraCount) && (
                          <div className="flex flex-wrap gap-2 text-xs">
                            {tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                              >
                                {i18n.language === 'ar' ? tag.textAr : tag.textEn}
                              </span>
                            ))}
                            {solution.extraCount && (
                              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                                +{solution.extraCount}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Text + plus UNDER image (for all cards) */}
                <div className="mt-6 text-center text-white">
                  <p className="text-xl leading-snug max-w-[200px]">
                    {getTitle(solution)}
                  </p>
                  <div className="mt-4 w-10 h-10 mx-auto rounded-full border border-white flex items-center justify-center group-hover:bg-white transition-colors duration-200 cursor-pointer">
                    <Plus size={18} className="text-white group-hover:text-[#020617] transition-colors duration-200 cursor-pointer" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
