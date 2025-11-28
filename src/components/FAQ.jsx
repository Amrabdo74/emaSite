import { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "ما هي متطلبات بدء مشروع برمجي معنا ؟",
      answer: "كل ما تحتاجه هو فكرة مشروعك أو مشكلتك الأساسية ونقوم نحن بتحليلها، وضع خطة تنفيذ، وتقديم عرض سعر شامل يشمل الوقت والتكلفة وأفضل الحلول التقنية المقترحة."
    },
    {
      question: "كيف يمكنني تحويل موقعي القديم إلى منصة احترافية؟",
      answer: "نقوم بتحليل موقعك الحالي وتحديد نقاط التحسين، ثم نقدم خطة شاملة لتطويره وتحويله إلى منصة احترافية حديثة."
    },
    {
      question: "ما هي خيارات التسويق المتاحة لديكم؟",
      answer: "نقدم خدمات التسويق الرقمي الشاملة بما في ذلك إدارة الحملات الإعلانية على وسائل التواصل الاجتماعي، تحسين محركات البحث (SEO)، والتسويق بالمحتوى."
    },
    {
      question: "هل تقدمون صيانة ودعم فني بعد تسليم المشروع؟",
      answer: "نعم، نقدم خدمات الصيانة والدعم الفني المستمر بعد تسليم المشروع لضمان استمرارية عمل موقعك أو تطبيقك بكفاءة عالية."
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* FAQ Content */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-right mb-6">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-gray-700 text-right mb-8 leading-relaxed">
              هل لديك استفسارات حول خدماتنا التقنية والتسويقية؟ هنا ستجد إجابات واضحة لأكثر الأسئلة شيوعا حول تطوير التطبيقات، تصميم المواقع التسويق الرقمي إذا لم تجد إجابتك، لا تتردد في التواصل معنا؟
            </p>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-right flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  >
                    <span className="font-semibold text-blue-900 flex-1">{faq.question}</span>
                    <span className="text-orange-500 text-2xl font-bold ml-4">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed text-right">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg">صورة الأجهزة</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;

