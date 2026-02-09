import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const progressBar = progressRef.current;
    const text = textRef.current;
    const ring = ringRef.current;

    if (!container || !progressBar || !text || !ring) return;

    // Simulate loading progress
    const duration = 2000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Loading complete - exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(text, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        })
          .to(
            ring,
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'back.in(1.7)',
            },
            '-=0.1'
          )
          .to(
            progressBar.parentElement,
            {
              opacity: 0,
              duration: 0.2,
            },
            '-=0.2'
          )
          .to(
            container,
            {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 0.8,
              ease: 'power3.inOut',
            },
            '-=0.1'
          );
      }
    };

    // Start progress animation
    requestAnimationFrame(updateProgress);

    // Entrance animation
    gsap.fromTo(
      ring,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(
      text,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    );

    return () => {
      gsap.killTweensOf([container, progressBar, text, ring]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cyber-dark"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      {/* Loading Ring */}
      <div ref={ringRef} className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-white/10" />
        <div
          className="absolute inset-0 w-24 h-24 rounded-full border-2 border-t-cyber-green border-r-transparent border-b-transparent border-l-transparent loader-ring"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(progress)}</span>
        </div>
      </div>

      {/* Loading Text */}
      <div ref={textRef} className="text-center">
        <p className="text-sm tracking-[0.3em] text-white/60 uppercase mb-2">
          Initializing
        </p>
        <p className="text-2xl font-light text-white tracking-wider">
          DHEERAJ.FOLIO
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-cyber-green transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-cyber-green/50 rounded-full animate-pulse" />
      <div className="absolute top-20 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-cyber-green/30 rounded-full animate-pulse delay-500" />
    </div>
  );
};

export default Loader;
