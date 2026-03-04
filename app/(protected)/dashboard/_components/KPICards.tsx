"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, IndianRupee, CalendarCheck, TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type KPIData = {
    totalRevenue: number;
    revenueChange: string;
    totalUsers: number;
    usersChange: string;
    totalBookings: number;
    bookingsChange: string;
    successRate: string;
};

// Simple sparkline data generator based on value
function generateSparkline(value: number) {
    const base = Math.max(value / 8, 1);
    return Array.from({ length: 8 }, (_, i) => ({
        value: Math.max(0, base * (0.5 + Math.random()) * (1 + i * 0.1)),
    }));
}

export function KPICards() {
    const [kpi, setKpi] = useState<KPIData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/dashboard/stats");
                const data = await res.json();
                setKpi(data.kpi);
            } catch (err) {
                console.error("Failed to fetch KPI stats:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 shadow-xl flex items-center justify-center h-[140px]"
                    >
                        <Loader2 className="h-6 w-6 text-slate-500 animate-spin" />
                    </div>
                ))}
            </div>
        );
    }

    if (!kpi) return null;

    const cards = [
        {
            title: "Total Revenue",
            value: `₹${kpi.totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${Number(kpi.revenueChange) >= 0 ? "+" : ""}${kpi.revenueChange}%`,
            trend: Number(kpi.revenueChange) >= 0 ? "up" : "down",
            icon: IndianRupee,
            color: "#10b981",
            sparklineData: generateSparkline(kpi.totalRevenue),
        },
        {
            title: "Total Users",
            value: kpi.totalUsers.toLocaleString(),
            change: `${Number(kpi.usersChange) >= 0 ? "+" : ""}${kpi.usersChange}%`,
            trend: Number(kpi.usersChange) >= 0 ? "up" : "down",
            icon: Users,
            color: "#3b82f6",
            sparklineData: generateSparkline(kpi.totalUsers),
        },
        {
            title: "Total Bookings",
            value: kpi.totalBookings.toLocaleString(),
            change: `${Number(kpi.bookingsChange) >= 0 ? "+" : ""}${kpi.bookingsChange}%`,
            trend: Number(kpi.bookingsChange) >= 0 ? "up" : "down",
            icon: CalendarCheck,
            color: "#f59e0b",
            sparklineData: generateSparkline(kpi.totalBookings),
        },
        {
            title: "Success Rate",
            value: `${kpi.successRate}%`,
            change: `${kpi.successRate}%`,
            trend: Number(kpi.successRate) >= 50 ? "up" : "down",
            icon: TrendingUp,
            color: "#8b5cf6",
            sparklineData: generateSparkline(Number(kpi.successRate)),
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group"
                    style={{
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: `${index * 1.5}s`,
                    }}
                >
                    {/* Subtle Gradient Mesh Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-slate-400">{card.title}</p>
                        <div className="p-2 rounded-full bg-slate-800/50">
                            <card.icon className="h-4 w-4" style={{ color: card.color }} />
                        </div>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="text-2xl font-bold text-white mb-1"
                            >
                                {card.value}
                            </motion.div>
                            <p
                                className={`text-xs flex items-center ${card.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                            >
                                {card.trend === "up" ? (
                                    <ArrowUpRight className="mr-1 h-3 w-3" />
                                ) : (
                                    <ArrowDownRight className="mr-1 h-3 w-3" />
                                )}
                                {card.change} from last month
                            </p>
                        </div>

                        <div className="h-[40px] w-[80px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={card.sparklineData}>
                                    <defs>
                                        <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={card.color} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={card.color} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={card.color}
                                        strokeWidth={2}
                                        fill={`url(#gradient-${index})`}
                                        isAnimationActive={true}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
