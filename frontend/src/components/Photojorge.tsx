import { useEffect, useRef, useState } from "react";

// Animación de aparición al hacer scroll para la foto
export const PhotoJorge: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obs = new window.IntersectionObserver(([entry]) => {
      setShow(entry.isIntersecting);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`flex justify-center mb-8 transition-all duration-700 ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`} style={{ transitionProperty: 'opacity, transform, scale' }}>
      <img src="/jorge.png" height={'100%'} width={'100%'} alt="Jorge Villarroel" style={{width: '70%'}} />
    </div>
  );
};