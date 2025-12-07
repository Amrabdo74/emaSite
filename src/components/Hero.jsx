import { useTranslation } from "react-i18next";
import person from "../assets/footerLogo.svg";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <section className="w-full flex flex-col" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* MAIN HERO */}
      <div className="w-full flex flex-col md:flex-row min-h-[500px]">
        
        {/* LEFT SIDE IMAGE - 60-65% width */}
        <div className="relative w-full md:w-[65%] bg-gradient-to-b from-[#E8F4FF] to-white flex justify-center items-center overflow-hidden">
          
          {/* Yellow/Orange Circle behind person */}
          <div className="absolute w-[380px] h-[380px] bg-[#FAA617] rounded-full top-14 left-16 opacity-70"></div>
          
          {/* Person with laptop image */}
          <img src={person} alt="Person with laptop" className="relative z-10 w-[320px] h-auto" />

          {/* Decorative dark blue brush stroke at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary opacity-90" style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 60%)'
          }}></div>
        
        </div>

        {/* RIGHT SIDE TEXT - 35-40% width, Dark Blue Background */}
        <div className="w-full md:w-[35%] bg-primary flex flex-col justify-center px-8 py-10 md:py-16">
          {/* Yellow/Orange Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-[#FAA617] ${isArabic ? 'text-right' : 'text-left'} mb-6`}>
            {t('hero.title')}
          </h1>

          {/* White Description Text */}
          <p className={`text-lg md:text-xl leading-relaxed text-white ${isArabic ? 'text-right' : 'text-left'} mb-8`}>
            {t('hero.description')}
          </p>

          {/* Buttons */}
          <div className={`flex ${isArabic ? 'justify-end' : 'justify-start'} gap-4 flex-wrap`}>
            <button className="px-6 py-3 bg-primary border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors">
              {t('hero.learnMore')}
            </button>
            <button className="px-6 py-3 bg-[#FAA617] text-white rounded-lg hover:bg-[#e6950e] transition-colors">
              {t('hero.ourServices')}
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT BAR - Below left section */}
      <div className="w-full bg-white flex flex-col md:flex-row justify-between py-6 px-8 border-t border-gray-200">
        
        {/* Email Section */}
        <div className="mb-4 md:mb-0 flex flex-col items-center text-primary">
          <span className="font-semibold mb-2">{t('hero.contactUs')}</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#FAA617] border-dashed flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FAA617]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm md:text-base">{t('hero.email')}</span>
          </div>
        </div>

        {/* Phone Section */}
        <div className="mb-4 md:mb-0 flex flex-col items-center text-primary">
          <span className="font-semibold mb-2">{t('hero.contactUs')}</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#FAA617] border-dashed flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FAA617]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-sm md:text-base">{t('hero.phone')}</span>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center text-primary">
          <span className="font-semibold mb-2">{t('hero.headquarters')}</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#FAA617] border-dashed flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FAA617]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm md:text-base">{t('hero.location')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
