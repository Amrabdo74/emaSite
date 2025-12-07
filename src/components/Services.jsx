import React, { useState } from 'react';
import Bg from '../assets/servicesBg.png'
import inshaey from '../assets/inshaey.svg'
import marketing from '../assets/marketing.svg'
import tarakhis from '../assets/tarakhis.svg'
import web from '../assets/web.svg'
import { useTranslation } from 'react-i18next';

const ServicesCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 2,
      titleAr: "تطوير المواقع والتطبيقات",
      titleEn: "Website & App Development",
      descriptionAr: "أفضل الحلول والعروض المتاحة لتصميم مواقع إلكترونية مميزة",
      descriptionEn: "Best solutions and offers available for designing exceptional websites",
      imageSrc: web, // سيتم إضافة الصورة هنا
    },
    {
      id: 4,
      titleAr: "الدعاية والإعلان والتسويق الإلكتروني",
      titleEn: "Advertising & Digital Marketing",
      descriptionAr: "إدارة الحملات الإعلانية والتسويق عبر وسائل التواصل الاجتماعي وتصميم الهوية البصرية",
      descriptionEn: "Managing advertising campaigns, social media marketing, and visual identity design",
      imageSrc: marketing, // سيتم إضافة الصورة هنا
    },
    {
      id: 1,
      titleAr: "التصميم المعماري والإنشائي",
      titleEn: "Architectural & Structural Design",
      descriptionAr: "تصميم معماري مبتكر وحلول إنشائية متكاملة للمشاريع السكنية والتجارية",
      descriptionEn: "Innovative architectural design and integrated structural solutions for residential and commercial projects",
      imageSrc: inshaey // سيتم إضافة الصورة هنا
    },
    {
      id: 3,
      titleAr: "قسم الرخص",
      titleEn: "Licensing Department",
      descriptionAr: "توفير جميع خدمات الرخص التي تحتاجها المنشآت والشركات مثل إصدار رخصة البلدية ومشاهدة السلامة إصدار كارت تشغيل المركبات",
      descriptionEn: "Providing all licensing services needed by establishments and companies such as municipal licenses, safety certificates, and vehicle operation cards",
      imageSrc: tarakhis, // سيتم إضافة الصورة هنا
    }
  ];

  // يمكنك تغيير اللغة من هنا
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? "ar" : "en";
  return (
    <div 
      className="min-h-screen p-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      style={{
        
        backgroundImage: `url(${Bg})`
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <h1 className="text-5xl font-bold text-primary">
            {currentLanguage === "ar" ? "خدمـــــــــاتنا" : "Our Services"}
          </h1>
          <div className="w-16 h-16 bg-screens rounded-full flex items-center justify-center opacity-50">
            <div className="w-12 h-12 bg-screens rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`
              rounded-[40px] p-8 
              transition-all duration-300 ease-in-out
              cursor-pointer
              ${hoveredCard === service.id 
                ? 'bg-[#93CAFF] border-0 shadow-2xl scale-105 -translate-y-2' 
                : 'bg-white'
              }
            `}
            
          >
            <div className="flex items-center justify-start flex-row-reverse max-md:flex-col-reverse gap-3">
              {/* Text Content */}
              <div className="flex-1" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
                <h2 className={`
                  text-xl font-semibold mb-4
                  transition-colors duration-300
                  ${hoveredCard === service.id ? 'text-white' : 'text-gray-800'}
                `}>
                  {currentLanguage === "ar" ? service.titleAr : service.titleEn}
                </h2>
                <p className={`
                  text-base leading-relaxed
                  transition-colors duration-300
                  ${hoveredCard === service.id ? 'text-white' : 'text-gray-600'}
                `}>
                  {currentLanguage === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>
              </div>

              {/* Image Icon */}
              <div className={`
                rounded-full p-6
                flex items-center justify-center
                transition-all duration-300
                
              `}>
                {service.imageSrc ? (
                  <img 
                    src={service.imageSrc} 
                    alt={currentLanguage === "ar" ? service.titleAr : service.titleEn}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs text-center">
                    ضع الصورة هنا
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCards;