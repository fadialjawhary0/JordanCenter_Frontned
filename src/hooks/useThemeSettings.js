import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getThemeSettings } from '../queries/theme.queries';

export const useThemeSettings = () => {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  // Function to apply the correct font based on current language
  const applyFontBasedOnLanguage = () => {
    const root = document.documentElement;
    const body = document.body;
    const isRTL = i18n.language === 'ar';

    if (isRTL) {
      const fontAr = root.getAttribute('data-font-ar');
      if (fontAr) {
        root.style.setProperty('--font-sans', `'${fontAr}', sans-serif`);
        // Also update body font directly and add class
        body.style.fontFamily = `'${fontAr}', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      } else {
        // Fallback to default Arabic font
        root.style.setProperty('--font-sans', `'Cairo', sans-serif`);
        body.style.fontFamily = `'Cairo', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      }
    } else {
      const fontEn = root.getAttribute('data-font-en');
      if (fontEn) {
        root.style.setProperty('--font-sans', `'${fontEn}', sans-serif`);
        // Also update body font directly and add class
        body.style.fontFamily = `'${fontEn}', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      } else {
        // Fallback to default English font
        root.style.setProperty('--font-sans', `'Inter', sans-serif`);
        body.style.fontFamily = `'Inter', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      }
    }
  };

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

          // Store font families for later use (don't apply immediately)
          if (settings.fontFamily) {
            root.setAttribute('data-font-en', settings.fontFamily);
          }
          if (settings.fontFamilyAr) {
            root.setAttribute('data-font-ar', settings.fontFamilyAr);
          }

          // Apply the correct font based on current language after settings are loaded
          applyFontBasedOnLanguage();
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
    // Apply font whenever language changes, checking if settings are loaded
    const root = document.documentElement;
    const hasFontEn = root.hasAttribute('data-font-en');
    const hasFontAr = root.hasAttribute('data-font-ar');

    // If settings are loaded, apply font based on language
    if (hasFontEn || hasFontAr) {
      applyFontBasedOnLanguage();
    } else {
      // If settings not loaded yet, apply default fonts based on language
      const body = document.body;
      const isRTL = i18n.language === 'ar';

      if (isRTL) {
        root.style.setProperty('--font-sans', `'Cairo', sans-serif`);
        body.style.fontFamily = `'Cairo', sans-serif`;
        body.classList.add('ar-font');
        body.classList.remove('en-font');
      } else {
        root.style.setProperty('--font-sans', `'Inter', sans-serif`);
        body.style.fontFamily = `'Inter', sans-serif`;
        body.classList.add('en-font');
        body.classList.remove('ar-font');
      }
    }
  }, [i18n.language]);

  return { loading };
};
