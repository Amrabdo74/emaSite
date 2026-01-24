import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlus, FaToggleOn, FaToggleOff, FaEdit, FaUsers } from 'react-icons/fa';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const q = query(
        collection(db, 'jobs'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const jobsData = querySnapshot.docs.map((docSnapshot) => {
        const job = docSnapshot.data();
        return {
          id: docSnapshot.id,
          ...job,
          createdAt: job.createdAt?.toDate ? job.createdAt.toDate() : new Date(job.createdAt),
          // Use stored count or default to 0. 
          // Note: Old jobs might have 0 until new applications come in. 
          applicantCount: job.applicantCount || 0 
        };
      });

      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (job) => {
    try {
      const newStatus = job.status === 'Open' ? 'Closed' : 'Open';
      await updateDoc(doc(db, 'jobs', job.id), {
        status: newStatus
      });
      // Update local state properly
      setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
    } catch (error) {
      console.error("Error updating status:", error);
      alert(isArabic ? 'حدث خطأ أثناء تحديث الحالة' : 'Error updating status');
    }
  };

  const getLocalizedField = (field, lang) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang === 'ar' ? 'ar' : 'en'] || field['en'] || '';
  };

  const columns = [
    { 
      header: isArabic ? 'عنوان الوظيفة' : 'Job Title', 
      key: 'title',
      render: (item) => getLocalizedField(item.title, i18n.language)
    },
    { 
      header: isArabic ? 'تاريخ النشر' : 'Opening Date', 
      key: 'createdAt',
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')
    },
    { 
      header: isArabic ? 'الحالة' : 'Status', 
      key: 'status',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          item.status === 'Open' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {isArabic 
            ? (item.status === 'Open' ? 'مفتوحة' : 'مغلقة') 
            : item.status
          }
        </span>
      )
    },
    { 
      header: isArabic ? 'المتقدمين' : 'Applicants', 
      key: 'applicantCount',
      render: (item) => (
        <span className="font-semibold text-primary">{item.applicantCount}</span>
      )
    }
  ];

  // Custom render for status toggle in actions
  const ActionsWithToggle = (item) => {
    // Determine the position string to filter by. 
    const positionFilter = typeof item.title === 'object' ? item.title.en : item.title;

    return (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => toggleStatus(item)}
          className={`p-2 rounded-lg transition-colors ${
            item.status === 'Open' ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
          }`}
          title={isArabic ? 'تغيير الحالة' : 'Toggle Status'}
        >
          {item.status === 'Open' ? <FaToggleOn className="text-xl" /> : <FaToggleOff className="text-xl" />}
        </button>
      
      <Link
        to={`/admin/jobs/edit/${item.id}`}
        className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        title={isArabic ? 'تعديل' : 'Edit'}
      >
        <FaEdit className="text-xl" />
      </Link>
      <Link
        to={`/admin/job-applications?jobId=${item.id}`}
        className="p-2 text-primary bg-screens rounded-lg hover:bg-screens/90 transition-colors flex gap-1"
        title={isArabic ? 'عرض المتقدمين' : 'View Applicants'}
      >
        <FaUsers className="text-xl" /> المتقدمين
      </Link>
    </div>
  );
  };

  const modalFields = [
    { label: isArabic ? 'عنوان الوظيفة' : 'Job Title', key: 'title', render: (item) => getLocalizedField(item.title, i18n.language) },
    { 
      label: isArabic ? 'الحالة' : 'Status', 
      key: 'status',
      render: (item) => isArabic ? (item.status === 'Open' ? 'مفتوحة' : 'مغلقة') : item.status
    },
    { label: isArabic ? 'الوصف' : 'Description', key: 'description', render: (item) => getLocalizedField(item.description, i18n.language) },
    { 
      label: isArabic ? 'تاريخ النشر' : 'Opening Date', 
      key: 'createdAt', 
      render: (item) => item.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          {isArabic ? 'الوظائف' : 'Jobs Listing'}
        </h1>
        <Link 
          to="/admin/jobs/create" 
          className="flex items-center gap-2 px-4 py-2 bg-screens text-primary font-bold rounded-lg hover:bg-screens/90 transition-colors"
        >
          <FaPlus />
          {isArabic ? 'إضافة وظيفة' : 'Frontend Create Job'}
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir={isArabic ? 'rtl' : 'ltr'}>
             <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className={`px-6 py-4 text-sm font-semibold text-primary ${isArabic ? 'text-right' : 'text-left'}`}>
                    {col.header}
                  </th>
                ))}
                <th className={`px-6 py-4 text-sm font-semibold text-primary ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {jobs.map((job) => (
                 <tr key={job.id} className="hover:bg-gray-50/50">
                    {columns.map((col, i) => (
                      <td key={i} className="px-6 py-4 text-sm text-gray-600">
                        {col.render ? col.render(job) : job[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 flex items-center gap-2">
                       {ActionsWithToggle(job)}
                       <button 
                          onClick={() => setSelectedJob(job)}
                          className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          عرض
                        </button>
                    </td>
                 </tr>
               ))}
               {jobs.length === 0 && !loading && (
                 <tr>
                   <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                      {isArabic ? 'لا توجد وظائف' : 'No jobs found'}
                   </td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>

      <DetailsModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={isArabic ? 'تفاصيل الوظيفة' : 'Job Details'}
        data={selectedJob || {}}
        fields={modalFields}
      />
    </div>
  );
}
