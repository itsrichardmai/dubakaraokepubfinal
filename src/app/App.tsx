import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu', 'gallery', 'contact-us'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
