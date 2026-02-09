import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Skill categories with their technologies
const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Animation & 3D',
    skills: [
      { name: 'GSAP', level: 92 },
      { name: 'Three.js', level: 85 },
      { name: 'Framer Motion', level: 88 },
      { name: 'WebGL', level: 78 },
      { name: 'React Three Fiber', level: 82 },
    ],
  },
  {
    name: 'Backend & Tools',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'GraphQL', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 72 },
    ],
  },
];

// Floating skill orbs
const skillOrbs = [
  'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Webpack', 'Vite',
  'Git', 'Figma', 'Sketch', 'Jest', 'Cypress', 'CI/CD',
];

// 3D Particle Constellation
const ParticleConstellation = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    // Create connections between nearby particles
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 3) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return { positions, linePositions: new Float32Array(linePositions) };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00FF9D"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00FF9D" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const categories = categoriesRef.current;
    const orbs = orbsRef.current;

    if (!section || !heading || !categories || !orbs) return;

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

    // Category cards animation
    const cards = categories.querySelectorAll('.skill-category');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate skill bars
      const bars = card.querySelectorAll('.skill-bar-fill');
      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    // Floating orbs animation
    const orbElements = orbs.querySelectorAll('.skill-orb');
    orbElements.forEach((orb, index) => {
      gsap.fromTo(
        orb,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: orbs,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Continuous floating animation
      gsap.to(orb, {
        y: `random(-20, 20)`,
        x: `random(-10, 10)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section || st.vars.trigger === heading) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-32 bg-cyber-dark overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.3} />
          <ParticleConstellation />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cyber-dark via-transparent to-cyber-dark pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-7xl mx-auto mb-20 text-center">
          <span className="text-cyber-green text-sm tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="text-section font-bold text-white mb-4">
            SKILLS<span className="text-cyber-green">.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to bring
            ideas to life.
          </p>
        </div>

        {/* Skills Categories */}
        <div
          ref={categoriesRef}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-20"
        >
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-category glass rounded-3xl p-8 hover:bg-white/5 transition-all duration-300"
              style={{ perspective: '1000px' }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                {category.name}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-cyber-green">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-cyber-green to-cyber-green/60 rounded-full"
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Skill Orbs */}
        <div ref={orbsRef} className="max-w-7xl mx-auto">
          <h3 className="text-center text-white/40 text-sm uppercase tracking-wider mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skillOrbs.map((skill, index) => (
              <div
                key={index}
                className="skill-orb px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:text-cyber-green hover:border-cyber-green/30 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
