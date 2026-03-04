"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Heart, Shield, Users, Zap } from "lucide-react";

const MissionValues = () => {
    const values = [
        {
            icon: <Heart className="w-6 h-6 text-emerald-400" />,
            title: "Patient First",
            description: "Every test represents a life. We treat every sample with the utmost care and urgency."
        },
        {
            icon: <Shield className="w-6 h-6 text-blue-400" />,
            title: "Integrity",
            description: "We adhere to the highest ethical standards, ensuring honesty and transparency in all reports."
        },
        {
            icon: <Zap className="w-6 h-6 text-yellow-400" />,
            title: "Innovation",
            description: "Constantly adopting new technologies to improve accuracy and reduce turnaround times."
        },
        {
            icon: <Users className="w-6 h-6 text-teal-400" />,
            title: "Collaboration",
            description: "Working closely with doctors and healthcare providers to ensure holistic patient care."
        }
    ];

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-3xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target className="w-32 h-32 text-emerald-500" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            To provide accurate, timely, and accessible diagnostic services that empower individuals to manage their health and assist clinicians in delivering precise treatments.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 rounded-3xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Lightbulb className="w-32 h-32 text-blue-500" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            To be the global leader in diagnostic pathology, recognized for our commitment to quality, innovation, and patient-centric care.
                        </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((val, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-emerald-500/30 transition-all duration-300 group"
                        >
                            <div className="mb-4 p-3 rounded-full bg-slate-900 inline-block group-hover:scale-110 transition-transform">
                                {val.icon}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{val.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {val.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionValues;
