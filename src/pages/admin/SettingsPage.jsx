import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [settings, setSettings] = useState({
    email: '',
    phones: [''],
    fax: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    whatsappNumbers: [{ number: '', url: '' }],
    location: { ar: '', en: '' },
    locationMapUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  // Helper: normalize a field to always be a non-empty array
  const toArray = (val, fallback) => {
    if (Array.isArray(val) && val.length > 0) return val;
    if (typeof val === 'string' && val.trim()) return [val.trim()];
    return fallback;
  };

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();

        // Normalize phones
        const phones = toArray(data.phones || data.phone, ['']);

        // Normalize whatsappNumbers — support both old string and new array format
        let whatsappNumbers;
        if (Array.isArray(data.whatsappNumbers) && data.whatsappNumbers.length > 0) {
          whatsappNumbers = data.whatsappNumbers;
        } else if (data.whatsapp) {
          const match = data.whatsapp.match(/wa\.me\/(\+?\d+)/);
          const num = match ? match[1].replace('+', '') : data.whatsapp.replace(/\D/g, '');
          whatsappNumbers = num ? [{ number: num, url: `https://wa.me/${num}` }] : [{ number: '', url: '' }];
        } else {
          whatsappNumbers = [{ number: '', url: '' }];
        }

        setSettings(prev => ({ 
          ...prev, 
          ...data,
          phones,
          whatsappNumbers,
          location: data.location || { ar: '', en: '' },
          locationMapUrl: data.locationMapUrl || ''
        }));
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Phones helpers ---
  const addPhone = () => setSettings(prev => ({ ...prev, phones: [...prev.phones, ''] }));
  const removePhone = (i) => setSettings(prev => ({ ...prev, phones: prev.phones.filter((_, idx) => idx !== i) }));
  const updatePhone = (i, val) => setSettings(prev => {
    const phones = [...prev.phones];
    phones[i] = val;
    return { ...prev, phones };
  });

  // --- WhatsApp helpers ---
  const addWhatsapp = () => setSettings(prev => ({ ...prev, whatsappNumbers: [...prev.whatsappNumbers, { number: '', url: '' }] }));
  const removeWhatsapp = (i) => setSettings(prev => ({ ...prev, whatsappNumbers: prev.whatsappNumbers.filter((_, idx) => idx !== i) }));
  const updateWhatsapp = (i, val) => {
    const num = val.replace(/\D/g, '');
    setSettings(prev => {
      const whatsappNumbers = [...prev.whatsappNumbers];
      whatsappNumbers[i] = { number: num, url: num ? `https://wa.me/${num}` : '' };
      return { ...prev, whatsappNumbers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Filter out empty entries
      const phones = settings.phones.filter(p => p.trim());
      const whatsappNumbers = settings.whatsappNumbers.filter(w => w.number.trim());

      await setDoc(doc(db, 'settings', 'global'), {
        ...settings,
        phones,
        whatsappNumbers,
        updatedAt: new Date()
      });

      setSettings(prev => ({ ...prev, phones, whatsappNumbers }));
      alert(isArabic ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
    } catch (error) {
      console.error("Error saving settings:", error);
      alert(isArabic ? 'حدث خطأ أثناء حفظ الإعدادات' : 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return (
      <div className="w-full h-64 flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-6">
        {isArabic ? 'إعدادات الموقع' : 'Website Settings'}
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
              {isArabic ? 'معلومات التواصل' : 'Contact Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                  dir="ltr"
                />
              </div>

              {/* Fax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isArabic ? 'الفاكس' : 'Fax'}
                </label>
                <input
                  type="text"
                  value={settings.fax}
                  onChange={(e) => setSettings({...settings, fax: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Phone Numbers - Dynamic List */}
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">
                  {isArabic ? 'أرقام الهاتف' : 'Phone Numbers'}
                </label>
                <button
                  type="button"
                  onClick={addPhone}
                  className="flex items-center gap-1.5 text-sm text-screens font-medium hover:text-screens/80 transition-colors"
                >
                  <FaPlus className="text-xs" />
                  {isArabic ? 'إضافة رقم' : 'Add Number'}
                </button>
              </div>
              <div className="space-y-3">
                {settings.phones.map((phone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => updatePhone(i, e.target.value)}
                      placeholder="e.g. +971501234567"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                      dir="ltr"
                    />
                    {settings.phones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhone(i)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title={isArabic ? 'حذف' : 'Remove'}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Section */}
            <div className="mt-6 border-t pt-6">
                 <div className="flex items-center gap-2 mb-4">
                     <FaMapMarkerAlt className="text-primary" />
                     <h3 className="font-semibold text-gray-700">{isArabic ? 'الموقع الجغرافي' : 'Location'}</h3>
                 </div>
                 
                 <div className="space-y-4">
                     {/* Bilingual Location Text using existing component */}
                     {/* BilingualInput expects formData and setFormData structure which matches settings state here */}
                     <BilingualInput 
                        label={isArabic ? 'العنوان (نص)' : 'Address (Text)'}
                        valueKey="location"
                        formData={settings}
                        setFormData={setSettings}
                     />
                     
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isArabic ? 'رابط خريطة جوجل (Embed URL)' : 'Google Map Embed URL'}
                        </label>
                        <input
                          type="url"
                          value={settings.locationMapUrl}
                          onChange={(e) => setSettings({...settings, locationMapUrl: e.target.value})}
                          placeholder="https://www.google.com/maps/embed?..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                          dir="ltr"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            {isArabic 
                                ? 'اذهب إلى خرائط جوجل -> مشاركة -> تضمين خريطة -> انسخ الرابط (src) فقط'
                                : 'Go to Google Maps -> Share -> Embed a map -> Copy just the link (src)'}
                        </p>
                     </div>
                 </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4 border-b pb-2">
              {isArabic ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'facebook', label: 'Facebook' },
                { key: 'instagram', label: 'Instagram' },
                { key: 'twitter', label: 'Twitter / X' },
                { key: 'linkedin', label: 'LinkedIn' },
              ].map((social) => (
                <div key={social.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {social.label}
                  </label>
                  <input
                    type="url"
                    value={settings[social.key]}
                    onChange={(e) => setSettings({...settings, [social.key]: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                    dir="ltr"
                  />
                </div>
              ))}
              
            </div>

            {/* WhatsApp Numbers - Dynamic List */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">
                  WhatsApp {isArabic ? 'الأرقام' : 'Numbers'}
                </label>
                <button
                  type="button"
                  onClick={addWhatsapp}
                  className="flex items-center gap-1.5 text-sm text-screens font-medium hover:text-screens/80 transition-colors"
                >
                  <FaPlus className="text-xs" />
                  {isArabic ? 'إضافة رقم' : 'Add Number'}
                </button>
              </div>
              <div className="space-y-3">
                {settings.whatsappNumbers.map((wa, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={wa.number}
                      onChange={(e) => updateWhatsapp(i, e.target.value)}
                      placeholder={isArabic ? 'مثال: 971501234567 (بدون +)' : 'e.g. 971501234567 (without +)'}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                      dir="ltr"
                    />
                    {wa.url && (
                      <a
                        href={wa.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-3 text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors whitespace-nowrap"
                      >
                        ✓ Test
                      </a>
                    )}
                    {settings.whatsappNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWhatsapp(i)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title={isArabic ? 'حذف' : 'Remove'}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-400">
                {isArabic 
                  ? 'أدخل الرقم مع رمز الدولة بدون +. سيتم إنشاء رابط الواتساب تلقائيًا.'
                  : 'Enter number with country code (without +). WhatsApp link is generated automatically.'}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              {saving ? (
                <>
                   <FaSpinner className="animate-spin" />
                   <span>{isArabic ? 'جاري الحفظ...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>{isArabic ? 'حفظ التغييرات' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
