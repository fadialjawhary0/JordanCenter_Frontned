import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductInfo = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!product) return null;

  const title = isRTL ? product.titleAr : product.titleEn;
  const description = isRTL ? product.descriptionAr : product.descriptionEn;
  const detailedDescription = isRTL ? product.detailedDescriptionAr : product.detailedDescriptionEn;
  const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

  return (
    <div className={`lg:col-span-2 space-y-6 ${isRTL ? 'lg:order-2' : ''}`}>
      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
        {title}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-[#020617]">
          {parseFloat(product.price).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
        </span>
        {hasDiscount && (
          <span className="text-xl text-gray-400 line-through">
            {parseFloat(product.oldPrice).toFixed(0)} {isRTL ? 'درهم' : 'AED'}
          </span>
        )}
      </div>

      {/* Key Details Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Availability */}
        <div className={`p-4 border-r border-gray-200 ${isRTL ? 'border-l border-r-0 last:border-l-0' : 'last:border-r-0'}`}>
          <p className={`text-xs text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'حالة التوفر:' : 'Availability:'}
          </p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.availability !== null && product.availability !== undefined
              ? (isRTL ? `عدد القطع: ${product.availability}` : `Quantity: ${product.availability}`)
              : (isRTL ? 'غير متوفر' : 'Not Available')}
          </p>
        </div>

        {/* Country */}
        <div className={`p-4 border-r border-gray-200 ${isRTL ? 'border-l border-r-0' : ''}`}>
          <p className={`text-xs text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'بلد المنشأ:' : 'Country of Origin:'}
          </p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.country
              ? (isRTL ? product.country.nameAr : product.country.nameEn)
              : (isRTL ? 'غير محدد' : 'Not Specified')}
          </p>
        </div>

        {/* Warranty */}
        <div className={`p-4 border-r border-gray-200 ${isRTL ? 'border-l border-r-0' : ''}`}>
          <p className={`text-xs text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'الضمان:' : 'Warranty:'}
          </p>
          <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
            {product.warranty || (isRTL ? 'غير محدد' : 'Not Specified')}
          </p>
        </div>

        {/* Brand */}
        <div className={`p-4 ${isRTL ? 'border-l border-gray-200' : ''}`}>
          <p className={`text-xs text-gray-500 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'العلامة التجارية:' : 'Brand:'}
          </p>
          {product.brandLogo ? (
            product.brandLogo.imageUrl ? (
              <div className={`${isRTL ? 'flex justify-end' : 'flex justify-start'}`}>
                <img
                  src={getImageUrl(product.brandLogo.imageUrl)}
                  alt={isRTL ? product.brandLogo.nameAr : product.brandLogo.nameEn}
                  className="h-8 object-contain max-w-full"
                />
              </div>
            ) : (
              <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? product.brandLogo.nameAr : product.brandLogo.nameEn}
              </p>
            )
          ) : (
            <p className={`text-sm font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'غير محدد' : 'Not Specified'}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'الوصف' : 'Description'}
          </h2>
          <p className={`text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {description}
          </p>
        </div>
      )}

      {/* Detailed Description */}
      {detailedDescription && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'التفاصيل' : 'Details'}
          </h2>
          <div 
            className={`text-[var(--color-text-muted)] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
            dangerouslySetInnerHTML={{ __html: detailedDescription }}
          />
        </div>
      )}

      {/* Technical Specifications */}
      {product.technicalSpecs && product.technicalSpecs.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold text-[var(--color-text)] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'المواصفات التقنية' : 'Technical Specifications'}
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.technicalSpecs.map((spec, index) => (
                  <tr key={spec.id || index} className={`border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className={`px-4 py-3 font-semibold text-[var(--color-text)] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? spec.titleAr : spec.titleEn}
                    </td>
                    <td className={`px-4 py-3 text-[var(--color-text-muted)] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? spec.valueAr : spec.valueEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
