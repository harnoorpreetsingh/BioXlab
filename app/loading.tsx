"use client";

export default function Loader() {
  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulsing ring */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Pulsing outer ring */}
          <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30 animate-ping opacity-20" />
          <div className="absolute w-20 h-20 rounded-full border border-emerald-500/20 animate-pulse" />

          {/* Logo */}
          <div className="w-16 h-16 bg-slate-900 border border-emerald-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden">
            <img
              src="/assests/images/Logo-compressed_Webpifier.webp"
              alt="BioXLab Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Brand Text */}
        <h2 className="text-xl font-bold tracking-tight text-white mb-3">
          BioX<span className="text-emerald-400">Lab</span>
        </h2>

        {/* Animated loading bar */}
        <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 rounded-full animate-loading-bar"
            style={{
              width: "40%",
              animation: "loadingBar 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <p className="text-slate-500 text-xs mt-4 tracking-widest uppercase">
          Loading...
        </p>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
