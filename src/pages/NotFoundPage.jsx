import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E8F4FF] to-white" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="text-center px-4">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        
        {/* Error Message */}
        <h2 className="text-4xl font-bold text-primary mb-4">
          {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        
        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          {isArabic 
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.' 
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>
        
        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#FAA617] text-white rounded-lg font-semibold hover:bg-[#e6950e] transition-colors"
        >
          {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}

