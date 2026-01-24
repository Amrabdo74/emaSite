import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput'; 
import { WORKPLACE_TYPES, JOB_TYPES, CONTRACT_TYPES, SOCIAL_LINKS_CONFIG } from '../../constants/jobOptions';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    title: { ar: '', en: '' },
    experienceFrom: '',
    experienceTo: '',
    aboutCompany: { ar: '', en: '' },
    description: { ar: '', en: '' },
    status: 'Open',
    openingDate: new Date().toISOString().split('T')[0],
    
    // New Fields
    workplaceType: 'onsite',
    jobType: 'full_time',
    contractType: 'permanent',
    
    // Config for Application Form
    requiredFields: {
      portfolio: false,
      linkedin: false,
      github: false,
      behance: false
    }
  });
  
  const [requirements, setRequirements] = useState({ ar: [''], en: [''] });
  const [benefits, setBenefits] = useState({ ar: [''], en: [''] });
  const [loading, setLoading] = useState(false);

  // Dynamic List Handlers for specific language
  const handleListChange = (lang, index, value, type) => {
    const setFunc = type === 'req' ? setRequirements : setBenefits;
    const currentList = type === 'req' ? requirements : benefits;
    
    const newList = [...currentList[lang]];
    newList[index] = value;
    setFunc(prev => ({ ...prev, [lang]: newList }));
  };

  const addListItem = (lang, type) => {
    const setFunc = type === 'req' ? setRequirements : setBenefits;
    setFunc(prev => ({ ...prev, [lang]: [...prev[lang], ''] }));
  };

  const removeListItem = (lang, index, type) => {
    const setFunc = type === 'req' ? setRequirements : setBenefits;
    const currentList = type === 'req' ? requirements : benefits;

    if (currentList[lang].length > 1) {
       const newList = currentList[lang].filter((_, i) => i !== index);
       setFunc(prev => ({ ...prev, [lang]: newList }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up empty list items
      const cleanReq = {
        ar: requirements.ar.filter(r => r.trim() !== ''),
        en: requirements.en.filter(r => r.trim() !== '')
      };
      
      const cleanBen = {
        ar: benefits.ar.filter(b => b.trim() !== ''),
        en: benefits.en.filter(b => b.trim() !== '')
      };

      if (cleanReq.en.length === 0 || cleanReq.ar.length === 0) {
        alert(isArabic ? 'يجب إضافة متطلبات باللغتين' : 'Requirements are required in both languages');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'jobs'), {
        ...formData,
        requirements: cleanReq,
        benefits: cleanBen,
        createdAt: serverTimestamp(),
        openingDate: new Date(formData.openingDate)
      });
      navigate('/admin/jobs');
    } catch (error) {
      console.error("Error creating job:", error);
      alert(isArabic ? 'حدث خطأ أثناء إنشاء الوظيفة' : 'Error creating job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/jobs')}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        <h1 className="text-2xl font-bold text-primary">
          {isArabic ? 'إنشاء وظيفة جديدة' : 'Create New Job'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Info */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">
              {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
            </h2>
            
            <BilingualInput 
              label={isArabic ? 'عنوان الوظيفة' : 'Job Title'} 
              valueKey="title" 
              formData={formData} 
              setFormData={setFormData} 
              required 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isArabic ? 'تاريخ الفتح' : 'Opening Date'} *
                </label>
                <input
                  type="date"
                  value={formData.openingDate}
                  onChange={(e) => setFormData({...formData, openingDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                  required
                />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? 'الحالة' : 'Status'}
                  </label>
                 <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all bg-white"
                 >
                   <option value="Open">{isArabic ? 'مفتوحة' : 'Open'}</option>
                   <option value="Closed">{isArabic ? 'مغلقة' : 'Closed'}</option>
                 </select>
              </div>
            </div>

            {/* Job Details Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Workplace Type */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? 'مكان العمل' : 'Workplace'} *
                  </label>
                  <select
                    value={formData.workplaceType}
                    onChange={(e) => setFormData({...formData, workplaceType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white"
                  >
                    {WORKPLACE_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{isArabic ? type.ar : type.en}</option>
                    ))}
                  </select>
               </div>

               {/* Job Type */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? 'نوع الدوام' : 'Job Type'} *
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white"
                  >
                    {JOB_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{isArabic ? type.ar : type.en}</option>
                    ))}
                  </select>
               </div>

               {/* Contract Type */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? 'نظام التعاقد' : 'Contract Type'} *
                  </label>
                  <select
                    value={formData.contractType}
                    onChange={(e) => setFormData({...formData, contractType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white"
                  >
                    {CONTRACT_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{isArabic ? type.ar : type.en}</option>
                    ))}
                  </select>
               </div>
            </div>

            {/* Application Configuration */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <h3 className="text-md font-semibold text-primary mb-4">
                 {isArabic ? 'إعدادات نموذج التقديم (الحقول الإضافية المطلوبة)' : 'Application Form Config (Required Fields)'}
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {SOCIAL_LINKS_CONFIG.map(config => (
                   <label key={config.id} className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-screens transition-all">
                     <input 
                       type="checkbox"
                       checked={formData.requiredFields[config.id]}
                       onChange={(e) => setFormData({
                         ...formData, 
                         requiredFields: {
                           ...formData.requiredFields,
                           [config.id]: e.target.checked
                         }
                       })}
                       className="w-5 h-5 text-screens rounded focus:ring-screens"
                     />
                     <span className="text-sm font-medium text-gray-700">
                       {isArabic ? config.ar : config.en}
                     </span>
                   </label>
                 ))}
               </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   {isArabic ? 'سنوات الخبرة (من)' : 'Experience Years (From)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experienceFrom}
                  onChange={(e) => setFormData({...formData, experienceFrom: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   {isArabic ? 'سنوات الخبرة (إلى)' : 'Experience Years (To)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experienceTo}
                  onChange={(e) => setFormData({...formData, experienceTo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-primary border-b pb-2">
              {isArabic ? 'تفاصيل الوظيفة' : 'Job Details'}
            </h2>

            <BilingualInput 
              label={isArabic ? 'عن الشركة' : 'About the Company'} 
              valueKey="aboutCompany" 
              formData={formData} 
              setFormData={setFormData}
              isTextarea 
            />
            <BilingualInput 
              label={isArabic ? 'وصف الوظيفة' : 'Job Description'} 
              valueKey="description" 
              formData={formData} 
              setFormData={setFormData}
              required 
              isTextarea 
            />
          </section>
          
          {/* Dynamic Lists - Requirements */}
          <section className="space-y-6">
             <h3 className="text-md font-semibold text-primary">{isArabic ? 'متطلبات الوظيفة' : 'Job Requirements'} *</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* English Requirements */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">English</span>
                    <button type="button" onClick={() => addListItem('en', 'req')} className="text-screens px-2 text-xl font-bold">+</button>
                  </div>
                  {requirements.en.map((req, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={req} 
                        onChange={(e) => handleListChange('en', i, e.target.value, 'req')}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-screens outline-none"
                        dir="ltr"
                      />
                      {requirements.en.length > 1 && <button type="button" onClick={() => removeListItem('en', i, 'req')} className="text-red-500">×</button>}
                    </div>
                  ))}
               </div>
               
               {/* Arabic Requirements */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">عربي</span>
                    <button type="button" onClick={() => addListItem('ar', 'req')} className="text-screens px-2 text-xl font-bold">+</button>
                  </div>
                  {requirements.ar.map((req, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={req} 
                        onChange={(e) => handleListChange('ar', i, e.target.value, 'req')}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-screens outline-none"
                        dir="rtl"
                      />
                      {requirements.ar.length > 1 && <button type="button" onClick={() => removeListItem('ar', i, 'req')} className="text-red-500">×</button>}
                    </div>
                  ))}
               </div>
             </div>
          </section>

          {/* Dynamic Lists - Benefits */}
          <section className="space-y-6">
             <h3 className="text-md font-semibold text-primary">{isArabic ? 'مميزات الوظيفة' : 'Job Benefits'}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* English Benefits */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">English</span>
                    <button type="button" onClick={() => addListItem('en', 'ben')} className="text-screens px-2 text-xl font-bold">+</button>
                  </div>
                  {benefits.en.map((ben, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={ben} 
                        onChange={(e) => handleListChange('en', i, e.target.value, 'ben')}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-screens outline-none"
                        dir="ltr"
                      />
                      {benefits.en.length > 1 && <button type="button" onClick={() => removeListItem('en', i, 'ben')} className="text-red-500">×</button>}
                    </div>
                  ))}
               </div>
               
               {/* Arabic Benefits */}
               <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">عربي</span>
                    <button type="button" onClick={() => addListItem('ar', 'ben')} className="text-screens px-2 text-xl font-bold">+</button>
                  </div>
                  {benefits.ar.map((ben, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={ben} 
                        onChange={(e) => handleListChange('ar', i, e.target.value, 'ben')}
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-screens outline-none"
                        dir="rtl"
                      />
                      {benefits.ar.length > 1 && <button type="button" onClick={() => removeListItem('ar', i, 'ben')} className="text-red-500">×</button>}
                    </div>
                  ))}
               </div>
             </div>
          </section>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>{isArabic ? 'جاري الحفظ...' : 'Saving...'}</span>
              ) : (
                <>
                  <FaSave />
                  <span>{isArabic ? 'حفظ الوظيفة' : 'Save Job'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
