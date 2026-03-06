"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(
        searchParams.get("error") ? "Invalid email or password. Please try again." : null
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
                setIsLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    };

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
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400 text-sm">Sign in to access your laboratory dashboard</p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3"
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="group">
                            <Label className="text-slate-300 mb-1.5 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex items-center justify-between mb-1.5">
                                <Label className="text-slate-300 block text-xs uppercase tracking-wider font-semibold group-focus-within:text-emerald-400 transition-colors">Password</Label>
                                <Link
                                    className="text-xs text-emerald-500 hover:text-emerald-400 hover:underline transition-colors"
                                    href="/forgot-password"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="pl-10 bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl h-11 transition-all"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.4)] h-12 rounded-xl text-base font-medium transition-all duration-300 border border-emerald-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>

                    <div className="text-center text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-colors" href="/sign-up">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>

            <p className="text-center text-xs text-slate-600 mt-8">
                Protected by BioXLab Security Systems. <br /> Access is monitored and logged.
            </p>
        </motion.div>
    );
}
