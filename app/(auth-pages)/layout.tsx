"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dna, Activity, FlaskConical } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignUp = pathname.includes("sign-up");

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans selection:bg-emerald-500/30 flex lg:flex-row flex-col">

      {/* 
          We use LayoutGroup or just layout prop to animate the position changes.
          However, swapping flex direction is instant. 
          To animate the swap, we can use absolute positioning or just standard layout animation if they share a common parent.
          
          Better verification: 
          If isSignUp is true, we want the Image on Left, Form on Right.
          If isSignUp is false (Sign In), we want Form on Left, Image on Right.
          
          We can achieve this by changing the flex-direction or order, and adding `layout` prop.
      */}

      {/* Left Side - Auth Form (Sign In) / Image (Sign Up) */}
      <motion.div
        layout
        className={`relative flex items-center justify-center p-4 lg:p-8 w-full lg:w-1/2 z-10 order-1 ${isSignUp ? 'lg:order-2' : 'lg:order-1'}`}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Animated Grid Background (Form Side) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>

          {/* Moving Scan Line Effect */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.3)] z-0"
          />
        </div>

        {/* Content Container */}
        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Laboratory Visuals (Desktop Only) */}
      <motion.div
        layout
        className={`hidden lg:block relative w-1/2 bg-slate-900 border-l border-slate-800 overflow-hidden order-2 ${isSignUp ? 'lg:order-1' : 'lg:order-2'}`}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Advanced Laboratory"
            fill
            className="object-cover opacity-20 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        {/* Floating Tech Elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/3 left-20 z-20"
        >
          <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Genomic seq.</p>
              <p className="text-sm font-bold text-white">Analysis Complete</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-20 z-20"
        >
          <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Processing</p>
              <p className="text-sm font-bold text-white">Live Status</p>
            </div>
          </div>
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute bottom-12 left-12 right-12 z-30">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Advancing Science, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Precision Diagnostics.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg">
            Manage your laboratory operations with our state-of-the-art dashboard. Secure, fast, and reliable.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white z-${10 - i}`}>
                  <Image
                    src={`https://i.pravatar.cc/100?img=${10 + i}`}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-white font-bold">2k+</span> Scientists Online
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
