"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck } from "lucide-react";

const Certifications = () => {
    const certs = [
        { name: "ISO 15189", icon: <BadgeCheck className="w-8 h-8 text-emerald-500" /> },
        { name: "CAP Accredited", icon: <Award className="w-8 h-8 text-blue-500" /> },
        { name: "CLIA Certified", icon: <ShieldCheck className="w-8 h-8 text-teal-500" /> },
        { name: "HIPAA Compliant", icon: <BadgeCheck className="w-8 h-8 text-purple-500" /> },
    ];

    return (
        <section className="py-16 bg-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h3 className="text-xl font-semibold text-slate-400">Accredited by Global Standards</h3>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {certs.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-950 border border-slate-800 hover:border-emerald-500/30 transition-colors cursor-default"
                        >
                            {cert.icon}
                            <span className="font-bold text-slate-300">{cert.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
