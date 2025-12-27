import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductImageGallery = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!product) return null;

  const renderImageGallery = () => {
    // Use imageUrls if available, otherwise fallback to single imageUrl
    const images = (product?.imageUrls && product.imageUrls.length > 0) 
      ? product.imageUrls 
      : (product?.imageUrl ? [product.imageUrl] : []);
    
    if (images.length === 0) {
      return null;
    }
    const displayImages = showAllImages ? images : images.slice(0, 4);

    // 1 image: full width
    if (images.length === 1) {
      return (
        <div className="w-full">
          <img
            src={getImageUrl(images[0])}
            alt={isRTL ? product.titleAr : product.titleEn}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>
      );
    }

    // 2 images: side by side
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={getImageUrl(img)}
              alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 1}`}
              className="w-full h-[500px] object-cover rounded-xl cursor-pointer"
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
      );
    }

    // 3 images: first takes 2/3, other two stack in 1/3
    if (images.length === 3) {
      return (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <img
              src={getImageUrl(images[0])}
              alt={`${isRTL ? product.titleAr : product.titleEn} - 1`}
              className="w-full h-[500px] object-cover rounded-xl cursor-pointer"
              onClick={() => setSelectedImageIndex(0)}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            {images.slice(1, 3).map((img, idx) => (
              <img
                key={idx + 1}
                src={getImageUrl(img)}
                alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 2}`}
                className="w-full h-[242px] object-cover rounded-xl cursor-pointer"
                onClick={() => setSelectedImageIndex(idx + 1)}
              />
            ))}
          </div>
        </div>
      );
    }

    // 4+ images: 2x2 grid
    return (
      <div>
        <div className="grid grid-cols-2 gap-4">
          {displayImages.map((img, idx) => (
            <img
              key={idx}
              src={getImageUrl(img)}
              alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 1}`}
              className="w-full h-[242px] object-cover rounded-xl cursor-pointer"
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
        {images.length > 4 && !showAllImages && (
          <button
            onClick={() => setShowAllImages(true)}
            className="mt-4 w-full px-6 py-3 bg-[#020617] text-white rounded-xl hover:bg-[#020617]/90 transition-all font-semibold"
          >
            {isRTL ? 'عرض كل الصور' : 'Show All Pictures'}
          </button>
        )}
        {showAllImages && images.length > 4 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(4).map((img, idx) => (
              <img
                key={idx + 4}
                src={getImageUrl(img)}
                alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 5}`}
                className="w-full h-[200px] object-cover rounded-xl cursor-pointer"
                onClick={() => setSelectedImageIndex(idx + 4)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8">
      {renderImageGallery()}
    </div>
  );
};

export default ProductImageGallery;
