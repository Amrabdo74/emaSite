import AboutUsSection from '../components/aboutUsPage/AboutUsSection';
import MissionVisionComponent from '../components/MissionVisionComponent';
import ExperienceSection from '../components/aboutUsPage/ExperinceSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutUsSection />
      <MissionVisionComponent />
      <ExperienceSection />
    </div>
  );
}

