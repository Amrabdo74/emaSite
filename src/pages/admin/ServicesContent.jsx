import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner, FaPlus, FaTrash, FaTools, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DEFAULT_SERVICES = [
  {
    id: 'web_development',
    titleAr: 'تطوير المواقع والتطبيقات',
    titleEn: 'Website & App Development',
    shortDescAr: 'أفضل الحلول والعروض المتاحة لتصميم مواقع إلكترونية مميزة',
    shortDescEn: 'Best solutions and offers available for designing exceptional websites',
    descriptionAr: 'نقدم حلولاً شاملة لتطوير المواقع الإلكترونية والتطبيقات الذكية التي تلبي احتياجاتك التجارية. فريقنا المحترف يضمن تصميم مواقع سريعة، آمنة، وسهلة الاستخدام مع دعم كامل لجميع الأجهزة.',
    descriptionEn: 'We provide comprehensive solutions for developing websites and smart applications that meet your business needs. Our professional team ensures fast, secure, and user-friendly website designs with full support for all devices.',
    featuresAr: ['تصميم مواقع ويب احترافية متجاوبة', 'تطوير تطبيقات الهواتف الذكية (iOS & Android)', 'تحسين محركات البحث (SEO)', 'تكامل مع أنظمة الدفع الإلكتروني', 'صيانة وتحديث مستمر', 'دعم فني على مدار الساعة'],
    featuresEn: ['Professional responsive web design', 'Mobile app development (iOS & Android)', 'Search engine optimization (SEO)', 'E-payment system integration', 'Continuous maintenance and updates', '24/7 technical support'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: 'marketing',
    titleAr: 'الدعاية والإعلان والتسويق الإلكتروني',
    titleEn: 'Advertising & Digital Marketing',
    shortDescAr: 'إدارة الحملات الإعلانية والتسويق عبر وسائل التواصل الاجتماعي وتصميم الهوية البصرية',
    shortDescEn: 'Managing advertising campaigns, social media marketing, and visual identity design',
    descriptionAr: 'نطور استراتيجيات تسويق رقمي فعالة تساعدك على الوصول إلى جمهورك المستهدف وزيادة مبيعاتك. نقدم خدمات متكاملة تشمل إدارة وسائل التواصل الاجتماعي، الحملات الإعلانية، وتصميم الهوية البصرية.',
    descriptionEn: 'We develop effective digital marketing strategies that help you reach your target audience and increase your sales. We provide integrated services including social media management, advertising campaigns, and visual identity design.',
    featuresAr: ['إدارة حسابات وسائل التواصل الاجتماعي', 'حملات إعلانية على Google و Facebook', 'تصميم الهوية البصرية والشعارات', 'إنتاج محتوى تسويقي احترافي', 'تحليل الأداء والتقارير الشهرية', 'استراتيجيات تحسين معدل التحويل'],
    featuresEn: ['Social media account management', 'Google and Facebook advertising campaigns', 'Visual identity and logo design', 'Professional marketing content production', 'Performance analysis and monthly reports', 'Conversion rate optimization strategies'],
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  },
  {
    id: 'architectural_design',
    titleAr: 'التصميم المعماري والإنشائي',
    titleEn: 'Architectural & Structural Design',
    shortDescAr: 'تصميم معماري مبتكر وحلول إنشائية متكاملة للمشاريع السكنية والتجارية',
    shortDescEn: 'Innovative architectural design and integrated structural solutions for residential and commercial projects',
    descriptionAr: 'نقدم خدمات تصميم معماري وإنشائي متكاملة للمشاريع السكنية والتجارية. فريقنا من المهندسين المعماريين والإنشائيين يضمن تقديم حلول مبتكرة وآمنة تلبي أعلى معايير الجودة والاستدامة.',
    descriptionEn: 'We provide integrated architectural and structural design services for residential and commercial projects. Our team of architects and structural engineers ensures innovative and safe solutions that meet the highest standards of quality and sustainability.',
    featuresAr: ['تصميم معماري ثلاثي الأبعاد (3D)', 'رسومات إنشائية تفصيلية', 'دراسات الجدوى والتصاميم الأولية', 'إدارة المشاريع المعمارية', 'استشارات هندسية متخصصة', 'تصاميم مستدامة وصديقة للبيئة'],
    featuresEn: ['3D architectural design', 'Detailed structural drawings', 'Feasibility studies and preliminary designs', 'Architectural project management', 'Specialized engineering consultations', 'Sustainable and eco-friendly designs'],
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
  },
  {
    id: 'licensing',
    titleAr: 'قسم الرخص',
    titleEn: 'Licensing Department',
    shortDescAr: 'توفير جميع خدمات الرخص التي تحتاجها المنشآت والشركات مثل إصدار رخصة البلدية',
    shortDescEn: 'Providing all licensing services needed by establishments and companies such as municipal licenses',
    descriptionAr: 'نوفر جميع خدمات الرخص والتراخيص التي تحتاجها منشآتك وشركاتك. نساعدك في الحصول على جميع التراخيص المطلوبة بسرعة وسهولة، مع متابعة مستمرة لضمان تجديدها في الوقت المناسب.',
    descriptionEn: 'We provide all licensing and permit services your establishments and companies need. We help you obtain all required licenses quickly and easily, with continuous follow-up to ensure timely renewal.',
    featuresAr: ['إصدار رخص البلدية', 'شهادات السلامة والوقاية', 'كروت تشغيل المركبات', 'تراخيص المهن الحرة', 'تجديد التراخيص', 'استشارات قانونية وإدارية'],
    featuresEn: ['Municipal license issuance', 'Safety and prevention certificates', 'Vehicle operation cards', 'Freelance profession licenses', 'License renewal', 'Legal and administrative consultations'],
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
];

export default function ServicesContent() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const snap = await getDoc(doc(db, 'servicesPage', 'content'));
      if (snap.exists() && snap.data().services?.length > 0) {
        setServices(snap.data().services);
      }
    } catch (err) {
      console.error('Error fetching:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, 'servicesPage', 'content'), {
        services,
        updatedAt: new Date(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving:', err);
      alert(isArabic ? 'حدث خطأ أثناء الحفظ' : 'Error saving');
    } finally {
      setSaving(false);
    }
  };

  const updateService = (index, field, value) => {
    setServices(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const updateFeature = (svcIndex, lang, featIndex, value) => {
    const field = lang === 'ar' ? 'featuresAr' : 'featuresEn';
    setServices(prev => prev.map((s, i) => {
      if (i !== svcIndex) return s;
      const arr = [...(s[field] || [])];
      arr[featIndex] = value;
      return { ...s, [field]: arr };
    }));
  };

  const addFeature = (svcIndex, lang) => {
    const field = lang === 'ar' ? 'featuresAr' : 'featuresEn';
    setServices(prev => prev.map((s, i) => i === svcIndex ? { ...s, [field]: [...(s[field] || []), ''] } : s));
  };

  const removeFeature = (svcIndex, lang, featIndex) => {
    const field = lang === 'ar' ? 'featuresAr' : 'featuresEn';
    setServices(prev => prev.map((s, i) => {
      if (i !== svcIndex) return s;
      return { ...s, [field]: s[field].filter((_, j) => j !== featIndex) };
    }));
  };

  const addService = () => {
    const newSvc = { id: `service_${Date.now()}`, titleAr: '', titleEn: '', shortDescAr: '', shortDescEn: '', descriptionAr: '', descriptionEn: '', featuresAr: [''], featuresEn: [''], imageUrl: '' };
    setServices(prev => [...prev, newSvc]);
    setExpandedIndex(services.length);
  };

  const removeService = (index) => {
    if (services.length <= 1) return;
    if (!window.confirm(isArabic ? 'حذف هذه الخدمة؟' : 'Delete this service?')) return;
    setServices(prev => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  };

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
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FaTools /> {isArabic ? 'إدارة محتوى الخدمات' : 'Services Page Content'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isArabic ? 'التغييرات ستظهر في سكشن الخدمات بالرئيسية وصفحة الخدمات' : 'Changes appear in Home services section & Services page'}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {isArabic ? 'حفظ جميع التغييرات' : 'Save All Changes'}
        </button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium">
          ✅ {isArabic ? 'تم الحفظ! التغييرات ظاهرة الآن في الموقع.' : 'Saved! Changes are now live on the website.'}
        </div>
      )}

      {/* Services Accordion List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id || index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Accordion Header */}
            <div
              className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">{index + 1}</span>
                <div>
                  <p className="font-semibold text-gray-800">
                    {isArabic ? (service.titleAr || `خدمة ${index + 1}`) : (service.titleEn || `Service ${index + 1}`)}
                  </p>
                  <p className="text-xs text-gray-400">{isArabic ? service.shortDescAr : service.shortDescEn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeService(index); }}
                  disabled={services.length <= 1}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaTrash className="text-sm" />
                </button>
                {expandedIndex === index ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
              </div>
            </div>

            {/* Accordion Body */}
            {expandedIndex === index && (
              <div className="border-t border-gray-100 p-5 space-y-6">

                {/* Titles */}
                <FieldGroup label={isArabic ? 'العنوان' : 'Title'}>
                  <BiField
                    labelAr="العنوان (عربي)" labelEn="Title (English)"
                    valueAr={service.titleAr} valueEn={service.titleEn}
                    onChangeAr={v => updateService(index, 'titleAr', v)}
                    onChangeEn={v => updateService(index, 'titleEn', v)}
                  />
                </FieldGroup>

                {/* Short Description */}
                <FieldGroup label={isArabic ? 'الوصف القصير (يظهر في كارد الرئيسية)' : 'Short Description (Home page card)'}>
                  <BiField
                    labelAr="الوصف القصير (عربي)" labelEn="Short Description (English)"
                    valueAr={service.shortDescAr} valueEn={service.shortDescEn}
                    onChangeAr={v => updateService(index, 'shortDescAr', v)}
                    onChangeEn={v => updateService(index, 'shortDescEn', v)}
                    multiline
                  />
                </FieldGroup>

                {/* Full Description */}
                <FieldGroup label={isArabic ? 'الوصف التفصيلي (صفحة الخدمات)' : 'Full Description (Services page)'}>
                  <BiField
                    labelAr="الوصف التفصيلي (عربي)" labelEn="Full Description (English)"
                    valueAr={service.descriptionAr} valueEn={service.descriptionEn}
                    onChangeAr={v => updateService(index, 'descriptionAr', v)}
                    onChangeEn={v => updateService(index, 'descriptionEn', v)}
                    multiline rows={4}
                  />
                </FieldGroup>

                {/* Image URL */}
                <FieldGroup label={isArabic ? 'رابط الصورة' : 'Image URL'}>
                  <input
                    type="text"
                    value={service.imageUrl || ''}
                    onChange={e => updateService(index, 'imageUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none text-sm"
                    dir="ltr"
                    placeholder="https://..."
                  />
                  {service.imageUrl && (
                    <img src={service.imageUrl} alt="preview" className="mt-2 h-24 w-48 object-cover rounded-lg border" onError={e => e.target.style.display = 'none'} />
                  )}
                </FieldGroup>

                {/* Features */}
                <FieldGroup label={isArabic ? 'الميزات / ما نقدمه' : 'Features / What We Offer'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Arabic Features */}
                    <div>
                      <p className="text-sm text-gray-500 mb-2">الميزات (عربي)</p>
                      <div className="space-y-2">
                        {(service.featuresAr || []).map((feat, fi) => (
                          <div key={fi} className="flex gap-2 items-center">
                            <input type="text" value={feat} onChange={e => updateFeature(index, 'ar', fi, e.target.value)}
                              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30" dir="rtl" />
                            <button onClick={() => removeFeature(index, 'ar', fi)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addFeature(index, 'ar')} className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                          <FaPlus className="text-xs" /> إضافة ميزة
                        </button>
                      </div>
                    </div>
                    {/* English Features */}
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features (English)</p>
                      <div className="space-y-2">
                        {(service.featuresEn || []).map((feat, fi) => (
                          <div key={fi} className="flex gap-2 items-center">
                            <input type="text" value={feat} onChange={e => updateFeature(index, 'en', fi, e.target.value)}
                              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30" dir="ltr" />
                            <button onClick={() => removeFeature(index, 'en', fi)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addFeature(index, 'en')} className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                          <FaPlus className="text-xs" /> Add feature
                        </button>
                      </div>
                    </div>
                  </div>
                </FieldGroup>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Service Button */}
      <button
        onClick={addService}
        className="mt-6 w-full py-4 border-2 border-dashed border-primary/40 text-primary font-medium rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
      >
        <FaPlus /> {isArabic ? 'إضافة خدمة جديدة' : 'Add New Service'}
      </button>

      {/* Bottom Save */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 text-lg"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {isArabic ? 'حفظ جميع التغييرات' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────
function FieldGroup({ label, children }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-3 border-b pb-1">{label}</p>
      {children}
    </div>
  );
}

function BiField({ labelAr, labelEn, valueAr, valueEn, onChangeAr, onChangeEn, multiline = false, rows = 3 }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">{labelAr}</label>
        <Tag rows={rows} value={valueAr || ''} onChange={e => onChangeAr(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none text-sm resize-none" dir="rtl" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">{labelEn}</label>
        <Tag rows={rows} value={valueEn || ''} onChange={e => onChangeEn(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none text-sm resize-none" dir="ltr" />
      </div>
    </div>
  );
}
