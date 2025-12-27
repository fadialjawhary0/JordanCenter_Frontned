import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useArticles } from '../../../hooks/useArticles';

const ArticlesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { articles, sectionSettings, loading } = useArticles();

  // Get section title based on language
  const getSectionTitle = () => {
    if (sectionSettings) {
      return isRTL ? sectionSettings.sectionTitleAr : sectionSettings.sectionTitleEn;
    }
    return t('articles.title');
  };

  // Get article title based on language
  const getArticleTitle = (article) => {
    return isRTL ? article.titleAr : article.titleEn;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Get image URL helper
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) return imageUrl;
    // Otherwise, prepend API base URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imageUrl}`;
  };

  // Handle article click
  const handleArticleClick = (article) => {
    if (article.link) {
      if (article.link.startsWith('http')) {
        window.open(article.link, '_blank');
      } else if (article.link.startsWith('#')) {
        window.location.hash = article.link.substring(1);
      } else {
        window.location.href = article.link;
      }
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 md:py-32 bg-[var(--color-bg)]">
        <div className="mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <section className="w-full py-20 md:py-32 bg-[var(--color-bg)]">
      <div className="mx-auto px-4 md:px-8">
        {/* Title */}
        {!loading && (
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8 md:mb-12 text-[var(--color-text)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {getSectionTitle()}
          </motion.h2>
        )}

        {/* Scrollable Cards Container */}
        <div className="relative">
          <div
            className="flex gap-6 overflow-x-auto pb-4 articles-scroll"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id || index}
                className="shrink-0 w-[300px] md:w-[350px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image Container */}
                <div 
                  className="relative mb-4 rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <img
                    src={getImageUrl(article.imageUrl)}
                    alt={getArticleTitle(article)}
                    className="w-full h-[200px] md:h-[240px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* + Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg">
                      <Plus size={24} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-2 line-clamp-2">
                  {getArticleTitle(article)}
                </h3>

                {/* Date */}
                <p className="text-sm md:text-base text-[var(--color-text-muted)]">
                  {formatDate(article.date)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;

