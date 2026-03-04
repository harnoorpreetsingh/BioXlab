"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";

const TeamMember = ({ name, role, bio, image, delay }: { name: string, role: string, bio: string, image: string, delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay }}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500"
        >
            <div className="aspect-[3/4] relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Placeholder while loading */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 translate-y-4 group-hover:translate-y-0 transform">
                    <a href="#" className="p-3 rounded-full bg-white text-emerald-900 hover:bg-emerald-400 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-white text-emerald-900 hover:bg-emerald-400 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-white text-emerald-900 hover:bg-emerald-400 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>

            <div className="p-6 relative z-10 bg-slate-900">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{name}</h3>
                <p className="text-emerald-500 text-sm font-medium mb-3">{role}</p>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {bio}
                </p>
            </div>
        </motion.div>
    );
};

const TeamGrid = () => {
    const team = [
        {
            name: "Dr. Sarah Jenkins",
            role: "Chief Medical Officer",
            bio: "With over 20 years of experience in clinical pathology, Dr. Jenkins leads our medical team with a focus on diagnostic precision and patient safety.",
            image: "https://randomuser.me/api/portraits/women/68.jpg" // Placeholder
        },
        {
            name: "Dr. James Wilson",
            role: "Head of Molecular Biology",
            bio: "A pioneer in genetic testing, Dr. Wilson oversees our advanced molecular diagnostics unit, driving innovation in personalized medicine.",
            image: "https://randomuser.me/api/portraits/men/32.jpg" // Placeholder
        },
        {
            name: "Elena Rodriguez",
            role: "Laboratory Director",
            bio: "Elena ensures operational excellence and quality control across all our facilities, maintaining our ISO 15189 standards.",
            image: "https://randomuser.me/api/portraits/women/44.jpg" // Placeholder
        },
        {
            name: "Michael Chang",
            role: "Lead Tech & Automation",
            bio: "Specializing in laboratory robotics, Michael manages our automated systems to ensure rapid and error-free sample processing.",
            image: "https://randomuser.me/api/portraits/men/75.jpg" // Placeholder
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-400 font-semibold mb-2 tracking-wide"
                    >
                        OUR LEADERSHIP
                    </motion.p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Meet the Experts</h2>
                    <p className="text-slate-400 text-lg">
                        Our team of board-certified pathologists, scientists, and technologists is dedicated to delivering the highest standard of care.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <TeamMember key={index} {...member} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
