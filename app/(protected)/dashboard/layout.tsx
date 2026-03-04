import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DashboardHeader } from "./_components/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-100 selection:bg-emerald-500/30">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative md:ml-64 transition-all duration-300">

                {/* Ambient Background Blobs */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-morph mix-blend-screen" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-morph animation-delay-2000 mix-blend-screen" />
                    <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] animate-pulse-slow mix-blend-screen" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full">
                    <DashboardHeader />
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
