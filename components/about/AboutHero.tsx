"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Microscope, FlaskConical, Users, ShieldPlus, Activity, Award } from "lucide-react";

const AboutHero = () => {
    return (
        <section className="relative h-[60vh] min-h-[600px] flex items-center pt-20 overflow-hidden bg-slate-950">
            {/* Animated Grid Background - Matching Home & Services */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Glowing Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-500/10 rounded-[100%] blur-[120px] -z-10 rotate-45" />

            {/* Floating Lab Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[
                    { icon: <Microscope className="w-12 h-12 text-emerald-400" />, top: "15%", left: "10%", delay: 0 },
                    { icon: <Users className="w-10 h-10 text-teal-400" />, top: "60%", left: "15%", delay: 1.5 },
                    { icon: <FlaskConical className="w-8 h-8 text-sky-400" />, top: "25%", left: "80%", delay: 0.5 },
                    { icon: <Activity className="w-14 h-14 text-blue-400" />, top: "75%", left: "85%", delay: 2 },
                    { icon: <ShieldPlus className="w-10 h-10 text-cyan-400" />, top: "40%", left: "8%", delay: 1 },
                    { icon: <Award className="w-12 h-12 text-green-400" />, top: "20%", left: "70%", delay: 2.5 },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute opacity-20"
                        style={{ top: item.top, left: item.left }}
                        animate={{
                            y: [0, -40, 0],
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 10 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay,
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/20 text-sm mb-8 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    >
                        <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium">Home</Link>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                        <span className="text-emerald-400 font-semibold">About Us</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
                    >
                        Pioneering the Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400">
                            Medical Diagnostics
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        At BioXLab, we combine advanced technology with human expertise to deliver precise, rapid, and reliable results that empower better healthcare decisions.
                    </motion.p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="text-emerald-500/80 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
                    <div className="w-[2px] h-12 bg-gradient-to-b from-emerald-500 to-transparent rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
