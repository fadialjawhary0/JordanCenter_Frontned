import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const ProductsGrid = ({ products, loading, getImageUrl }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--color-text-muted)] text-lg">
          {isRTL ? 'لا توجد منتجات' : 'No products found'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map((product) => {
        const title = isRTL ? product.titleAr : product.titleEn;
        const description = isRTL ? product.descriptionAr : product.descriptionEn;
        const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);
        
        return (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {/* Product Image */}
            <div className="relative w-full h-48 bg-gray-100">
              <img
                src={getImageUrl(product.imageUrl)}
                alt={title}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {isRTL ? 'خصم' : 'Sale'}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-bold text-[var(--color-text)] mb-2 line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                  {description}
                </p>
              )}
              
              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-[#020617]">
                  {parseFloat(product.price).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {parseFloat(product.oldPrice).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
                  </span>
                )}
              </div>
              
              {/* Order Button and Compare Icon */}
              <div className="flex items-center gap-2">
                <button className="flex-1 px-4 py-2 bg-[#020617] text-white rounded-lg hover:bg-[#020617]/90 transition-all">
                  {isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
                </button>
                <button className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-[#020617] transition-all">
                  <ArrowLeftRight size={18} className="text-[#020617]" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
