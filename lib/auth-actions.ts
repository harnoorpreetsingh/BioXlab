"use server";

import { IFormValues } from "@/types";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const handleSignUpAction = async (data: IFormValues) => {
  try {
    const {
      password,
      confirmPassword,
      date_of_birth,
      phone,
      firstName,
      lastName,
      email,
      gender,
      address,
    } = data;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName: lastName || null,
        dateOfBirth: new Date(date_of_birth),
        gender,
        address,
        phone,
        role: "user",
      },
    });

    return { success: true, message: "Account created successfully! Please sign in.", user };
  } catch (error: any) {
    console.error("Sign up error:", error);
    return { error: error.message || "Failed to create account" };
  }
};
