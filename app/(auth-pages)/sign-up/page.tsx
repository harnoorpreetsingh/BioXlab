"use client";

import { signUpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Mail,
    Lock,
    User,
    Sparkles,
    Phone,
    MapPin,
    Calendar,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignUpForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Floating Icon */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-950 shadow-2xl flex items-center justify-center z-20 group overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse blur-xl"></div>
                <img src="/assests/images/Logo-compressed_Webpifier.webp" alt="BioXLab Logo" className="w-16 h-16 object-cover rounded-full relative z-10" />
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 pt-16 shadow-2xl relative z-10 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4 mx-auto">
                        <Sparkles className="w-3 h-3" />
                        Join the Network
                    </span>
                    <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-slate-400 text-sm">Start your advanced diagnostic journey</p>
                </div>

                {/* Error / Success Messages */}
                {error && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                        {decodeURIComponent(error)}
                    </div>
                )}
                {success && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center">
                        {decodeURIComponent(success)}
                    </div>
                )}

                <form className="space-y-4" action={signUpAction}>
                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="group">
                            <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                                First Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    name="firstName"
                                    placeholder="John"
                                    className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="group">
                            <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                                Last Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    name="lastName"
                                    placeholder="Doe"
                                    className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                        <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="group">
                        <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                name="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Date of Birth + Gender */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="group">
                            <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                                Date of Birth
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    name="dateOfBirth"
                                    type="date"
                                    className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all [color-scheme:dark]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="group">
                            <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                                Gender
                            </Label>
                            <select
                                name="gender"
                                required
                                className="w-full h-11 px-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm"
                            >
                                <option value="" className="bg-slate-900">Select...</option>
                                <option value="male" className="bg-slate-900">Male</option>
                                <option value="female" className="bg-slate-900">Female</option>
                                <option value="other" className="bg-slate-900">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="group">
                        <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                            Address
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                name="address"
                                placeholder="123 Main Street, City"
                                className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="group">
                        <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Min. 8 characters"
                                className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="group">
                        <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.4)] h-12 rounded-xl text-base font-medium transition-all duration-300 border border-emerald-500/50 mt-2"
                    >
                        Create Account <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-colors"
                            href="/sign-in"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>

            <p className="text-center text-xs text-slate-600 mt-6 max-w-xs mx-auto">
                By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
        </motion.div>
    );
}

export default function SignUp() {
    return (
        <Suspense fallback={null}>
            <SignUpForm />
        </Suspense>
    );
}
