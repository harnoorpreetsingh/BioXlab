import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Fetch all test bookings for a specific booking
    const testBookings = await prisma.testBooking.findMany({
      where: { bookingId },
      include: {
        test: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match expected structure
    const transformedTestBookings = testBookings.map((tb) => ({
      ...tb,
      test_id: tb.test,
      test: undefined,
    }));

    return NextResponse.json(transformedTestBookings);
  } catch (error) {
    console.error("Error fetching test bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch test bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle array of test bookings
    if (Array.isArray(body)) {
      const testBookings = await prisma.testBooking.createMany({
        data: body.map((item) => ({
          bookingId: item.bookingId || item.booking_id,
          testId: item.testId || item.test_id,
          resultValue: item.resultValue || item.result_value,
          remarks: item.remarks,
        })),
      });

      return NextResponse.json(testBookings);
    }

    // Handle single test booking
    const { bookingId, testId, resultValue, remarks } = body;

    const testBooking = await prisma.testBooking.create({
      data: {
        bookingId,
        testId,
        resultValue,
        remarks,
      },
    });

    return NextResponse.json(testBooking);
  } catch (error) {
    console.error("Error creating test booking:", error);
    return NextResponse.json(
      { error: "Failed to create test booking" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, resultValue, remarks } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Test booking ID is required" },
        { status: 400 }
      );
    }

    const testBooking = await prisma.testBooking.update({
      where: { id },
      data: {
        resultValue,
        remarks,
        performedAt: new Date(),
      },
    });

    return NextResponse.json(testBooking);
  } catch (error) {
    console.error("Error updating test booking:", error);
    return NextResponse.json(
      { error: "Failed to update test booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Test booking ID is required" },
        { status: 400 }
      );
    }

    await prisma.testBooking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Test booking deleted" });
  } catch (error) {
    console.error("Error deleting test booking:", error);
    return NextResponse.json(
      { error: "Failed to delete test booking" },
      { status: 500 }
    );
  }
}
