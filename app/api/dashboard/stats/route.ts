import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        // Build monthly revenue query: get revenue for each month of the current year
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Run all queries in parallel
        const [
            totalRevenue,
            lastMonthRevenue,
            totalUsers,
            lastMonthUsers,
            totalBookings,
            lastMonthBookings,
            confirmedBookings,
            recentBookings,
            allBookingsThisYear,
            bookingsByStatus,
        ] = await Promise.all([
            // Total revenue (all confirmed bookings)
            prisma.booking.aggregate({
                _sum: { totalPrice: true },
                where: { status: "confirmed" },
            }),
            // Last month revenue
            prisma.booking.aggregate({
                _sum: { totalPrice: true },
                where: {
                    status: "confirmed",
                    createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
                },
            }),
            // Total users
            prisma.user.count(),
            // Users created last month
            prisma.user.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
                },
            }),
            // Total bookings
            prisma.booking.count(),
            // Last month bookings
            prisma.booking.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
                },
            }),
            // Confirmed bookings count
            prisma.booking.count({
                where: { status: "confirmed" },
            }),
            // Recent bookings with user + tests info (last 10)
            prisma.booking.findMany({
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { firstName: true, lastName: true, email: true } },
                    lab: { select: { name: true } },
                    testBookings: {
                        include: {
                            test: { select: { name: true, price: true } },
                        },
                    },
                },
            }),
            // All bookings this year for monthly revenue chart
            prisma.booking.findMany({
                where: {
                    createdAt: { gte: startOfYear },
                    status: "confirmed",
                },
                select: {
                    totalPrice: true,
                    createdAt: true,
                },
            }),
            // Bookings grouped by status for pie chart
            prisma.booking.groupBy({
                by: ["status"],
                _count: { id: true },
            }),
        ]);

        const revenue = Number(totalRevenue._sum.totalPrice || 0);
        const lastRevenue = Number(lastMonthRevenue._sum.totalPrice || 0);
        const revenueChange = lastRevenue > 0
            ? (((revenue - lastRevenue) / lastRevenue) * 100).toFixed(1)
            : revenue > 0 ? "+100" : "0";

        const usersChange = lastMonthUsers > 0
            ? (((totalUsers - lastMonthUsers) / lastMonthUsers) * 100).toFixed(1)
            : totalUsers > 0 ? "+100" : "0";

        const bookingsChange = lastMonthBookings > 0
            ? (((totalBookings - lastMonthBookings) / lastMonthBookings) * 100).toFixed(1)
            : totalBookings > 0 ? "+100" : "0";

        const successRate = totalBookings > 0
            ? ((confirmedBookings / totalBookings) * 100).toFixed(1)
            : "0";

        // Build monthly revenue array (Jan to current month)
        const monthlyRevenue = Array.from({ length: now.getMonth() + 1 }, (_, i) => {
            const monthBookings = allBookingsThisYear.filter((b) => {
                const d = new Date(b.createdAt!);
                return d.getMonth() === i;
            });
            const monthTotal = monthBookings.reduce(
                (sum, b) => sum + Number(b.totalPrice || 0),
                0
            );
            return {
                name: monthNames[i],
                revenue: Math.round(monthTotal * 100) / 100,
            };
        });

        // Build booking status distribution for pie chart
        const statusMap: Record<string, string> = {
            confirmed: "Confirmed",
            pending: "Pending",
            pending_payment: "Pending Payment",
            cancelled: "Cancelled",
            completed: "Completed",
        };

        const bookingStatusData = bookingsByStatus.map((s) => ({
            name: statusMap[s.status || "pending"] || (s.status || "Unknown"),
            value: s._count.id,
        }));

        const totalBookingsForPie = bookingStatusData.reduce((sum, s) => sum + s.value, 0);

        return NextResponse.json({
            kpi: {
                totalRevenue: revenue,
                revenueChange,
                totalUsers,
                usersChange,
                totalBookings,
                bookingsChange,
                successRate,
            },
            charts: {
                monthlyRevenue,
                bookingStatus: bookingStatusData,
                totalBookingsForPie,
            },
            recentBookings: recentBookings.map((b) => ({
                id: b.id,
                patient: {
                    name: `${b.user?.firstName || ""} ${b.user?.lastName || ""}`.trim() || "N/A",
                    email: b.user?.email || "",
                },
                tests: b.testBookings.map((tb) => tb.test?.name || "Unknown Test").join(", "),
                status: b.status || "pending",
                date: b.createdAt,
                amount: Number(b.totalPrice || 0),
                lab: b.lab?.name || "N/A",
            })),
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard stats" },
            { status: 500 }
        );
    }
}
