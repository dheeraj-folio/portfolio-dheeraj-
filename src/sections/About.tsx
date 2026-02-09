import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction Rate' },
];

const services = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Building performant, accessible web applications with modern frameworks.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive, beautiful interfaces that users love.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Making websites blazing fast with advanced optimization techniques.',
  },
  {
    icon: Globe,
    title: 'WebGL & 3D',
    description: 'Crafting immersive 3D experiences with Three.js and WebGL.',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const statsContainer = statsRef.current;
    const servicesContainer = servicesRef.current;

    if (!section || !heading || !text || !statsContainer || !servicesContainer) return;

    // Create scroll timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.5,
      },
    });

    // Heading animation
    scrollTl.fromTo(
      heading,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      0
    );

    // Text animation
    scrollTl.fromTo(
      text.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
      0.2
    );

    // Stats animation
    const statItems = statsContainer.querySelectorAll('.stat-item');
    scrollTl.fromTo(
      statItems,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
      0.4
    );

    // Services animation
    const serviceItems = servicesContainer.querySelectorAll('.service-card');
    scrollTl.fromTo(
      serviceItems,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' },
      0.6
    );

    // Counter animation for stats
    statItems.forEach((item) => {
      const valueEl = item.querySelector('.stat-value');
      if (!valueEl) return;

      const finalValue = valueEl.getAttribute('data-value') || '0';
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      const counter = { value: 0 };

      gsap.to(counter, {
        value: numericValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          const current = Math.round(counter.value);
          valueEl.textContent = current + (finalValue.includes('+') ? '+' : finalValue.includes('%') ? '%' : '');
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section || st.vars.trigger === statsContainer) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 bg-cyber-dark overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyber-green/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-20">
          <h2
            ref={headingRef}
            className="text-section font-bold text-white mb-4"
          >
            ABOUT<span className="text-cyber-green">.</span>
          </h2>
          <div className="w-24 h-1 bg-cyber-green" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 mb-24">
          {/* Left Column - Text */}
          <div ref={textRef} className="space-y-6">
            <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
              I am a{' '}
              <span className="text-cyber-green font-medium">frontend developer</span>{' '}
              obsessed with performance and pixel-perfect design.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              I bridge the gap between engineering and aesthetics, creating digital
              experiences that not only look stunning but also perform exceptionally.
              With expertise in modern frameworks, WebGL, and animation libraries,
              I bring ideas to life on the web.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              My approach combines technical excellence with creative vision,
              ensuring every project delivers both functionality and visual impact.
            </p>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="#work"
                className="inline-flex items-center gap-3 text-cyber-green hover:text-white transition-colors group"
              >
                <span className="text-sm tracking-wider uppercase">View My Work</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item glass rounded-2xl p-8 text-center hover:border-cyber-green/30 transition-colors"
              >
                <div
                  className="stat-value text-4xl md:text-5xl font-bold text-cyber-green mb-2"
                  data-value={stat.value}
                >
                  0
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-medium text-white/80 mb-8 uppercase tracking-wider">
            What I Do
          </h3>
          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-cyber-green/10 flex items-center justify-center mb-4 group-hover:bg-cyber-green/20 transition-colors">
                  <service.icon className="w-6 h-6 text-cyber-green" />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
