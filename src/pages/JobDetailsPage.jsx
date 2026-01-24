import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaArrowLeft, FaSpinner, FaBriefcase, FaClock, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane, FaBuilding } from 'react-icons/fa';
import { WORKPLACE_TYPES, JOB_TYPES, CONTRACT_TYPES } from '../constants/jobOptions';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, 'jobs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ 
            id: docSnap.id, 
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate ? docSnap.data().createdAt.toDate() : new Date(docSnap.data().createdAt)
          });
        } else {
           navigate('/careers');
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const getLocalizedField = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[isArabic ? 'ar' : 'en'] || field['en'] || '';
  };
  
  const getOptionLabel = (value, options) => {
    const option = options.find(o => o.id === value);
    return option ? (isArabic ? option.ar : option.en) : value;
  };

  const handleApply = () => {
    navigate(`/careers/${job.id}/apply`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;

  if (!job) return <div className="text-center p-10">{isArabic ? 'الوظيفة غير متاحة' : 'Job not found'}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      {/* Header / Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <button 
          onClick={() => navigate('/careers')}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
          <span>{isArabic ? 'العودة للوظائف' : 'Back to Careers'}</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
          {/* Header Content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                <FaBriefcase className="text-primary text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {getLocalizedField(job.title)}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaBuilding />
                    <span>{getOptionLabel(job.workplaceType || 'onsite', WORKPLACE_TYPES)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{getOptionLabel(job.jobType || 'full_time', JOB_TYPES)}</span>
                  </div>
                   <div className="flex items-center gap-1">
                    <FaBriefcase />
                    <span>{getOptionLabel(job.contractType || 'permanent', CONTRACT_TYPES)}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                      {job.status === 'Open' ? (isArabic ? 'متاح للتقديم' : 'Open for Application') : (isArabic ? 'مغلق' : 'Closed')}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button (Desktop) */}
            <div className="hidden md:block">
               <button 
                onClick={handleApply}
                disabled={job.status !== 'Open'}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
               >
                 <span>{isArabic ? 'تقديم الآن' : 'Apply Now'}</span>
                 <FaPaperPlane />
               </button>
            </div>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-screens/10 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
        </div>
      </div>

      {/* Details Container */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-8">
            {/* About Company */}
            {job.aboutCompany && (job.aboutCompany.ar || job.aboutCompany.en) && (
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <FaBuilding className="text-screens" />
                    {isArabic ? 'عن الشركة' : 'About the Company'}
                  </h2>
                  <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {getLocalizedField(job.aboutCompany)}
                  </div>
               </div>
            )}

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
               <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                 <FaBriefcase className="text-screens" />
                 {isArabic ? 'وصف الوظيفة' : 'Job Description'}
               </h2>
               <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                 {getLocalizedField(job.description)}
               </div>
            </div>

            {/* Application Requirements */}
            {job.requirements && (job.requirements.ar?.length > 0 || job.requirements.en?.length > 0) && (
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <FaCheckCircle className="text-screens" />
                    {isArabic ? 'متطلبات الوظيفة' : 'Job Requirements'}
                  </h2>
                  <ul className="space-y-3">
                    {(job.requirements[isArabic ? 'ar' : 'en'] || job.requirements['en'] || []).map((req, index) => (
                       req && (
                         <li key={index} className="flex items-start gap-3 text-gray-600">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                            <span>{req}</span>
                         </li>
                       )
                    ))}
                  </ul>
               </div>
            )}

            {/* Job Benefits */}
            {job.benefits && (job.benefits.ar?.length > 0 || job.benefits.en?.length > 0) && (
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <FaCheckCircle className="text-screens" />
                    {isArabic ? 'مميزات الوظيفة' : 'Job Benefits'}
                  </h2>
                  <ul className="space-y-3">
                    {(job.benefits[isArabic ? 'ar' : 'en'] || job.benefits['en'] || []).map((ben, index) => (
                       ben && (
                         <li key={index} className="flex items-start gap-3 text-gray-600">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                            <span>{ben}</span>
                         </li>
                       )
                    ))}
                  </ul>
               </div>
            )}
         </div>

         {/* Sidebar */}
         <div className="space-y-6">
            {/* Quick Summary / CTA Mobile */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
               <h3 className="font-bold text-gray-900 mb-4">
                 {isArabic ? 'هل أنت مهتم؟' : 'Interested?'}
               </h3>
               <p className="text-gray-500 text-sm mb-6">
                 {isArabic 
                   ? 'أرسل طلبك الآن وسيقوم فريق الموارد البشرية بمراجعته في أقرب وقت.'
                   : 'Submit your application now and our HR team will review it shortly.'}
               </p>
               <button 
                onClick={handleApply}
                disabled={job.status !== 'Open'}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <span>{isArabic ? 'تقديم الآن' : 'Apply Now'}</span>
                 <FaPaperPlane />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
