import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaArrowRight, FaArrowLeft, FaGlobe, FaBuilding, FaMapMarkerAlt, FaCalendar, FaExternalLinkAlt, FaImages, FaTimes, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function PublicProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Gallery Modal State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
            console.error("No such project!");
            // Handle not found
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (project?.images) {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (project?.images) {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{isArabic ? 'المشروع غير موجود' : 'Project Not Found'}</h2>
        <button 
            onClick={() => navigate(-1)}
            className="text-primary hover:underline"
        >
            {isArabic ? 'عودة' : 'Go Back'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Image Section (Single Image) */}
      <div className="bg-gray-900 text-white min-h-[50vh] relative">
         {project.images && project.images.length > 0 && (
            <img 
                src={project.images[0]} 
                alt="Project Cover" 
                className="w-full h-[60vh] object-cover opacity-60"
            />
         )}
         
         {/* Navigation Overlay */}
         <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
             <div className="container mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white hover:text-screens transition-colors"
                >
                    {isArabic ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
                    <span className="font-bold">{isArabic ? 'عودة' : 'Back'}</span>
                </button>
             </div>
         </div>

         <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-50 to-transparent pt-32">
         </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-12">
                  {/* Primary Info */}
                  <div className="flex-1">
                      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {isArabic ? project.name.ar : project.name.en}
                      </h1>
                      
                      <div className="flex flex-wrap gap-6 mb-8 text-sm md:text-base text-gray-600">
                          <div className="flex items-center gap-2">
                              <FaBuilding className="text-primary" />
                              <span className="font-semibold">{isArabic ? 'العميل:' : 'Client:'}</span>
                              <span>{isArabic ? project.client.ar : project.client.en}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-primary" />
                              <span className="font-semibold">{isArabic ? 'الدولة:' : 'Country:'}</span>
                              <span>{isArabic ? project.country.ar : project.country.en}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <FaCalendar className="text-primary" />
                              <span className="font-semibold">{isArabic ? 'التاريخ:' : 'Date:'}</span>
                              <span>
                                {project.createdAt?.toDate().toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long', 
                                    day: 'numeric'
                                })}
                              </span>
                          </div>
                      </div>

                      <div className="prose max-w-none text-gray-700 leading-loose whitespace-pre-line text-lg mb-8">
                          {isArabic ? project.description.ar : project.description.en}
                      </div>

                      {/* View Images Button */}
                      {project.images && project.images.length > 0 && (
                          <button
                            onClick={() => openGallery(0)}
                            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                              <FaImages />
                              <span>{isArabic ? 'عرض صور المشروع' : 'View Project Images'}</span>
                          </button>
                      )}
                  </div>

                  {/* Sidebar / Actions */}
                  <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-10">
                          <h3 className="text-xl font-bold mb-4">{isArabic ? 'تفاصيل إضافية' : 'More Details'}</h3>
                          
                          <div className="space-y-6">
                              <div>
                                  <span className="block text-gray-500 text-sm mb-1">{isArabic ? 'نوع الخدمة' : 'Service Type'}</span>
                                  <div className="font-semibold text-gray-800">
                                      {isArabic ? project.serviceType.ar : project.serviceType.en}
                                  </div>
                              </div>
                              
                              {project.technologies && project.technologies.length > 0 && (
                                <div>
                                    <span className="block text-gray-500 text-sm mb-2">{isArabic ? 'التقنيات المستخدمة' : 'Technologies'}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                              )}

                              {project.executionStages && project.executionStages.length > 0 && (
                                <div>
                                    <span className="block text-gray-500 text-sm mb-2">{isArabic ? 'مراحل التنفيذ' : 'Execution Stages'}</span>
                                    <ul className="space-y-2">
                                        {project.executionStages.map((stage, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                                                <span>{isArabic ? stage.ar : stage.en}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                              )}
                              
                              {project.link && (
                                  <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl mt-6"
                                  >
                                      <FaExternalLinkAlt />
                                      <span>{isArabic ? 'زيارة المشروع' : 'Visit Project'}</span>
                                  </a>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeGallery}>
            <button 
                onClick={closeGallery}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
                <FaTimes size={32} />
            </button>

            <div className="w-full max-w-6xl h-full max-h-screen flex items-center justify-center relative p-4" onClick={e => e.stopPropagation()}>
                {/* Image */}
                <img 
                    src={project.images[currentImageIndex]} 
                    alt={`Project Image ${currentImageIndex + 1}`} 
                    className="max-w-full max-h-[85vh] object-contain rounded-md"
                />

                {/* Nav Buttons */}
                {project.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className={`absolute left-0 md:left-4 p-4 text-white/70 hover:text-white transition-all bg-black/20 hover:bg-black/40 rounded-full ${isArabic ? 'rotate-180' : ''}`}
                        >
                            <FaChevronLeft size={32} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className={`absolute right-0 md:right-4 p-4 text-white/70 hover:text-white transition-all bg-black/20 hover:bg-black/40 rounded-full ${isArabic ? 'rotate-180' : ''}`}
                        >
                            <FaChevronRight size={32} />
                        </button>
                    </>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-4 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {project.images.length}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
