"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, FlaskConical, Dna, Activity, HeartPulse } from "lucide-react";

export function InitialLoader() {
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationDone = false;
        let pageDone = document.readyState === "complete";

        const tryHide = () => {
            if (animationDone && pageDone) {
                // Hold at 100% briefly so the user sees it fully complete
                setTimeout(() => {
                    setShow(false);
                }, 500);
            }
        };

        // Listen for the page to fully load
        const onLoad = () => {
            pageDone = true;
            tryHide();
        };

        if (!pageDone) {
            window.addEventListener("load", onLoad);
        }

        // Use requestAnimationFrame for smooth progress animation
        const duration = 2200;
        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const linearProgress = Math.min(elapsed / duration, 1);

            // Ease-out curve: starts fast, slows down, always reaches 1.0
            const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
            const percent = Math.min(easedProgress * 100, 100);

            setProgress(percent);

            if (linearProgress < 1) {
                animationId = requestAnimationFrame(animate);
            } else {
                setProgress(100);
                animationDone = true;
                tryHide();
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("load", onLoad);
        };
    }, []);

    const floatingIcons = [
        { Icon: Microscope, color: "text-emerald-400", delay: 0, x: -140, y: -60 },
        { Icon: FlaskConical, color: "text-blue-400", delay: 0.2, x: 140, y: -40 },
        { Icon: Dna, color: "text-teal-400", delay: 0.4, x: -120, y: 80 },
        { Icon: Activity, color: "text-cyan-400", delay: 0.6, x: 120, y: 100 },
        { Icon: HeartPulse, color: "text-sky-400", delay: 0.8, x: 0, y: -150 },
    ];

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
                >
                    {/* Background grids / gradients */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Central Orb / Logo Area */}
                        <div className="relative flex flex-col items-center justify-center mb-16 pt-10">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute w-32 h-32 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.1, 0.3, 0.1],
                                    rotate: 180,
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute w-40 h-40 rounded-full border border-dashed border-emerald-400/20"
                            />

                            <div className="w-16 h-16 bg-slate-900 border border-emerald-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-20 overflow-hidden">
                                <img src="/assests/images/Logo-compressed_Webpifier.webp" alt="BioXLab Logo" className="w-full h-full object-cover rounded-2xl" />
                            </div>

                            {floatingIcons.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0.4, 1, 0.4],
                                        scale: [0.8, 1, 0.8],
                                        x: item.x,
                                        y: [item.y - 12, item.y + 12, item.y - 12],
                                    }}
                                    transition={{
                                        duration: 3,
                                        delay: item.delay,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        y: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }
                                    }}
                                    className={`absolute ${item.color} drop-shadow-lg p-3 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800`}
                                >
                                    <item.Icon className="w-6 h-6" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-center mb-8 mt-4"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                                BioX<span className="text-emerald-400">Lab</span>
                            </h2>
                            <p className="text-emerald-500/70 text-sm tracking-widest uppercase">
                                Initializing Systems...
                            </p>
                        </motion.div>

                        <div className="w-64 max-w-[80vw]">
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2 relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />

                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 rounded-full relative overflow-hidden"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                                        animate={{ x: ["-200%", "400%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                                <span>Loading Data</span>
                                <span className="text-emerald-400">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
