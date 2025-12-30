import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeSettings } from '../queries/theme.queries';

export const useThemeSettings = () => {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const applyThemeSettings = async () => {
      try {
        const response = await getThemeSettings();
        if (response?.data) {
          const settings = response.data;
          const root = document.documentElement;

          // Apply brand colors
          if (settings.colorBrand) {
            root.style.setProperty('--color-brand', settings.colorBrand);
          }
          if (settings.colorBrandDark) {
            root.style.setProperty('--color-brand-dark', settings.colorBrandDark);
          }
          if (settings.colorAccent) {
            root.style.setProperty('--color-accent', settings.colorAccent);
          }
          if (settings.colorDestructive) {
            root.style.setProperty('--color-destructive', settings.colorDestructive);
          }
          if (settings.colorWarning) {
            root.style.setProperty('--color-warning', settings.colorWarning);
          }
          if (settings.colorInfo) {
            root.style.setProperty('--color-info', settings.colorInfo);
          }
          if (settings.colorRing) {
            root.style.setProperty('--color-ring', settings.colorRing);
          }

          // Store font families for later use
          if (settings.fontFamily) {
            root.setAttribute('data-font-en', settings.fontFamily);
            root.style.setProperty('--font-sans', `'${settings.fontFamily}', sans-serif`);
          }
          if (settings.fontFamilyAr) {
            root.setAttribute('data-font-ar', settings.fontFamilyAr);
          }
        }
      } catch (error) {
        console.error('Failed to load theme settings, using defaults:', error);
      } finally {
        setLoading(false);
      }
    };

    applyThemeSettings();
  }, []);

  // Update font when language changes
  useEffect(() => {
    const root = document.documentElement;
    const isRTL = i18n.language === 'ar';
    
    if (isRTL) {
      const fontAr = root.getAttribute('data-font-ar');
      if (fontAr) {
        root.style.setProperty('--font-sans', `'${fontAr}', sans-serif`);
      }
    } else {
      const fontEn = root.getAttribute('data-font-en');
      if (fontEn) {
        root.style.setProperty('--font-sans', `'${fontEn}', sans-serif`);
      }
    }
  }, [i18n.language]);

  return { loading };
};

