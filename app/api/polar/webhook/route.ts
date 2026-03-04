import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Polar sends webhook events with an event type
        const eventType = body.type;

        if (eventType === "checkout.updated") {
            const checkout = body.data;

            // Only act when the checkout payment is successfully completed
            if (checkout.status === "succeeded") {
                const bookingId = checkout.metadata?.bookingId;

                if (bookingId) {
                    // Update booking status to confirmed and store payment ID
                    await prisma.booking.update({
                        where: { id: bookingId },
                        data: {
                            status: "confirmed",
                            paymentId: checkout.id,
                        },
                    });

                    console.log(`Booking ${bookingId} confirmed via Polar webhook`);
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Polar webhook error:", error);
        // Return 200 even on errors to prevent Polar from retrying
        return NextResponse.json({ received: true });
    }
}
