"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Microscope, Globe2, Cpu, Sparkles } from "lucide-react";

const TimelineItem = ({ year, title, description, index, icon }: { year: string, title: string, description: string, index: number, icon: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row gap-8 items-center mb-24 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Timeline Dot & Line for Desktop */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20 items-center justify-center">
                {/* Inner glowing pulse */}
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute"></div>
            </div>

            {/* Content Side */}
            <div className={`flex-1 w-full md:w-1/2 group ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-emerald-500/30 hover:shadow-emerald-500/10 hover:bg-slate-900/60`}
                >
                    <div className={`inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wider mb-4 shadow-[0_0_10px_rgba(16,185,129,0.1)]`}>
                        {year}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">{description}</p>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-transparent to-transparent group-hover:from-emerald-500/5 transition-all duration-500 pointer-events-none rounded-3xl" />
                </motion.div>
            </div>

            {/* Visual/Icon Side */}
            <div className={`flex-1 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                <motion.div
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 5 : -5 }}
                    className="relative h-48 md:h-64 rounded-3xl overflow-hidden border border-slate-800/50 bg-slate-900/40 backdrop-blur-sm group flex items-center justify-center"
                >
                    {/* Animated gradient background inside image box */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? 'from-emerald-600/10 via-teal-900/20 to-slate-900' : 'from-sky-600/10 via-blue-900/20 to-slate-900'} z-0`}></div>

                    {/* Floating Abstract Icon */}
                    <motion.div
                        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                        className="relative z-10 text-emerald-400/80 group-hover:text-emerald-300 transition-colors drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                    >
                        {icon}
                    </motion.div>

                    {/* Subtle Year Watermark */}
                    <span className="absolute bottom-4 right-6 text-slate-800/50 text-7xl font-extrabold z-0 select-none tracking-tighter mix-blend-overlay">
                        {year}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    )
}

const StoryTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const milestones = [
        {
            year: "2010",
            title: "The Beginning",
            description: "BioXLab was founded with a single mission: to revolutionize diagnostic accuracy through technology.",
            icon: <Microscope className="w-24 h-24" />
        },
        {
            year: "2015",
            title: "Expansion & Innovation",
            description: "Opened 5 new specialized centers and introduced AI-assisted pathology analysis to our core workflows.",
            icon: <Sparkles className="w-24 h-24 text-teal-400/80 group-hover:text-teal-300" />
        },
        {
            year: "2019",
            title: "Global Recognition",
            description: "Achieved ISO 15189 accreditation and partnered with leading international research institutes.",
            icon: <Globe2 className="w-24 h-24 text-sky-400/80 group-hover:text-sky-300" />
        },
        {
            year: "2023",
            title: "The Future of Diagnostics",
            description: "Launched our fully automated molecular biology unit, setting new standards for speed and precision.",
            icon: <Cpu className="w-24 h-24 text-blue-400/80 group-hover:text-blue-300" />
        },
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Top/Bottom Fade Gradients */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    >
                        OUR JOURNEY
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        A Decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Excellence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-slate-400 text-xl leading-relaxed"
                    >
                        From a small start-up to a leading name in pathology, our story is defined by relentless innovation and an uncompromising commitment to patient care.
                    </motion.p>
                </div>

                <div className="relative max-w-6xl mx-auto" ref={containerRef}>
                    {/* Main Background Line (Faded) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-[1px] top-0 bottom-0 w-[2px] bg-slate-800/50"></div>

                    {/* Animated Scroll Progress Line */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="hidden md:block absolute left-1/2 -translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-400 via-teal-500 to-sky-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-0"
                    ></motion.div>

                    {/* Mobile Vertical Line */}
                    <div className="md:hidden absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/50 via-teal-500/50 to-transparent"></div>

                    {milestones.map((item, index) => (
                        <TimelineItem key={index} {...item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoryTimeline;
