import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput'; // Import BilingualInput

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  // Adjusted State for location
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    fax: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    whatsapp: '', 
    location: { ar: '', en: '' }, // Bilingual Location
    locationMapUrl: '', // Map Embed Link
  });
  const [whatsappNumber, setWhatsappNumber] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({ 
             ...settings, 
             ...data,
             location: data.location || { ar: '', en: '' }, // Ensure object exists
             locationMapUrl: data.locationMapUrl || ''
        });
        
        if (data.whatsapp) {
          const match = data.whatsapp.match(/wa\.me\/(\d+)/);
          if (match && match[1]) {
            setWhatsappNumber(match[1]);
          } else {
             setWhatsappNumber(data.whatsapp.replace(/\D/g, ''));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Generate WhatsApp URL
      const finalWhatsappUrl = whatsappNumber 
        ? `https://wa.me/${whatsappNumber}` 
        : '';

      await setDoc(doc(db, 'settings', 'global'), {
        ...settings,
        whatsapp: finalWhatsappUrl,
        updatedAt: new Date()
      });

      setSettings(prev => ({ ...prev, whatsapp: finalWhatsappUrl }));
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                  dir="ltr"
                />
              </div>
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
              
              {/* WhatsApp Special Handling */}
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
                        setWhatsappNumber(val);
                      }}
                      placeholder="e.g. 971501234567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
                      dir="ltr"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {isArabic 
                        ? 'أدخل الرقم مع رمز الدولة (بدون +). سيتم إنشاء الرابط تلقائيًا.' 
                        : 'Enter number with country code (without +). Link will be generated automatically.'}
                    </p>
                  </div>
              </div>
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
