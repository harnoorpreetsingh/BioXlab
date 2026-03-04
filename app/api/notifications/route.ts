import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all notifications (for admin dashboard)
export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(notifications);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

// POST - Create a notification from contact form
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const notification = await prisma.notification.create({
            data: { name, email, subject, message },
        });

        return NextResponse.json(notification, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to create notification" },
            { status: 500 }
        );
    }
}
