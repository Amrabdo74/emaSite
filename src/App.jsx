import Header from './components/Header';
import Hero from './components/Hero';
import ContactInfo from './components/ContactInfo';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AboutUsSection from './components/aboutUsPage/AboutUsSection';
import Honecard from './components/Honecard';
import MissionVisionComponent from './components/MissionVisionComponent';
import ExperienceSection from './components/aboutUsPage/ExperinceSection';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* <Hero /> */}
      <Honecard />
      <ContactInfo />
      <AboutUs />
      <Services />
      <FAQ />
      <AboutUsSection />
      <MissionVisionComponent />
      <ExperienceSection />
      <Footer />
    </div>
  );
}

export default App;