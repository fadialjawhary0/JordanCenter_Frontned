import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';

const ProductsSearchBar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  sortOrder,
  handleSortChange,
  handleSearch,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sort */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
            {isRTL ? 'ترتيب حسب' : 'Sort by'}
          </label>
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer pr-10"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="order-asc">{isRTL ? 'الترتيب الافتراضي' : 'Default Order'}</option>
              <option value="price-asc">{isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              <option value="name-asc">{isRTL ? 'الاسم: أ-ي' : 'Name: A-Z'}</option>
              <option value="name-desc">{isRTL ? 'الاسم: ي-أ' : 'Name: Z-A'}</option>
            </select>
            <ChevronDown className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 pointer-events-none`} size={20} />
          </div>
        </div>
        
        {/* Search */}
        <div className="flex-2">
          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
            {isRTL ? 'بحث' : 'Search'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={isRTL ? 'ادخل اسم للمنتج' : 'Enter product name'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[#020617] text-white rounded-lg hover:bg-[#020617]/90 transition-all flex items-center gap-2"
            >
              <Search size={20} />
              <span>{isRTL ? 'بحث' : 'Search'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSearchBar;
