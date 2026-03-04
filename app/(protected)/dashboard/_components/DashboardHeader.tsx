"use client";

import { useCurrentUser } from "@/providers/AuthProvider";
import { Search, Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
    const { appUser } = useCurrentUser();
    const [greeting, setGreeting] = useState("Welcome back");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-md" : "bg-transparent"
                }`}
        >
            <div className="flex flex-col">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white tracking-tight"
                >
                    {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{appUser?.firstName || "Admin"}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-slate-400"
                >
                    Here's what's happening today
                </motion.p>
            </div>

            <div className="flex items-center gap-6">
                {/* Animated Search */}
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-48 focus-visible:w-64 transition-all duration-300 bg-slate-900/50 border-slate-700 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 rounded-full pl-10 text-slate-200 placeholder:text-slate-500"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="relative rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    </Button>

                    <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">{appUser?.firstName} {appUser?.lastName}</p>
                            <p className="text-xs text-slate-400 capitalize">{appUser?.role}</p>
                        </div>
                        <Avatar className="h-10 w-10 border-2 border-emerald-500/20 ring-2 ring-emerald-500/10">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-emerald-950 text-emerald-400">
                                {appUser?.firstName ? `${appUser.firstName[0]}${appUser.lastName?.[0] || ''}`.toUpperCase() : "AD"}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
}
