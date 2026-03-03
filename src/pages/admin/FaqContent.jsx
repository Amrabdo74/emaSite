import { useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import {
  FaSave, FaSpinner, FaPlus, FaTrash, FaEdit, FaTimes,
  FaQuestionCircle, FaInbox, FaCheck, FaTags
} from 'react-icons/fa';

const DEFAULT_FAQS = [
  { id: 'default_1', questionAr: 'ما هي متطلبات بدء مشروع برمجي معنا؟', questionEn: 'What are the requirements to start a software project with us?', answerAr: 'كل ما تحتاجه هو فكرة مشروعك أو متطلباتك الأساسية. نقوم بتحليلها ووضع خطة للتنفيذ وتحديد عرض سعر شامل.', answerEn: 'All you need is your project idea or basic requirements. We analyze them and create a comprehensive implementation plan.', order: 0 },
  { id: 'default_2', questionAr: 'كيف يمكنني تحويل موقعي القديم إلى منصة احترافية؟', questionEn: 'How can I transform my old website into a professional platform?', answerAr: 'نقوم بدراسة موقعك الحالي وتحليل نقاط القوة والضعف، ثم نقدم خطة تطوير شاملة تتضمن تحديث التصميم وتحسين الأداء وإضافة مميزات جديدة.', answerEn: 'We study your current website, analyze strengths and weaknesses, then provide a comprehensive development plan including design updates, performance improvements, and new features.', order: 1 },
  { id: 'default_3', questionAr: 'ما هي خيارات التسويق المتاحة لديكم؟', questionEn: 'What marketing options are available?', answerAr: 'نوفر حلول تسويقية متكاملة تشمل التسويق عبر وسائل التواصل الاجتماعي وتحسين محركات البحث SEO والإعلانات المدفوعة.', answerEn: 'We provide comprehensive marketing solutions including social media marketing, SEO optimization, and paid advertising campaigns.', order: 2 },
  { id: 'default_4', questionAr: 'هل تقدمون صيانة ودعم فني بعد تسليم المشروع؟', questionEn: 'Do you provide maintenance and technical support after project delivery?', answerAr: 'نعم، نوفر خدمات صيانة ودعم فني مستمر لضمان استمرارية عمل مشروعك بكفاءة عالية، مع إمكانية التحديث والتطوير المستقبلي.', answerEn: 'Yes, we provide continuous maintenance and technical support to ensure your project runs efficiently, with possibilities for future updates and development.', order: 3 },
];

// Seed default FAQs with fixed IDs so they are always present and can't be permanently deleted
const seedDefaultFaqs = async () => {
  for (const faq of DEFAULT_FAQS) {
    const { id, ...data } = faq;
    await setDoc(doc(db, 'faqItems', id), { ...data, isDefault: true, createdAt: new Date() }, { merge: true });
  }
};

export default function FaqContent() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [activeTab, setActiveTab] = useState('faqs');
  const [faqs, setFaqs] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaq, setNewFaq] = useState({ questionAr: '', questionEn: '', answerAr: '', answerEn: '' });

  useEffect(() => {
    // Always ensure default FAQs exist in Firestore
    seedDefaultFaqs();

    const unsubFaqs = onSnapshot(collection(db, 'faqItems'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setFaqs(data);
      setLoading(false);
    });

    const unsubQ = onSnapshot(collection(db, 'userQuestions'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setUserQuestions(data);
    });

    return () => { unsubFaqs(); unsubQ(); };
  }, []);




  const handleAddFaq = async () => {
    if (!newFaq.questionAr.trim()) return;
    setSaving('new');
    try {
      await addDoc(collection(db, 'faqItems'), {
        ...newFaq,
        order: faqs.length,
        createdAt: new Date(),
      });
      setNewFaq({ questionAr: '', questionEn: '', answerAr: '', answerEn: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      alert(isArabic ? 'خطأ في الإضافة' : 'Error adding FAQ');
    } finally {
      setSaving(null);
    }
  };

  const handleUpdateFaq = async (faq) => {
    setSaving(faq.id);
    try {
      await setDoc(doc(db, 'faqItems', faq.id), faq);
      setEditingFaq(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm(isArabic ? 'هل تريد حذف هذا السؤال؟' : 'Delete this FAQ?')) return;
    try {
      await deleteDoc(doc(db, 'faqItems', id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerQuestion = async (q, answer) => {
    setSaving(q.id);
    try {
      await updateDoc(doc(db, 'userQuestions', q.id), {
        answer,
        answeredAt: new Date(),
        status: 'answered',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm(isArabic ? 'حذف هذا السؤال؟' : 'Delete this question?')) return;
    try {
      await deleteDoc(doc(db, 'userQuestions', id));
    } catch (err) {
      console.error(err);
    }
  };

  const pendingCount = userQuestions.filter(q => q.status !== 'answered').length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaQuestionCircle /> {isArabic ? 'إدارة الأسئلة الشائعة' : 'FAQ Management'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isArabic ? 'إدارة الأسئلة الشائعة وأسئلة الزوار' : 'Manage FAQs and visitor questions'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === 'faqs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FaTags /> {isArabic ? 'الأسئلة الشائعة' : 'FAQs'}
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{faqs.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === 'questions' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FaInbox /> {isArabic ? 'أسئلة الزوار' : 'Visitor Questions'}
          {pendingCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>
          )}
        </button>
      </div>

      {/* ===== FAQS TAB ===== */}
      {activeTab === 'faqs' && (
        <div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FaPlus /> {isArabic ? 'إضافة سؤال جديد' : 'Add New FAQ'}
            </button>
          )}

          {showAddForm && (
            <div className="mb-6 bg-white rounded-xl border-2 border-primary/30 shadow-sm p-6">
              <h3 className="text-lg font-bold text-primary mb-4">{isArabic ? 'إضافة سؤال جديد' : 'Add New FAQ'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">السؤال (عربي) *</label>
                    <input type="text" value={newFaq.questionAr} onChange={e => setNewFaq(p => ({ ...p, questionAr: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none" dir="rtl" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Question (English)</label>
                    <input type="text" value={newFaq.questionEn} onChange={e => setNewFaq(p => ({ ...p, questionEn: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none" dir="ltr" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">الإجابة (عربي) *</label>
                    <textarea rows={4} value={newFaq.answerAr} onChange={e => setNewFaq(p => ({ ...p, answerAr: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none resize-none" dir="rtl" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Answer (English)</label>
                    <textarea rows={4} value={newFaq.answerEn} onChange={e => setNewFaq(p => ({ ...p, answerEn: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none resize-none" dir="ltr" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddFaq} disabled={saving === 'new' || !newFaq.questionAr.trim()}
                    className="flex items-center gap-2 px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors">
                    {saving === 'new' ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    {isArabic ? 'حفظ' : 'Save'}
                  </button>
                  <button onClick={() => { setShowAddForm(false); setNewFaq({ questionAr: '', questionEn: '', answerAr: '', answerEn: '' }); }}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <FaTimes /> {isArabic ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                {editingFaq?.id === faq.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">السؤال (عربي)</label>
                        <input type="text" value={editingFaq.questionAr} onChange={e => setEditingFaq(p => ({ ...p, questionAr: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" dir="rtl" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Question (English)</label>
                        <input type="text" value={editingFaq.questionEn} onChange={e => setEditingFaq(p => ({ ...p, questionEn: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">الإجابة (عربي)</label>
                        <textarea rows={4} value={editingFaq.answerAr} onChange={e => setEditingFaq(p => ({ ...p, answerAr: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none" dir="rtl" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Answer (English)</label>
                        <textarea rows={4} value={editingFaq.answerEn} onChange={e => setEditingFaq(p => ({ ...p, answerEn: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none" dir="ltr" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleUpdateFaq(editingFaq)} disabled={saving === faq.id}
                        className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors font-medium">
                        {saving === faq.id ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        {isArabic ? 'حفظ' : 'Save'}
                      </button>
                      <button onClick={() => setEditingFaq(null)}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        <FaTimes /> {isArabic ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{index + 1}</span>
                        <p className="font-semibold text-gray-800">{isArabic ? faq.questionAr : faq.questionEn}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0 ms-3">
                        <button onClick={() => setEditingFaq({ ...faq })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <FaEdit />
                        </button>
                        {faq.id && !faq.id.startsWith('default_') && (
                          <button onClick={() => handleDeleteFaq(faq.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
                      {isArabic ? faq.answerAr : faq.answerEn}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== USER QUESTIONS TAB ===== */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {userQuestions.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <FaInbox className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{isArabic ? 'لا توجد أسئلة من الزوار حتى الآن' : 'No visitor questions yet'}</p>
            </div>
          )}
          {userQuestions.map((q) => (
            <UserQuestionCard
              key={q.id}
              q={q}
              isArabic={isArabic}
              saving={saving}
              onAnswer={handleAnswerQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
function UserQuestionCard({ q, isArabic, saving, onAnswer, onDelete }) {
  const [answer, setAnswer] = useState(q.answer || '');
  const [editing, setEditing] = useState(!q.answer);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(q.publishedAsFaq || false);

  const handlePublishAsFaq = async () => {
    if (!q.answer) return;
    setPublishing(true);
    try {
      await addDoc(collection(db, 'faqItems'), {
        questionAr: q.question,
        questionEn: q.question,
        answerAr: q.answer,
        answerEn: q.answer,
        order: Date.now(),
        createdAt: new Date(),
        fromUserQuestion: q.id,
      });
      await updateDoc(doc(db, 'userQuestions', q.id), { publishedAsFaq: true });
      setPublished(true);
    } catch (err) {
      console.error(err);
      alert(isArabic ? 'خطأ في النشر' : 'Publishing error');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl border shadow-sm p-5 ${q.status === 'answered' ? 'border-green-200' : 'border-orange-200'}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${q.status === 'answered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {q.status === 'answered' ? (isArabic ? '✓ تمت الإجابة' : '✓ Answered') : (isArabic ? '⏳ بانتظار الرد' : '⏳ Pending')}
            </span>
            {published && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {isArabic ? '📌 منشور كسؤال شائع' : '📌 Published as FAQ'}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {q.createdAt?.toDate?.()?.toLocaleDateString(isArabic ? 'ar-EG' : 'en-GB') || ''}
            </span>
          </div>
          <p className="font-semibold text-gray-800">
            {q.name && <span className="text-primary">{q.name}: </span>}
            {q.question}
          </p>
          {q.email && <p className="text-xs text-gray-400 mt-1">{q.email}</p>}
        </div>
        <button onClick={() => onDelete(q.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 ms-3">
          <FaTrash />
        </button>
      </div>

      {/* Answer Section */}
      {editing ? (
        <div className="mt-3">
          <label className="block text-sm text-gray-600 mb-1">{isArabic ? 'الإجابة' : 'Answer'}</label>
          <textarea
            rows={3}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            dir={isArabic ? 'rtl' : 'ltr'}
            placeholder={isArabic ? 'اكتب إجابتك هنا...' : 'Write your answer here...'}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { onAnswer(q, answer); setEditing(false); }}
              disabled={saving === q.id || !answer.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors text-sm font-medium"
            >
              {saving === q.id ? <FaSpinner className="animate-spin" /> : <FaCheck />}
              {isArabic ? 'إرسال الرد' : 'Send Reply'}
            </button>
            {q.answer && (
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                {isArabic ? 'إلغاء' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-3">
          {/* Existing answer */}
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
            <p className="text-sm text-green-800">{q.answer}</p>
            <button onClick={() => setEditing(true)} className="text-xs text-primary mt-2 hover:underline flex items-center gap-1">
              <FaEdit /> {isArabic ? 'تعديل الرد' : 'Edit Reply'}
            </button>
          </div>

          {/* Publish as FAQ */}
          {!published ? (
            <button
              onClick={handlePublishAsFaq}
              disabled={publishing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm font-medium"
            >
              {publishing ? <FaSpinner className="animate-spin" /> : <FaTags />}
              {isArabic ? '📌 نشر كسؤال شائع على الموقع' : '📌 Publish as Public FAQ'}
            </button>
          ) : (
            <p className="text-sm text-blue-600 flex items-center gap-2">
              <FaTags /> {isArabic ? 'تم النشر على صفحة الأسئلة الشائعة ✓' : 'Published to FAQ page ✓'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
