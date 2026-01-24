import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';

export default function DetailsModal({ isOpen, onClose, title, data, fields }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s_ease-out]"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {fields.map((field, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-semibold text-primary/70 mb-2">
                {field.label}
              </label>
              <div className="text-gray-900 font-medium whitespace-pre-wrap leading-relaxed">
                {field.render ? field.render(data) : (data[field.key] || '-')}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-gray-50 p-6 flex justify-end">
           <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
