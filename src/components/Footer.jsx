import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../assets/footerLogo.png";
import { useSettings } from '../context/SettingsContext';

function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { settings } = useSettings();
  
  const socialMedia = [
    {link: settings.facebook, name: t('footer.social.facebook'), icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { link: settings.whatsapp, name: t('footer.social.whatsapp'), icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
    { link: settings.instagram || "https://www.instagram.com", name: t('footer.social.instagram'), icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { link: settings.linkedin, name: t('footer.social.linkedin'), icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
  ].filter(item => item.link);

  const pages = [
    { name: t('footer.pages.home'), href: "/" },
    { name: t('footer.pages.about'), href: "/about" },
    { name: t('footer.pages.services'), href: "/" },
    { name: t('footer.pages.contact'), href: "/contact" }
  ];

  const aboutText = t('footer.about');

  return (
    <footer className="w-full bg-gradient-to-b from-primary via-primary to-primary/95 text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-screens via-cards to-screens"></div>
      
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Logo and About Section */}
          <div className="lg:col-span-2">
            <div className="mb-6 ">
              <img src={logo} alt="Logo" className="h-20 md:h-40 mb-6" />
            </div>
            <p className="text-white/90 leading-relaxed text-base md:text-lg max-w-lg">
              {aboutText}
            </p>
          </div>

          {/* Site Pages and Contact Info - Same Row on Mobile */}
          <div className="grid grid-cols-2 col-span-2">
            {/* Site Pages Section */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                {t('footer.sitePages')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-screens rounded"></span>
              </h3>
              <ul className="space-y-3 mt-6">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      to={page.href}
                      className="flex items-center gap-3 text-white/80 hover:text-screens transition-all duration-300 group"
                      onClick={(e) => {
                        if (page.name === t('footer.pages.services') && window.location.pathname === '/') {
                          e.preventDefault();
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="w-2 h-2 bg-screens rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className={`transition-transform ${isArabic ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                        {page.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
                {t('contact.contactUs')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-screens rounded"></span>
              </h3>
              <ul className="space-y-4 mt-6">
                {settings.phone && (
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                      <p className="text-white/80 text-sm">{t('contact.phoneNumber')}</p>
                      <a href={`tel:${settings.phone}`} className="text-white hover:text-screens transition-colors">
                        {settings.phone}
                      </a>
                    </div>
                  </li>
                )}
                {settings.email && (
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                      <p className="text-white/80 text-sm">{t('contact.eamilAddress')}</p>
                      <a href={`mailto:${settings.email}`} className="text-white hover:text-screens transition-colors text-sm break-all">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
              {/* Social Media Icons - Horizontal */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t('footer.socialMedia')}
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="group w-12 h-12 bg-white/10 hover:bg-screens rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 fill-white group-hover:fill-primary transition-colors" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()}EMA CO. {t('footer.copyright')}
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
