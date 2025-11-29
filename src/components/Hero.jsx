import { useTranslation } from "react-i18next";
import person from "../assets/footerLogo.svg";
import iconMail from "../assets/footerLogo.svg";
import iconPhone from "../assets/footerLogo.svg";
import iconLocation from "../assets/footerLogo.svg";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="w-full flex flex-col">
      {/* MAIN HERO */}
      <div className="w-full flex flex-col md:flex-row min-h-[380px]">
        
        {/* LEFT SIDE IMAGE */}
        <div className="relative w-full md:w-1/2 bg-[#F3F4F6] flex justify-center items-center overflow-hidden">
          
          {/* الدائرة البرتقالية خلف الشخص */}
          <div className="absolute w-[380px] h-[380px] bg-[#FAA617] rounded-full top-14 left-16 opacity-70"></div>
          
          {/* صورة الشخص */}
          <img src={person} className="relative z-10 w-[320px]" />

          {/* الظل تحت الصورة */}
          <div className="absolute bottom-7 w-[250px] h-[40px] bg-[#001B38] opacity-80 rounded-full blur-xl"></div>
        
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-10">
          <h1 className="text-3xl font-bold text-[#FAA617] text-right">
            {t('hero.title')}
          </h1>

          <p className="text-xl leading-relaxed text-[#0E2A47] text-right mt-4">
            {t('hero.description')}
          </p>

          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 bg-[#103B68] text-white rounded-md">
              {t('hero.learnMore')}
            </button>
            <button className="px-6 py-2 bg-[#FAA617] text-white rounded-md">
              {t('hero.ourServices')}
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div className="w-full bg-white flex flex-col md:flex-row justify-between text-center mt-4 py-6 px-8 border-t">

        <div className="mb-4 md:mb-0 flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">{t('hero.contactUs')}</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconMail} className="w-5" />
            <span>{t('hero.email')}</span>
          </div>
        </div>

        <div className="mb-4 md:mb-0 flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">{t('hero.contactUs')}</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconPhone} className="w-5" />
            <span>{t('hero.phone')}</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">{t('hero.headquarters')}</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconLocation} className="w-5" />
            <span>{t('hero.location')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
