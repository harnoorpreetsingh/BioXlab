"use client";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

export default function NotFound() {
  useEffect(() => {
    // GSAP animation for fade-in effect
    gsap.fromTo(
      ".not-found-container",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".not-found-button",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
    );
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="not-found-container text-center p-8 max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>
        <Link href="/">
          <button className="not-found-button bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
