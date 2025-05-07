import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log(user);
  } catch (error) {
    console.error("Error in register route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
