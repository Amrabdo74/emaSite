import AboutUsSection from '../components/aboutUsPage/AboutUsSection';
import MissionVisionComponent from '../components/MissionVisionComponent';
import ExperienceSection from '../components/aboutUsPage/ExperinceSection';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function AboutPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen">
      <AboutUsSection />
      <MissionVisionComponent />
      <ExperienceSection />
      
      {/* Banners Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Services Banner */}
            <Link
              to="/services"
              className="group relative bg-gradient-to-r from-primary to-primary/90 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-90"></div>
              <div className="relative z-10 p-8 md:p-10 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {isArabic ? "خدماتنا" : "Our Services"}
                  </h3>
                  {isArabic ? (
                    <FaArrowLeft className="text-3xl group-hover:translate-x-[-8px] transition-transform" />
                  ) : (
                    <FaArrowRight className="text-3xl group-hover:translate-x-2 transition-transform" />
                  )}
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  {isArabic
                    ? "اكتشف مجموعة واسعة من خدماتنا الاحترافية في التكنولوجيا والتصميم والتراخيص"
                    : "Discover our wide range of professional services in technology, design, and licensing"
                  }
                </p>
              </div>
            </Link>

            {/* Contact Banner */}
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-screens to-screens/90 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-screens/80 to-screens/60 opacity-90"></div>
              <div className="relative z-10 p-8 md:p-10 text-primary">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {isArabic ? "تواصل معنا" : "Contact Us"}
                  </h3>
                  {isArabic ? (
                    <FaArrowLeft className="text-3xl group-hover:translate-x-[-8px] transition-transform" />
                  ) : (
                    <FaArrowRight className="text-3xl group-hover:translate-x-2 transition-transform" />
                  )}
                </div>
                <p className="text-primary/90 text-lg leading-relaxed">
                  {isArabic
                    ? "تواصل معنا اليوم واحصل على استشارة مجانية حول احتياجات مشروعك"
                    : "Contact us today and get a free consultation about your project needs"
                  }
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

