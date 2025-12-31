import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, Moon, Sun, Menu, X } from 'lucide-react';
import Logo from '../../assets/Logo.svg';
import { NAVBAR_STYLES } from '../../constants/navbarStyles.const';
import { getNavbarSettings } from '../../queries/navbar.queries';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [navbarSettings, setNavbarSettings] = useState(null);
  const [logoUrl, setLogoUrl] = useState(Logo);
  const [navbarLinks, setNavbarLinks] = useState([]);

  // Determine if we're on a white background page (product details page only, not products listing)
  // Product details page: /products/:id (has white background)
  // Products listing page: /products (has hero image with dark background)
  const isWhiteBackgroundPage = /^\/products\/[^/]+$/.test(location.pathname);

  // Dynamic styles based on page background
  const navLinkClass = isWhiteBackgroundPage
    ? 'text-[#020617] no-underline font-medium text-[0.95rem] transition-colors duration-200 hover:text-[var(--color-brand)] whitespace-nowrap'
    : NAVBAR_STYLES.navLink;

  const iconButtonClass = isWhiteBackgroundPage
    ? 'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:scale-105 text-[#020617]'
    : NAVBAR_STYLES.iconButton;

  const contactButtonClass = isWhiteBackgroundPage
    ? 'relative bg-[#020617] text-white border-none px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-lg font-semibold text-xs md:text-sm lg:text-[0.95rem] cursor-pointer overflow-hidden whitespace-nowrap'
    : 'relative bg-[var(--color-text)] text-[var(--color-inverse)] border-none px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-lg font-semibold text-xs md:text-sm lg:text-[0.95rem] cursor-pointer overflow-hidden whitespace-nowrap';

  const hamburgerButtonClass = isWhiteBackgroundPage
    ? 'lg:hidden w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-300 text-[#020617]'
    : 'lg:hidden w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-border)]/50 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)]/80 text-white';

  const mobileMenuBorderClass = isWhiteBackgroundPage
    ? 'lg:hidden border-t border-gray-200 mt-2 pt-4 pb-4'
    : 'lg:hidden border-t border-white/20 mt-2 pt-4 pb-4';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const fetchNavbarSettings = async () => {
      try {
        const response = await getNavbarSettings();
        if (response?.data) {
          setNavbarSettings(response.data);
          // Set logo URL
          if (response.data.logoUrl) {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            setLogoUrl(`${apiUrl}${response.data.logoUrl}`);
          }
          // Set navbar links
          if (response.data.links && Array.isArray(response.data.links)) {
            setNavbarLinks(response.data.links.filter(link => link.isActive));
          }
        }
      } catch (error) {
        console.error('Error fetching navbar settings:', error);
        // Keep default logo and links if API fails
      }
    };

    fetchNavbarSettings();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <nav className={`${NAVBAR_STYLES.navbarBase} ${isRTL ? 'rtl' : ''}`}>
      <div className={`${NAVBAR_STYLES.navbarContainer} flex-wrap lg:flex-nowrap`}>
        {/* Left Section: Logo + Navigation Links */}
        <div className={`flex items-center gap-2 md:gap-4 lg:gap-8 min-w-0`}>
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={logoUrl} alt="Central Jordanian Logo" className="h-8 md:h-10 lg:h-[52px] w-auto cursor-pointer" />
          </Link>

          {/* Navigation Links - Hidden on mobile and tablet, shown on large screens */}
          <div className={`hidden lg:flex items-center gap-6 xl:gap-8 shrink-0`}>
            {navbarLinks.map(link => (
              <a key={link.id} href={link.link} className={navLinkClass}>
                {i18n.language === 'ar' ? link.textAr : link.textEn}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className={`flex items-center gap-1.5 md:gap-2 lg:gap-4 shrink-0`}>
          {/* Contact Us Button - Always visible */}
          <Link to="/contact">
            <motion.button
              className={contactButtonClass}
              onMouseEnter={() => setIsContactHovered(true)}
              onMouseLeave={() => setIsContactHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Arrow with circular background - travels left to right on hover */}
              <motion.div
                className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 md:w-7 md:h-7 ${
                  isWhiteBackgroundPage ? 'bg-white' : 'bg-[var(--color-inverse)]'
                } rounded-full flex items-center justify-center`}
                initial={false}
                animate={{
                  left: isContactHovered ? (isRTL ? '6px' : 'calc(100% - 34px)') : isRTL ? 'calc(100% - 34px)' : '6px',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className={`flex items-center ${isWhiteBackgroundPage ? 'text-[#020617]' : 'text-[var(--color-text)]'}`}>
                  <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 -ml-1.5 md:-ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>

              {/* Text - centered, shifts to make room for arrow */}
              <motion.span
                className="block text-center relative z-10 px-6 md:px-5 lg:px-6"
                animate={{
                  x: isContactHovered ? (isRTL ? '12px' : '-12px') : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {t('navbar.contactUs')}
              </motion.span>
            </motion.button>
          </Link>

          {/* Hamburger Menu - Mobile and tablet */}
          <button className={hamburgerButtonClass} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Language & Theme Toggles - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button className={iconButtonClass} onClick={toggleLanguage} aria-label="Toggle language">
              <Globe size={20} />
            </button>

            {/* Theme Toggle */}
            <button className={iconButtonClass} onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className={mobileMenuBorderClass}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`flex flex-col gap-4 px-8 ${isRTL ? 'items-end' : 'items-start'}`}>
            {/* Navigation Links */}
            {navbarLinks.length > 0 ? (
              navbarLinks.map(link => (
                <a key={link.id} href={link.link} className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {i18n.language === 'ar' ? link.textAr : link.textEn}
                </a>
              ))
            ) : (
              // Fallback to default links if no dynamic links are available
              <>
                <a href="products" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.products')}
                </a>
                <a href="projects" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.projects')}
                </a>
                <a href="services" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.services')}
                </a>
                <a href="#articles" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.articles')}
                </a>
                <a href="#about" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('navbar.aboutUs')}
                </a>
              </>
            )}

            {/* Language & Theme Toggles */}
            <div className={`flex items-center gap-4 mt-2`}>
              <button className={iconButtonClass} onClick={toggleLanguage} aria-label="Toggle language">
                <Globe size={20} />
              </button>
              <button className={iconButtonClass} onClick={toggleTheme} aria-label="Toggle theme">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
