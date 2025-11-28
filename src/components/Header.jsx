import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-900">
              <span className="text-orange-500">E</span>AM CO.
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="#home" className="text-blue-900 hover:text-orange-500 transition">الرئيسية</a>
            <a href="#services" className="text-blue-900 hover:text-orange-500 transition">خدماتنا</a>
            <a href="#about" className="text-blue-900 hover:text-orange-500 transition">من نحن</a>
            <a href="#contact" className="text-blue-900 hover:text-orange-500 transition">تواصل معنا</a>
          </nav>

          {/* Language & Auth Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition">
              EN
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition hidden md:block">
              تسجيل دخول
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition hidden md:block">
              تسجيل
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-blue-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-blue-900 hover:text-orange-500 transition">الرئيسية</a>
              <a href="#services" className="text-blue-900 hover:text-orange-500 transition">خدماتنا</a>
              <a href="#about" className="text-blue-900 hover:text-orange-500 transition">من نحن</a>
              <a href="#contact" className="text-blue-900 hover:text-orange-500 transition">تواصل معنا</a>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition w-full text-right">
                تسجيل دخول
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition w-full text-right">
                تسجيل
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

