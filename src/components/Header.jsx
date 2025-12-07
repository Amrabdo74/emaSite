import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="w-1/2 bg-primary flex items-center justify-center">
          <Link to="/">
          <img src={logo} alt="logo" className="h-14" />
          </Link>
        </div>

        {/* Left: White half with nav + buttons */}
        <div className="w-1/2 bg-white flex items-center justify-between px-6">
          {/* Links (aligned left side of the white half) */}
          <nav className="flex items-center gap-6 text-primary font-medium">
            <Link to="/" className="hover:text-screens transition">{t('header.home')}</Link>
            <Link to="/" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="hover:text-screens transition">{t('header.services')}</Link>
            <Link to="/about" className="hover:text-screens transition">{t('header.about')}</Link>
            <Link to="/contact" className="hover:text-screens transition">{t('header.contact')}</Link>
          </nav>

          {/* Buttons (on the far left inside the white half) */}
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="h-8 w-8 rounded-full bg-primary text-white text-sm">{t('header.language')}</button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Small blue logo block at right */}
          <div className="bg-primary p-2 rounded flex items-center justify-center">
            <Link to="/">
            <img src={logo} alt="logo" className="h-10" />
            </Link>
          </div>

          {/* Title / empty spacer to keep logo on right */}
          <div className="flex-1 text-center text-primary font-medium">
            {/* يمكنك وضع عنوان أو تركه فارغ */}
          </div>

          {/* Menu + EN button */}
          <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="px-2 py-1 bg-primary text-white rounded text-sm">{t('header.language')}</button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary p-2"
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
            <nav className="flex flex-col gap-3 text-primary">
              <Link to="/" className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>{t('header.home')}</Link>
              <Link 
                to="/" 
                className="py-2 border-b" 
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('header.services')}
              </Link>
              <Link to="/about" className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>{t('header.about')}</Link>
              <Link to="/contact" className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>{t('header.contact')}</Link>
              {/* <div className="flex gap-2 mt-3">
                <button className="flex-1 px-4 py-2 bg-screens text-white rounded">{t('header.login')}</button>
                <button className="flex-1 px-4 py-2 bg-screens text-white rounded">{t('header.register')}</button>
              </div> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
