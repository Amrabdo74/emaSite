import React from 'react';
import { useTranslation } from 'react-i18next';

const MissionVisionComponent = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-white ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>

      <div className="py-12 md:py-20">
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Mission Section - Right Aligned */}
          <div className="w-full flex justify-start">
            <div className="relative w-full" style={{ maxWidth: '730px' }}>
              {/* Orange Sidebar - لازق في أقصى اليمين */}
              <div className="absolute top-0 right-0 w-2.5 md:w-8 h-full bg-[#FAA617]"></div>
              
              <div className={`${isArabic ? 'pr-6 md:pr-16' : 'pl-6 md:pl-16'} py-8 text-center`}>
                {/* Mission Icon */}
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-[#FAA617]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 8L36 24L44 16L40 32L56 28L48 36L64 40L48 44L56 52L40 48L44 64L36 56L32 72L28 56L20 64L24 48L8 52L16 44L0 40L16 36L8 28L24 32L20 16L28 24L32 8Z" fill="currentColor"/>
                    <circle cx="32" cy="40" r="8" fill="white"/>
                    <path d="M32 34C28.6863 34 26 36.6863 26 40C26 43.3137 28.6863 46 32 46C35.3137 46 38 43.3137 38 40C38 36.6863 35.3137 34 32 34Z" fill="currentColor"/>
                  </svg>
                </div>
                
                {/* Mission Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#103B68] mb-6">
                  {t('mission.title')}
                </h2>
                
                {/* Mission Text */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui' }}>
                  {t('mission.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Vision Section - Left Aligned */}
          <div className="w-full flex justify-end">
            <div className="relative w-full" style={{ maxWidth: '730px' }}>
              {/* Blue Sidebar - لازق في أقصى الشمال */}
              <div className="absolute top-0 left-0 w-2.5 md:w-8 h-full bg-[#103B68]"></div>
              
              <div className={`${isArabic ? 'pl-6 md:pl-16' : 'pr-6 md:pr-16'} py-8 text-center`}>
                {/* Vision Icon */}
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-[#FAA617]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="32" width="12" height="24" fill="currentColor"/>
                    <rect x="26" y="20" width="12" height="36" fill="currentColor"/>
                    <rect x="44" y="12" width="12" height="44" fill="currentColor"/>
                    <path d="M32 16L40 8L48 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="50" cy="18" r="6" fill="currentColor"/>
                    <circle cx="50" cy="18" r="3" fill="white"/>
                  </svg>
                </div>
                
                {/* Vision Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#103B68] mb-6">
                  {t('vision.title')}
                </h2>
                
                {/* Vision Text */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ fontFamily: isArabic ? 'Cairo, sans-serif' : 'system-ui' }}>
                  {t('vision.text')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MissionVisionComponent;