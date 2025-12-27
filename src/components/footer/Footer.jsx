import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [email, setEmail] = useState('');

  const socialIcons = [
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'Facebook', icon: Facebook },
    { name: 'Instagram', icon: Instagram },
    { name: 'YouTube', icon: Youtube },
    { name: 'Snapchat', icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.15c-.012.75-.024 1.486-.011 2.254.016 1.17.032 2.38.032 3.618 0 2.794-.103 4.852-.268 6.196-.127 1.044-.27 1.736-.49 2.24-.28.64-.65 1.216-1.17 1.752-.56.58-1.29 1.017-2.21 1.405-.99.41-2.25.699-3.75.852-1.5.15-3.21.19-4.97.19-1.76 0-3.47-.04-4.97-.19-1.5-.153-2.76-.442-3.75-.852-.92-.388-1.65-.825-2.21-1.405-.52-.536-.89-1.112-1.17-1.752-.22-.504-.363-1.196-.49-2.24-.165-1.344-.268-3.402-.268-6.196 0-1.238.016-2.448.032-3.618.013-.768.001-1.504-.011-2.254l-.003-.15c-.104-1.628-.23-3.654.299-4.847C3.347 1.069 6.704.793 7.694.793h4.512z"/>
      </svg>
    )},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#020617] text-gray-300">
      {/* Top Section - Columns */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 ${
          isRTL ? 'text-right' : 'text-left'
        }`}>
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.products')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.articles')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('footer.categories')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.handTools')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.electricalEquipment')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.personalProtectiveEquipment')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.buildingMaterials')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.heavyMachinery')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.maintenanceAccessories')}
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('footer.ourServices')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.generalContracting')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.infrastructureProjects')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.factoryConstruction')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.decorationAndFinishing')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.energyProjects')}
                </a>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('footer.more')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.contactUs')}
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-white transition-colors">
                  {t('footer.termsAndConditions')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 ${
            isRTL ? 'lg:flex-row-reverse' : ''
          }`}>
            {/* Follow Us On - Left */}
            <div className={`flex flex-col gap-4 ${isRTL ? 'items-end lg:items-start' : 'items-start'}`}>
              <h4 className="text-white font-semibold">
                {t('footer.followUsOn')}
              </h4>
              <div className="flex gap-3">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-[#1e293b] hover:bg-[#334155] rounded-full flex items-center justify-center transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Subscribe to Newsletter - Right */}
            <div className={`flex-1 max-w-md w-full ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h4 className="text-white font-semibold mb-4">
                {t('footer.subscribeToNewsletter')}
              </h4>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1e293b] text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-[#020617] px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                  <ChevronRight size={16} className={`-ml-3 ${isRTL ? 'rotate-180' : ''}`} />
                  {t('footer.send')}
                </button>
              </form>
            </div>
          </div>

          {/* Copyright - Bottom Center */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

