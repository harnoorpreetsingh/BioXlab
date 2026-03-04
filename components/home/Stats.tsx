"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const StatsItem = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, value, {
                duration: 2,
                ease: "easeOut"
            });
            return animation.stop;
        }
    }, [isInView, value, count]);

    return (
        <div ref={ref} className="text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center gap-1"
            >
                <motion.span>{rounded}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p className="text-slate-400 font-medium">{label}</p>
        </div>
    );
};

export type StatItemType = {
    value: number;
    label: string;
    suffix?: string;
};

const Stats = ({
    stats = [
        { value: 25, label: "Years Experience", suffix: "+" },
        { value: 1000, label: "Happy Patients", suffix: "k+" },
        { value: 450, label: "Expert Doctors" },
        { value: 100, label: "Awards Won", suffix: "+" },
    ]
}: {
    stats?: StatItemType[]
}) => {

    return (
        <section className="py-20 bg-slate-900 relative overflow-hidden border-y border-slate-800">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <StatsItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
