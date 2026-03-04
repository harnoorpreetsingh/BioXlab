"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Scan, Zap } from "lucide-react";
import Image from "next/image";

const TechShowcase = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-emerald-400 font-semibold mb-2 tracking-wide"
                        >
                            TECHNOLOGY & INFRASTRUCTURE
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6"
                        >
                            Powered by Innovation
                        </motion.h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            We invest in the latest diagnostic technology to ensure every result is precise. From AI-driven analysis to fully automated sample processing, our infrastructure is built for speed and accuracy.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">AI Analysis</h4>
                                    <p className="text-sm text-slate-400">Deep learning algorithms for pathology detection.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Automation</h4>
                                    <p className="text-sm text-slate-400">Robotic sample handling reduces human error.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Visuals - Bento Grid */}
                    <div className="grid grid-cols-2 gap-4 h-[500px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden border border-slate-700 group"
                        >
                            <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
                            {/* Placeholder Image */}
                            <Image src="https://images.unsplash.com/photo-1581093458891-7f3d39527a3a?auto=format&fit=crop&q=80&w=1000" alt="Robotic Arm" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-slate-900 to-transparent w-full">
                                <span className="text-white font-bold text-lg">Robotic Automation Systems</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative rounded-2xl overflow-hidden border border-slate-700 group"
                        >
                            <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
                            {/* Placeholder Image */}
                            <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600" alt="Microscope" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-slate-900 to-transparent w-full">
                                <span className="text-white font-bold text-sm">Digital Microscopy</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="relative rounded-2xl overflow-hidden border border-slate-700 group"
                        >
                            <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
                            {/* Placeholder Image */}
                            <Image src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600" alt="Data Screen" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-slate-900 to-transparent w-full">
                                <span className="text-white font-bold text-sm">Real-time Analytics</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechShowcase;
