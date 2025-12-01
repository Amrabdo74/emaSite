import { useTranslation } from "react-i18next";
import person from "../assets/footerLogo.svg";
import iconMail from "../assets/footerLogo.svg";
import iconPhone from "../assets/footerLogo.svg";
import iconLocation from "../assets/footerLogo.svg";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="w-full flex flex-col" dir="rtl">
      {/* MAIN HERO */}
      <div className="w-full flex flex-col md:flex-row-reverse min-h-[600px] relative">
        
        {/* LEFT SIDE IMAGE */}
        <div className="relative w-full md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
          
          {/* الدائرة البرتقالية خلف الشخص */}
          <div className="absolute w-[420px] h-[420px] bg-orange-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-32 md:-translate-x-0"></div>
          
          {/* صورة الشخص */}
          <img src={person} alt="Person" className="relative z-10 w-[400px] object-contain" />
          
          {/* الظل تحت الصورة */}
          <div className="absolute bottom-20 w-[320px] h-[50px] bg-blue-900 opacity-60 rounded-full blur-3xl"></div>
        
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-12 py-16 relative">
          {/* شريط أزرق على اليمين */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-blue-900 hidden md:block"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-400 text-right mb-6 leading-tight">
              مرحبا بكم في إيما.
            </h1>
            <p className="text-2xl md:text-3xl leading-relaxed text-blue-900 text-right font-medium space-y-2">
              <span className="block">نقـــدم لك كل ما</span>
              <span className="block">تحتاجه لتطــــوير</span>
              <span className="block">أعمالك من تصميم</span>
              <span className="block">وبرمجه وتسويــــق</span>
              <span className="block">وتراخيص.</span>
            </p>
            <div className="flex justify-end gap-4 mt-8">
              <button className="px-8 py-3 bg-orange-400 text-white rounded-full font-semibold hover:bg-orange-500 transition-colors text-lg">
                خدماتنا
              </button>
              <button className="px-8 py-3 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors text-lg">
                تعرف علينا
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div className="w-full bg-white flex flex-col md:flex-row justify-around items-start py-8 px-8 gap-8 border-t-2 border-gray-200">
        
        {/* Email Section */}
        <div className="flex flex-col items-center md:items-start text-blue-900 gap-3">
          <span className="font-bold text-lg">تواصل معانا</span>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
              <img src={iconMail} alt="Mail" className="w-6 h-6" />
            </div>
            <span className="text-base">EAM.info.2025@gmail.com</span>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex flex-col items-center md:items-start text-blue-900 gap-3">
          <span className="font-bold text-lg">تواصل معانا</span>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
              <img src={iconPhone} alt="Phone" className="w-6 h-6" />
            </div>
            <span className="text-base">01098978273</span>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center md:items-start text-blue-900 gap-3">
          <span className="font-bold text-lg">المقر الرئيسي</span>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-dashed border-orange-400 rounded-full flex items-center justify-center">
              <img src={iconLocation} alt="Location" className="w-6 h-6" />
            </div>
            <span className="text-base">السعودية-جده-الرياض</span>
          </div>
        </div>
      </div>
    </section>
  );
}