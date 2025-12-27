import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';

const ProductOrderForm = ({ product }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    phone: '',
    countryCode: '+971',
    email: '',
    message: '',
  });

  // Update item when product changes
  React.useEffect(() => {
    if (product) {
      setFormData(prev => ({ 
        ...prev, 
        item: isRTL ? product.titleAr : product.titleEn 
      }));
    }
  }, [product, isRTL]);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const { name, item, phone, countryCode, email, message } = formData;
    const fullPhone = `${countryCode}${phone}`;
    const businessWhatsAppNumber = '971501234567'; // Change this to your actual WhatsApp business number
    const whatsappMessage = encodeURIComponent(
      `Hello, I would like to order:\n\n` +
      `Product: ${item}\n` +
      `Name: ${name}\n` +
      `Phone: ${fullPhone}\n` +
      `Email: ${email}\n` +
      `Message: ${message || 'No additional message'}`
    );
    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!product) return null;

  return (
    <div className={`${isRTL ? 'lg:order-1' : ''}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#020617] rounded-full flex items-center justify-center">
            <Phone className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--color-text)]">
              {isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
            </h3>
            <p className={`text-sm text-[var(--color-text-muted)] ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL
                ? 'أضف المنتج إلى قائمة طلباتك وسنقوم بالتواصل معك خلال دقائق.'
                : 'Add the product to your requests list and we will contact you within minutes.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleWhatsAppOrder} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'الاسم' : 'Name'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#020617] focus:border-[#020617] transition-all"
              required
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'العنصر' : 'Item'}
            </label>
            <input
              type="text"
              value={formData.item}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-[var(--color-text)]"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'رقم الجوال' : 'Mobile Number'}
            </label>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#020617] focus:border-[#020617] transition-all"
              >
                <option value="+971">+971</option>
                <option value="+962">+962</option>
                <option value="+966">+966</option>
                <option value="+965">+965</option>
                <option value="+974">+974</option>
                <option value="+973">+973</option>
                <option value="+968">+968</option>
              </select>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#020617] focus:border-[#020617] transition-all"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'البريد' : 'Email'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#020617] focus:border-[#020617] transition-all"
              dir="ltr"
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold text-[var(--color-text)] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'رسالة' : 'Message'}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#020617] focus:border-[#020617] transition-all h-24 resize-none"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#020617] text-white rounded-xl hover:bg-[#020617]/90 transition-all font-semibold"
          >
            {isRTL ? 'اطلب المنتج الآن' : 'Order Product Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductOrderForm;
