import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaEnvelope, FaFileAlt } from 'react-icons/fa';

export default function CareersPage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? "ar" : "en";

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-white"
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-20 h-20 bg-screens rounded-full flex items-center justify-center opacity-90 shadow-lg">
                <FaBriefcase className="text-primary text-4xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {currentLanguage === "ar" ? "الوظائف" : "Careers"}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed mt-6 drop-shadow-md">
              {currentLanguage === "ar" 
                ? "انضم إلى فريقنا المتميز وكن جزءاً من رحلة النجاح والابتكار"
                : "Join our exceptional team and be part of the journey of success and innovation"
              }
            </p>
          </div>
        </div>
      </section>

      {/* No Open Positions Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-cards/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBriefcase className="text-primary text-5xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  {currentLanguage === "ar" 
                    ? "لا توجد وظائف متاحة حالياً"
                    : "No Open Positions Available"
                  }
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {currentLanguage === "ar"
                    ? "نأسف، لا توجد فرص عمل متاحة حالياً. لكننا دائماً نبحث عن المواهب المتميزة. إذا كنت مهتماً بالانضمام إلى فريقنا في المستقبل، يرجى إرسال سيرتك الذاتية وسنحتفظ بها في ملفنا."
                    : "We're sorry, there are currently no job openings available. However, we're always looking for exceptional talent. If you're interested in joining our team in the future, please send us your CV and we'll keep it on file."
                  }
                </p>
              </div>

              {/* CTA Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {currentLanguage === "ar" 
                    ? "أرسل سيرتك الذاتية"
                    : "Send Your CV"
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {currentLanguage === "ar"
                    ? "إذا كنت ترغب في إرسال سيرتك الذاتية للاحتفاظ بها في ملفنا، يمكنك التواصل معنا عبر البريد الإلكتروني"
                    : "If you'd like to send your CV to keep on file, you can contact us viaEMAil"
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:eam.info.2025@gmail.com?subject=CV Submission"
                    className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <FaEnvelope className="text-xl" />
                    <span>eam.info.2025@gmail.com</span>
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-6 py-3 bg-screens text-primary rounded-xl font-semibold hover:bg-screens/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <FaFileAlt className="text-xl" />
                    <span>{currentLanguage === "ar" ? "نموذج التواصل" : "Contact Form"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {currentLanguage === "ar" 
                ? "لماذا تنضم إلينا؟"
                : "Why Join Us?"
              }
            </h2>
            <p className="text-lg text-gray-600">
              {currentLanguage === "ar"
                ? "نحن نقدم بيئة عمل محفزة وفرصاً للنمو والتطوير"
                : "We offer a stimulating work environment and opportunities for growth and development"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "فريق محترف" : "Professional Team"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "اعمل مع فريق من الخبراء والمحترفين"
                  : "Work with a team of experts and professionals"
                }
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-screens rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "نمو مستمر" : "Continuous Growth"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "فرص للتطوير والنمو المهني"
                  : "Opportunities for professional development and growth"
                }
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "بيئة إبداعية" : "Creative Environment"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "بيئة عمل محفزة تشجع على الابتكار"
                  : "A stimulating work environment that encourages innovation"
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

