import { registerUser } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  //   try {
  //     const user = await prisma.user.findMany();
  //     return NextResponse.json(user);
  //   } catch (error) {
  //     return NextResponse.json(
  //       { error: "Something went wrong" },
  //       { status: 500 }
  //     );
  //   }
  try {
    registerUser({
      email: "ksl124980@gmail.com",
      name: "admin",
      password: "Admin@123",
    });
    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
