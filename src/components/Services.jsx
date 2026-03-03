import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Bg from '../assets/servicesBg.png'
import inshaey from '../assets/inshaey.svg'
import marketing from '../assets/marketing.svg'
import tarakhis from '../assets/tarakhis.svg'
import web from '../assets/web.svg'

const ICON_MAP = [web, marketing, inshaey, tarakhis];

const DEFAULT_SERVICES = [
  {
    titleAr: 'تطوير المواقع والتطبيقات',
    titleEn: 'Website & App Development',
    shortDescAr: 'أفضل الحلول والعروض المتاحة لتصميم مواقع إلكترونية مميزة',
    shortDescEn: 'Best solutions and offers available for designing exceptional websites',
  },
  {
    titleAr: 'الدعاية والإعلان والتسويق الإلكتروني',
    titleEn: 'Advertising & Digital Marketing',
    shortDescAr: 'إدارة الحملات الإعلانية والتسويق عبر وسائل التواصل الاجتماعي وتصميم الهوية البصرية',
    shortDescEn: 'Managing advertising campaigns, social media marketing, and visual identity design',
  },
  {
    titleAr: 'التصميم المعماري والإنشائي',
    titleEn: 'Architectural & Structural Design',
    shortDescAr: 'تصميم معماري مبتكر وحلول إنشائية متكاملة للمشاريع السكنية والتجارية',
    shortDescEn: 'Innovative architectural design and integrated structural solutions for residential and commercial projects',
  },
  {
    titleAr: 'قسم الرخص',
    titleEn: 'Licensing Department',
    shortDescAr: 'توفير جميع خدمات الرخص التي تحتاجها المنشآت والشركات',
    shortDescEn: 'Providing all licensing services needed by establishments and companies',
  },
];

const ServicesCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? 'ar' : 'en';

  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'servicesPage', 'content'), (snap) => {
      if (snap.exists() && snap.data().services?.length > 0) {
        setServices(snap.data().services);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-5xl font-bold text-primary">
            {currentLanguage === 'ar' ? 'خدمـاتنا' : 'Our Services'}
          </h1>
          <div className="w-16 h-16 bg-screens rounded-full flex items-center justify-center opacity-50">
            <div className="w-12 h-12 bg-screens rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.slice(0, 4).map((service, index) => (
          <div
            key={service.id || index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`
              rounded-[40px] p-8
              transition-all duration-300 ease-in-out
              cursor-pointer
              ${hoveredCard === index
                ? 'bg-[#93CAFF] border-0 shadow-2xl scale-105 -translate-y-2'
                : 'bg-white'}
            `}
          >
            <div className="flex items-center justify-start flex-row-reverse max-md:flex-col-reverse gap-3">
              {/* Text Content */}
              <div className="flex-1" style={{ textAlign: currentLanguage === 'ar' ? 'right' : 'left' }}>
                <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${hoveredCard === index ? 'text-white' : 'text-gray-800'}`}>
                  {currentLanguage === 'ar' ? service.titleAr : service.titleEn}
                </h2>
                <p className={`text-base leading-relaxed transition-colors duration-300 ${hoveredCard === index ? 'text-white' : 'text-gray-600'}`}>
                  {currentLanguage === 'ar' ? service.shortDescAr : service.shortDescEn}
                </p>
              </div>

              {/* Icon */}
              <div className="rounded-full p-6 flex items-center justify-center">
                <img
                  src={ICON_MAP[index] || ICON_MAP[0]}
                  alt={currentLanguage === 'ar' ? service.titleAr : service.titleEn}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCards;