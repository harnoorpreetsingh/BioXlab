"use client";

import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-emerald-500/10 rounded-full blur-[20px]" />
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
            <p className="text-slate-500 text-sm mt-4 tracking-widest uppercase">
                Loading...
            </p>
        </div>
    );
}
