import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    // Fade in animation
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === footer) st.kill();
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 bg-cyber-dark border-t border-white/5"
    >
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div ref={contentRef} className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {/* Logo */}
            <div className="text-center md:text-left">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="text-2xl font-bold tracking-tight text-white hover:text-cyber-green transition-colors"
              >
                DHEERAJ<span className="text-cyber-green">.</span>FOLIO
              </a>
              <p className="text-sm text-white/40 mt-2">
                Creative Frontend Developer
              </p>
            </div>

            {/* Quick Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {['Home', 'About', 'Work', 'Skills', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-cyber-green transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-white/50 hover:text-cyber-green transition-colors"
            >
              <span>Back to top</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyber-green group-hover:bg-cyber-green transition-all">
                <ArrowUp className="w-4 h-4 group-hover:text-cyber-dark transition-colors" />
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-cyber-green fill-cyber-green" /> by Dheeraj
            </p>
            <p>
              &copy; {currentYear} DHEERAJ.FOLIO. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent" />
    </footer>
  );
};

export default Footer;
