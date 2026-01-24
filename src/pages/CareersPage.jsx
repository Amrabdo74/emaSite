import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaEnvelope, FaFileAlt, FaMapMarkerAlt, FaClock, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function CareersPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language === 'ar' ? "ar" : "en";
  const isArabic = i18n.language === 'ar';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Query only 'Open' jobs
      // Removed orderBy to avoid index requirement errors on new collections
      const q = query(
        collection(db, 'jobs'),
        where('status', '==', 'Open')
      );
      
      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt)
      }));
      
      // Client-side sort by createdAt desc
      jobsData.sort((a, b) => b.createdAt - a.createdAt);

      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedField = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[isArabic ? 'ar' : 'en'] || field['en'] || '';
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden min-h-[400px] flex items-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-20 h-20 bg-screens rounded-full flex items-center justify-center opacity-90 shadow-lg">
                <FaBriefcase className="text-primary text-4xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                {currentLanguage === "ar" ? "الوظائف" : "Careers"}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed mt-6 drop-shadow-md">
              {currentLanguage === "ar" 
                ? "انضم إلى فريقنا المتميز وكن جزءاً من رحلة النجاح والابتكار"
                : "Join our exceptional team and be part of the journey of success and innovation"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          
          {loading ? (
             <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header: Icon + Title */}
                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-screens/20 transition-colors">
                            {/* Placeholder Company Logo/Icon */}
                            <FaBriefcase className="text-primary text-2xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 line-clamp-2">
                              {getLocalizedField(job.title)}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                               EMA Company
                            </span>
                          </div>
                       </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                       <div className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          <span>{isArabic ? 'المقر الرئيسي' : 'HQ'}</span> {/* Or fetch location if exists */}
                       </div>
                       <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{job.createdAt.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}</span>
                       </div>
                    </div>

                    {/* Description Truncated */}
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                      {getLocalizedField(job.description)}
                    </p>

                    {/* Action Button */}
                    <Link 
                      to={`/careers/${job.id}`}
                      className="w-full mt-auto py-3 px-4 bg-gray-50 hover:bg-primary text-primary hover:text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-x-1"
                    >
                      <span>{isArabic ? "عرض التفاصيل" : "View Details"}</span>
                      {isArabic ? <FaArrowLeft className="text-sm" /> : <FaArrowRight className="text-sm" />}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-cards/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBriefcase className="text-primary text-5xl" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    {currentLanguage === "ar" 
                      ? "لا توجد وظائف متاحة حالياً"
                      : "No Open Positions Available"
                    }
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {currentLanguage === "ar"
                      ? "نأسف، لا توجد فرص عمل متاحة حالياً. لكننا دائماً نبحث عن المواهب المتميزة. إذا كنت مهتماً بالانضمام إلى فريقنا في المستقبل، يرجى إرسال سيرتك الذاتية وسنحتفظ بها في ملفنا."
                      : "We're sorry, there are currently no job openings available. However, we're always looking for exceptional talent. If you're interested in joining our team in the future, please send us your CV and we'll keep it on file."
                    }
                  </p>
                </div>
  
                {/* CTA Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {currentLanguage === "ar" 
                      ? "أرسل سيرتك الذاتية"
                      : "Send Your CV"
                    }
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="mailto:eam.info.2025@gmail.com?subject=CV Submission"
                      className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FaEnvelope className="text-xl" />
                      <span>eam.info.2025@gmail.com</span>
                    </a>
                    <Link
                      to="/contact"
                      className="flex items-center gap-3 px-6 py-3 bg-screens text-primary rounded-xl font-semibold hover:bg-screens/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FaFileAlt className="text-xl" />
                      <span>{currentLanguage === "ar" ? "نموذج التواصل" : "Contact Form"}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {currentLanguage === "ar" ? "لماذا تنضم إلينا؟" : "Why Join Us?"}
            </h2>
            <p className="text-lg text-gray-600">
              {currentLanguage === "ar"
                ? "نحن نقدم بيئة عمل محفزة وفرصاً للنمو والتطوير"
                : "We offer a stimulating work environment and opportunities for growth and development"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* ... keeping static content ... */}
            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "فريق محترف" : "Professional Team"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "اعمل مع فريق من الخبراء والمحترفين"
                  : "Work with a team of experts and professionals"
                }
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-screens rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "نمو مستمر" : "Continuous Growth"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "فرص للتطوير والنمو المهني"
                  : "Opportunities for professional development and growth"
                }
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-cards/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {currentLanguage === "ar" ? "بيئة إبداعية" : "Creative Environment"}
              </h3>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ar"
                  ? "بيئة عمل محفزة تشجع على الابتكار"
                  : "A stimulating work environment that encourages innovation"
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

