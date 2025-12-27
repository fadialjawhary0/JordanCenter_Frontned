import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useContactPage } from '../../hooks/useContactPage';
import ContactHero from '../../features/contact/components/ContactHero';
import ContactForm from '../../features/contact/components/ContactForm';
import ContactDetails from '../../features/contact/components/ContactDetails';
import FAQSection from '../../features/contact/components/FAQSection';

const ContactPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { settings, requestTypes, loading } = useContactPage();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text)]">Failed to load contact page</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      {/* Combined Hero and Dark Background Section */}
      <div className="relative w-full bg-[#0b1320]">
        {/* Hero Section with smooth gradient transition */}
        <section className="relative w-full">
          <ContactHero settings={settings} />
        </section>

        {/* Contact Form and Details Section - Overlapping smoothly */}
        <section className="relative w-full pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Combined form and info block - visually connected */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 items-start ${isRTL ? 'lg:grid-flow-row-dense' : ''}`}>
            {isRTL ? (
              <>
                <ContactForm requestTypes={requestTypes} />
                <ContactDetails settings={settings} />
              </>

            ) : (
              <>
                <ContactDetails settings={settings} />
                <ContactForm requestTypes={requestTypes} />
              </>

            )}
         
            </div>
          </div>
        </section>

        {/* Bottom Image Section - No spacing, directly below contact section */}
        {settings.bottomImageUrl && (
          <section className="relative w-full">
            <img
              src={settings.bottomImageUrl.startsWith('http') 
                ? settings.bottomImageUrl 
                : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${settings.bottomImageUrl}`}
              alt="Contact"
              className="w-full h-[550px] object-cover"
            />
          </section>
        )}
      </div>

      {/* FAQ Section - Below the last section/image */}
      <FAQSection />

    </div>
  );
};

export default ContactPage;
