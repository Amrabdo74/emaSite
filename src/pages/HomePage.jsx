import NewHeroSection from '../components/NewHeroSection';
import Honecard from '../components/Honecard';
import ContactInfo from '../components/ContactInfo';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import FAQ from '../components/FAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NewHeroSection />
      <Honecard />
      {/* <ContactInfo /> */}
      <AboutUs />
      <div id="services">
        <Services />
      </div>
      <FAQ />
    </div>
  );
}

