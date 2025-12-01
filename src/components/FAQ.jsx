import { useState } from 'react';
import faqImage from '../assets/faqImage.png'
import { FaPlus } from 'react-icons/fa';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  // يمكنك تغيير اللغة من هنا
  const currentLanguage = "ar"; // أو "en"

  const faqs = [
    {
      questionAr: "1. ما هي متطلبات بدء مشروع برمجي معنا؟",
      questionEn: "1. What are the requirements to start a software project with us?",
      answerAr: "كل ما تحتاجه هو فكرة مشروعك أو متطلباتك الأساسية. نقوم بتحليلها، ووضع خطة للتنفيذ، وتحديد عرض سعر شامل بالتفاصيل الهامة والحلول التقنية المناسبة وأفضل الحلول التقنية المتقدمة.",
      answerEn: "All you need is your project idea or basic requirements. We analyze them, create an implementation plan, and provide a comprehensive quote with important details and appropriate advanced technical solutions."
    },
    {
      questionAr: "2. كيف يمكنني تحويل موقعي القديم إلى منصة احترافية؟",
      questionEn: "2. How can I transform my old website into a professional platform?",
      answerAr: "نقوم بدراسة موقعك الحالي وتحليل نقاط القوة والضعف، ثم نقدم خطة تطوير شاملة تتضمن تحديث التصميم، تحسين الأداء، وإضافة مميزات جديدة تناسب احتياجاتك.",
      answerEn: "We study your current website, analyze strengths and weaknesses, then provide a comprehensive development plan including design updates, performance improvements, and new features tailored to your needs."
    },
    {
      questionAr: "3. ما هي خيارات التسويق المتاحة لديكم؟",
      questionEn: "3. What marketing options are available?",
      answerAr: "نوفر حلول تسويقية متكاملة تشمل التسويق عبر وسائل التواصل الاجتماعي، تحسين محركات البحث SEO، الإعلانات المدفوعة، وإدارة الحملات الإعلانية بشكل احترافي.",
      answerEn: "We provide comprehensive marketing solutions including social media marketing, SEO optimization, paid advertising, and professional advertising campaign management."
    },
    {
      questionAr: "4. هل تقدمون صيانة ودعم فني بعد تسليم المشروع؟",
      questionEn: "4. Do you provide maintenance and technical support after project delivery?",
      answerAr: "نعم، نوفر خدمات صيانة ودعم فني مستمر لضمان استمرارية عمل مشروعك بكفاءة عالية، مع إمكانية التحديث والتطوير المستقبلي حسب احتياجاتك.",
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
              {currentLanguage === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
              {currentLanguage === "ar" 
                ? "هل لديك استفسارات حول خدماتنا اللاتترة والتسويق؟ هنا ستجد إجابات واضحة لأكثر الأسئلة شيوعاً حول تطوير التطبيقات، تصميم المواقع، التسويق الرقمي إذا لم تجد إجابتك، لا تتردد في التواصل معنا!"
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