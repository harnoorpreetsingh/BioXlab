"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/providers/AuthProvider";
import {
    Home,
    Users,
    FlaskConical,
    FolderKanban,
    MapPin,
    BookMarked,
    UserCircle,
    LogOut,
    ChevronRight,
    LayoutDashboard,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export function DashboardSidebar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get("tab") || "dashboard";
    const { appUser } = useCurrentUser();

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/sign-in");
            toast.success("Logged out successfully");
        } catch (error: any) {
            toast.error("Error logging out: " + error.message);
        }
    };

    const menuItems = [
        {
            icon: <Home className="w-5 h-5" />,
            label: "Home",
            href: "/",
            roles: ["admin", "user", "lab_technician"]
        },
        {
            icon: <LayoutDashboard className="w-5 h-5" />,
            label: "Dashboard",
            tab: "dashboard", // Default view
            roles: ["admin"]
        },

        {
            icon: <Users className="w-5 h-5" />,
            label: "Patients",
            tab: "patients",
            roles: ["admin"]
        },
        {
            icon: <FlaskConical className="w-5 h-5" />,
            label: "Tests",
            tab: "tests",
            roles: ["admin"]
        },
        {
            icon: <FolderKanban className="w-5 h-5" />,
            label: "Categories",
            tab: "test-categories",
            roles: ["admin"]
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: "Branches",
            tab: "lab-branches",
            roles: ["admin"]
        },
        {
            icon: <Bell className="w-5 h-5" />,
            label: "Notifications",
            tab: "notifications",
            roles: ["admin", "user", "lab_technician"]
        },
        {
            icon: <BookMarked className="w-5 h-5" />,
            label: "My Bookings",
            tab: "bookings",
            roles: ["user"]
        },
        {
            icon: <UserCircle className="w-5 h-5" />,
            label: "Profile",
            tab: "profile",
            roles: ["admin", "user", "lab_technician"]
        }
    ];

    const filteredItems = menuItems.filter(item =>
        !item.roles || (appUser?.role && item.roles.includes(appUser.role))
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 z-50 transition-all duration-300">
                <div className="p-6 flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg">
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        BioX<span className="text-emerald-500">Lab</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {filteredItems.map((item) => {
                        const isActive = item.href ? false : (item.tab === activeTab || (!activeTab && item.tab === "dashboard"));
                        return (
                            <Link
                                key={item.label}
                                href={item.href || `/dashboard?tab=${item.tab}`}
                                className={cn(
                                    "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden",
                                    isActive
                                        ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)] border border-emerald-500/20"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-emerald-500/5 rounded-xl z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <span className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", isActive && "text-emerald-400")}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10 font-medium">{item.label}</span>

                                {isActive && <ChevronRight className="ml-auto w-4 h-4 text-emerald-500" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 z-50 flex items-center justify-around px-2 pb-safe">
                {filteredItems.slice(0, 5).map((item) => { // Limit items for mobile
                    const isActive = item.href ? false : (item.tab === activeTab || (!activeTab && item.tab === "dashboard"));
                    return (
                        <Link
                            key={item.label}
                            href={item.href || `/dashboard?tab=${item.tab}`}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300",
                                isActive ? "text-emerald-400 -translate-y-2 bg-emerald-500/10 border border-emerald-500/20" : "text-slate-500"
                            )}
                        >
                            <span className={cn("transition-transform duration-300", isActive && "scale-110")}>
                                {item.icon}
                            </span>
                            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
