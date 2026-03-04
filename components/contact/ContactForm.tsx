"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, User, Mail, MessageSquare, PenTool, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            const response = await fetch("/api/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setIsSuccess(true);
            formRef.current?.reset();
            toast.success("Message sent successfully!");

            // Reset success state after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (error: any) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-xl transform rotate-1"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative Glow */}
                <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-[100px] -left-[100px] w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-emerald-500 rounded-full"></span>
                        Send us a Message
                    </h3>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 group">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider font-medium group-focus-within:text-emerald-400 transition-colors">
                                    Your Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        name="name"
                                        placeholder="John Doe"
                                        className="pl-10 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-12 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider font-medium group-focus-within:text-emerald-400 transition-colors">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-12 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-slate-400 text-xs uppercase tracking-wider font-medium group-focus-within:text-emerald-400 transition-colors">
                                Subject
                            </Label>
                            <div className="relative">
                                <PenTool className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    name="subject"
                                    placeholder="How can we help you?"
                                    className="pl-10 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-12 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-slate-400 text-xs uppercase tracking-wider font-medium group-focus-within:text-emerald-400 transition-colors">
                                Message
                            </Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Textarea
                                    name="message"
                                    placeholder="Tell us more about your inquiry..."
                                    className="pl-10 min-h-[150px] bg-slate-950/50 border-slate-800 text-slate-200 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl resize-none transition-all pt-3"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : isSuccess ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Sent Successfully!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Send Message <Send className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
