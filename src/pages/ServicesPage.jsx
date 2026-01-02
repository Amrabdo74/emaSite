import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCode, FaBullhorn, FaBuilding, FaFileAlt } from 'react-icons/fa';
import FAQ from '../components/FAQ';

export default function ServicesPage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? "ar" : "en";
  const [hoveredService, setHoveredService] = useState(null);
  const navigate = useNavigate();

  const handleRequestService = (serviceTitle) => {
    // Navigate to contact page with service information
    navigate('/contact', { 
      state: { 
        service: serviceTitle,
        message: currentLanguage === "ar" 
          ? `أريد الحصول على خدمة: ${serviceTitle}`
          : `I would like to request service: ${serviceTitle}`
      } 
    });
  };

  const services = [
    {
      id: 1,
      titleAr: "تطوير المواقع والتطبيقات",
      titleEn: "Website & App Development",
      shortDescAr: "أفضل الحلول والعروض المتاحة لتصميم مواقع إلكترونية مميزة",
      shortDescEn: "Best solutions and offers available for designing exceptional websites",
      descriptionAr: "نقدم حلولاً شاملة لتطوير المواقع الإلكترونية والتطبيقات الذكية التي تلبي احتياجاتك التجارية. فريقنا المحترف يضمن تصميم مواقع سريعة، آمنة، وسهلة الاستخدام مع دعم كامل لجميع الأجهزة.",
      descriptionEn: "We provide comprehensive solutions for developing websites and smart applications that meet your business needs. Our professional team ensures fast, secure, and user-friendly website designs with full support for all devices.",
      featuresAr: [
        "تصميم مواقع ويب احترافية متجاوبة",
        "تطوير تطبيقات الهواتف الذكية (iOS & Android)",
        "تحسين محركات البحث (SEO)",
        "تكامل مع أنظمة الدفع الإلكتروني",
        "صيانة وتحديث مستمر",
        "دعم فني على مدار الساعة"
      ],
      featuresEn: [
        "Professional responsive web design",
        "Mobile app development (iOS & Android)",
        "Search engine optimization (SEO)",
        "E-payment system integration",
        "Continuous maintenance and updates",
        "24/7 technical support"
      ],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      icon: FaCode
    },
    {
      id: 2,
      titleAr: "الدعاية والإعلان والتسويق الإلكتروني",
      titleEn: "Advertising & Digital Marketing",
      shortDescAr: "إدارة الحملات الإعلانية والتسويق عبر وسائل التواصل الاجتماعي وتصميم الهوية البصرية",
      shortDescEn: "Managing advertising campaigns, social media marketing, and visual identity design",
      descriptionAr: "نطور استراتيجيات تسويق رقمي فعالة تساعدك على الوصول إلى جمهورك المستهدف وزيادة مبيعاتك. نقدم خدمات متكاملة تشمل إدارة وسائل التواصل الاجتماعي، الحملات الإعلانية، وتصميم الهوية البصرية.",
      descriptionEn: "We develop effective digital marketing strategies that help you reach your target audience and increase your sales. We provide integrated services including social media management, advertising campaigns, and visual identity design.",
      featuresAr: [
        "إدارة حسابات وسائل التواصل الاجتماعي",
        "حملات إعلانية على Google و Facebook",
        "تصميم الهوية البصرية والشعارات",
        "إنتاج محتوى تسويقي احترافي",
        "تحليل الأداء والتقارير الشهرية",
        "استراتيجيات تحسين معدل التحويل"
      ],
      featuresEn: [
        "Social media account management",
        "Google and Facebook advertising campaigns",
        "Visual identity and logo design",
        "Professional marketing content production",
        "Performance analysis and monthly reports",
        "Conversion rate optimization strategies"
      ],
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      icon: FaBullhorn
    },
    {
      id: 3,
      titleAr: "التصميم المعماري والإنشائي",
      titleEn: "Architectural & Structural Design",
      shortDescAr: "تصميم معماري مبتكر وحلول إنشائية متكاملة للمشاريع السكنية والتجارية",
      shortDescEn: "Innovative architectural design and integrated structural solutions for residential and commercial projects",
      descriptionAr: "نقدم خدمات تصميم معماري وإنشائي متكاملة للمشاريع السكنية والتجارية. فريقنا من المهندسين المعماريين والإنشائيين يضمن تقديم حلول مبتكرة وآمنة تلبي أعلى معايير الجودة والاستدامة.",
      descriptionEn: "We provide integrated architectural and structural design services for residential and commercial projects. Our team of architects and structural engineers ensures innovative and safe solutions that meet the highest standards of quality and sustainability.",
      featuresAr: [
        "تصميم معماري ثلاثي الأبعاد (3D)",
        "رسومات إنشائية تفصيلية",
        "دراسات الجدوى والتصاميم الأولية",
        "إدارة المشاريع المعمارية",
        "استشارات هندسية متخصصة",
        "تصاميم مستدامة وصديقة للبيئة"
      ],
      featuresEn: [
        "3D architectural design",
        "Detailed structural drawings",
        "Feasibility studies and preliminary designs",
        "Architectural project management",
        "Specialized engineering consultations",
        "Sustainable and eco-friendly designs"
      ],
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      icon: FaBuilding
    },
    {
      id: 4,
      titleAr: "قسم الرخص",
      titleEn: "Licensing Department",
      shortDescAr: "توفير جميع خدمات الرخص التي تحتاجها المنشآت والشركات مثل إصدار رخصة البلدية ومشاهدة السلامة إصدار كارت تشغيل المركبات",
      shortDescEn: "Providing all licensing services needed by establishments and companies such as municipal licenses, safety certificates, and vehicle operation cards",
      descriptionAr: "نوفر جميع خدمات الرخص والتراخيص التي تحتاجها منشآتك وشركاتك. نساعدك في الحصول على جميع التراخيص المطلوبة بسرعة وسهولة، مع متابعة مستمرة لضمان تجديدها في الوقت المناسب.",
      descriptionEn: "We provide all licensing and permit services your establishments and companies need. We help you obtain all required licenses quickly and easily, with continuous follow-up to ensure timely renewal.",
      featuresAr: [
        "إصدار رخص البلدية",
        "شهادات السلامة والوقاية",
        "كروت تشغيل المركبات",
        "تراخيص المهن الحرة",
        "تجديد التراخيص",
        "استشارات قانونية وإدارية"
      ],
      featuresEn: [
        "Municipal license issuance",
        "Safety and prevention certificates",
        "Vehicle operation cards",
        "Freelance profession licenses",
        "License renewal",
        "Legal and administrative consultations"
      ],
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      icon: FaFileAlt
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-white"
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden min-h-[500px] flex items-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop)`,
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
                <div className="w-14 h-14 bg-screens rounded-full"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {currentLanguage === "ar" ? "خدماتنا" : "Our Services"}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed mt-6 drop-shadow-md">
              {currentLanguage === "ar" 
                ? "نقدم حلولاً متكاملة وخدمات احترافية تلبي جميع احتياجاتك في مجال التكنولوجيا والتصميم والتراخيص"
                : "We provide integrated solutions and professional services that meet all your needs in technology, design, and licensing"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{
                  transform: hoveredService === service.id ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={currentLanguage === "ar" ? service.titleAr : service.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                    {service.icon && (
                      <service.icon className="text-primary text-3xl" />
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {currentLanguage === "ar" ? service.titleAr : service.titleEn}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base">
                      {currentLanguage === "ar" ? service.shortDescAr : service.shortDescEn}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
                    {currentLanguage === "ar" ? service.descriptionAr : service.descriptionEn}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      {currentLanguage === "ar" ? "ما نقدمه:" : "What We Offer:"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(currentLanguage === "ar" ? service.featuresAr : service.featuresEn).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-cards/20 to-transparent hover:from-cards/30 transition-all duration-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-screens mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button 
                      onClick={() => handleRequestService(currentLanguage === "ar" ? service.titleAr : service.titleEn)}
                      className="w-full py-3 px-6 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {currentLanguage === "ar" ? "اطلب الخدمة الآن" : "Request Service Now"}
                    </button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={`absolute ${currentLanguage === "ar" ? "left-0" : "right-0"} top-0 w-1 h-full bg-gradient-to-b from-screens to-cards opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {currentLanguage === "ar" 
                ? "جاهزون لبدء مشروعك؟"
                : "Ready to Start Your Project?"
              }
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {currentLanguage === "ar"
                ? "تواصل معنا اليوم واحصل على استشارة مجانية حول احتياجات مشروعك"
                : "Contact us today and get a free consultation about your project needs"
              }
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-screens text-primary font-bold rounded-xl hover:bg-screens/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {currentLanguage === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

