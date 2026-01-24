import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'super.admin1@ema.com' && password === 'admin@EMA123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/contact-messages');
    } else {
      setError(isArabic ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="EMA Soft" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary">
            {isArabic ? 'تسجيل دخول المسؤول' : 'Admin Login'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
              required
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isArabic ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-screens focus:border-screens outline-none transition-all"
              required
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
