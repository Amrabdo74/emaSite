import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { FaQuestionCircle, FaPlus, FaTimes, FaSpinner, FaPaperPlane, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import faqImage from '../assets/faqImage.png';

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

export default function FAQPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  const handleSendQuestion = async (e) => {
    e.preventDefault();
    if (!form.question.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'userQuestions'), {
        ...form,
        status: 'pending',
        createdAt: new Date(),
      });
      setSent(true);
      setForm({ name: '', email: '', question: '' });
      setTimeout(() => {
        setSent(false);
        setShowModal(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert(isArabic ? 'حدث خطأ، حاول مرة أخرى' : 'An error occurred, please try again');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF]/60 to-white" dir={isArabic ? 'rtl' : 'ltr'}>

      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-primary">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-screens/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full text-white/80 text-sm mb-6">
            <FaQuestionCircle />
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow">
            {isArabic ? 'كيف يمكننا مساعدتك؟' : 'How Can We Help You?'}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? 'هنا ستجد إجابات لأكثر الأسئلة شيوعاً. لم تجد ما تبحث عنه؟ أرسل سؤالك مباشرة!'
              : "Here you'll find answers to the most common questions. Didn't find what you're looking for? Send your question directly!"}
          </p>
        </div>
      </section>

      {/* ===== FAQ + Image ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* FAQ Accordion */}
            <div className="flex-1 order-2 lg:order-1" style={{ minWidth: 0 }}>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      openIndex === index
                        ? 'border-primary/30 shadow-md shadow-primary/10'
                        : 'border-gray-200 bg-white hover:border-primary/20'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-start gap-4 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-primary text-base md:text-lg flex-1">
                        {lang === 'ar' ? faq.questionAr : faq.questionEn}
                      </span>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'
                      }`}>
                        <FaChevronDown className="text-sm" />
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}>
                      <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                        {lang === 'ar' ? faq.answerAr : faq.answerEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image + CTA */}
            <div className="w-full lg:w-96 order-1 lg:order-2 flex-shrink-0">
              <div className="sticky top-8">
                <div className="relative mb-8">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-screens/30 rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                  <img
                    src={faqImage}
                    alt="FAQ"
                    className="w-full rounded-3xl shadow-xl relative z-10"
                  />
                </div>

                {/* "Have a question?" CTA Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-center text-white shadow-xl">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaQuestionCircle className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {isArabic ? 'هل لديك سؤال آخر؟' : 'Have Another Question?'}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {isArabic
                      ? 'لم تجد إجابة لسؤالك؟ أرسله لنا وسنجيب عليه!'
                      : "Didn't find your answer? Send us your question and we'll answer it!"}
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 bg-screens text-primary font-bold rounded-xl hover:bg-screens/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <FaPlus />
                    {isArabic ? 'إرسال سؤال' : 'Ask a Question'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== QUESTION MODAL ===== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
            >
              <FaTimes />
            </button>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {isArabic ? 'تم إرسال سؤالك!' : 'Question Sent!'}
                </h3>
                <p className="text-gray-500">
                  {isArabic ? 'سنقوم بالرد عليك في أقرب وقت ممكن.' : "We'll get back to you as soon as possible."}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {isArabic ? 'أرسل سؤالك' : 'Send Your Question'}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {isArabic ? 'فريقنا سيجيب عليك في أقرب وقت' : 'Our team will reply as soon as possible'}
                </p>

                <form onSubmit={handleSendQuestion} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? 'الاسم (اختياري)' : 'Name (optional)'}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition-shadow"
                        placeholder={isArabic ? 'اسمك' : 'Your name'}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition-shadow"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isArabic ? 'سؤالك *' : 'Your Question *'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.question}
                      onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 outline-none transition-shadow resize-none"
                      placeholder={isArabic ? 'اكتب سؤالك هنا...' : 'Write your question here...'}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !form.question.trim()}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                  >
                    {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                    {isArabic ? 'إرسال السؤال' : 'Send Question'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
