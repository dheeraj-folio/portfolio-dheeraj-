import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger after loading
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoadingComplete} />}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main 
        ref={mainRef}
        className={`relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
