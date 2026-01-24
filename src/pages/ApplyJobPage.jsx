import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore'; // Added updateDoc, increment
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaArrowLeft, FaSpinner, FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase, FaLink, FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa';

export default function ApplyJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    degree: '',
    experience: '',
    cvLink: '',
    bio: '',
    
    // Social Links
    portfolio: '',
    linkedin: '',
    github: '',
    behance: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, 'jobs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'jobApplications'), {
        jobId: job.id,
        jobTitle: job.title.en, // Storing base title for reference
        jobTitleAr: job.title.ar,

        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        
        degree: formData.degree,
        experience: formData.experience,
        cvUrl: formData.cvLink,
        bio: formData.bio,
        
        socialLinks: {
          portfolio: formData.portfolio,
          linkedin: formData.linkedin,
          github: formData.github,
          behance: formData.behance
        },
        
        createdAt: serverTimestamp()
      });

      // Increment applicant count on the job document
      await updateDoc(doc(db, 'jobs', job.id), {
        applicantCount: increment(1)
      });

      alert(isArabic ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'Application submitted successfully! We will contact you soon.');
      navigate('/careers');
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(isArabic ? 'حدث خطأ أثناء إرسال الطلب' : 'Error submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;
  if (!job) return null;

  const requiredFields = job.requiredFields || {};

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <button 
          onClick={() => navigate(`/careers/${id}`)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6"
        >
          {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
          <span>{isArabic ? 'العودة لتفاصيل الوظيفة' : 'Back to Job Details'}</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-primary p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">
                  {isArabic ? 'التقديم لوظيفة' : 'Apply for'}
                </h1>
                <h2 className="text-xl opacity-90">
                  {getLocalizedField(job.title)}
                </h2>
             </div>
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Info */}
              <section>
                 <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                    <FaUser className="text-screens" />
                    {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'الاسم الكامل' : 'Full Name'} *</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'البريد الإلكتروني' : 'Email Address'} *</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'رقم الهاتف' : 'Phone Number'} *</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                    </div>
                 </div>
              </section>

              {/* Professional Info */}
              <section>
                 <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                    <FaGraduationCap className="text-screens" />
                    {isArabic ? 'المؤهلات والخبرة' : 'Qualifications & Experience'}
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'المؤهل العلمي' : 'Degree / Qualification'} *</label>
                      <input type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'سنوات الخبرة' : 'Years of Experience'} *</label>
                      <input type="number" min="0" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'رابط السيرة الذاتية (Drive/LinkedIn)' : 'CV Link (Google Drive / LinkedIn)'} *</label>
                      <input type="url" value={formData.cvLink} onChange={(e) => setFormData({...formData, cvLink: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                    </div>
                 </div>
              </section>

              {/* Dynamic Social Links */}
              {(requiredFields.portfolio || requiredFields.linkedin || requiredFields.github || requiredFields.behance) && (
                <section>
                   <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                      <FaLink className="text-screens" />
                      {isArabic ? 'الروابط المهنية' : 'Professional Links'}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {requiredFields.portfolio && (
                        <div className="col-span-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'رابط معرض الأعمال (Portfolio)' : 'Portfolio Link'} *</label>
                          <input type="url" value={formData.portfolio} onChange={(e) => setFormData({...formData, portfolio: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                        </div>
                      )}
                      {requiredFields.linkedin && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><FaLinkedin className="text-blue-600"/> LinkedIn *</label>
                          <input type="url" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                        </div>
                      )}
                      {requiredFields.github && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><FaGithub /> GitHub *</label>
                          <input type="url" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} placeholder="https://github.com/..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                        </div>
                      )}
                      {requiredFields.behance && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"><FaBehance className="text-blue-500"/> Behance *</label>
                          <input type="url" value={formData.behance} onChange={(e) => setFormData({...formData, behance: e.target.value})} placeholder="https://behance.net/..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required dir="ltr" />
                        </div>
                      )}
                   </div>
                </section>
              )}

              {/* Bio */}
              <section>
                 <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
                    <FaBriefcase className="text-screens" />
                    {isArabic ? 'نبذة عنك' : 'About You'}
                 </h3>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">{isArabic ? 'حدثنا عن نفسك ولماذا أنت مناسب لهذه الوظيفة' : 'Tell us about yourself and why you are a good fit'} *</label>
                   <textarea rows="4" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-screens outline-none" required></textarea>
                 </div>
              </section>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
                >
                  {submitting ? (
                    <span>{isArabic ? 'جاري الإرسال...' : 'Sending...'}</span>
                  ) : (
                    <>
                      <span>{isArabic ? 'إرسال الطلب' : 'Submit Application'}</span>
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
