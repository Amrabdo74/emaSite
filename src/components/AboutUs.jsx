import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import aboutImage from '../assets/man pic.png';

function AboutUs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'homePage', 'content'), (snap) => {
      if (snap.exists() && snap.data().about) {
        setAboutData(snap.data().about);
      }
    });
    return () => unsub();
  }, []);

  const title = aboutData?.title?.[lang] || t('about.title');
  const subtitle = aboutData?.subtitle?.[lang] || t('about.subtitle');
  const description1 = aboutData?.description1?.[lang] || t('about.description1');
  const description2 = aboutData?.description2?.[lang] || t('about.description2');

  return (
    <section id="about" className="bg-white py-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16" dir={isArabic ? 'rtl' : 'ltr'}>

          {/* Text Content */}
          <div className="flex-1 text-right space-y-8 py-10">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-screens leading-tight">
                {title}
              </h2>
              <h3 className="text-3xl font-semibold text-primary leading-tight">
                {subtitle}
              </h3>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-800 leading-[2] text-justify">
                {description1}
              </p>
              <p className="text-xl text-gray-800 leading-[2] text-justify">
                {description2}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1">
            <div className="w-full h-[450px] md:h-[650px] rounded-2xl">
              <img
                src={aboutImage}
                alt='About Us'
                className='h-full w-full md:object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
