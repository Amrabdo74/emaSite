import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaSave, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BilingualInput from '../../components/admin/BilingualInput';
import { WORKPLACE_TYPES, JOB_TYPES, EMPLOYEE_LEVELS } from '../../constants/jobOptions';

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: { ar: '', en: '' },
    email: '',
    phone: '',
    jobTitle: { ar: '', en: '' },
    salary: '',
    
    level: 'mid',
    workplaceType: 'onsite',
    jobType: 'full_time',
    status: 'Active', // Active, Left
    
    joiningDate: new Date().toISOString().split('T')[0]
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'employees'), {
        ...formData,
        email: formData.email.toLowerCase(), // Normalize email for checking
        createdAt: serverTimestamp(),
      });
      navigate('/admin/employees');
    } catch (error) {
      console.error("Error creating employee:", error);
      alert(isArabic ? 'حدث خطأ أثناء إضافة الموظف' : 'Error creating employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/employees')}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        <h1 className="text-2xl font-bold text-primary">
          {isArabic ? 'إضافة موظف جديد' : 'Add New Employee'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <section className="space-y-6">
             <h2 className="text-lg font-semibold text-primary border-b pb-2">
               {isArabic ? 'البيانات الشخصية' : 'Personal Information'}
             </h2>
             <BilingualInput label={isArabic ? 'الاسم' : 'Name'} valueKey="name" formData={formData} setFormData={setFormData} required />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'البريد الإلكتروني' : 'Email'} *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'رقم الهاتف' : 'Phone'} *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                </div>
             </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-lg font-semibold text-primary border-b pb-2">
               {isArabic ? 'بيانات الوظيفة' : 'Job Information'}
             </h2>
             <BilingualInput label={isArabic ? 'المسمى الوظيفي' : 'Job Title'} valueKey="jobTitle" formData={formData} setFormData={setFormData} required />

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'المستوى' : 'Level'} *</label>
                  <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white">
                    {EMPLOYEE_LEVELS.map(l => <option key={l.id} value={l.id}>{isArabic ? l.ar : l.en}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'نوع الدوام' : 'Job Type'} *</label>
                  <select value={formData.jobType} onChange={(e) => setFormData({...formData, jobType: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white">
                    {JOB_TYPES.map(l => <option key={l.id} value={l.id}>{isArabic ? l.ar : l.en}</option>)}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'مكان العمل' : 'Workplace'} *</label>
                  <select value={formData.workplaceType} onChange={(e) => setFormData({...formData, workplaceType: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none bg-white">
                    {WORKPLACE_TYPES.map(l => <option key={l.id} value={l.id}>{isArabic ? l.ar : l.en}</option>)}
                  </select>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'الراتب' : 'Salary'} *</label>
                  <input type="text" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'تاريخ الانضمام' : 'Joining Date'} *</label>
                  <input type="date" value={formData.joiningDate} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required />
                </div>
             </div>

             <div className="flex items-center gap-4">
                <label className="block text-sm font-medium text-gray-700">{isArabic ? 'الحالة' : 'Status'}:</label>
                <div className="flex items-center gap-4">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" checked={formData.status === 'Active'} onChange={() => setFormData({...formData, status: 'Active'})} className="text-screens focus:ring-screens" />
                      <span className="text-sm">{isArabic ? 'على رأس العمل' : 'Active'}</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" checked={formData.status === 'Left'} onChange={() => setFormData({...formData, status: 'Left'})} className="text-screens focus:ring-screens" />
                      <span className="text-sm">{isArabic ? 'غادر' : 'Left'}</span>
                   </label>
                </div>
             </div>
          </section>

          <div className="flex justify-end pt-4 border-t border-gray-100">
             <button
               type="submit"
               disabled={loading}
               className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
             >
               {loading ? <span>{isArabic ? 'جاري الحفظ...' : 'Saving...'}</span> : <><FaSave /> <span>{isArabic ? 'حفظ' : 'Save'}</span></>}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
