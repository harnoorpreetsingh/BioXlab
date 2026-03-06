import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.testCategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    const response = NextResponse.json(categories);
    response.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return response;
  } catch (error) {
    console.error("Error fetching test categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch test categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const category = await prisma.testCategory.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error creating test category:", error);
    return NextResponse.json(
      { error: "Failed to create test category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await prisma.testCategory.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating test category:", error);
    return NextResponse.json(
      { error: "Failed to update test category" },
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
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    await prisma.testCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Test category deleted successfully" });
  } catch (error) {
    console.error("Error deleting test category:", error);
    return NextResponse.json(
      { error: "Failed to delete test category" },
      { status: 500 }
    );
  }
}
