import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import image from '../../assets/aboutHeroImage.png'
import bg from '../../assets/aboutHeroBg.png'

const translations = {
  ar: {
    aboutUs: 'عن شركتنا',
    mainTitle: 'فريق إيــــــــــــــما',
    subTitle: 'للاستشارات التكنولوجيه',
    description: 'هدفنا هو تحقيق أفضل النتائج التكنولوجيه لعملائنا عبر إستراتيجيات مدروسة'
  },
  en: {
    aboutUs: 'About Our Company',
    mainTitle: 'EIMA Team',
    subTitle: 'For Technology Consulting',
    description: 'Our goal is to achieve the best technological results for our clients through well-studied strategies'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: translations.ar },
      en: { translation: translations.en }
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

const AboutUsSection = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('ar');

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen bg-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>

      {/* Main Section with Background */}
      <div 
        className="relative h-fit w-full py-12 md:py-20 px-4 md:px-8 lg:px-16"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Optional Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Right Side - Text Content */}
            <div className={`${isArabic ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
              {/* About Us Label with ::after */}
              <div className="inline-block mb-6">
                <h3 
                  className="text-lg md:text-xl font-bold text-[#103B68] relative inline-block"
                  style={{
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui'
                  }}
                >
                  {t('aboutUs')}
                  <span 
                    className={`absolute top-1/2 -translate-y-1/2 w-16 md:w-20 h-1 bg-[#FAA617] ${isArabic ? 'right-full mr-3' : 'left-full ml-3'}`}
                  ></span>
                </h3>
              </div>

              {/* Main Title */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#103B68] mb-4 leading-tight"
                style={{
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui'
                }}
              >
                {t('mainTitle')}
              </h1>

              {/* Subtitle */}
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#103B68] mb-8 leading-tight"
                style={{
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui'
                }}
              >
                {t('subTitle')}
              </h2>

              {/* Description */}
              <p 
                className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl"
                style={{
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui'
                }}
              >
                {t('description')}
              </p>
            </div>

            {/* Left Side - Images */}
            <div className={`flex items-center justify-center lg:justify-start ${isArabic ? 'lg:order-2' : 'lg:order-1'}`}>
        
                {/* Image 1 - Back */}
                <div className="h-">
                  <div className="w-full h-full ">
                    <img 
                      src={image} 
                      alt="Tech consulting" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Yellow accent top */}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;