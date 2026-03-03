import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner, FaHome, FaStar, FaInfoCircle } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput';

const DEFAULT_DATA = {
  hero: {
    mainTitle: { ar: 'احصل على تجربة تقنية متكاملة', en: 'Get a Full Tech Experience' },
    mainDescription: {
      ar: 'نمكنك من اتخاذ قرارات تقنية أفضل، نحن حقاً مخططون محترفون للحلول التقنية.',
      en: 'We enable you to make better tech decisions. We are professional technology solution planners.'
    },
    exploreMore: { ar: 'استكشف المزيد', en: 'Explore More' },
  },
  about: {
    title: { ar: 'من نحن', en: 'About Us' },
    subtitle: { ar: 'إيما سوفت للبرمجيات', en: 'EMA Soft' },
    description1: {
      ar: 'فريق رائد في مجال تصميم وبرمجة الموقع والتسويق الالكتروني، بدأ خدماته منذ عام 2013.',
      en: 'A leading team in web design, programming and digital marketing, operating since 2013.'
    },
    description2: {
      ar: 'قدم خدماته التقنية لعدد كبير من العملاء والمؤسسات والمراكز والهيئات.',
      en: 'Served a large number of clients, institutions, centers and organizations.'
    },
  },
  features: [
    { titleAr: 'الابتكار', titleEn: 'Innovation', descriptionAr: 'تطوير حلول إبداعية تضمن تجربة أفضل للمستخدم.', descriptionEn: 'Developing creative solutions for a better user experience.' },
    { titleAr: 'أفضل الأسعار', titleEn: 'Best Prices', descriptionAr: 'نقدم خدمات عالية الجودة بأسعار تنافسية.', descriptionEn: 'High-quality services at competitive prices.' },
    { titleAr: 'الجودة', titleEn: 'Quality', descriptionAr: 'نحرص على تقديم أعلى معايير الجودة في كل جزء من الخدمة.', descriptionEn: 'We maintain the highest quality standards in every service.' },
    { titleAr: 'الإنجاز', titleEn: 'Achievement', descriptionAr: 'تنفيذ المهام في الوقت المحدد وتحقيق أهداف العملاء.', descriptionEn: 'Completing tasks on time and achieving client goals.' },
  ]
};

export default function HomePageContent() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [hero, setHero] = useState(DEFAULT_DATA.hero);
  const [about, setAbout] = useState(DEFAULT_DATA.about);
  const [features, setFeatures] = useState(DEFAULT_DATA.features);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'homePage', 'content');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.hero) setHero({ ...DEFAULT_DATA.hero, ...data.hero });
        if (data.about) setAbout({ ...DEFAULT_DATA.about, ...data.about });
        if (data.features && data.features.length === 4) setFeatures(data.features);
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, 'homePage', 'content'), {
        hero,
        about,
        features,
        updatedAt: new Date(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving home content:', error);
      alert(isArabic ? 'حدث خطأ أثناء الحفظ' : 'Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (index, field, lang, value) => {
    setFeatures(prev => prev.map((f, i) => i === index ? { ...f, [`${field}${lang === 'ar' ? 'Ar' : 'En'}`]: value } : f));
  };

  const tabs = [
    { id: 'hero', label: isArabic ? 'قسم الهيرو' : 'Hero Section', icon: FaHome },
    { id: 'features', label: isArabic ? 'بطاقات الميزات' : 'Feature Cards', icon: FaStar },
    { id: 'about', label: isArabic ? 'قسم من نحن' : 'About Section', icon: FaInfoCircle },
  ];

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FaHome /> {isArabic ? 'إدارة محتوى الصفحة الرئيسية' : 'Home Page Content'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isArabic ? 'التغييرات ستظهر فوراً في الموقع' : 'Changes will appear instantly on the website'}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
        </button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium">
          ✅ {isArabic ? 'تم الحفظ بنجاح! التغييرات ظاهرة الآن في الموقع.' : 'Saved successfully! Changes are now live on the website.'}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ===== HERO TAB ===== */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'العنوان الرئيسي' : 'Main Title'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان الرئيسي' : 'Main Title'}
                valueKey="mainTitle"
                formData={hero}
                setFormData={setHero}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'النص التعريفي' : 'Description'}
              </h2>
              <BilingualInput
                label={isArabic ? 'النص التعريفي' : 'Description'}
                valueKey="mainDescription"
                formData={hero}
                setFormData={setHero}
                isTextarea
                rows={4}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'نص زر "استكشف المزيد"' : '"Explore More" Button Text'}
              </h2>
              <BilingualInput
                label={isArabic ? 'نص الزر' : 'Button Text'}
                valueKey="exploreMore"
                formData={hero}
                setFormData={setHero}
                required
              />
            </div>
          </div>
        )}

        {/* ===== FEATURES TAB ===== */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{index + 1}</span>
                  {isArabic ? `بطاقة: ${feature.titleAr}` : `Card: ${feature.titleEn}`}
                </h2>

                {/* Title — bilingual */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-3">{isArabic ? 'العنوان' : 'Title'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">العنوان (عربي)</label>
                      <input
                        type="text"
                        value={feature.titleAr}
                        onChange={e => updateFeature(index, 'title', 'ar', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={feature.titleEn}
                        onChange={e => updateFeature(index, 'title', 'en', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Description — bilingual */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-3">{isArabic ? 'الوصف' : 'Description'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">الوصف (عربي)</label>
                      <textarea
                        rows={3}
                        value={feature.descriptionAr}
                        onChange={e => updateFeature(index, 'description', 'ar', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Description (English)</label>
                      <textarea
                        rows={3}
                        value={feature.descriptionEn}
                        onChange={e => updateFeature(index, 'description', 'en', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== ABOUT TAB ===== */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'عنوان القسم' : 'Section Title'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان الرئيسي' : 'Main Title'}
                valueKey="title"
                formData={about}
                setFormData={setAbout}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'العنوان الفرعي' : 'Subtitle'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان الفرعي' : 'Subtitle'}
                valueKey="subtitle"
                formData={about}
                setFormData={setAbout}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'الفقرة الأولى' : 'First Paragraph'}
              </h2>
              <BilingualInput
                label={isArabic ? 'الفقرة الأولى' : 'First Paragraph'}
                valueKey="description1"
                formData={about}
                setFormData={setAbout}
                isTextarea
                rows={4}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'الفقرة الثانية' : 'Second Paragraph'}
              </h2>
              <BilingualInput
                label={isArabic ? 'الفقرة الثانية' : 'Second Paragraph'}
                valueKey="description2"
                formData={about}
                setFormData={setAbout}
                isTextarea
                rows={4}
                required
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
