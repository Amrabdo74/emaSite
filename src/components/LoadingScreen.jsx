import logo from "../assets/logo.png";

export default function LoadingScreen() {
  // Get language from document or default to Arabic
  const isArabic = document.documentElement.lang === 'ar' || !document.documentElement.lang;
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#E8F4FF] to-white flex flex-col items-center justify-center z-50" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <img src={logo} alt="eam Logo" className="h-24 w-auto drop-shadow-lg" />
      </div>
      
      {/* Loading Spinner */}
      <div className="relative">
        {/* Outer rotating border - Orange */}
        <div className="w-20 h-20 border-4 border-[#FAA617] border-t-transparent rounded-full animate-spin"></div>
        
        {/* Inner rotating border - Blue */}
        <div 
          className="absolute top-2 left-2 w-16 h-16 border-4 border-primary border-b-transparent rounded-full animate-spin" 
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        ></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FAA617] rounded-full"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-8 text-primary font-semibold text-xl animate-pulse">
        {isArabic ? 'جاري التحميل...' : 'Loading...'}
      </p>
    </div>
  );
}

