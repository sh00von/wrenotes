"use client"

import { useEffect, useRef } from 'react'

const WaveBackground = () => {
  const waveRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.002;
      if (waveRef.current) {
        const paths = waveRef.current.querySelectorAll<SVGPathElement>('path');
        paths.forEach((path, index) => {
          const length = path.getTotalLength();
          path.setAttribute('stroke-dasharray', `${length} ${length}`);
          path.setAttribute('stroke-dashoffset', (length * (time + index * 0.5) % length).toString());
        });
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return (
    <div className="fixed inset-0 z-0 bg-blue-50">
      <svg
        ref={waveRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
        />
        <path
          d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,213.3C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
        />
        <path
          d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,208C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(59, 130, 246, 0.2)"
        />
      </svg>
    </div>
  )
}

export default WaveBackground