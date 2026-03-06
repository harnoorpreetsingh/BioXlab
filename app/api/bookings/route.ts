import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    const latest = searchParams.get("latest");

    // Fetch latest booking for a user
    if (userId && latest === "true") {
      const booking = await prisma.booking.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          createdAt: true,
        },
      });

      return NextResponse.json(booking);
    }

    // Shared select for user/lab relations — only fields the frontend needs
    const relationSelect = {
      user: { select: { id: true, firstName: true, lastName: true, email: true } },
      lab: { select: { id: true, name: true, address: true } },
    };

    // Fetch single booking by ID with relations
    if (id) {
      const booking = await prisma.booking.findUnique({
        where: { id },
        include: relationSelect,
      });

      if (!booking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      // Transform to match expected structure
      const transformedBooking = {
        ...booking,
        users: booking.user,
        lab_branches: booking.lab,
      };
      delete (transformedBooking as any).user;
      delete (transformedBooking as any).lab;

      return NextResponse.json(transformedBooking);
    }

    // Fetch bookings by userId if provided, otherwise all bookings
    const bookings = await prisma.booking.findMany({
      where: userId ? { userId } : undefined,
      include: relationSelect,
      orderBy: { createdAt: "desc" },
    });

    // Transform to match expected structure
    const transformedBookings = bookings.map((booking: any) => ({
      ...booking,
      users: booking.user,
      lab_branches: booking.lab,
      user: undefined,
      lab: undefined,
    }));

    const response = NextResponse.json(transformedBookings);
    response.headers.set("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    return response;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lab, date, status, totalPrice, collectionLocation } = body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        labId: lab,
        date: new Date(date),
        status: status || "pending",
        totalPrice: totalPrice ? parseFloat(totalPrice) : null,
        collectionLocation,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    if (data.date) {
      data.date = new Date(data.date);
    }

    if (data.totalPrice) {
      data.totalPrice = parseFloat(data.totalPrice);
    }

    const booking = await prisma.booking.update({
      where: { id },
      data,
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
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
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
