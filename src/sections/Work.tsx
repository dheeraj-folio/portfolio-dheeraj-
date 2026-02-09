import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'LUMINA',
    subtitle: 'E-Commerce Revolution',
    description: 'A luxury fashion e-commerce platform with immersive product showcases and seamless checkout experience.',
    image: '/project-lumina.jpg',
    tags: ['React', 'Next.js', 'Stripe', 'Framer Motion'],
    link: '#',
    color: '#D4AF37',
  },
  {
    id: 2,
    title: 'NEXUS',
    subtitle: 'Data Visualization',
    description: 'Real-time analytics dashboard with interactive charts and AI-powered insights for enterprise clients.',
    image: '/project-nexus.jpg',
    tags: ['Vue.js', 'D3.js', 'Python', 'WebSocket'],
    link: '#',
    color: '#00D4AA',
  },
  {
    id: 3,
    title: 'AURA',
    subtitle: 'Immersive WebGL',
    description: 'An award-winning 3D web experience showcasing the future of digital art and interactive storytelling.',
    image: '/project-aura.jpg',
    tags: ['Three.js', 'WebGL', 'GSAP', 'React'],
    link: '#',
    color: '#9D4EDD',
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectsContainer = projectsRef.current;

    if (!section || !heading || !projectsContainer) return;

    // Heading animation
    gsap.fromTo(
      heading.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Projects animation
    const projectCards = projectsContainer.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section || st.vars.trigger === heading) st.kill();
      });
    };
  }, []);

  const handleProjectHover = (index: number | null) => {
    setActiveProject(index);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-32 bg-cyber-dark overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-7xl mx-auto mb-20">
          <span className="text-cyber-green text-sm tracking-[0.3em] uppercase mb-4 block">
            Selected Works
          </span>
          <h2 className="text-section font-bold text-white mb-4">
            WORK<span className="text-cyber-green">.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl">
            A curated selection of projects that showcase my expertise in frontend
            development and creative design.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="max-w-7xl mx-auto space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group relative"
              onMouseEnter={() => handleProjectHover(index)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-cyber-surface">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark/50 to-transparent lg:bg-gradient-to-l" />
                    
                    {/* Project Number */}
                    <div className="absolute top-6 left-6 text-6xl font-bold text-white/10">
                      0{project.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs uppercase tracking-wider text-white/60 bg-white/5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-cyber-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lg text-white/40 mb-4">{project.subtitle}</p>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-3 text-cyber-green hover:text-white transition-colors group/link"
                    >
                      <span className="text-sm tracking-wider uppercase">View Project</span>
                      <div className="w-10 h-10 rounded-full border border-cyber-green/30 flex items-center justify-center group-hover/link:bg-cyber-green group-hover/link:border-cyber-green transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 pointer-events-none ${
                    activeProject === index
                      ? 'border-cyber-green/50'
                      : 'border-transparent'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-cyber-dark transition-all duration-300 group"
          >
            <span className="text-sm tracking-wider uppercase">View All Projects</span>
            <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
