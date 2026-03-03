import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner, FaInfoCircle, FaBullseye, FaEye, FaStar } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput';

const DEFAULT_DATA = {
  aboutUsSection: {
    aboutUs: { ar: 'عن شركتنا', en: 'About Our Company' },
    mainTitle: { ar: 'فريق إيــــــما', en: 'EMA Team' },
    subTitle: { ar: 'للاستشارات التكنولوجيه', en: 'For Technology Consulting' },
    description: { ar: 'هدفنا هو تحقيق أفضل النتائج التكنولوجيه لعملائنا عبر إستراتيجيات مدروسة', en: 'Our goal is to achieve the best technological results for our clients through well-studied strategies.' },
  },
  mission: {
    title: { ar: 'الهدف', en: 'Mission' },
    text: { ar: 'نحن نكون الشريك الثقة والتسويق الأول للشركات وأصحاب الأعمال.', en: 'We are the trusted partner for companies and business owners.' },
  },
  vision: {
    title: { ar: 'الرسالة', en: 'Vision' },
    text: { ar: 'نقدم حلول برمجية مبتكرة واستراتيجيات تسويق فعالة مبنية على تحليل دقيق لاحتياجات العميل.', en: 'We provide innovative software solutions and effective marketing strategies built on precise analysis of client needs.' },
  },
  experience: {
    years: '+10',
    yearsText: { ar: 'سنوات في تقديم حلول واستشارات.', en: 'Years of solutions & consulting.' },
    mainTitle: { ar: 'نقدم حلول برمجية مبتكرة واستراتيجيات تسويق فعالة.', en: 'We provide innovative software solutions and effective marketing strategies.' },
    description: { ar: 'هدفنا نسهل على أصحاب البزنس إدارة شغلهم، ونساعدهم يوصلوا لعملائهم بشكل أسرع وأذكى.', en: 'We help business owners manage their work and reach their clients faster and smarter.' },
    leftTitle: { ar: 'نقدم حلول برمجية مبتكرة واستراتيجيات تسويق فعالة.', en: 'Innovative software and effective marketing strategies.' },
  },
};

export default function AboutPageContent() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [aboutUsSection, setAboutUsSection] = useState(DEFAULT_DATA.aboutUsSection);
  const [mission, setMission] = useState(DEFAULT_DATA.mission);
  const [vision, setVision] = useState(DEFAULT_DATA.vision);
  const [experience, setExperience] = useState(DEFAULT_DATA.experience);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'aboutPage', 'content');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.aboutUsSection) setAboutUsSection({ ...DEFAULT_DATA.aboutUsSection, ...data.aboutUsSection });
        if (data.mission) setMission({ ...DEFAULT_DATA.mission, ...data.mission });
        if (data.vision) setVision({ ...DEFAULT_DATA.vision, ...data.vision });
        if (data.experience) setExperience({ ...DEFAULT_DATA.experience, ...data.experience });
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, 'aboutPage', 'content'), {
        aboutUsSection,
        mission,
        vision,
        experience,
        updatedAt: new Date(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving about content:', error);
      alert(isArabic ? 'حدث خطأ أثناء الحفظ' : 'Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'hero', label: isArabic ? 'قسم الهيرو' : 'Hero Section', icon: FaInfoCircle },
    { id: 'mission', label: isArabic ? 'الهدف' : 'Mission', icon: FaBullseye },
    { id: 'vision', label: isArabic ? 'الرسالة' : 'Vision', icon: FaEye },
    { id: 'experience', label: isArabic ? 'الخبرة' : 'Experience', icon: FaStar },
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
            <FaInfoCircle /> {isArabic ? 'إدارة محتوى صفحة "من نحن"' : 'About Page Content'}
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
      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
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

        {/* ===== HERO / About Us Section TAB ===== */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'تسمية القسم (شارة صغيرة)' : 'Section Badge Label'}
              </h2>
              <BilingualInput
                label={isArabic ? 'تسمية القسم' : 'Section Badge'}
                valueKey="aboutUs"
                formData={aboutUsSection}
                setFormData={setAboutUsSection}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'العنوان الرئيسي' : 'Main Title'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان الرئيسي' : 'Main Title'}
                valueKey="mainTitle"
                formData={aboutUsSection}
                setFormData={setAboutUsSection}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'العنوان الفرعي' : 'Subtitle'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان الفرعي' : 'Subtitle'}
                valueKey="subTitle"
                formData={aboutUsSection}
                setFormData={setAboutUsSection}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'الوصف' : 'Description'}
              </h2>
              <BilingualInput
                label={isArabic ? 'الوصف' : 'Description'}
                valueKey="description"
                formData={aboutUsSection}
                setFormData={setAboutUsSection}
                isTextarea
                rows={4}
                required
              />
            </div>
          </div>
        )}

        {/* ===== MISSION TAB ===== */}
        {activeTab === 'mission' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'عنوان قسم الهدف' : 'Mission Title'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان' : 'Title'}
                valueKey="title"
                formData={mission}
                setFormData={setMission}
                required
              />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'نص الهدف' : 'Mission Text'}
              </h2>
              <BilingualInput
                label={isArabic ? 'النص' : 'Text'}
                valueKey="text"
                formData={mission}
                setFormData={setMission}
                isTextarea
                rows={5}
                required
              />
            </div>
          </div>
        )}

        {/* ===== VISION TAB ===== */}
        {activeTab === 'vision' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'عنوان قسم الرسالة' : 'Vision Title'}
              </h2>
              <BilingualInput
                label={isArabic ? 'العنوان' : 'Title'}
                valueKey="title"
                formData={vision}
                setFormData={setVision}
                required
              />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'نص الرسالة' : 'Vision Text'}
              </h2>
              <BilingualInput
                label={isArabic ? 'النص' : 'Text'}
                valueKey="text"
                formData={vision}
                setFormData={setVision}
                isTextarea
                rows={5}
                required
              />
            </div>
          </div>
        )}

        {/* ===== EXPERIENCE TAB ===== */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'عدد سنوات الخبرة' : 'Years of Experience'}
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isArabic ? 'الرقم (مثال: +10)' : 'Number (e.g. +10)'}
                </label>
                <input
                  type="text"
                  value={experience.years}
                  onChange={e => setExperience(prev => ({ ...prev, years: e.target.value }))}
                  className="w-full max-w-xs px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'نص السنوات' : 'Years Text'}
              </h2>
              <BilingualInput
                label={isArabic ? 'نص السنوات' : 'Years Text'}
                valueKey="yearsText"
                formData={experience}
                setFormData={setExperience}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'النص الرئيسي (يسار)' : 'Main Text (left side)'}
              </h2>
              <BilingualInput
                label={isArabic ? 'النص الرئيسي' : 'Main Title'}
                valueKey="mainTitle"
                formData={experience}
                setFormData={setExperience}
                isTextarea
                rows={3}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'نص الوصف' : 'Description'}
              </h2>
              <BilingualInput
                label={isArabic ? 'الوصف' : 'Description'}
                valueKey="description"
                formData={experience}
                setFormData={setExperience}
                isTextarea
                rows={4}
                required
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                {isArabic ? 'النص السفلي (يمين)' : 'Bottom Text (right side)'}
              </h2>
              <BilingualInput
                label={isArabic ? 'النص السفلي' : 'Bottom Text'}
                valueKey="leftTitle"
                formData={experience}
                setFormData={setExperience}
                isTextarea
                rows={3}
                required
              />
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
