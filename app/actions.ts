"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return encodedRedirect("error", "/sign-in", "Email and password are required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return encodedRedirect("error", "/sign-in", "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return encodedRedirect("error", "/sign-in", "Invalid email or password");
    }

    return { success: true, email };
  } catch (error: any) {
    return encodedRedirect("error", "/sign-in", "An error occurred during sign in");
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  // TODO: Implement password reset email functionality
  // For now, just return success
  console.log("Password reset requested for:", email);

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return {
    success: true,
    message: "Check your email for a link to reset your password.",
  };
};

export const resetPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return {
      success: false,
      message: "Password and confirm password are required",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    return { success: false, message: "Password update failed" };
  }
};

export const signOutAction = async () => {
  // NextAuth handles signout via its own mechanism
  return { message: "Signed out successfully" };
};
