import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    // Check if touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse position
    const mousePos = { x: 0, y: 0 };
    
    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      // Fast dot follow
      gsap.to(dot, {
        x: mousePos.x - 4,
        y: mousePos.y - 4,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Slower ring follow
      gsap.to(ring, {
        x: mousePos.x - 20,
        y: mousePos.y - 20,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 1.5,
        borderColor: '#00FF9D',
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
};

export default CustomCursor;
