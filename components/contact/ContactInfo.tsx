"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export function ContactInfo() {
    const contactDetails = [
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["123 Innovation Drive", "Tech Park, CA 94043"],
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["support@bioxlab.com", "partners@bioxlab.com"],
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: ["Mon - Fri: 8am - 6pm", "Sat: 9am - 2pm"],
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
        >
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Touch</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                    Have questions about our services or need to schedule a test?
                    Our team is here to help you with precision diagnostics and expert care.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactDetails.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className={`p-6 rounded-2xl border ${item.border} bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors group`}
                    >
                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                        {item.details.map((detail, i) => (
                            <p key={i} className="text-slate-400 text-sm">{detail}</p>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Map Placeholder or direct link */}
            <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700">
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.4194,37.7749,12,0/800x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazl5bSJ9')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <Button variant="outline" className="relative z-10 border-emerald-500/50 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:text-emerald-300">
                        View on Map <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

// Importing Button locally to avoid conflicts if strictly needed only here, but assuming it's available globally as it's used in ContactForm too.
import { Button } from "@/components/ui/button";
