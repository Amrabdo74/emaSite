import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/footerLogo.svg";

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) => {
    const baseClass = "relative transition-all duration-300 font-medium";
    if (isActive(path)) {
      return `${baseClass} text-screens`;
    }
    return `${baseClass} text-primary hover:text-screens`;
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link 
      to={to} 
      className={navLinkClass(to)}
      onClick={onClick}
    >
      {children}
      {isActive(to) && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-screens animate-[slideIn_0.3s_ease-out]" />
      )}
    </Link>
  );

  const MobileNavLink = ({ to, children, onClick }) => (
    <Link 
      to={to} 
      className={`py-2 border-b transition-all duration-300 ${
        isActive(to) 
          ? 'text-screens border-screens font-semibold pl-4' 
          : 'text-primary border-gray-200'
      }`}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {isActive(to) && (
          <span className="w-1 h-6 bg-screens rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
        )}
        {children}
      </span>
    </Link>
  );

  return (
    <header className="w-full container sticky top-0 z-50">
      <style>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>

      {/* Desktop / Tablet */}
      <div className="hidden md:flex w-full h-20">
        {/* Right: Blue half with logo */}
        <div className="w-1/2 flex items-center justify-start">
          <Link to="/" className="ml-4 bg-primary p-2 rounded-sm hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="logo" className="h-14" />
          </Link>
        </div>

        {/* Left: White half with nav + buttons */}
        <div className="w-1/2 bg-transparent flex items-center justify-between px-6">
          {/* Links */}
          <nav className="flex items-center gap-6">
            <NavLink to="/">{t('header.home')}</NavLink>
            <NavLink to="/services">{t('header.services')}</NavLink>
            <NavLink to="/about">{t('header.about')}</NavLink>
            <NavLink to="/careers">{t('header.careers')}</NavLink>
            <NavLink to="/contact">{t('header.contact')}</NavLink>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage} 
              className="h-8 w-8 rounded-full bg-primary text-white text-sm hover:bg-screens transition-all duration-300 hover:scale-110"
            >
              {t('header.language')}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Small blue logo block at right */}
          <div className="bg-primary p-2 rounded flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
          </div>

          {/* Title / empty spacer to keep logo on right */}
          <div className="flex-1 text-center text-primary font-medium"></div>

          {/* Menu + EN button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage} 
              className="px-2 py-1 bg-primary text-white rounded text-sm hover:bg-screens transition-all duration-300"
            >
              {t('header.language')}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary p-2 hover:bg-gray-100 rounded transition-colors duration-300"
              aria-label="menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="px-4 pb-4 animate-[slideDown_0.3s_ease-out]">
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <nav className="flex flex-col gap-3">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                {t('header.home')}
              </MobileNavLink>
              <MobileNavLink 
                to="/services"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('header.services')}
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                {t('header.about')}
              </MobileNavLink>
              <MobileNavLink to="/careers" onClick={() => setIsMenuOpen(false)}>
                {t('header.careers')}
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                {t('header.contact')}
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;