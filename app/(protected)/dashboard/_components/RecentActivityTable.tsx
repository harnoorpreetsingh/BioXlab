"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Loader2, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

type RecentBooking = {
    id: string;
    patient: {
        name: string;
        email: string;
    };
    tests: string;
    status: string;
    date: string;
    amount: number;
    lab: string;
};

function getStatusStyle(status: string) {
    switch (status?.toLowerCase()) {
        case "confirmed":
            return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        case "pending":
        case "pending_payment":
            return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        case "cancelled":
            return "bg-red-500/10 text-red-400 border-red-500/20";
        case "completed":
            return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        default:
            return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
}

function getStatusDotColor(status: string) {
    switch (status?.toLowerCase()) {
        case "confirmed":
            return "bg-emerald-400";
        case "pending":
        case "pending_payment":
            return "bg-amber-400 animate-pulse";
        case "cancelled":
            return "bg-red-400";
        case "completed":
            return "bg-blue-400";
        default:
            return "bg-slate-400";
    }
}

function formatStatus(status: string) {
    if (!status) return "Pending";
    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RecentActivityTable() {
    const [bookings, setBookings] = useState<RecentBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecent() {
            try {
                const res = await fetch("/api/dashboard/stats");
                const data = await res.json();
                setBookings(data.recentBookings || []);
            } catch (err) {
                console.error("Failed to fetch recent bookings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecent();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-xl mt-6"
        >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5 text-emerald-400" />
                        Recent Bookings
                    </h3>
                    <p className="text-sm text-slate-400">
                        Latest test bookings from patients
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 text-slate-500 animate-spin" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                    <CalendarCheck className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                    <p>No bookings yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-900/80">
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400 font-medium">
                                    Patient
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Tests
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Lab
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Status
                                </TableHead>
                                <TableHead className="text-slate-400 font-medium">
                                    Date
                                </TableHead>
                                <TableHead className="text-right text-slate-400 font-medium">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    className="border-slate-800 hover:bg-slate-800/30 transition-colors group"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-slate-700">
                                                <AvatarFallback className="bg-slate-800 text-slate-300 text-xs">
                                                    {item.patient.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-200">
                                                    {item.patient.name}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {item.patient.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-300 max-w-[200px] truncate">
                                        {item.tests || "—"}
                                    </TableCell>
                                    <TableCell className="text-slate-400">
                                        {item.lab}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`${getStatusStyle(item.status)} border`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(item.status)} mr-1.5`}
                                            />
                                            {formatStatus(item.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400">
                                        {new Date(item.date).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-slate-200">
                                        ₹{item.amount.toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </motion.div>
    );
}
