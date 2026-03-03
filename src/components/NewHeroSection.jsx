import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import heroImage from "../assets/hero.png";

export default function NewHeroSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'homePage', 'content'), (snap) => {
      if (snap.exists() && snap.data().hero) {
        setHeroData(snap.data().hero);
      }
    });
    return () => unsub();
  }, []);

  const mainTitle = heroData?.mainTitle?.[lang] || t('hero.mainTitle');
  const mainDescription = heroData?.mainDescription?.[lang] || t('hero.mainDescription');
  const exploreMore = heroData?.exploreMore?.[lang] || t('hero.exploreMore');

  return (
    <div className={`items-center w-10/12 grid-cols-1 lg:grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5`}>

      <div className={`md:mb-14 py-14 md:py-0`}>
        <h1 className={`text-3xl font-semibold text-primary xl:text-5xl lg:text-4xl text-start`}>
          <span className="block w-full">{mainTitle}</span>
        </h1>

        <p className={`py-4 text-lg text-gray-500 2xl:py-8 md:py-6 text-start`}>
          {mainDescription}
        </p>

        <div className="mt-4">
          <Link
            to="/about"
            className="px-5 py-3 text-lg tracking-wider text-white bg-primary rounded-lg md:px-8 hover:bg-primary/90 transition-colors inline-block group"
          >
            <span>{exploreMore}</span>
          </Link>
        </div>
      </div>

      <div className={`pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0`}>
        <img
          id="heroImg1"
          className={`transition-all duration-300 ease-in-out sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0 ${isArabic ? '' : 'rotate-y-180'}`}
          src={heroImage}
          alt="Awesome hero page image"
        />
      </div>

    </div>
  );
}
