import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaArrowLeft, FaArrowRight, FaSpinner, FaPlus, FaTimes } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput';

import { MAIN_SERVICES } from '../../constants/services';

export default function EditProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: { ar: '', en: '' },
    client: { ar: '', en: '' },
    country: { ar: '', en: '' },
    mainService: '',
    serviceType: { ar: '', en: '' },
    description: { ar: '', en: '' },
    link: '',
  });
  
  const [images, setImages] = useState(['']); // Array of strings (URLs)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
            name: data.name || { ar: '', en: '' },
            client: data.client || { ar: '', en: '' },
            country: data.country || { ar: '', en: '' },
            mainService: data.mainService || '',
            serviceType: data.serviceType || { ar: '', en: '' },
            description: data.description || { ar: '', en: '' },
            link: data.link || '',
        });
        // Ensure there is at least one empty field if no images
        if (data.images && data.images.length > 0) {
           setImages(data.images);
        } else {
           setImages(['']);
        }
      } else {
        navigate('/admin/projects');
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const validImages = images.filter(url => url.trim() !== '');

      if (validImages.length === 0) {
        alert(isArabic ? 'يجب الإبقاء على رابط صورة واحد على الأقل' : 'At least one image URL is required');
        setSaving(false);
        return;
      }

      await updateDoc(doc(db, 'projects', id), {
        ...formData,
        images: validImages,
        updatedAt: new Date() // Just update timestamp
      });
      navigate('/admin/projects');
    } catch (error) {
      console.error("Error updating project:", error);
      alert(isArabic ? 'حدث خطأ أثناء تحديث المشروع' : 'Error updating project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><FaSpinner className="animate-spin text-3xl" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/projects')}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        <h1 className="text-2xl font-bold text-primary">
          {isArabic ? 'تعديل المشروع' : 'Edit Project'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <BilingualInput label={isArabic ? 'اسم المشروع' : 'Project Name'} valueKey="name" formData={formData} setFormData={setFormData} required />
          <BilingualInput label={isArabic ? 'اسم العميل' : 'Client Name'} valueKey="client" formData={formData} setFormData={setFormData} required />
          <BilingualInput label={isArabic ? 'الدولة' : 'Country'} valueKey="country" formData={formData} setFormData={setFormData} required />
          
          {/* Service Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Main Service Dropdown */}
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   {isArabic ? 'الخدمة الأساسية' : 'Main Service'} *
                </label>
                <select
                   value={formData.mainService}
                   onChange={(e) => setFormData({...formData, mainService: e.target.value})}
                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white"
                   required
                >
                   <option value="">{isArabic ? 'اختر الخدمة' : 'Select Service'}</option>
                   {MAIN_SERVICES.map(service => (
                     <option key={service.id} value={service.id}>
                        {isArabic ? service.titleAr : service.titleEn}
                     </option>
                   ))}
                </select>
             </div>
          </div>

          <BilingualInput label={isArabic ? 'نوع الخدمة (فرعي)' : 'Service Type (Sub-service)'} valueKey="serviceType" formData={formData} setFormData={setFormData} required />
          
          <BilingualInput label={isArabic ? 'وصف المشروع' : 'Description'} valueKey="description" formData={formData} setFormData={setFormData} required isTextarea rows={3} />

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
                {isArabic ? 'رابط المشروع' : 'Project Link'} ({isArabic ? 'اختياري' : 'Optional'})
             </label>
             <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
                dir="ltr"
             />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
               <label className="block text-sm font-medium text-gray-700">
                 {isArabic ? 'صور المشروع (روابط)' : 'Project Images (URLs)'} *
               </label>
               <button 
                 type="button" 
                 onClick={addImageField}
                 className="flex items-center gap-1 text-sm bg-screens/20 text-primary px-3 py-1 rounded-lg hover:bg-screens/30 transition-colors font-bold"
               >
                 <FaPlus size={12} /> {isArabic ? 'إضافة رابط' : 'Add URL'}
               </button>
            </div>
            
            <div className="space-y-3">
              {images.map((img, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
                      dir="ltr"
                      required={index === 0} 
                    />
                    {img && (
                      <div className="mt-2 h-20 w-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                         <img 
                           src={img} 
                           alt="Preview" 
                           className="w-full h-full object-cover" 
                           onError={(e) => e.target.style.display = 'none'} 
                           onLoad={(e) => e.target.style.display = 'block'}
                         />
                      </div>
                    )}
                  </div>
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={isArabic ? 'حذف' : 'Remove'}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              {saving ? (
                <span>{isArabic ? 'جاري الحفظ...' : 'Saving...'}</span>
              ) : (
                <>
                  <FaSave />
                  <span>{isArabic ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
