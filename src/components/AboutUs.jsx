import { useTranslation } from 'react-i18next';
import aboutImage from '../assets/hero.png';

function AboutUs() {
  const { t } = useTranslation();
  return (
    <section id="about" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-right space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-[#FAA617] leading-tight">
                {t('about.title')}
              </h2>
              <h3 className="text-3xl font-semibold text-blue-900 leading-tight">
                {t('about.subtitle')}
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-800 leading-[2] text-justify">
                {t('about.description1')}
              </p>
              <p className="text-xl text-gray-800 leading-[2] text-justify">
                {t('about.description2')}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1">
            <div className="w-full h-[500px] rounded-2xl">
              <img 
                src={aboutImage} 
                alt='About Us' 
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;