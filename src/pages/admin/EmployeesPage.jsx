import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminTable from '../../components/admin/AdminTable';
import DetailsModal from '../../components/admin/DetailsModal';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlus, FaToggleOn, FaToggleOff, FaUserTie } from 'react-icons/fa';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const q = query(collection(db, 'employees'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        joiningDate: doc.data().joiningDate || ''
      }));
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (emp) => {
    try {
      const newStatus = emp.status === 'Active' ? 'Left' : 'Active';
      await updateDoc(doc(db, 'employees', emp.id), {
        status: newStatus
      });
      setEmployees(employees.map(e => e.id === emp.id ? { ...e, status: newStatus } : e));
    } catch (error) {
       console.error("Error updating status:", error);
       alert(isArabic ? 'خطأ في التحديث' : 'Update Error');
    }
  };

  const getLocalizedField = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[isArabic ? 'ar' : 'en'] || field['en'] || '';
  };

  const columns = [
    { 
        header: isArabic ? 'الموظف' : 'Employee', 
        key: 'name',
        render: (item) => (
           <div>
              <p className="font-semibold">{getLocalizedField(item.name)}</p>
              <p className="text-xs text-gray-500">{item.email}</p>
           </div>
        )
    },
    { 
        header: isArabic ? 'المسمى الوظيفي' : 'Job Title', 
        key: 'jobTitle',
        render: (item) => getLocalizedField(item.jobTitle)
    },
    { header: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { header: isArabic ? 'الراتب' : 'Salary', key: 'salary' },
    { 
        header: isArabic ? 'الحالة' : 'Status', 
        key: 'status',
        render: (item) => (
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            item.status === 'Active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {isArabic ? (item.status === 'Active' ? 'على رأس العمل' : 'غادر') : item.status}
          </span>
        )
    },
    {
        header: isArabic ? 'الإجراءات' : 'Actions',
        key: 'actions',
        render: (item) => (
           <div className="flex items-center gap-2">
              <button 
                 onClick={(e) => { e.stopPropagation(); toggleStatus(item); }}
                 className={`p-2 rounded-lg ${item.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}
                 title={isArabic ? 'تغيير الحالة (موظف / غادر)' : 'Toggle Status'}
              >
                 {item.status === 'Active' ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
              </button>
           </div>
        )
    }
  ];

  const modalFields = [
    { label: isArabic ? 'الاسم' : 'Name', key: 'name', render: (item) => getLocalizedField(item.name) },
    { label: isArabic ? 'البريد الإلكتروني' : 'Email', key: 'email' },
    { label: isArabic ? 'رقم الهاتف' : 'Phone', key: 'phone' },
    { label: isArabic ? 'المسمى الوظيفي' : 'Job Title', key: 'jobTitle', render: (item) => getLocalizedField(item.jobTitle) },
    { label: isArabic ? 'المستوى' : 'Level', key: 'level' },
    { label: isArabic ? 'نوع الدوام' : 'Job Type', key: 'jobType' },
    { label: isArabic ? 'مكان العمل' : 'Workplace', key: 'workplaceType' },
    { label: isArabic ? 'الراتب' : 'Salary', key: 'salary' },
    { label: isArabic ? 'تاريخ الانضمام' : 'Joining Date', key: 'joiningDate' },
    { label: isArabic ? 'الحالة' : 'Status', key: 'status' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
           <FaUserTie /> {isArabic ? 'الموظفين' : 'Employees'}
        </h1>
        <Link 
          to="/admin/employees/create" 
          className="flex items-center gap-2 px-4 py-2 bg-screens text-primary font-bold rounded-lg hover:bg-screens/90 transition-colors"
        >
          <FaPlus />
          {isArabic ? 'إضافة موظف' : 'Add Employee'}
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={employees}
        isLoading={loading}
        onView={setSelectedEmp}
      />

      <DetailsModal
        isOpen={!!selectedEmp}
        onClose={() => setSelectedEmp(null)}
        title={isArabic ? 'تفاصيل الموظف' : 'Employee Details'}
        data={selectedEmp || {}}
        fields={modalFields}
      />
    </div>
  );
}
