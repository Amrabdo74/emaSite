import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaEye } from 'react-icons/fa';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من حذف هذا المشروع؟' : 'Are you sure you want to delete this project?')) {
       try {
         await deleteDoc(doc(db, 'projects', id));
         setProjects(prev => prev.filter(p => p.id !== id));
       } catch (error) {
         console.error("Error deleting project:", error);
         alert("Error deleting project");
       }
    }
  };

  const getLocalizedField = (field, lang) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang === 'ar' ? 'ar' : 'en'] || field['en'] || '';
  };

  if (loading) {
    return (
       <div className="flex justify-center items-center h-64">
         <FaSpinner className="animate-spin text-4xl text-primary" />
       </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">
          {isArabic ? 'المشاريع' : 'Company Projects'}
        </h1>
        <Link 
          to="/admin/projects/create" 
          className="flex items-center gap-2 px-4 py-2 bg-screens text-primary font-bold rounded-lg hover:bg-screens/90 transition-colors"
        >
          <FaPlus />
          {isArabic ? 'إضافة مشروع' : 'Add New Project'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
           projects.map((project) => (
             <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                   {project.images && project.images.length > 0 ? (
                     <img 
                       src={project.images[0]} 
                       alt="Project Cover" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                       No Image
                     </div>
                   )}
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                   <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1">
                      {getLocalizedField(project.name, i18n.language) || (isArabic ? 'اسم غير متوفر' : 'Name unavailable')}
                   </h3>
                   <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {getLocalizedField(project.description, i18n.language)}
                   </p>
                   
                   <div className="flex gap-2 pt-4 border-t border-gray-50 mt-auto">
                      <Link 
                         to={`/admin/projects/${project.id}`}
                         className="flex-1 py-2 flex items-center justify-center gap-2 bg-gray-50 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-semibold"
                       >
                         <FaEye /> {isArabic ? 'عرض' : 'View'}
                       </Link>
                      <Link 
                        to={`/admin/projects/edit/${project.id}`}
                        className="flex-1 py-2 flex items-center justify-center gap-2 bg-gray-50 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold"
                      >
                         <FaEdit /> {isArabic ? 'تعديل' : 'Edit'}
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 py-2 flex items-center justify-center gap-2 bg-gray-50 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-semibold"
                      >
                         <FaTrash /> {isArabic ? 'حذف' : 'Delete'}
                      </button>
                   </div>
                </div>
             </div>
           ))
        ) : (
           <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
              {isArabic ? 'لا توجد مشاريع' : 'No projects found'}
           </div>
        )}
      </div>

    </div>
  );
}
