import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import faqImage from '../assets/faqImage.png'
import { FaPlus, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DEFAULT_FAQS = [
  { id: 'default_1', questionAr: 'ما هي متطلبات بدء مشروع برمجي معنا؟', questionEn: 'What are the requirements to start a software project with us?', answerAr: 'كل ما تحتاجه هو فكرة مشروعك أو متطلباتك الأساسية. نقوم بتحليلها ووضع خطة للتنفيذ، وتحديد عرض سعر شامل بالتفاصيل الهامة والحلول التقنية المناسبة وأفضل الحلول التقنية المتقدمة.', answerEn: 'All you need is your project idea or basic requirements. We analyze them, create an implementation plan, and provide a comprehensive quote with important details and appropriate advanced technical solutions.', order: 0 },
  { id: 'default_2', questionAr: 'كيف يمكنني تحويل موقعي القديم إلى منصة احترافية؟', questionEn: 'How can I transform my old website into a professional platform?', answerAr: 'نقوم بدراسة موقعك الحالي وتحليل نقاط القوة والضعف، ثم نقدم خطة تطوير شاملة تتضمن تحديث التصميم، تحسين الأداء، وإضافة مميزات جديدة تناسب احتياجاتك.', answerEn: 'We study your current website, analyze strengths and weaknesses, then provide a comprehensive development plan including design updates, performance improvements, and new features tailored to your needs.', order: 1 },
  { id: 'default_3', questionAr: 'ما هي خيارات التسويق المتاحة لديكم؟', questionEn: 'What marketing options are available?', answerAr: 'نوفر حلول تسويقية متكاملة تشمل التسويق عبر وسائل التواصل الاجتماعي، تحسين محركات البحث SEO، الإعلانات المدفوعة، وإدارة الحملات الإعلانية بشكل احترافي.', answerEn: 'We provide comprehensive marketing solutions including social media marketing, SEO optimization, paid advertising, and professional advertising campaign management.', order: 2 },
  { id: 'default_4', questionAr: 'هل تقدمون صيانة ودعم فني بعد تسليم المشروع؟', questionEn: 'Do you provide maintenance and technical support after project delivery?', answerAr: 'نعم، نوفر خدمات صيانة ودعم فني مستمر لضمان استمرارية عمل مشروعك بكفاءة عالية، مع إمكانية التحديث والتطوير المستقبلي حسب احتياجاتك.', answerEn: 'Yes, we provide continuous maintenance and technical support to ensure your project runs efficiently, with the possibility of future updates and development according to your needs.', order: 3 },
];

const seedDefaultFaqs = async () => {
  for (const faq of DEFAULT_FAQS) {
    const { id, ...data } = faq;
    try {
      await setDoc(doc(db, 'faqItems', id), { ...data, isDefault: true, createdAt: new Date() }, { merge: true });
    } catch (e) {
      // ignore
    }
  }
};

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? 'ar' : 'en';
  const isRtl = currentLanguage === 'ar';

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    seedDefaultFaqs();
    const unsub = onSnapshot(collection(db, 'faqItems'), (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setFaqs(data);
      } else {
        setFaqs(DEFAULT_FAQS);
      }
    });
    return () => unsub();
  }, []);

  // Show max 4 FAQs on homepage
  const displayedFaqs = faqs.slice(0, 4);

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
                ? "هل لديك استفسارات حول خدماتنا؟ هنا ستجد إجابات واضحة لأكثر الأسئلة شيوعاً."
                : "Do you have questions about our services? Here you will find clear answers to the most common questions."
              }
            </p>

            <div className="space-y-3">
              {displayedFaqs.map((faq, index) => (
                <div
                  key={faq.id}
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
                      w-8 h-8 rounded-full flex items-center justify-center
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
                      {currentLanguage === "ar" ? faq.answerAr : faq.answerEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All FAQs Link */}
            <div className="mt-6" style={{ textAlign: currentLanguage === "ar" ? "right" : "left" }}>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group"
              >
                {currentLanguage === "ar" ? "عرض جميع الأسئلة" : "View All Questions"}
                {isRtl ? (
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 order-1 md:order-2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-screens rounded-full opacity-60 blur-2xl -z-10"></div>
              <div className="">
                <img
                  src={faqImage}
                  alt="Devices mockup"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary rounded-full opacity-20 -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;