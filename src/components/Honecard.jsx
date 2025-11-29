import { FaRegLightbulb, FaTools, FaChartLine, FaRocket } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Honecard = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [langClass, setLangClass] = useState("en");

  useEffect(() => {
    setLangClass(currentLanguage);
  }, [currentLanguage]);

  const cards = [
    {
      title: t("features.bestPrices"),
      Icon: FaRegLightbulb,
      description: t("features.description"),
      bgClass: "bg-white",
      titleColor: "text-gray-900",
      iconColor: "text-yellow-500",
      dividerColor: "bg-gray-400",
      textColor: "text-gray-900",
    },
    {
      title: t("features.quality"),
      Icon: FaTools,
      description: t("features.description"),
      bgClass: "bg-white",
      titleColor: "text-gray-900",
      iconColor: "text-blue-400",
      dividerColor: "bg-gray-400",
      textColor: "text-gray-900",
    },
    {
      title: t("features.achievement"),
      Icon: FaChartLine,
      description: t("features.description"),
      bgClass: "bg-white",
      titleColor: "text-gray-900",
      iconColor: "text-yellow-500",
      dividerColor: "bg-gray-400",
      textColor: "text-gray-900",
    },
    {
      title: t("features.innovation"),
      Icon: FaRocket,
      description: t("features.description"),
      bgClass: "bg-screens",
      titleColor: "text-white",
      iconColor: "text-white",
      dividerColor: "bg-white",
      textColor: "text-white",
    },
  ];

  let delay = 50;

  return (
    <div className="container mx-auto px-4 my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full"
            data-aos="fade-up"
            data-aos-delay={`${delay += 150}`}
          >
            <div
              className={`${card.bgClass} py-8 h-full rounded-2xl`}
            >
              <div className="px-6 pb-6">
                {/* Title at top */}
                <h5 className={`font-bold text-xl mb-6 text-right ${card.titleColor}`}>
                  {card.title}
                </h5>
                
                {/* Icon - no blob shape */}
                <div className="mb-6 flex justify-center items-center h-32">
                  <card.Icon size="4em" className={card.iconColor} />
                </div>
                
                {/* Divider line */}
                <div
                  className={`${card.dividerColor} mb-4 mx-auto`}
                  style={{ width: "25%", height: "2px" }}
                />
                
                {/* Description text */}
                <p className={`leading-relaxed text-sm text-right ${card.textColor}`}>
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Honecard;

