import Header from './components/Header';
import Hero from './components/Hero';
import ContactInfo from './components/ContactInfo';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Honecard from './components/Honecard';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Honecard />
      {/* <ContactInfo />
      <Features />
      <AboutUs />
      <Services />
      <FAQ /> */}
      <Footer />
    </div>
  );
}

export default App;