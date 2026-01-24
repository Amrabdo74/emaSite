import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaAddressBook, FaEnvelope, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useSettings } from '../context/SettingsContext';

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const location = useLocation();
  const { settings } = useSettings();

  const services = [
    { id: 1, titleAr: "تطوير المواقع والتطبيقات", titleEn: "Website & App Development" },
    { id: 2, titleAr: "الدعاية والإعلان والتسويق الإلكتروني", titleEn: "Advertising & Digital Marketing" },
    { id: 3, titleAr: "التصميم المعماري والإنشائي", titleEn: "Architectural & Structural Design" },
    { id: 4, titleAr: "قسم الرخص", titleEn: "Licensing Department" }
  ];

  const positions = [
    { id: 1, titleAr: "مطور ويب", titleEn: "Web Developer" },
    { id: 2, titleAr: "مصمم جرافيك", titleEn: "Graphic Designer" },
    { id: 3, titleAr: "مسوق رقمي", titleEn: "Digital Marketer" },
    { id: 4, titleAr: "مهندس معماري", titleEn: "Architect" },
    { id: 5, titleAr: "مدير مشروع", titleEn: "Project Manager" },
    { id: 6, titleAr: "أخرى", titleEn: "Other" }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    contactType: '',
    position: '',
    service: '',
    cvLink: '' // Changed from cvFile to cvLink
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { message, service, contactType, position } = location.state;
      
      setFormData(prev => ({
        ...prev,
        message: message || prev.message,
        contactType: contactType || (message ? 'service' : prev.contactType), // Fallback logic
        service: service || prev.service,
        position: position || prev.position
      }));
    }
  }, [location.state]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'contactType') {
        updated.position = '';
        updated.service = '';
        updated.cvLink = '';
      }
      return updated;
    });
  };

  // Removed handleFileChange

  const socialMedia = [
    {link: settings.facebook, name: t('footer.social.facebook'), icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { link: settings.whatsapp, name: t('footer.social.whatsapp'), icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
    { link: settings.instagram || "https://www.instagram.com", name: t('footer.social.instagram'), icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { link: settings.linkedin, name: t('footer.social.linkedin'), icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
  ].filter(item => item.link);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Removed file upload logic
      
      const collectionName = 
          formData.contactType === 'job' ? 'jobApplications' :
          formData.contactType === 'service' ? 'serviceRequests' : 
          'contactMessages'; 

      await addDoc(collection(db, collectionName), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        contactType: formData.contactType,
        ...(formData.contactType === 'job' && { 
            position: formData.position,
            cvUrl: formData.cvLink // Save the link directly
        }),
        ...(formData.contactType === 'service' && { 
            service: formData.service 
        }),
        createdAt: serverTimestamp()
      });

      alert(isArabic ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        contactType: '',
        position: '',
        service: '',
        cvLink: '' 
      });

    } catch (error) {
       console.error("Error submitting form: ", error);
       alert(isArabic ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again.");
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section 
        className="relative py-30 md:py-45 overflow-hidden min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
              {t('contact.contactUs')}
            </h1>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-md">
              {t('contact.description')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center my-6 gap-3">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="group w-12 h-12 bg-white/10 hover:bg-screens rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-primary transition-colors" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <div className="py-17">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Contact Info Section */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('contact.contactInfo')}</h2>
                <p className="text-gray-600 text-lg">{t('contact.contactInfoDescription')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">

              {/* Contact Cards */}
              {settings.phone && (
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-24">
                <div className="bg-primary p-3 rounded-lg shrink-0">
                  <FaSquarePhone className="text-white text-xl" />
                </div>
                <div className={`${isArabic ? 'text-right' : 'text-left'} flex-1 min-w-0`}>
                  <p className="font-semibold text-primary mb-1 text-sm">{t('contact.phoneNumber')}</p>
                  <Link className="text-gray-600 hover:text-screens transition-colors text-sm truncate block" to={`tel:${settings.phone}`}>
                  {settings.phone}
                  </Link>
                </div>
              </div>
              )}

              {settings.email && (
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-24">
                <div className="bg-primary p-3 rounded-lg shrink-0">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div className={`${isArabic ? 'text-right' : 'text-left'} flex-1 min-w-0`}>
                  <p className="font-semibold text-primary mb-1 text-sm">{t('contact.eamilAddress')}</p>
                  <Link className="text-gray-600 hover:text-screens transition-colors text-xs truncate block" to={`mailto:${settings.email}`}>
                   {settings.email}
                  </Link>
                </div>
              </div>
              )}

              {((isArabic ? settings.location?.ar : settings.location?.en) || settings.location) && (
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-24">
                <div className="bg-primary p-3 rounded-lg shrink-0">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div className={`${isArabic ? 'text-right' : 'text-left'} flex-1 min-w-0`}>
                  <p className="font-semibold text-primary mb-1 text-sm">{t('contact.location')}</p>
                  <Link className="text-gray-600 hover:text-screens transition-colors text-sm truncate block" to={settings.locationMapUrl} target="_blank">
                    {isArabic ? settings.location?.ar : settings.location?.en}
                  </Link>
                </div>
              </div>
              )}

              {settings.fax && (
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-24">
                <div className="bg-primary p-3 rounded-lg shrink-0">
                  <FaAddressBook className="text-white text-xl" />
                </div>
                <div className={`${isArabic ? 'text-right' : 'text-left'} flex-1 min-w-0`}>
                  <p className="font-semibold text-primary mb-1 text-sm">{t('contact.faxAddress')}</p>
                  <Link className="text-gray-600 hover:text-screens transition-colors text-sm truncate block" to={`tel:${settings.fax}`}>
                    {settings.fax}
                  </Link>
                </div>
              </div>
              )}
              </div>
            </div>

            {/* Contact Form */}
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 px-4 rounded-xl shadow-lg">
                
                {/* Contact Type */}
                <div className="relative">
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? "نوع التواصل" : "Contact Type"} *
                  </label>
                  <select
                    value={formData.contactType}
                    onChange={(e) => handleChange('contactType', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors bg-white"
                    required
                  >
                    <option value="">{isArabic ? "اختر نوع التواصل" : "Select Contact Type"}</option>
                    <option value="job">{isArabic ? "التقدم لوظيفة" : "Apply for a job"}</option>
                    <option value="service">{isArabic ? "طلب خدمة" : "Ask for a Service"}</option>
                    <option value="support">{isArabic ? "التواصل للدعم" : "Contact for support"}</option>
                  </select>
                </div>

                {/* Position (Job) */}
                {formData.contactType === 'job' && (
                  <div className="relative">
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? "المنصب" : "Position"} *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => handleChange('position', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors bg-white"
                      required
                    >
                      <option value="">{isArabic ? "اختر المنصب" : "Select Position"}</option>
                      {positions.map(pos => (
                        <option key={pos.id} value={isArabic ? pos.titleAr : pos.titleEn}>
                          {isArabic ? pos.titleAr : pos.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* CV Link (Job) */}
                {formData.contactType === 'job' && (
                  <div className="relative">
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? "رابط السيرة الذاتية (Google Drive / LinkedIn)" : "CV Link (Google Drive / LinkedIn)"} *
                    </label>
                    <input
                      type="url"
                      value={formData.cvLink}
                      onChange={(e) => handleChange('cvLink', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors bg-white"
                      required
                      dir="ltr"
                    />
                  </div>
                )}

                {/* Service (Service) */}
                {formData.contactType === 'service' && (
                  <div className="relative">
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? "الخدمة" : "Service"} *
                    </label>
                    <select
                      value={formData.service}
                      onChange={e => handleChange('service', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors bg-white"
                      required
                    >
                      <option value="">{isArabic ? "اختر الخدمة" : "Select Service"}</option>
                      {services.map(service => (
                        <option key={service.id} value={isArabic ? service.titleAr : service.titleEn}>
                          {isArabic ? service.titleAr : service.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('contact.eamil')} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? "رقم الهاتف" : "Phone Number"} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {t('contact.message')} *
                  </label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-screens focus:outline-none resize-none transition-colors"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <FaSpinner className="animate-spin text-xl" /> : t('contact.send')}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Services Banner */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isArabic ? "خدماتنا" : "Our Services"}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {isArabic 
                ? "نقدم مجموعة واسعة من الخدمات الاحترافية"
                : "We offer a wide range of professional services"
              }
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-block px-8 py-3 bg-screens text-primary font-bold rounded-xl hover:bg-screens/90 transition-all duration-300 shadow-lg"
            >
              {isArabic ? "عرض جميع الخدمات" : "View All Services"}
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      {settings.locationMapUrl && (
      <section className="w-full h-[500px] md:h-[600px] relative">
        <iframe
          src={settings.locationMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
          className="w-full h-full"
        ></iframe>
        
        <div className={`absolute ${isArabic ? 'left-4' : 'right-4'} top-4 bg-white rounded-lg shadow-xl p-4 max-w-xs`}>
          <div className="flex items-start gap-3">
            <div className="bg-primary p-3 rounded-lg">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <h4 className="font-bold text-primary mb-1">
                {isArabic ? "موقعنا" : "Our Location"}
              </h4>
              <p className="text-gray-600 text-sm">
                {isArabic ? settings.location?.ar : settings.location?.en}
              </p>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default ContactPage;