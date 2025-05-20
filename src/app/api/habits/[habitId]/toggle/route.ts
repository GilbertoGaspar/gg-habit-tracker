import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { habitId } = await params;

  if (!habitId) {
    return new Response("Habit ID is required", { status: 400 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdaysHabitLog = await prisma.habitLog.findUnique({
      where: {
        habitId_date: {
          habitId: habitId,
          date: yesterday,
        },
      },
    });

    const todaysHabbitLog = await prisma.habitLog.findUnique({
      where: {
        habitId_date: {
          habitId,
          date: today,
        },
      },
    });

    let currentStreak = 1;
    const existingStreak = await prisma.streak.findUnique({
      where: { habitId },
    });

    if (yesterdaysHabitLog && existingStreak) {
      currentStreak = existingStreak?.currentStreak ?? 0;
    }

    await prisma.habitLog.upsert({
      where: { habitId_date: { habitId, date: today } },
      create: { habitId, date: today, completed: true },
      update: { completed: !todaysHabbitLog?.completed },
    });

    if (existingStreak) {
      await prisma.streak.update({
        where: { habitId },
        data: {
          currentStreak,
          longestStreak: Math.max(existingStreak.longestStreak, currentStreak),
        },
      });
    } else {
      await prisma.streak.create({
        data: {
          habitId,
          currentStreak,
          longestStreak: currentStreak,
        },
      });
    }

    return new Response(JSON.stringify({ message: "Habit updated" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
