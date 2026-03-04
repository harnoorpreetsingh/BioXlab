"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface Step5Props {
    bookingId: string;
}

const Step5_Success = ({ bookingId }: Step5Props) => {

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#10b981', '#34d399', '#059669']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#10b981', '#34d399', '#059669']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="max-w-2xl mx-auto text-center py-10">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
                <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-slate-400 text-lg mb-8">
                Your appointment has been successfully scheduled. We have sent a confirmation email with all the details.
            </p>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-10 max-w-lg mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <span className="text-slate-400">Booking ID</span>
                        <span className="text-xl font-mono text-emerald-400">{bookingId || "BXL-88392"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Status</span>
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20">Pending Payment</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                        * Please pay at the center or to the collection agent.
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                    <Button variant="outline" className="w-full sm:w-auto h-12 px-6 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-2">
                        <FileText className="w-4 h-4" />
                        View My Bookings
                    </Button>
                </Link>
                <Link href="/">
                    <Button className="w-full sm:w-auto h-12 px-6 bg-emerald-600 hover:bg-emerald-500 text-white gap-2 shadow-lg shadow-emerald-900/50">
                        Go to Home
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Step5_Success;
