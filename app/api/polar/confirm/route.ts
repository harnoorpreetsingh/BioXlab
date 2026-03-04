import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// This endpoint is called by the frontend after Polar redirects back
// It confirms the booking status was updated by the webhook
// and also serves as a fallback to update status if webhook hasn't fired yet
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const bookingId = searchParams.get("bookingId");

        if (!bookingId) {
            return NextResponse.json(
                { error: "bookingId is required" },
                { status: 400 }
            );
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            select: {
                id: true,
                status: true,
                paymentId: true,
                totalPrice: true,
                createdAt: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error checking booking status:", error);
        return NextResponse.json(
            { error: "Failed to check booking status" },
            { status: 500 }
        );
    }
}

// POST endpoint to confirm payment when webhook hasn't fired yet
// Called as a fallback from the success page
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookingId, checkoutId } = body;

        if (!bookingId) {
            return NextResponse.json(
                { error: "bookingId is required" },
                { status: 400 }
            );
        }

        // Only update if booking is still in pending_payment status
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        if (booking.status === "pending_payment") {
            // Update to confirmed (webhook might not have fired yet)
            await prisma.booking.update({
                where: { id: bookingId },
                data: {
                    status: "confirmed",
                    paymentId: checkoutId || null,
                },
            });
        }

        const updatedBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            select: {
                id: true,
                status: true,
                paymentId: true,
                totalPrice: true,
                createdAt: true,
            },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error("Error confirming payment:", error);
        return NextResponse.json(
            { error: "Failed to confirm payment" },
            { status: 500 }
        );
    }
}
