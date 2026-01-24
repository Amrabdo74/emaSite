import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';
import { FaFileDownload, FaTimes, FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [searchParams, setSearchParams] = useSearchParams();
  const filterPosition = searchParams.get('position');
  const filterJobId = searchParams.get('jobId');

  useEffect(() => {
    fetchApplications();
  }, [filterPosition, filterJobId]);

  const updateStatus = async (appId, newStatus) => {
    try {
      await updateDoc(doc(db, 'jobApplications', appId), {
        status: newStatus
      });
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ).filter(app => newStatus !== 'trash')); // Remove from view if trashed
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let q = collection(db, 'jobApplications');
      
      if (filterPosition) {
        q = query(q, where('position', '==', filterPosition));
      } else if (filterJobId) {
        q = query(q, where('jobId', '==', filterJobId));
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }

      const querySnapshot = await getDocs(q);
      let data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
      }));

      // Filter out trash by default from ALL views
      data = data.filter(app => app.status !== 'trash');

      if (filterJobId) {
         data.sort((a, b) => b.createdAt - a.createdAt);
      } else if (!filterPosition) {
         // Default view: Filter OUT specific job applications (those with jobId)
         data = data.filter(app => !app.jobId);
      }

      setApplications(data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const columns = [
    { header: isArabic ? 'اسم المتقدم' : 'Applicant Name', key: 'name' },
    { header: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { header: isArabic ? 'رقم الهاتف' : 'Phone Number', key: 'phone' },
    { header: isArabic ? 'المسمى الوظيفي' : 'Applied Job Title', key: 'position', render: (item) => item.jobTitleAr || item.jobTitle || item.position },
    { 
      header: isArabic ? 'تاريخ التقديم' : 'Application Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')
    },
    {
      header: isArabic ? 'الإجراءات' : 'Actions',
      key: 'actions',
      render: (item) => (
        <div className="flex items-center gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); updateStatus(item.id, item.status === 'favorite' ? 'new' : 'favorite'); }}
             className={`p-2 rounded-full transition-colors ${item.status === 'favorite' ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
             title={isArabic ? 'تفضيل' : 'Favorite'}
           >
             {item.status === 'favorite' ? <FaStar className="text-xl" /> : <FaRegStar className="text-xl" />}
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); if(window.confirm(isArabic ? 'هل أنت متأكد من نقل هذا الطلب للمهملات؟' : 'Move to trash?')) updateStatus(item.id, 'trash'); }}
             className="p-2 text-gray-400 hover:text-red-500 transition-colors"
             title={isArabic ? 'نقل للمهملات' : 'Move to Trash'}
           >
             <FaTrash className="text-lg" />
           </button>
        </div>
      )
    }
  ];

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
        <h1 className="text-2xl font-bold text-primary">
          {filterPosition 
            ? (isArabic ? `المتقدمين لوظيفة: ${filterPosition}` : `Applicants for: ${filterPosition}`)
            : (isArabic ? 'طلبات التوظيف' : 'Job Applications')
          }
        </h1>
        {filterPosition && (
          <button 
            onClick={clearFilter}
            className="flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          >
            <FaTimes />
            {isArabic ? 'مسح الفلتر' : 'Clear Filter'}
          </button>
        )}
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
        title={isArabic ? 'تفاصيل طلب التوظيف' : 'Application Details'}
        data={selectedApp || {}}
        fields={modalFields}
      />
    </div>
  );
}
