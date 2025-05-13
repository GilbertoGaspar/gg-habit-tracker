import { prisma } from "@/lib/prisma";
import { RegisterUserSchema } from "@/lib/schemas";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const hashedPassword = await hash(password, 10);

    try {
      RegisterUserSchema.parse({
        email,
        password,
        name,
      });
    } catch {
      return new Response("Invalid data", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  } catch (error) {
    console.error("Error in register route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
