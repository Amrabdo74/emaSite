import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { MAIN_SERVICES } from '../constants/services';
import { FaArrowRight, FaArrowLeft, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';

export default function ServiceProjectsPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState(null);

  useEffect(() => {
    // Find service info
    const service = MAIN_SERVICES.find(s => s.id === serviceId);
    if (service) {
      setServiceInfo(service);
    } else {
      // Handle invalid service ID if needed, or just show generic header
    }

    const fetchProjects = async () => {
      try {
        // Remove orderBy to avoid needing a composite index
        const q = query(
          collection(db, 'projects'),
          where('mainService', '==', serviceId)
        );
        
        const snapshot = await getDocs(q);
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort client-side
        projectsData.sort((a, b) => {
           const dateA = a.createdAt?.seconds || 0;
           const dateB = b.createdAt?.seconds || 0;
           return dateB - dateA;
        });
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
            <span>{isArabic ? 'العودة للخدمات' : 'Back to Services'}</span>
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            {serviceInfo 
              ? (isArabic ? `مشاريع ${serviceInfo.titleAr}` : `${serviceInfo.titleEn} Projects`)
              : (isArabic ? 'المشاريع' : 'Projects')
            }
          </h1>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-500">
              {isArabic ? 'لا توجد مشاريع مضافة لهذه الخدمة حالياً' : 'No projects found for this service yet.'}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={isArabic ? project.name.ar : project.name.en} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      {isArabic ? 'لا توجد صورة' : 'No Image'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FaCalendar className="text-primary" />
                    <span>
                      {project.createdAt?.toDate().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
                    {isArabic ? project.name.ar : project.name.en}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed h-[4.5em]">
                    {isArabic ? project.description.ar : project.description.en}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="text-primary font-bold hover:text-primary/80 transition-colors"
                    >
                      {isArabic ? 'عرض التفاصيل' : 'View Details'}
                    </button>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors"
                        title={isArabic ? 'زيارة الرابط' : 'Visit Link'}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
