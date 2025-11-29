import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Placeholder */}
          <div className="flex-1">
            <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-orange-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-lg">{t('about.imagePlaceholder')}</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500">
              {t('about.title')}
            </h2>
            <h3 className="text-3xl font-semibold text-blue-900">
              {t('about.subtitle')}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

