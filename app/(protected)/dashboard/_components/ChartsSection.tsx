"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { Loader2 } from "lucide-react";

type MonthlyRevenue = { name: string; revenue: number };
type BookingStatus = { name: string; value: number };

const STATUS_COLORS: Record<string, string> = {
    Confirmed: "#10b981",
    Completed: "#3b82f6",
    Pending: "#f59e0b",
    "Pending Payment": "#a855f7",
    Cancelled: "#ef4444",
    Unknown: "#64748b",
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl">
                <p className="text-slate-200 font-medium mb-1">{label || payload[0]?.name}</p>
                <p className="text-emerald-400 font-bold">
                    {typeof payload[0].value === "number"
                        ? `₹${payload[0].value.toLocaleString("en-IN")}`
                        : payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl">
                <p className="text-slate-200 font-medium mb-1">{payload[0]?.name}</p>
                <p className="font-bold" style={{ color: payload[0]?.payload?.fill }}>
                    {payload[0].value} bookings
                </p>
            </div>
        );
    }
    return null;
};

export function ChartsSection() {
    const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
    const [bookingStatus, setBookingStatus] = useState<BookingStatus[]>([]);
    const [totalForPie, setTotalForPie] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCharts() {
            try {
                const res = await fetch("/api/dashboard/stats");
                const data = await res.json();
                setMonthlyRevenue(data.charts?.monthlyRevenue || []);
                setBookingStatus(data.charts?.bookingStatus || []);
                setTotalForPie(data.charts?.totalBookingsForPie || 0);
            } catch (err) {
                console.error("Failed to fetch chart data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCharts();
    }, []);

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <div className="col-span-4 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 flex items-center justify-center h-[380px]">
                    <Loader2 className="h-6 w-6 text-slate-500 animate-spin" />
                </div>
                <div className="col-span-3 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 flex items-center justify-center h-[380px]">
                    <Loader2 className="h-6 w-6 text-slate-500 animate-spin" />
                </div>
            </div>
        );
    }

    // Get colors for each status in the pie
    const pieColors = bookingStatus.map((s) => STATUS_COLORS[s.name] || STATUS_COLORS.Unknown);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
            {/* Revenue Overview */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-4 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 hover:border-slate-700/80 transition-all duration-300"
            >
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                    <p className="text-sm text-slate-400">Monthly revenue trends for {new Date().getFullYear()}</p>
                </div>
                <div className="h-[300px] w-full">
                    {monthlyRevenue.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-500">
                            No revenue data yet
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `₹${value.toLocaleString("en-IN")}`}
                                    fontSize={12}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#334155", strokeWidth: 1 }} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </motion.div>

            {/* Bookings by Status */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="col-span-3 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 hover:border-slate-700/80 transition-all duration-300 flex flex-col"
            >
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Bookings by Status</h3>
                    <p className="text-sm text-slate-400">Distribution of booking statuses</p>
                </div>
                <div className="flex-1 min-h-[250px] relative">
                    {bookingStatus.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-slate-500">
                            No booking data yet
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={bookingStatus}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1500}
                                    animationBegin={300}
                                >
                                    {bookingStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                    {/* Center Label */}
                    {totalForPie > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">
                                    {totalForPie.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">Total Bookings</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                {bookingStatus.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {bookingStatus.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: pieColors[index] }}
                                />
                                <span className="text-xs text-slate-400">
                                    {entry.name} ({totalForPie > 0 ? Math.round((entry.value / totalForPie) * 100) : 0}%)
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
