"use client";

import Link from "next/link";
import { TestTube2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 relative overflow-hidden text-sm">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6 text-white group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
                                <TestTube2 className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                BioX<span className="text-emerald-500">Lab</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Providing world-class diagnostic services with state-of-the-art technology and expert care. Your health is our priority.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-emerald-600 hover:text-white transition-colors hover:border-emerald-500">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-emerald-600 hover:text-white transition-colors hover:border-emerald-500">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-emerald-600 hover:text-white transition-colors hover:border-emerald-500">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:bg-emerald-600 hover:text-white transition-colors hover:border-emerald-500">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Our Services</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Find a Doctor</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Book Appointment</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Testimonials</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Our Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Pathology</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Microbiology</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Biochemistry</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Molecular Biology</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Histopathology</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Cytogenetics</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>123 Medical Centre Dr, Science Park, New York, NY 10001</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>contact@bioxlab.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
                    <p>&copy; 2024 BioXLab. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
