"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, FileText, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import confetti from "canvas-confetti";

function PaymentContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const status = searchParams.get("status");
    const checkoutId = searchParams.get("checkoutId");

    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingId) {
            setLoading(false);
            setError("No booking ID found");
            return;
        }

        const confirmAndFetch = async () => {
            try {
                // If coming back from a successful payment, try to confirm
                if (status === "success") {
                    await fetch("/api/polar/confirm", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ bookingId, checkoutId }),
                    });
                }

                // Fetch current booking status
                const res = await fetch(`/api/polar/confirm?bookingId=${bookingId}`);
                if (!res.ok) throw new Error("Failed to fetch booking");
                const data = await res.json();
                setBookingStatus(data.status);
            } catch (err) {
                console.error("Error:", err);
                setError("Failed to verify payment status");
            } finally {
                setLoading(false);
            }
        };

        confirmAndFetch();
    }, [bookingId, status, checkoutId]);

    // Fire confetti on confirmed status
    useEffect(() => {
        if (bookingStatus === "confirmed" || status === "success") {
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ["#10b981", "#34d399", "#059669"],
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ["#10b981", "#34d399", "#059669"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
    }, [bookingStatus, status]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    if (error || !bookingId) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="max-w-md mx-auto text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-10 h-10 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Something Went Wrong</h2>
                    <p className="text-slate-400 mb-8">{error || "Invalid payment session."}</p>
                    <Link href="/book">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Try Again
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Payment was cancelled / not successful
    if (status !== "success" && bookingStatus !== "confirmed") {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="max-w-md mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <XCircle className="w-10 h-10 text-yellow-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-3">Payment Cancelled</h2>
                    <p className="text-slate-400 mb-4">
                        Your payment was not completed. Your booking is still saved and you can retry payment.
                    </p>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-8">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Booking ID</span>
                            <span className="text-white font-mono">{bookingId}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/book">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                                <RotateCcw className="w-4 h-4" />
                                Book Again
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Payment Successful
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center py-10">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mb-4"
                >
                    Payment Successful!
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-lg mb-8"
                >
                    Your booking has been confirmed and payment has been received successfully.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-10 max-w-lg mx-auto"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                            <span className="text-slate-400">Booking ID</span>
                            <span className="text-xl font-mono text-emerald-400">
                                {bookingId}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Status</span>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                                ✓ Confirmed
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Payment</span>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                                ✓ Paid
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto h-12 px-6 bg-transparent border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-2"
                        >
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
                </motion.div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                </div>
            }
        >
            <PaymentContent />
        </Suspense>
    );
}
