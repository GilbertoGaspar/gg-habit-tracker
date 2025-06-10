import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user.id) {
    return new Response("User ID not found", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        email: true,
        name: true,
        emailNotifications: true,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user.id) {
    return new Response("User ID not found", { status: 400 });
  }

  try {
    const data = await request.json();

    if (typeof data?.emailNotifications !== "boolean") {
      return new Response("Invalid data", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        emailNotifications: data.emailNotifications,
      },
      select: {
        email: true,
        name: true,
        emailNotifications: true,
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
