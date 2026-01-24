import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaEnvelope, 
  FaTools, 
  FaBriefcase, 
  FaCog, 
  FaSignOutAlt,
  FaFileAlt,
  FaBars,
  FaTimes,
  FaProjectDiagram,
  FaStar,
  FaUserTie
} from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/admin/contact-messages', icon: FaEnvelope, label: isArabic ? 'رسائل تواصل معنا' : 'Contact Messages' },
    { path: '/admin/service-requests', icon: FaTools, label: isArabic ? 'طلبات الخدمات' : 'Service Requests' },
    { path: '/admin/job-applications', icon: FaFileAlt, label: isArabic ? 'طلبات التوظيف' : 'Job Applications' },
    { path: '/admin/jobs', icon: FaBriefcase, label: isArabic ? 'الوظائف' : 'Jobs' },
    { path: '/admin/projects', icon: FaProjectDiagram, label: isArabic ? 'المشاريع' : 'Projects' },
    { path: '/admin/favorites', icon: FaStar, label: isArabic ? 'المفضلة' : 'Favorites' }, // Added Favorites
    { path: '/admin/employees', icon: FaUserTie, label: isArabic ? 'الموظفون' : 'Employees' }, // Added Employees
    { path: '/admin/settings', icon: FaCog, label: isArabic ? 'الإعدادات' : 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin/login';
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white p-4 flex justify-between items-center shadow-sm z-40">
        <button onClick={toggleSidebar} className="text-primary text-xl p-2">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src={logo} alt="EMA Soft" className="h-8 object-contain" />
        <div className="w-8"></div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden pb-16"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-primary text-white flex flex-col fixed inset-y-0 z-40 w-64 transition-transform duration-300 transform 
          ${isArabic 
            ? (isSidebarOpen ? 'translate-x-0' : 'translate-x-full') 
            : (isSidebarOpen ? 'translate-x-0' : '-translate-x-full')
          } md:translate-x-0 md:static md:flex-shrink-0 h-full`
        }
      >
        <div className="p-6 bg-white flex justify-center items-center h-20 shadow-sm flex-shrink-0">
             <img src={logo} alt="EMA Soft" className="h-12 object-contain" />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-screens text-primary font-bold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="text-lg shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white/80 hover:bg-red-500/20 hover:text-red-200 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-lg shrink-0" />
            <span className="text-sm">{isArabic ? 'تسجيل الخروج' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full pt-20 md:pt-0 bg-gray-50 scroll-smooth">
        <div className="p-4 md:p-8 min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
}
