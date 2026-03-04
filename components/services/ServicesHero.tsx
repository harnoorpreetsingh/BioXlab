"use client";

import { motion } from "framer-motion";
import { Activity, Beaker, Dna, Microscope, ShieldPlus, TestTube2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-20">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-500/10 rounded-[100%] blur-[120px] -z-10 rotate-45" />

            {/* Floating Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[
                    { icon: <Dna className="w-8 h-8 text-emerald-400" />, top: "20%", left: "15%", delay: 0 },
                    { icon: <Microscope className="w-10 h-10 text-teal-400" />, top: "60%", left: "10%", delay: 1.5 },
                    { icon: <Beaker className="w-6 h-6 text-sky-400" />, top: "30%", left: "80%", delay: 0.5 },
                    { icon: <Activity className="w-12 h-12 text-blue-400" />, top: "70%", left: "85%", delay: 2 },
                    { icon: <TestTube2 className="w-8 h-8 text-green-400" />, top: "40%", left: "5%", delay: 1 },
                    { icon: <ShieldPlus className="w-10 h-10 text-cyan-400" />, top: "15%", left: "70%", delay: 2.5 },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute opacity-20"
                        style={{ top: item.top, left: item.left }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay,
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    >
                        <Microscope className="w-4 h-4" />
                        <span>Comprehensive Lab Diagnostics</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
                    >
                        Explore Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
                            Diagnostic Services
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        From routine check-ups to specialized molecular testing, BioXLab offers a vast array of cutting-edge diagnostic services tailored for your well-being.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/50 w-full sm:w-auto h-12 px-8 text-base">
                            Book a Category
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full border-slate-700 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white backdrop-blur-md w-full sm:w-auto h-12 px-8 text-base">
                            Search Tests
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;
