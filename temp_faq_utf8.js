import { useState } from 'react';
import faqImage from '../assets/faqImage.png'
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? "ar" : "en";
  // ┘è┘à┘â┘å┘â ╪¬╪║┘è┘è╪▒ ╪º┘ä┘ä╪║╪⌐ ┘à┘å ┘ç┘å╪º

  const faqs = [
    {
      questionAr: "1. ┘à╪º ┘ç┘è ┘à╪¬╪╖┘ä╪¿╪º╪¬ ╪¿╪»╪í ┘à╪┤╪▒┘ê╪╣ ╪¿╪▒┘à╪¼┘è ┘à╪╣┘å╪º╪ƒ",
      questionEn: "1. What are the requirements to start a software project with us?",
      answerAr: "┘â┘ä ┘à╪º ╪¬╪¡╪¬╪º╪¼┘ç ┘ç┘ê ┘ü┘â╪▒╪⌐ ┘à╪┤╪▒┘ê╪╣┘â ╪ú┘ê ┘à╪¬╪╖┘ä╪¿╪º╪¬┘â ╪º┘ä╪ú╪│╪º╪│┘è╪⌐. ┘å┘é┘ê┘à ╪¿╪¬╪¡┘ä┘è┘ä┘ç╪º╪î ┘ê┘ê╪╢╪╣ ╪«╪╖╪⌐ ┘ä┘ä╪¬┘å┘ü┘è╪░╪î ┘ê╪¬╪¡╪»┘è╪» ╪╣╪▒╪╢ ╪│╪╣╪▒ ╪┤╪º┘à┘ä ╪¿╪º┘ä╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä┘ç╪º┘à╪⌐ ┘ê╪º┘ä╪¡┘ä┘ê┘ä ╪º┘ä╪¬┘é┘å┘è╪⌐ ╪º┘ä┘à┘å╪º╪│╪¿╪⌐ ┘ê╪ú┘ü╪╢┘ä ╪º┘ä╪¡┘ä┘ê┘ä ╪º┘ä╪¬┘é┘å┘è╪⌐ ╪º┘ä┘à╪¬┘é╪»┘à╪⌐.",
      answerEn: "All you need is your project idea or basic requirements. We analyze them, create an implementation plan, and provide a comprehensive quote with important details and appropriate advanced technical solutions."
    },
    {
      questionAr: "2. ┘â┘è┘ü ┘è┘à┘â┘å┘å┘è ╪¬╪¡┘ê┘è┘ä ┘à┘ê┘é╪╣┘è ╪º┘ä┘é╪»┘è┘à ╪Ñ┘ä┘ë ┘à┘å╪╡╪⌐ ╪º╪¡╪¬╪▒╪º┘ü┘è╪⌐╪ƒ",
      questionEn: "2. How can I transform my old website into a professional platform?",
      answerAr: "┘å┘é┘ê┘à ╪¿╪»╪▒╪º╪│╪⌐ ┘à┘ê┘é╪╣┘â ╪º┘ä╪¡╪º┘ä┘è ┘ê╪¬╪¡┘ä┘è┘ä ┘å┘é╪º╪╖ ╪º┘ä┘é┘ê╪⌐ ┘ê╪º┘ä╪╢╪╣┘ü╪î ╪½┘à ┘å┘é╪»┘à ╪«╪╖╪⌐ ╪¬╪╖┘ê┘è╪▒ ╪┤╪º┘à┘ä╪⌐ ╪¬╪¬╪╢┘à┘å ╪¬╪¡╪»┘è╪½ ╪º┘ä╪¬╪╡┘à┘è┘à╪î ╪¬╪¡╪│┘è┘å ╪º┘ä╪ú╪»╪º╪í╪î ┘ê╪Ñ╪╢╪º┘ü╪⌐ ┘à┘à┘è╪▓╪º╪¬ ╪¼╪»┘è╪»╪⌐ ╪¬┘å╪º╪│╪¿ ╪º╪¡╪¬┘è╪º╪¼╪º╪¬┘â.",
      answerEn: "We study your current website, analyze strengths and weaknesses, then provide a comprehensive development plan including design updates, performance improvements, and new features tailored to your needs."
    },
    {
      questionAr: "3. ┘à╪º ┘ç┘è ╪«┘è╪º╪▒╪º╪¬ ╪º┘ä╪¬╪│┘ê┘è┘é ╪º┘ä┘à╪¬╪º╪¡╪⌐ ┘ä╪»┘è┘â┘à╪ƒ",
      questionEn: "3. What marketing options are available?",
      answerAr: "┘å┘ê┘ü╪▒ ╪¡┘ä┘ê┘ä ╪¬╪│┘ê┘è┘é┘è╪⌐ ┘à╪¬┘â╪º┘à┘ä╪⌐ ╪¬╪┤┘à┘ä ╪º┘ä╪¬╪│┘ê┘è┘é ╪╣╪¿╪▒ ┘ê╪│╪º╪ª┘ä ╪º┘ä╪¬┘ê╪º╪╡┘ä ╪º┘ä╪º╪¼╪¬┘à╪º╪╣┘è╪î ╪¬╪¡╪│┘è┘å ┘à╪¡╪▒┘â╪º╪¬ ╪º┘ä╪¿╪¡╪½ SEO╪î ╪º┘ä╪Ñ╪╣┘ä╪º┘å╪º╪¬ ╪º┘ä┘à╪»┘ü┘ê╪╣╪⌐╪î ┘ê╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä╪¡┘à┘ä╪º╪¬ ╪º┘ä╪Ñ╪╣┘ä╪º┘å┘è╪⌐ ╪¿╪┤┘â┘ä ╪º╪¡╪¬╪▒╪º┘ü┘è.",
      answerEn: "We provide comprehensive marketing solutions including social media marketing, SEO optimization, paid advertising, and professional advertising campaign management."
    },
    {
      questionAr: "4. ┘ç┘ä ╪¬┘é╪»┘à┘ê┘å ╪╡┘è╪º┘å╪⌐ ┘ê╪»╪╣┘à ┘ü┘å┘è ╪¿╪╣╪» ╪¬╪│┘ä┘è┘à ╪º┘ä┘à╪┤╪▒┘ê╪╣╪ƒ",
      questionEn: "4. Do you provide maintenance and technical support after project delivery?",
      answerAr: "┘å╪╣┘à╪î ┘å┘ê┘ü╪▒ ╪«╪»┘à╪º╪¬ ╪╡┘è╪º┘å╪⌐ ┘ê╪»╪╣┘à ┘ü┘å┘è ┘à╪│╪¬┘à╪▒ ┘ä╪╢┘à╪º┘å ╪º╪│╪¬┘à╪▒╪º╪▒┘è╪⌐ ╪╣┘à┘ä ┘à╪┤╪▒┘ê╪╣┘â ╪¿┘â┘ü╪º╪í╪⌐ ╪╣╪º┘ä┘è╪⌐╪î ┘à╪╣ ╪Ñ┘à┘â╪º┘å┘è╪⌐ ╪º┘ä╪¬╪¡╪»┘è╪½ ┘ê╪º┘ä╪¬╪╖┘ê┘è╪▒ ╪º┘ä┘à╪│╪¬┘é╪¿┘ä┘è ╪¡╪│╪¿ ╪º╪¡╪¬┘è╪º╪¼╪º╪¬┘â.",
      answerEn: "Yes, we provide continuous maintenance and technical support to ensure your project runs efficiently, with the possibility of future updates and development according to your needs."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20" style={{ background: 'linear-gradient(to bottom, #93CAFF66, #FFFFFF)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
          
          {/* FAQ Content */}
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
              {currentLanguage === "ar" ? "╪º┘ä╪ú╪│╪ª┘ä╪⌐ ╪º┘ä╪┤╪º╪ª╪╣╪⌐" : "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
              {currentLanguage === "ar" 
                ? "┘ç┘ä ┘ä╪»┘è┘â ╪º╪│╪¬┘ü╪│╪º╪▒╪º╪¬ ╪¡┘ê┘ä ╪«╪»┘à╪º╪¬┘å╪º ╪º┘ä┘ä╪º╪¬╪¬╪▒╪⌐ ┘ê╪º┘ä╪¬╪│┘ê┘è┘é╪ƒ ┘ç┘å╪º ╪│╪¬╪¼╪» ╪Ñ╪¼╪º╪¿╪º╪¬ ┘ê╪º╪╢╪¡╪⌐ ┘ä╪ú┘â╪½╪▒ ╪º┘ä╪ú╪│╪ª┘ä╪⌐ ╪┤┘è┘ê╪╣╪º┘ï ╪¡┘ê┘ä ╪¬╪╖┘ê┘è╪▒ ╪º┘ä╪¬╪╖╪¿┘è┘é╪º╪¬╪î ╪¬╪╡┘à┘è┘à ╪º┘ä┘à┘ê╪º┘é╪╣╪î ╪º┘ä╪¬╪│┘ê┘è┘é ╪º┘ä╪▒┘é┘à┘è ╪Ñ╪░╪º ┘ä┘à ╪¬╪¼╪» ╪Ñ╪¼╪º╪¿╪¬┘â╪î ┘ä╪º ╪¬╪¬╪▒╪»╪» ┘ü┘è ╪º┘ä╪¬┘ê╪º╪╡┘ä ┘à╪╣┘å╪º!"
                : "Do you have questions about our latest services and marketing? Here you will find clear answers to the most common questions about app development, website design, and digital marketing. If you can't find your answer, don't hesitate to contact us!"
              }
            </p>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-b-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}
                  >
                    <span className="font-semibold text-primary text-lg flex-1">
                      {currentLanguage === "ar" ? faq.questionAr : faq.questionEn}
                    </span>
                    <div className={`
                      w-8 h-8 rounded-full  flex items-center justify-center
                      transition-all duration-300
                      ${openIndex === index ? 'bg-screens rotate-45' : 'bg-gray-100'}
                      ${currentLanguage === "ar" ? "mr-4" : "ml-4"}
                    `}>
                      <span className={`text-sm font-light ${openIndex === index ? 'text-white' : 'text-screens'}`}>
                        <FaPlus />
                      </span>
                    </div>
                  </button>
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
                      {currentLanguage === "ar" ? faq.answerAr : faq.answerEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 order-1 md:order-2">
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-screens rounded-full opacity-60 blur-2xl -z-10"></div>
              
              {/* Image Container */}
              <div className="">
                <img 
                  src={faqImage} 
                  alt="Devices mockup"
                  className="w-full h-auto rounded-2xl"
                  // style={{
                  //   minHeight: "400px",
                  //   objectFit: "contain",
                  //   background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%)"
                  // }}
                />
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full opacity-20 -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;
