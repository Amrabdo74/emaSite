import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';
import { FaFileDownload, FaSpinner, FaCheckCircle, FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function FavoriteApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [employeesEmails, setEmployeesEmails] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Employees Emails
      const empQuery = query(collection(db, 'employees'));
      const empSnapshot = await getDocs(empQuery);
      const emails = new Set(empSnapshot.docs.map(doc => doc.data().email?.toLowerCase()));
      setEmployeesEmails(emails);

      // Fetch Favorites
      const q = query(collection(db, 'jobApplications'), where('status', '==', 'favorite'));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
      }));

      // Sort client side
      data.sort((a, b) => b.createdAt - a.createdAt);

      setApplications(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
        header: isArabic ? 'اسم المتقدم' : 'Applicant Name', 
        key: 'name',
        render: (item) => (
             <div className="flex items-center gap-2">
                {item.name}
                {employeesEmails.has(item.email?.toLowerCase()) && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200" title={isArabic ? 'تم توظيفه' : 'Hired'}>
                        <FaCheckCircle /> {isArabic ? 'موظف' : 'Hired'}
                    </span>
                )}
             </div>
        )
    },
    { header: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { header: isArabic ? 'رقم الهاتف' : 'Phone Number', key: 'phone' },
    { header: isArabic ? 'المسمى الوظيفي' : 'Job Title', key: 'position', render: (item) => item.jobTitleAr || item.jobTitle || item.position },
    { 
      header: isArabic ? 'تاريخ التقديم' : 'Application Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')
    }
  ];
  
  // Use same modal fields as JobApplicationsPage (can be exported shared config if needed)
  const modalFields = [
    { label: isArabic ? 'الاسم' : 'Name', key: 'name' },
    { label: isArabic ? 'المسمى الوظيفي' : 'Job Title', key: 'position', render: (item) => item.jobTitleAr || item.jobTitle || item.position },
    { label: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { label: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { label: isArabic ? 'المؤهل العلمي' : 'Degree', key: 'degree' }, 
    { label: isArabic ? 'سنوات الخبرة' : 'Experience', key: 'experience' }, 
    { label: isArabic ? 'نبذة' : 'Bio', key: 'bio' }, 
    
    { 
      label: isArabic ? 'الروابط' : 'Links', 
      key: 'socialLinks',
      render: (item) => item.socialLinks ? (
        <div className="flex flex-wrap gap-2 text-sm">
           {item.socialLinks.portfolio && <a href={item.socialLinks.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 underline">Portfolio</a>}
           {item.socialLinks.linkedin && <a href={item.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">LinkedIn</a>}
           {item.socialLinks.github && <a href={item.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">GitHub</a>}
           {item.socialLinks.behance && <a href={item.socialLinks.behance} target="_blank" rel="noreferrer" className="text-blue-600 underline">Behance</a>}
        </div>
      ) : null
    },

    { label: isArabic ? 'رسالة المتقدم' : 'Message', key: 'message' },
    { 
      label: isArabic ? 'التاريخ' : 'Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleString(isArabic ? 'ar-EG' : 'en-US')
    },
    {
      label: isArabic ? 'السيرة الذاتية' : 'CV / Resume',
      key: 'cvUrl',
      render: (item) => item.cvUrl ? (
        <a 
          href={item.cvUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FaFileDownload />
          {isArabic ? 'فتح الرابط' : 'Open Link'}
        </a>
      ) : (
        <span className="text-gray-400">{isArabic ? 'غير متوفر' : 'Not Available'}</span>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FaCheckCircle className="text-yellow-500" />
            {isArabic ? 'تفضيلات التوظيف' : 'Hiring Favorites'}
        </h1>
        <button 
           onClick={() => navigate('/admin/job-applications')}
           className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
        >
            {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
            {isArabic ? 'كل الطلبات' : 'All Applications'}
        </button>
      </div>

      <AdminTable
        columns={columns}
        data={applications}
        isLoading={loading}
        onView={setSelectedApp}
      />

      <DetailsModal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={isArabic ? 'تفاصيل الطلب' : 'Application Details'}
        data={selectedApp || {}}
        fields={modalFields}
      />
    </div>
  );
}
