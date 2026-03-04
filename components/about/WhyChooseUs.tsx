"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const WhyChooseUs = () => {
    const features = [
        {
            title: "Result Turnaround",
            us: "4-24 Hours",
            others: "2-5 Days"
        },
        {
            title: "Accuracy Rate",
            us: "99.9% (AI Verified)",
            others: "95-98%"
        },
        {
            title: "Digital Access",
            us: "Instant Mobile App & Web",
            others: "Email / Physical Copy"
        },
        {
            title: "Emergency Support",
            us: "24/7 Available",
            others: "Business Hours Only"
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose BioXLab?</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        We don't just process samples; we deliver peace of mind. Compare our standards.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                    {/* Header */}
                    <div className="grid grid-cols-3 p-6 border-b border-slate-800 bg-slate-900">
                        <div className="text-slate-400 font-semibold">Features</div>
                        <div className="text-emerald-400 font-bold text-center text-lg">BioXLab</div>
                        <div className="text-slate-500 font-semibold text-center">Standard Labs</div>
                    </div>

                    {/* Rows */}
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`grid grid-cols-3 p-6 items-center ${index !== features.length - 1 ? 'border-b border-slate-800/50' : ''} hover:bg-slate-800/30 transition-colors`}
                        >
                            <div className="text-white font-medium">{feature.title}</div>
                            <div className="text-emerald-300 font-semibold text-center flex justify-center items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                {feature.us}
                            </div>
                            <div className="text-slate-500 text-center flex justify-center items-center gap-2 opacity-70">
                                {feature.others === "Business Hours Only" ? <XCircle className="w-5 h-5" /> : null}
                                {feature.others}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
