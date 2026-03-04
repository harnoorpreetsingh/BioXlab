import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
    server: "sandbox", // Change to "production" when going live
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookingId, amount, customerEmail } = body;

        if (!bookingId || !amount) {
            return NextResponse.json(
                { error: "bookingId and amount are required" },
                { status: 400 }
            );
        }

        const productId = process.env.POLAR_PRODUCT_ID!;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        // Amount is in INR (e.g. 750 for ₹750). Polar expects cents, so multiply by 100.
        const priceInCents = Math.round(amount * 100);

        const checkout = await polar.checkouts.create({
            products: [productId],
            // Ad-hoc price override with INR currency matching org default
            prices: {
                [productId]: [
                    {
                        amountType: "fixed" as const,
                        priceCurrency: "inr" as any,
                        priceAmount: priceInCents,
                    },
                ],
            },
            successUrl: `${siteUrl}/book/payment?bookingId=${bookingId}&status=success`,
            metadata: {
                bookingId,
            },
            ...(customerEmail ? { customerEmail } : {}),
        });

        return NextResponse.json({
            checkoutUrl: checkout.url,
            checkoutId: checkout.id,
        });
    } catch (error: any) {
        console.error("Error creating Polar checkout:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
