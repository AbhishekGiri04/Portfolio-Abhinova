import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: 4, y: 0 },
    { x: 20, y: -8 },
    { x: -20, y: -8 },
  ];

  useEffect(() => {
    let scrollY = 0;

    const handleScroll = () => {
      scrollY = window.pageYOffset;
    };

    const animate = () => {
      blobRefs.current.forEach((blob, index) => {
        const initialPos = initialPositions[index];
        if (!blob) return;

        const xOffset = Math.sin(scrollY / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(scrollY / 100 + index * 0.5) * 40;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 transition-transform duration-[1400ms] ease-out"
        />
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block transition-transform duration-[1400ms] ease-out"
        />
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 transition-transform duration-[1400ms] ease-out"
        />
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block transition-transform duration-[1400ms] ease-out"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
};

export default AnimatedBackground;
