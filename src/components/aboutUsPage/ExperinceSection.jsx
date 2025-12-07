import React from "react";
import { useTranslation } from "react-i18next";
import image from '../../assets/experience.jpg'

const ExperienceSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`min-h-screen bg-white ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >

      {/* Main Section */}
      <div className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Experience Badge + Image */}
          <div className="flex flex-col lg:flex-row items-start  justify-center gap-6 lg:gap-12">
            {/* Left Side - Experience Badge + Text */}
            <div className="w-full lg:max-w-sm !min-h-full">
              <div className="bg-[#103B68] flex flex-col justify-center items-center gap-0 rounded-3xl p-6 md:p-8 lg:p-12 text-white min-h-[385px]  mb-4 md:mb-6 ">
                {/* Badge Label */}
                <div className="">
                  <div className="bg-white text-[#103B68] px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-md flex flex-col justify-center items-center md:text-sm w-fit mx-auto">
                    {t("experience.experience")}
                  </div>
                </div>

                {/* Years Number */}
                <div className="text-center mt-10 md:mt-12">
                  <h2
                    className="text-9xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4"
                    style={{
                      fontFamily: isArabic ? "Cairo, sans-serif" : "system-ui",
                    }}
                  >
                    {t("experience.years")}
                  </h2>
                  <p
                    className="text-2xl md:text-xl lg:text-2xl font-semibold leading-relaxed px-2"
                    style={{
                      fontFamily: isArabic ? "Cairo, sans-serif" : "system-ui",
                    }}
                  >
                    {t("experience.yearsText")}
                  </p>
                </div>
              </div>
              
              {/* Main Title Below Badge */}
              <div className={`${isArabic ? "text-right" : "text-left"}`}>
                <p
                  className="text-base md:text-lg lg:text-xl text-[#103B68] leading-relaxed font-semibold"
                  style={{
                    fontFamily: isArabic ? "Cairo, sans-serif" : "system-ui",
                  }}
                >
                  {t("experience.mainTitle")}
                </p>
              </div>
            </div>

            {/* Right Side - Image + Description */}
            <div className="w-full lg:flex-1">
              <div className="rounded-3xl overflow-hidden mb-4 md:mb-6 shadow-xl w-full h-56 md:h-72 lg:h-96">
                <img
                  src={image}
                  alt="Business Meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Description Text Below Image */}
              <div className={`${isArabic ? "text-right" : "text-left"}`}>
                <p
                  className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6"
                  style={{
                    fontFamily: isArabic ? "Cairo, sans-serif" : "system-ui",
                  }}
                >
                  {t("experience.description")}
                </p>
                <p
                  className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed"
                  style={{
                    fontFamily: isArabic ? "Cairo, sans-serif" : "system-ui",
                  }}
                >
                  {t("experience.leftTitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;