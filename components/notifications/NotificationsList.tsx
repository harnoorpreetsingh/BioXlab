"use client";

import { motion } from "framer-motion";
import { Bell, Mail, User, Clock, MessageSquare, Loader2, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Notification {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export function NotificationsList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch("/api/notifications");
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const response = await fetch(`/api/notifications/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            setNotifications((prev) => prev.filter((n) => n.id !== id));
            toast.success("Notification deleted");
        } catch (error) {
            toast.error("Failed to delete notification");
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                        Notifications
                    </h2>
                    <p className="text-slate-400 mt-1">
                        Contact form submissions and alerts.
                    </p>
                </div>
                {notifications.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <Bell className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">{notifications.length}</span>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </CardContent>
                </Card>
            )}

            {/* Empty State */}
            {!loading && notifications.length === 0 && (
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4"
                        >
                            <Bell className="w-8 h-8 text-slate-500" />
                        </motion.div>
                        <p className="text-lg font-medium text-slate-300">No notifications yet</p>
                        <p className="text-sm max-w-sm mt-2">
                            When users submit the contact form, their messages will appear here.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Notifications List */}
            {!loading && notifications.length > 0 && (
                <div className="space-y-3">
                    {notifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card
                                className={`border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 group
                                    ${!notification.isRead ? "bg-emerald-900/10 border-emerald-500/20" : "bg-slate-900/50"}`}
                            >
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                                            ${!notification.isRead ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20"}`}>
                                            <MessageSquare className={`w-5 h-5 ${!notification.isRead ? "text-emerald-300" : "text-emerald-400"}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h4 className={`text-base font-semibold truncate ${!notification.isRead ? "text-emerald-100" : "text-white"}`}>
                                                    {notification.subject}
                                                </h4>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDate(notification.createdAt)}
                                                    </span>
                                                    <button
                                                        onClick={(e) => handleDelete(notification.id, e)}
                                                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Delete notification"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className={`text-sm line-clamp-2 mb-3 ${!notification.isRead ? "text-emerald-100/70" : "text-slate-300"}`}>
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5" />
                                                    {notification.name}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {notification.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
