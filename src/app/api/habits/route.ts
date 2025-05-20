import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { HabitStatus } from "@/types/shared";
import { habitSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;
  const showArchived = searchParams.get("archived");

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const statusFilter: HabitStatus[] = showArchived
    ? ["ACTIVE", "INACTIVE", "ARCHIVED"]
    : ["ACTIVE", "INACTIVE"];

  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: session?.user?.id,
        status: {
          in: statusFilter,
        },
      },
    });
    if (!habits) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(habits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching habits:", error);
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

  let data;
  try {
    const json = await request.json();
    data = habitSchema.parse(json);
  } catch (err) {
    const zodError = err as { issues: string[] };
    return new Response(
      JSON.stringify({
        error: "Invalid request body",
        details: zodError.issues,
      }),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    const habit = await prisma.habit.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    await prisma.streak.create({
      data: {
        habitId: habit.id,
        currentStreak: 0,
        longestStreak: 0,
      },
    });

    return new Response(JSON.stringify(habit), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating habit:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
