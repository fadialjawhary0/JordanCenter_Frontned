import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ProductMediaSection = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const videoRef = useRef(null);

  // Auto-play video when product loads or changes
  useEffect(() => {
    if (videoRef.current && product?.mediaType === 'video') {
      videoRef.current.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [product]);

  if (!product?.mediaUrl || !product?.mediaType) return null;

  const title = isRTL ? product.titleAr : product.titleEn;

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8">
      {product.mediaType === 'video' ? (
        <video
          ref={videoRef}
          src={getImageUrl(product.mediaUrl)}
          autoPlay
          loop
          muted
          playsInline
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
              } else {
                videoRef.current.pause();
              }
            }
          }}
          className="w-full h-[520px] object-cover cursor-pointer product-video"
          style={{
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {isRTL ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support the video tag.'}
        </video>
      ) : (
        <img
          src={getImageUrl(product.mediaUrl)}
          alt={title}
          className="w-full h-[520px] object-cover"
        />
      )}
    </div>
  );
};

export default ProductMediaSection;
