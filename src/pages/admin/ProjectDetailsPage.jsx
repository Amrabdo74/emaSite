import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaGlobe, FaBuilding, FaTools, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MAIN_SERVICES } from '../../constants/services';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          // navigate('/admin/projects'); // Optional: redirect if not found
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const getLocalizedField = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[isArabic ? 'ar' : 'en'] || field['en'] || '';
  };

  const nextImage = () => {
    if (project?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;

  if (!project) return <div className="text-center p-10">{isArabic ? 'المشروع غير موجود' : 'Project not found'}</div>;

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/projects')}
          className="p-3 text-gray-500 hover:bg-white bg-gray-50 rounded-full transition-all shadow-sm hover:shadow-md"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        <h1 className="text-3xl font-bold text-primary">
          {getLocalizedField(project.name)}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group h-[400px] lg:h-[500px]">
          {project.images && project.images.length > 0 ? (
            <>
              <img 
                src={project.images[currentImageIndex]} 
                alt="Project" 
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaChevronRight />
                  </button>
                  
                  {/* Dots Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
               {isArabic ? 'لا توجد صور' : 'No Images'}
             </div>
          )}
        </div>

        {/* Details Content */}
        <div className="space-y-6">
           {/* Info Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-3 mb-2 text-primary">
                    <FaBuilding />
                    <span className="font-semibold text-sm opacity-80">{isArabic ? 'العميل' : 'Client'}</span>
                 </div>
                 <p className="text-lg font-bold">{getLocalizedField(project.client)}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-3 mb-2 text-primary">
                    <FaGlobe />
                    <span className="font-semibold text-sm opacity-80">{isArabic ? 'الدولة' : 'Country'}</span>
                 </div>
                 <p className="text-lg font-bold">{getLocalizedField(project.country)}</p>
              </div>

              <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-3 mb-2 text-primary">
                    <FaTools />
                    <span className="font-semibold text-sm opacity-80">{isArabic ? 'الخدمة الأساسية' : 'Main Service'}</span>
                 </div>
                 <p className="text-lg font-bold">
                   {(() => {
                      const service = MAIN_SERVICES.find(s => s.id === project.mainService);
                      return service ? (isArabic ? service.titleAr : service.titleEn) : '-';
                   })()}
                 </p>
              </div>

              <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-3 mb-2 text-primary">
                    <FaTools />
                    <span className="font-semibold text-sm opacity-80">{isArabic ? 'نوع الخدمة (فرعي)' : 'Sub Service Type'}</span>
                 </div>
                 <p className="text-lg font-bold">{getLocalizedField(project.serviceType)}</p>
              </div>
           </div>

           {/* Description */}
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">
                 {isArabic ? 'وصف المشروع' : 'Project Description'}
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                 {getLocalizedField(project.description)}
              </p>
              
              {project.link && (
                <div className="mt-6 pt-4 border-t border-gray-50">
                   <a 
                     href={project.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                   >
                     {isArabic ? 'زيارة رابط المشروع' : 'Visit Project Link'}
                   </a>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
