import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Fetch single lab branch by ID
    if (id) {
      const labBranch = await prisma.labBranch.findUnique({
        where: { id },
      });

      if (!labBranch) {
        return NextResponse.json(
          { error: "Lab branch not found" },
          { status: 404 }
        );
      }

      // Transform camelCase to snake_case for frontend
      const transformed = {
        ...labBranch,
        opening_hours: labBranch.openingHours,
        manager_name: labBranch.managerName,
        created_at: labBranch.createdAt,
        updated_at: labBranch.updatedAt,
      };

      return NextResponse.json(transformed);
    }

    // Fetch all lab branches
    const labBranches = await prisma.labBranch.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Transform camelCase to snake_case for frontend
    const transformed = labBranches.map((branch: any) => ({
      ...branch,
      opening_hours: branch.openingHours,
      manager_name: branch.managerName,
      created_at: branch.createdAt,
      updated_at: branch.updatedAt,
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching lab branches:", error);
    return NextResponse.json(
      { error: "Failed to fetch lab branches" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, phone, email, opening_hours, manager_name } = body;

    const labBranch = await prisma.labBranch.create({
      data: {
        name,
        address,
        phone,
        email,
        openingHours: opening_hours,
        managerName: manager_name,
      },
    });

    // Transform response to snake_case
    const transformed = {
      ...labBranch,
      opening_hours: labBranch.openingHours,
      manager_name: labBranch.managerName,
      created_at: labBranch.createdAt,
      updated_at: labBranch.updatedAt,
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error creating lab branch:", error);
    return NextResponse.json(
      { error: "Failed to create lab branch" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, opening_hours, manager_name, ...restData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lab branch ID is required" },
        { status: 400 }
      );
    }

    // Transform snake_case to camelCase for Prisma
    const data: any = { ...restData };
    if (opening_hours !== undefined) {
      data.openingHours = opening_hours;
    }
    if (manager_name !== undefined) {
      data.managerName = manager_name;
    }

    const labBranch = await prisma.labBranch.update({
      where: { id },
      data,
    });

    // Transform response to snake_case
    const transformed = {
      ...labBranch,
      opening_hours: labBranch.openingHours,
      manager_name: labBranch.managerName,
      created_at: labBranch.createdAt,
      updated_at: labBranch.updatedAt,
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error updating lab branch:", error);
    return NextResponse.json(
      { error: "Failed to update lab branch" },
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
        { error: "Lab branch ID is required" },
        { status: 400 }
      );
    }

    await prisma.labBranch.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Lab branch deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab branch:", error);
    return NextResponse.json(
      { error: "Failed to delete lab branch" },
      { status: 500 }
    );
  }
}
