import person from "../assets/footerLogo.svg";
import iconMail from "../assets/footerLogo.svg";
import iconPhone from "../assets/footerLogo.svg";
import iconLocation from "../assets/footerLogo.svg";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col">
      {/* MAIN HERO */}
      <div className="w-full flex flex-col md:flex-row min-h-[380px]">
        
        {/* LEFT SIDE IMAGE */}
        <div className="relative w-full md:w-1/2 bg-[#F3F4F6] flex justify-center items-center overflow-hidden">
          
          {/* الدائرة البرتقالية خلف الشخص */}
          <div className="absolute w-[380px] h-[380px] bg-[#FAA617] rounded-full top-14 left-16 opacity-70"></div>
          
          {/* صورة الشخص */}
          <img src={person} className="relative z-10 w-[320px]" />

          {/* الظل تحت الصورة */}
          <div className="absolute bottom-7 w-[250px] h-[40px] bg-[#001B38] opacity-80 rounded-full blur-xl"></div>
        
        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-10">
          <h1 className="text-3xl font-bold text-[#FAA617] text-right">
            مرحباً بكم في إيما.
          </h1>

          <p className="text-xl leading-relaxed text-[#0E2A47] text-right mt-4">
            نقدم لك كل ما تحتاجه لتطوير أعمالك، من تصميم وبرمجة وتسويق وتراخيص.
          </p>

          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 bg-[#103B68] text-white rounded-md">
              تعرف علينا
            </button>
            <button className="px-6 py-2 bg-[#FAA617] text-white rounded-md">
              خدماتنا
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div className="w-full bg-white flex flex-col md:flex-row justify-between text-center mt-4 py-6 px-8 border-t">

        <div className="mb-4 md:mb-0 flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">تواصل معنا</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconMail} className="w-5" />
            <span>EAM.info.2025@gmail.com</span>
          </div>
        </div>

        <div className="mb-4 md:mb-0 flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">تواصل معنا</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconPhone} className="w-5" />
            <span>01098978273</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-[#0E2A47]">
          <span className="font-semibold">المقر الرئيسي</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={iconLocation} className="w-5" />
            <span>السعودية - جدة - الرياض</span>
          </div>
        </div>

      </div>
    </section>
  );
}
