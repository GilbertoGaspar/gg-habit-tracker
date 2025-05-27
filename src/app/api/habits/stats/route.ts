import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const streaks = await prisma.streak.findMany({
      where: {
        habit: {
          userId: session?.user?.id,
          status: {
            in: ["ACTIVE", "INACTIVE"],
          },
        },
      },
    });

    const longestStreak = await prisma.streak.findFirst({
      where: {
        habit: { userId: session?.user?.id },
      },
      orderBy: {
        longestStreak: "desc",
      },
      include: {
        habit: true,
      },
    });

    const totalCompleted = await prisma.habitLog.count({
      where: {
        completed: true,
        habit: {
          userId: session?.user?.id,
        },
      },
    });

    return new Response(
      JSON.stringify({
        currentStreak: streaks[streaks.length - 1]?.currentStreak || 0,
        longestStreak: longestStreak?.longestStreak || 0,
        totalCompleted: totalCompleted || 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching habits:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
