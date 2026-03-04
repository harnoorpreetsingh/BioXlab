"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Microscope, Dna, Zap } from "lucide-react";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
            {/* Animated Grid Background */}
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
                        ease: "linear"
                    }}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.3)] z-0"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            Next-Gen Laboratory
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                            Advanced <br />
                            Diagnostics <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                Reinvented
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                            Experience precision diagnostics powered by AI and state-of-the-art technology. Get 100% accurate results with our advanced matrix analysis.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.4)] px-8 h-12 text-base transition-all duration-300 border border-emerald-500/50">
                                Book Appointment <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-300 hover:bg-slate-800 hover:text-white px-8 h-12 text-base transition-all">
                                View Services
                            </Button>
                        </div>

                        {/* Stats/Trust Indicators */}
                        <div className="mt-12 flex items-center gap-8 text-sm font-medium text-slate-400">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                <span>99.9% Accuracy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <span>Rapid Results</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Microscope className="w-5 h-5 text-blue-500" />
                                <span>ISO Certified</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content */}
                    <div className="relative h-[500px] hidden lg:block perspective-1000">
                        {/* Main floating image card */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 10, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute inset-0 z-10"
                        >
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm group">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10" />
                                <Image
                                    src="https://images.unsplash.com/photo-1579165466734-7f35a4755657?auto=format&fit=crop&q=80&w=1000"
                                    alt="Modern Laboratory"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                                    priority
                                />

                                {/* Floating Data Points Overlay */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <div className="absolute top-[60%] right-[30%] w-2 h-2 bg-blue-500 rounded-full animate-ping delay-700" />
                                </div>

                                {/* Glass Card Info */}
                                <div className="absolute bottom-8 left-8 right-8 z-30">
                                    <div className="backdrop-blur-md bg-slate-900/60 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-lg text-white">Dr. Sarah Jenkins</p>
                                            <p className="text-emerald-400 text-sm">Lead Pathologist</p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                            <Activity className="w-5 h-5 text-emerald-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Tech Elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 -left-10 z-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                    <Dna className="w-5 h-5" />
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
                            className="absolute bottom-20 -right-5 z-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Processing</p>
                                    <p className="text-sm font-bold text-white">Live Status</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
