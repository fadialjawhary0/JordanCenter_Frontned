import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const SimilarProducts = ({ similarProducts, getImageUrl }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className={`text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {isRTL ? 'منتجات مشابهة' : 'Similar Products'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((similarProduct) => {
          const similarTitle = isRTL ? similarProduct.titleAr : similarProduct.titleEn;
          const similarDescription = isRTL ? similarProduct.descriptionAr : similarProduct.descriptionEn;
          const hasDiscount = similarProduct.oldPrice && parseFloat(similarProduct.oldPrice) > parseFloat(similarProduct.price);
          
          return (
            <motion.div
              key={similarProduct.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/products/${similarProduct.id}`)}
            >
              {/* Product Image */}
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={getImageUrl(similarProduct.imageUrl)}
                  alt={similarTitle}
                  className="w-full h-full object-cover"
                />
                {hasDiscount && (
                  <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold`}>
                    {isRTL ? 'خصم' : 'Sale'}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-[var(--color-text)] mb-2 line-clamp-2">
                  {similarTitle}
                </h3>
                {similarDescription && (
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                    {similarDescription}
                  </p>
                )}
                
                {/* Price */}
                <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xl font-bold text-[#020617]">
                    {parseFloat(similarProduct.price).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      {parseFloat(similarProduct.oldPrice).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
                    </span>
                  )}
                </div>
                
                {/* Order Button and Compare Icon */}
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button 
                    className="flex-1 px-4 py-2 bg-[#020617] text-white rounded-lg hover:bg-[#020617]/90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${similarProduct.id}`);
                    }}
                  >
                    {isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
                  </button>
                  <button 
                    className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-[#020617] transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement compare functionality
                    }}
                  >
                    <ArrowLeftRight size={18} className="text-[#020617]" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
