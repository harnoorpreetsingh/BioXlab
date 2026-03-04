"use client";

import { motion } from "framer-motion";
import { ArrowRight, Microscope, FlaskRound, Award, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
    const services = [
        {
            icon: <Microscope className="w-10 h-10 text-emerald-400" />,
            title: "Clinical Pathology",
            description: "Comprehensive analysis of bodily fluids and tissues for accurate diagnosis.",
            color: "bg-emerald-500/10 border-emerald-500/20",
        },
        {
            icon: <FlaskRound className="w-10 h-10 text-blue-400" />,
            title: "Molecular Biology",
            description: "Advanced DNA and RNA testing for genetic disorders and infectious diseases.",
            color: "bg-blue-500/10 border-blue-500/20",
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-teal-400" />,
            title: "Microbiology",
            description: "Identification of bacteria, viruses, and fungi to guide effective treatment.",
            color: "bg-teal-500/10 border-teal-500/20",
        },
        {
            icon: <Clock className="w-10 h-10 text-cyan-400" />,
            title: "24/7 Emergency Lab",
            description: "Round-the-clock testing services for critical care and emergencies.",
            color: "bg-cyan-500/10 border-cyan-500/20",
        },
        {
            icon: <Award className="w-10 h-10 text-sky-400" />,
            title: "Histopathology",
            description: "Microscopic examination of tissue to study the manifestations of disease.",
            color: "bg-sky-500/10 border-sky-500/20",
        },
        {
            icon: <BadgeCheck className="w-10 h-10 text-green-400" />,
            title: "Wellness Packages",
            description: "Preventive health checkups tailored for different age groups and lifestyles.",
            color: "bg-green-500/10 border-green-500/20",
        },
    ];

    return (
        <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-400 font-semibold mb-2 tracking-wide"
                    >
                        OUR EXPERTISE
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Comprehensive Lab Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-slate-400 text-lg"
                    >
                        Utilizing cutting-edge technology to provide accurate and timely diagnostic services for all your healthcare needs.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                        >
                            <div className={`w-16 h-16 rounded-xl ${service.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center text-emerald-400 font-medium cursor-pointer group-hover:gap-2 transition-all">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-transparent to-transparent group-hover:from-emerald-500/5 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-emerald-500/30 px-8 transition-all">
                        View All Services
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Services;
