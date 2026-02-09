import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useMemo } from 'react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 3D Monolith Component
const Monolith = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Continuous rotation
    meshRef.current.rotation.y = scrollProgress * Math.PI * 2 + state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    
    // Mouse interaction (subtle tilt)
    const mouseX = (state.mouse.x * 0.1);
    const mouseY = (state.mouse.y * 0.1);
    meshRef.current.rotation.z += (mouseX - meshRef.current.rotation.z) * 0.05;
    meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 3.5, 0.5]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0a0a0a"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1}
      />
    </mesh>
  );
};

// Particle Field Component
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00FF9D"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Scene Component
const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00FF9D" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#00FF9D"
      />
      <Monolith scrollProgress={scrollProgress} />
      <ParticleField />
    </>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !title || !subtitle || !scrollHint) return;

    // Split title into characters for animation
    const chars = title.querySelectorAll('.hero-char');

    // Entrance animation timeline
    const entranceTl = gsap.timeline({ delay: 2.5 });

    // Animate each character
    entranceTl.fromTo(
      chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'expo.out',
      }
    );

    // Subtitle animation
    entranceTl.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Scroll hint animation
    entranceTl.fromTo(
      scrollHint,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    // Scroll-based animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });

    // Fade out on scroll
    scrollTl.to(
      [title, subtitle],
      {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: 'power2.in',
      },
      0.5
    );

    scrollTl.to(
      scrollHint,
      {
        opacity: 0,
        duration: 0.3,
      },
      0.3
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  // Split text into characters
  const titleText = 'DHEERAJ.FOLIO';
  const characters = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="hero-char inline-block"
      style={{ display: char === '.' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-cyber-dark"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-cyber-dark/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center h-full px-6">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-hero font-bold text-white tracking-tighter text-center mb-6"
          style={{ perspective: '1000px' }}
        >
          {characters}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/60 text-center max-w-xl tracking-wide"
        >
          Creative Frontend Developer
          <span className="block text-sm mt-2 text-cyber-green/80">
            Crafting Digital Experiences
          </span>
        </p>

        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Scroll to Explore
          </span>
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cyber-green rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-cyber-green/30 to-transparent" />
      <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-cyber-green/30 to-transparent" />
    </section>
  );
};

export default Hero;
