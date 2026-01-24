import React from 'react';

const BilingualInput = ({ label, valueKey, formData, setFormData, required = false, isTextarea = false, rows = 4 }) => {
  const handleChange = (lang, value) => {
    setFormData(prev => ({
      ...prev,
      [valueKey]: {
        ...prev[valueKey],
        [lang]: value
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* English */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (English) {required && '*'}
        </label>
        {isTextarea ? (
          <textarea
             rows={rows}
             value={formData[valueKey]?.en || ''}
             onChange={(e) => handleChange('en', e.target.value)}
             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
             required={required}
             dir="ltr"
          />
        ) : (
          <input
             type="text"
             value={formData[valueKey]?.en || ''}
             onChange={(e) => handleChange('en', e.target.value)}
             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
             required={required}
             dir="ltr"
          />
        )}
      </div>
      {/* Arabic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} (عربي) {required && '*'}
        </label>
        {isTextarea ? (
           <textarea
             rows={rows}
             value={formData[valueKey]?.ar || ''}
             onChange={(e) => handleChange('ar', e.target.value)}
             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
             required={required}
             dir="rtl"
          />
        ) : (
          <input
             type="text"
             value={formData[valueKey]?.ar || ''}
             onChange={(e) => handleChange('ar', e.target.value)}
             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none"
             required={required}
             dir="rtl"
          />
        )}
      </div>
    </div>
  );
};

export default BilingualInput;
