"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword,
      },
    });

    revalidatePath("/admin/login");
    return { success: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Could not register user" };
  }
}

export async function verifyCredentials(data: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.hashedPassword
    );

    if (!passwordMatch) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("Verification error:", error);
    return null;
  }
}
