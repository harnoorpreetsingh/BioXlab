import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const role = searchParams.get("role");

    // Common select — exclude password from all responses
    const userSelect = {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      gender: true,
      address: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    };

    // Fetch single user by ID
    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
        select: userSelect,
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
    }

    // Fetch single user by email
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: userSelect,
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
    }

    // Fetch users by role or all users
    const users = await prisma.user.findMany({
      where: role ? { role: role as any } : undefined,
      orderBy: { createdAt: "desc" },
      select: userSelect,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, dateOfBirth, gender, address, phone, role } = body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        address,
        phone,
        role: role || "user",
      },
    });

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, password, ...restData } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Transform snake_case to camelCase for Prisma
    const data: any = {};
    if (restData.first_name !== undefined) data.firstName = restData.first_name;
    if (restData.last_name !== undefined) data.lastName = restData.last_name;
    if (restData.date_of_birth !== undefined) data.dateOfBirth = restData.date_of_birth;
    if (restData.firstName !== undefined) data.firstName = restData.firstName;
    if (restData.lastName !== undefined) data.lastName = restData.lastName;
    if (restData.dateOfBirth !== undefined) data.dateOfBirth = restData.dateOfBirth;
    if (restData.email !== undefined) data.email = restData.email;
    if (restData.gender !== undefined) data.gender = restData.gender;
    if (restData.phone !== undefined) data.phone = restData.phone;
    if (restData.address !== undefined) data.address = restData.address;
    if (restData.role !== undefined) data.role = restData.role;

    // If password is being updated, hash it
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    // Convert date if present
    if (data.dateOfBirth) {
      data.dateOfBirth = new Date(data.dateOfBirth);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
