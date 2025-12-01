import {  FaTools, FaChartLine, FaRocket, FaPeriscope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { MdOutlinePriceCheck } from "react-icons/md";

const Honecard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;


  const cards = [
    {
      titleAr: "الابتكار",
      titleEn: "Innovation",
      Icon: FaRocket,
      descriptionAr: "تطوير حلول إبداعية تضمن تجربة أفضل للمستخدم وتحقيق نتائج مميزة.",
      descriptionEn: "Developing creative solutions that ensure a better user experience and outstanding results.",
    },
    {
      titleAr: "أفضل الأسعار",
      titleEn: "Best Prices",
      Icon: MdOutlinePriceCheck,
      descriptionAr: "نقدم خدمات عالية الجودة بأسعار تنافسية تناسب جميع الفئات.",
      descriptionEn: "We provide high–quality services at competitive prices suitable for everyone.",
    },
    {
      titleAr: "الجودة",
      titleEn: "Quality",
      Icon: FaTools,
      descriptionAr: "نحرص على تقديم أعلى معايير الجودة في كل جزء من الخدمة.",
      descriptionEn: "We maintain the highest standards of quality in every aspect of our service.",
    },
    {
      titleAr: "الإنجاز",
      titleEn: "Achievement",
      Icon: FaChartLine,
      descriptionAr: "تنفيذ المهام في الوقت المحدد وتحقيق أهداف العملاء بكفاءة عالية.",
      descriptionEn: "Completing tasks on time and achieving client goals with maximum efficiency.",
    },
  ];


  let delay = 50;

  return (
    <div className="container mx-auto px-4 my-5" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full"
            data-aos="fade-up"
            data-aos-delay={`${delay += 150}`}
          >
            <div
              className={`
                ${index === 0 ? 'bg-screens text-white' : 'bg-white'}
                group py-8 h-full rounded-2xl 
                ${index === 0 
                  ? 'shadow-lg' 
                  : 'shadow-[30px_11px_41px_-18px_rgba(147,202,255,0.4)] hover:shadow-none hover:bg-screens'
                }
                transition-all duration-300 transform hover:-translate-y-2 
              `}
            >
              <div className="px-6 pb-6">

                {/* العنوان */}
                <h5 className={`font-semibold text-xl mb-2 text-center ${index === 0 ? 'text-white' : 'text-black group-hover:text-white'}`}>
                  {currentLanguage === "ar" ? card.titleAr : card.titleEn}
                </h5>

                {/* الأيقونة */}
                <div 
                  className={`w-20 h-20 flex items-center justify-center mx-auto mb-6 ${
                    index === 0 ? 'bg-white' :
                    index === 1 ? 'bg-[#FFDF73]' :
                    index === 2 ? 'bg-[#8FD5E7]' :
                    'bg-screens'
                  }`}
                  style={{ borderRadius: '25px 38px 20px 54px' }}
                >
                  <card.Icon size="2.5em" className="text-[#000000] transition-all" />
                </div>

                {/* الخط الفاصل */}
                <div className={`mb-4 mx-auto`} style={{ width: "25%", height: "2px", background: index === 0 ? "#FFFFFF" : "#CCC" }} />

                {/* النص الوصفي */}
                <p className={`leading-6 font-thin text-md text-center ${index === 0 ? 'text-white' : 'text-black group-hover:text-white'}`}>
                  {currentLanguage === "ar" ? card.descriptionAr : card.descriptionEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Honecard;
