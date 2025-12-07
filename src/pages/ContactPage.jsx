import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaAddressBook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log("Form submitted.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b mt-12 from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Info Section - Left Column */}
          <div className="space-y-6">
            {/* Phone Card */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-primary p-4 rounded-full shrink-0">
                <div className="  rounded-full">
                  <FaSquarePhone className="text-white text-xl" />
                </div>
              </div>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="font-semibold text-primary mb-1">{t('contact.phoneNumber')}</p>
                <p>
                  <Link 
                    className="text-primary hover:text-screens transition-colors" 
                    to="tel:01098978273"
                  >
                    01098978273
                  </Link>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-primary p-4 rounded-full shrink-0">
                <div className="  rounded-full">
                  <FaEnvelope className="text-white text-xl" />
                </div>
              </div>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="font-semibold text-primary mb-1">{t('contact.emailAddress')}</p>
                <p>
                  <Link 
                    className="text-primary hover:text-screens transition-colors" 
                    to="mailto:EAM.info.2025@gmail.com"
                  >
                    EAM.info.2025@gmail.com
                  </Link>
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-primary p-4 rounded-full shrink-0">
                <div className="  rounded-full">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
              </div>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="font-semibold text-primary mb-1">{t('contact.location')}</p>
                <p>
                  <Link
                    className="text-primary hover:text-screens transition-colors"
                    to="https://www.google.com/maps?q=Saudi+Arabia+Jeddah+Riyadh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('hero.location')}
                  </Link>
                </p>
              </div>
            </div>

            {/* Fax Card */}
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-primary p-4 rounded-full shrink-0">
                <div className="  rounded-full">
                  <FaAddressBook className="text-white text-xl" />
                </div>
              </div>
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <p className="font-semibold text-primary mb-1">{t('contact.faxAddress')}</p>
                <p>
                  <Link 
                    className="text-primary hover:text-screens transition-colors" 
                    to="tel:01098978273"
                  >
                    01098978273
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section - Right Column */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="text-4xl font-bold text-primary mb-4">{t('contact.contactUs')}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              {t('contact.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-screens focus:outline-none transition-colors bg-transparent"
                placeholder={t('contact.name')}
                required
              />

              <input
                type="email"
                className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-screens focus:outline-none transition-colors bg-transparent"
                placeholder={t('contact.email')}
                required
              />

              <textarea
                rows="5"
                className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-screens focus:outline-none transition-colors resize-none bg-transparent"
                placeholder={t('contact.message')}
                required
              ></textarea>

              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-colors mt-4"
              >
                {t('contact.send')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
