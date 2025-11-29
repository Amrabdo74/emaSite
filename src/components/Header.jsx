import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/footerLogo.svg";

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Desktop / Tablet */}
      <div className="hidden md:flex w-full h-20">
        {/* Right: Blue half with logo */}
        <div className="w-1/2 bg-[#103B68] flex items-center justify-center">
          <img src={logo} alt="logo" className="h-14" />
        </div>

        {/* Left: White half with nav + buttons */}
        <div className="w-1/2 bg-white flex items-center justify-between px-6">
          {/* Links (aligned left side of the white half) */}
          <nav className="flex items-center gap-6 text-[#103B68] font-medium">
            <a href="#home" className="hover:text-[#FAA617] transition">{t('header.home')}</a>
            <a href="#services" className="hover:text-[#FAA617] transition">{t('header.services')}</a>
            <a href="#about" className="hover:text-[#FAA617] transition">{t('header.about')}</a>
            <a href="#contact" className="hover:text-[#FAA617] transition">{t('header.contact')}</a>
          </nav>

          {/* Buttons (on the far left inside the white half) */}
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="px-3 py-1 bg-[#103B68] text-white rounded text-sm">{t('header.language')}</button>
            <button className="px-4 py-2 bg-[#FAA617] text-white rounded hover:bg-[#e29a12] transition">
              {t('header.login')}
            </button>
            <button className="px-4 py-2 bg-[#FAA617] text-white rounded hover:bg-[#e29a12] transition">
              {t('header.register')}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Small blue logo block at right */}
          <div className="bg-[#103B68] p-2 rounded flex items-center justify-center">
            <img src={logo} alt="logo" className="h-10" />
          </div>

          {/* Title / empty spacer to keep logo on right */}
          <div className="flex-1 text-center text-[#103B68] font-medium">
            {/* يمكنك وضع عنوان أو تركه فارغ */}
          </div>

          {/* Menu + EN button */}
          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="px-2 py-1 bg-[#103B68] text-white rounded text-sm">{t('header.language')}</button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#103B68] p-2"
              aria-label="menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="px-4 pb-4">
            <nav className="flex flex-col gap-3 text-[#103B68]">
              <a href="#home" className="py-2 border-b">{t('header.home')}</a>
              <a href="#services" className="py-2 border-b">{t('header.services')}</a>
              <a href="#about" className="py-2 border-b">{t('header.about')}</a>
              <a href="#contact" className="py-2 border-b">{t('header.contact')}</a>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 px-4 py-2 bg-[#FAA617] text-white rounded">{t('header.login')}</button>
                <button className="flex-1 px-4 py-2 bg-[#FAA617] text-white rounded">{t('header.register')}</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
