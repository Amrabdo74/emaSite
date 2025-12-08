import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import person from "../assets/footerLogo.svg";
import heroImage from "../assets/hero-img.png";

export default function NewHeroSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className={`items-center w-10/12 grid-cols-1 lg:grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5 ${isArabic ? 'rtl' : 'ltr'}`}>
      
      {/* Left Column - Text Content */}
      <div className={`pr-2 md:mb-14 py-14 md:py-0 ${isArabic ? 'lg:order-2 lg:pl-2 lg:pr-0' : 'lg:order-1'}`}>
        <h1 className={`text-3xl font-semibold text-primary xl:text-5xl lg:text-4xl ${isArabic ? 'text-right' : 'text-left'}`}>
          <span className="block w-full">{t('hero.mainTitle')}</span>
        </h1>

        <p className={`py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5 ${isArabic ? 'text-right' : 'text-left'}`}>
          {t('hero.mainDescription')}
        </p>

        <div className="mt-4">
          <Link 
            to="/contact" 
            className="px-5 py-3 text-lg tracking-wider text-white bg-primary rounded-lg md:px-8 hover:bg-primary/90 transition-colors inline-block group"
          >
            <span>{t('hero.exploreMore')}</span>
          </Link>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className={`pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0 ${isArabic ? 'lg:order-1' : 'lg:order-2'}`}>
        <img 
          id="heroImg1" 
          className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0" 
          src={heroImage} 
          alt="Awesome hero page image" 
          width="500" 
          height="488"
        />
          </div>

    </div>
  );
}

