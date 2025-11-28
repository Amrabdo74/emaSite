function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-right space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900">
              مرحبا بكم في إيما.
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              نقدم لك كل ما تحتاجه لتطوير أعمالك من تصميم وبرمجه وتسويق وتراخيص.
            </p>
            <div className="flex gap-4 justify-end">
              <button className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition font-semibold">
                تعرف علينا
              </button>
              <button className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold">
                خدماتنا
              </button>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1 relative">
            <div className="relative z-10">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-lg">صورة المحتوى</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

