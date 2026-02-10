import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const popular = searchParams.get("popular");

    // Fetch single test by ID
    if (id) {
      const test = await prisma.test.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });

      if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }

      // Transform to match expected structure
      const transformedTest = {
        ...test,
        test_category: test.category,
        ideal_range: test.idealRange,
        report_time: test.reportTime,
        created_at: test.createdAt,
        updated_at: test.updatedAt,
      };
      delete (transformedTest as any).category;
      delete (transformedTest as any).idealRange;
      delete (transformedTest as any).reportTime;
      delete (transformedTest as any).createdAt;
      delete (transformedTest as any).updatedAt;

      return NextResponse.json(transformedTest);
    }

    // Fetch popular tests
    if (popular === "true") {
      const tests = await prisma.test.findMany({
        where: { popular: true },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });
      
      const transformedTests = tests.map((test: any) => ({
        ...test,
        test_category: test.category,
        ideal_range: test.idealRange,
        report_time: test.reportTime,
        created_at: test.createdAt,
        updated_at: test.updatedAt,
        category: undefined,
        idealRange: undefined,
        reportTime: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }));
      
      return NextResponse.json(transformedTests);
    }

    // Fetch all tests with categories
    const tests = await prisma.test.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match expected structure (test_category instead of category, and camelCase to snake_case)
    const transformedTests = tests.map((test: any) => ({
      ...test,
      test_category: test.category,
      ideal_range: test.idealRange,
      report_time: test.reportTime,
      created_at: test.createdAt,
      updated_at: test.updatedAt,
      category: undefined,
      idealRange: undefined,
      reportTime: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }));

    return NextResponse.json(transformedTests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json(
      { error: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, cost, category, popular, ideal_range, preparation, report_time, duration } = body;

    const test = await prisma.test.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : (cost ? parseFloat(cost) : null),
        cost: cost ? parseFloat(cost) : (price ? parseFloat(price) : null),
        categoryId: category,
        popular: popular || false,
        idealRange: ideal_range,
        preparation,
        reportTime: report_time,
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error("Error creating test:", error);
    return NextResponse.json(
      { error: "Failed to create test" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, category, ideal_range, report_time, cost, price, duration, ...restData } = body;

    if (!id) {
      return NextResponse.json({ error: "Test ID is required" }, { status: 400 });
    }

    const data: any = { ...restData };
    
    // Note: duration is excluded because it's an unsupported PostgreSQL interval type in Prisma
    
    // Transform category to categoryId if present
    if (category !== undefined) {
      data.categoryId = category;
    }

    // Transform snake_case to camelCase
    if (ideal_range !== undefined) {
      data.idealRange = ideal_range;
    }
    
    if (report_time !== undefined) {
      data.reportTime = report_time;
    }

    // Handle price and cost
    if (price !== undefined) {
      data.price = price ? parseFloat(price) : null;
      if (cost === undefined) {
        data.cost = data.price;
      }
    }
    
    if (cost !== undefined) {
      data.cost = cost ? parseFloat(cost) : null;
      if (price === undefined) {
        data.price = data.cost;
      }
    }

    const test = await prisma.test.update({
      where: { id },
      data,
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error("Error updating test:", error);
    return NextResponse.json(
      { error: "Failed to update test" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Test ID is required" }, { status: 400 });
    }

    await prisma.test.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    return NextResponse.json(
      { error: "Failed to delete test" },
      { status: 500 }
    );
  }
}
