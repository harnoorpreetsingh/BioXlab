"use client";
import { useEffect } from 'react';
import gsap from 'gsap';

const Loader = () => {
  useEffect(() => {
    // Animate the top set of rectangles
    gsap.to('#rect1', {
      x: 5,
      scaleX: 1.1,
      scaleY: 0.9,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });

    gsap.to('#rect2', {
      x: -5,
      scaleX: 0.9,
      scaleY: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
      delay: 0.2,
    });

    // Animate the bottom set of rectangles
    gsap.to('#rect3', {
      x: 5,
      scaleX: 1.1,
      scaleY: 0.9,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });

    gsap.to('#rect4', {
      x: -5,
      scaleX: 0.9,
      scaleY: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
      delay: 0.2,
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-2">
        {/* Top set of rectangles */}
        <div className="relative flex items-center justify-center">
          <div
            id="rect1"
            className="w-8 h-8 bg-green-400 transform rotate-45 absolute"
          >
            <div className="w-1/2 h-full bg-green-500 transform -skew-y-12" />
          </div>
          <div
            id="rect2"
            className="w-8 h-8 bg-green-400 transform rotate-45 absolute"
          >
            <div className="w-1/2 h-full bg-green-500 transform -skew-y-12" />
          </div>
        </div>

        {/* Bottom set of rectangles */}
        <div className="relative flex items-center justify-center">
          <div
            id="rect3"
            className="w-8 h-8 bg-green-400 transform rotate-45 absolute"
          >
            <div className="w-1/2 h-full bg-green-500 transform -skew-y-12" />
          </div>
          <div
            id="rect4"
            className="w-8 h-8 bg-green-400 transform rotate-45 absolute"
          >
            <div className="w-1/2 h-full bg-green-500 transform -skew-y-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
