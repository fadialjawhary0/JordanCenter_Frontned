import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const ProductsFilters = ({
  filterOptions,
  expandedFilters,
  toggleFilter,
  priceRange,
  setPriceRange,
  selectedProductTypes,
  selectedBrands,
  selectedColors,
  selectedCountries,
  selectedYears,
  handleProductTypeToggle,
  handleBrandToggle,
  handleColorToggle,
  handleCountryToggle,
  handleYearToggle,
  resetFilters,
  getFilterCount,
  getImageUrl,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <aside className={`w-full lg:w-1/3 ${isRTL ? 'lg:order-1' : ''}`}>
      <div className="lg:sticky lg:top-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">
            {isRTL ? 'الفلاتر' : 'Filters'}
          </h2>
          
          {/* Price Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('price')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <h3 className="font-semibold text-[var(--color-text)]">
                {isRTL ? 'السعر' : 'Price'}
              </h3>
              {expandedFilters.price ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.price && (
              <div className="mt-4 space-y-3">
                {filterOptions?.priceRange ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange.min || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseFloat(e.target.value) || 0 }))}
                      placeholder={isRTL ? 'من' : 'Min'}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <input
                      type="number"
                      value={priceRange.max || ''}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseFloat(e.target.value) || 0 }))}
                      placeholder={isRTL ? 'إلى' : 'Max'}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Product Type Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('productType')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {isRTL ? 'نوع المنتج' : 'Product Type'}
                </h3>
                {getFilterCount('productType') > 0 && (
                  <span className="bg-[#020617] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFilterCount('productType')}
                  </span>
                )}
              </div>
              {expandedFilters.productType ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.productType && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {filterOptions?.productTypes && filterOptions.productTypes.length > 0 ? (
                  filterOptions.productTypes.map((type) => (
                    <label key={type.id} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-all">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(type.id)}
                          onChange={() => handleProductTypeToggle(type.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-[var(--color-text)]">
                          {isRTL ? type.nameAr : type.nameEn}
                        </span>
                      </div>
                      {type.productCount > 0 && (
                        <span className="text-xs text-[var(--color-text-muted)] bg-gray-100 px-2 py-1 rounded">
                          {type.productCount}
                        </span>
                      )}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Brand Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('brand')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {isRTL ? 'العلامة التجارية' : 'Brand'}
                </h3>
                {getFilterCount('brand') > 0 && (
                  <span className="bg-[#020617] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFilterCount('brand')}
                  </span>
                )}
              </div>
              {expandedFilters.brand ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.brand && (
              <div className="mt-4">
                {filterOptions?.brands && filterOptions.brands.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                    {filterOptions.brands.map((brand) => (
                      <div
                        key={brand.id}
                        onClick={() => handleBrandToggle(brand.id)}
                        className={`cursor-pointer p-2 border-2 rounded-lg transition-all ${
                          selectedBrands.includes(brand.id)
                            ? 'border-[var(--color-brand)] bg-[var(--color-brand)]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {brand.imageUrl ? (
                          <img
                            src={getImageUrl(brand.imageUrl)}
                            alt={isRTL ? brand.nameAr : brand.nameEn}
                            className="w-full h-auto rounded"
                          />
                        ) : (
                          <span className="text-xs text-center block">
                            {isRTL ? brand.nameAr : brand.nameEn}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Color Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('color')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {isRTL ? 'اللون' : 'Color'}
                </h3>
                {getFilterCount('color') > 0 && (
                  <span className="bg-[#020617] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFilterCount('color')}
                  </span>
                )}
              </div>
              {expandedFilters.color ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.color && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {filterOptions?.colors && filterOptions.colors.length > 0 ? (
                  filterOptions.colors.map((color) => {
                    const colorName = (isRTL ? color.nameAr : color.nameEn) || '';
                    const displayName = colorName.replace(/^Color\s*/i, '').replace(/^لون\s*/i, '') || colorName;
                    const hexCode = color.hexCode || '#000000';
                    
                    return (
                      <label key={color.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-all">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color.id)}
                          onChange={() => handleColorToggle(color.id)}
                          className="w-4 h-4"
                        />
                        <div 
                          className="w-6 h-6 rounded border border-gray-300 flex-shrink-0"
                          style={{ backgroundColor: hexCode }}
                          title={hexCode}
                        />
                        <span className="text-sm text-[var(--color-text)] flex-1">
                          {displayName}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Country Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('country')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {isRTL ? 'البلد الصنع' : 'Country'}
                </h3>
                {getFilterCount('country') > 0 && (
                  <span className="bg-[#020617] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFilterCount('country')}
                  </span>
                )}
              </div>
              {expandedFilters.country ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.country && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {filterOptions?.countries && filterOptions.countries.length > 0 ? (
                  filterOptions.countries.map((country) => (
                    <label key={country.id} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-all">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedCountries.includes(country.id)}
                          onChange={() => handleCountryToggle(country.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-[var(--color-text)]">
                          {isRTL ? country.nameAr : country.nameEn}
                        </span>
                      </div>
                      {country.productCount > 0 && (
                        <span className="text-xs text-[var(--color-text-muted)] bg-gray-100 px-2 py-1 rounded">
                          {country.productCount}
                        </span>
                      )}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Year Filter Accordion */}
          <div className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFilter('year')}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {isRTL ? 'السنة' : 'Year'}
                </h3>
                {getFilterCount('year') > 0 && (
                  <span className="bg-[#020617] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getFilterCount('year')}
                  </span>
                )}
              </div>
              {expandedFilters.year ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedFilters.year && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {filterOptions?.years && filterOptions.years.length > 0 ? (
                  filterOptions.years.map((year) => (
                    <label key={year.id} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-all">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedYears.includes(year.id)}
                          onChange={() => handleYearToggle(year.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-[var(--color-text)]">
                          {year.year}
                        </span>
                      </div>
                      {year.productCount > 0 && (
                        <span className="text-xs text-[var(--color-text-muted)] bg-gray-100 px-2 py-1 rounded">
                          {year.productCount}
                        </span>
                      )}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {isRTL ? 'لا توجد خيارات متاحة' : 'No options available'}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[var(--color-text)] rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>{isRTL ? 'إعادة تعيين' : 'Reset Filters'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductsFilters;
