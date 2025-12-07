import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAddressBook, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="col-span-1 md:col-span-2 text-start flex flex-col items-start justify-start">
            <h2 className="text-4xl font-bold text-primary mb-4 text-center">{t('contact.contactUs')}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              {t('contact.description')}
            </p>
          </div>
            {/* Phone Card */}
            <div className="flex items-start max-h-fit gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
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
            <div className="flex items-start max-h-fit gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
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
            <div className="flex items-start max-h-fit gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
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
            <div className="flex items-start max-h-fit gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
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

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="relative group">
                <label
                  className={`absolute ${isArabic ? 'right-4' : 'left-4'} pointer-events-none transition-all duration-300 ease-out ${
                    focused.name || formData.name
                      ? 'top-0 text-xs text-screens font-medium transform -translate-y-1/2 bg-white px-2'
                      : 'top-3 text-base text-gray-500'
                  }`}
                >
                  {t('contact.name')}
                </label>
                {/* Static bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300" />
                {/* Animated border line - expands on focus */}
                <div 
                  className={`absolute bottom-0 ${isArabic ? 'right-0 origin-right' : 'left-0 origin-left'} h-[2px] bg-screens transition-all duration-300 ease-out ${
                    focused.name || formData.name
                      ? 'w-full scale-x-100 opacity-100'
                      : 'w-0 scale-x-0 opacity-0'
                  }`}
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className="w-full px-4 py-3 pt-5 border-0 focus:outline-none bg-transparent relative z-10"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label
                  className={`absolute ${isArabic ? 'right-4' : 'left-4'} pointer-events-none transition-all duration-300 ease-out ${
                    focused.email || formData.email
                      ? 'top-0 text-xs text-screens font-medium transform -translate-y-1/2 bg-white px-2'
                      : 'top-3 text-base text-gray-500'
                  }`}
                >
                  {t('contact.email')}
                </label>
                {/* Static bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300" />
                {/* Animated border line - expands on focus */}
                <div 
                  className={`absolute bottom-0 ${isArabic ? 'right-0 origin-right' : 'left-0 origin-left'} h-[2px] bg-screens transition-all duration-300 ease-out ${
                    focused.email || formData.email
                      ? 'w-full scale-x-100 opacity-100'
                      : 'w-0 scale-x-0 opacity-0'
                  }`}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full px-4 py-3 pt-5 border-0 focus:outline-none bg-transparent relative z-10"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative group">
                <label
                  className={`absolute ${isArabic ? 'right-4' : 'left-4'} pointer-events-none transition-all duration-300 ease-out ${
                    focused.message || formData.message
                      ? 'top-2 text-xs text-screens font-medium transform bg-white px-2'
                      : 'top-3 text-base text-gray-500'
                  }`}
                >
                  {t('contact.message')}
                </label>
                {/* Static bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300" />
                {/* Animated border line - expands on focus */}
                <div 
                  className={`absolute bottom-0 ${isArabic ? 'right-0 origin-right' : 'left-0 origin-left'} h-[2px] bg-screens transition-all duration-300 ease-out ${
                    focused.message || formData.message
                      ? 'w-full scale-x-100 opacity-100'
                      : 'w-0 scale-x-0 opacity-0'
                  }`}
                />
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  className="w-full px-4 py-3 pt-8 border-0 focus:outline-none resize-none bg-transparent relative z-10"
                  required
                ></textarea>
              </div>

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
