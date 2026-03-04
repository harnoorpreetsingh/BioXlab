"use client";

import { motion } from "framer-motion";
import { Check, FlaskConical, User, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
    currentStep: number;
    totalSteps: number;
    onStepClick?: (step: number) => void;
}

const steps = [
    { number: 1, label: "Select Tests", icon: FlaskConical },
    { number: 2, label: "Patient Info", icon: User },
    { number: 3, label: "Appointment", icon: Calendar },
    { number: 4, label: "Review", icon: FileText },
    { number: 5, label: "Confirmation", icon: CheckCircle2 },
];

const ProgressStepper = ({ currentStep, totalSteps, onStepClick }: ProgressStepperProps) => {
    return (
        <div className="w-full py-10 sticky top-16 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {steps.map((step, index) => {
                        const isCompleted = step.number < currentStep;
                        const isCurrent = step.number === currentStep;
                        const isFuture = step.number > currentStep;
                        const Icon = step.icon;

                        return (
                            <div key={step.number} className="flex flex-col items-center relative z-10 w-full">
                                <div className="flex items-center w-full">
                                    {/* Connector Line (Left) */}
                                    {index > 0 && (
                                        <div className={cn(
                                            "h-[2px] w-full flex-1 transition-colors duration-500",
                                            isCompleted || isCurrent ? "bg-emerald-500" : "bg-slate-800"
                                        )} />
                                    )}

                                    {/* Step Circle */}
                                    <motion.button
                                        onClick={() => {
                                            if (isCompleted && onStepClick) {
                                                onStepClick(step.number);
                                            }
                                        }}
                                        whileHover={isCompleted ? { scale: 1.1 } : {}}
                                        whileTap={isCompleted ? { scale: 0.95 } : {}}
                                        disabled={!isCompleted && !isCurrent}
                                        className={cn(
                                            "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 relative shrink-0",
                                            isCompleted
                                                ? "bg-emerald-500 border-emerald-500 text-white cursor-pointer"
                                                : isCurrent
                                                    ? "bg-slate-900 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                                    : "bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}

                                        {/* Active Pulse Ring */}
                                        {isCurrent && (
                                            <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-20"></span>
                                        )}
                                    </motion.button>

                                    {/* Connector Line (Right) */}
                                    {index < steps.length - 1 && (
                                        <div className={cn(
                                            "h-[2px] w-full flex-1 transition-colors duration-500",
                                            isCompleted ? "bg-emerald-500" : "bg-slate-800"
                                        )} />
                                    )}
                                </div>

                                {/* Step Label */}
                                <span className={cn(
                                    "absolute top-12 text-xs font-medium whitespace-nowrap transition-colors duration-300 hidden md:block",
                                    isCompleted ? "text-emerald-400" : isCurrent ? "text-white" : "text-slate-600"
                                )}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProgressStepper;
