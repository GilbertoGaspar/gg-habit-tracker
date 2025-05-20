import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { habitSchema } from "@/lib/schemas";

export async function GET(
  req: Request,
  { params }: { params: { habitId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { habitId } = params;

  if (!habitId) {
    return new Response("Habit ID is required", { status: 400 });
  }

  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      return new Response(JSON.stringify({}), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(habit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching habit:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
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

  let data;
  try {
    const json = await req.json();
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
    const updatdHabit = await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: data,
    });
    return new Response(JSON.stringify(updatdHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { habitId: string } }
) {
  const session = await getServerSession(authOptions);
  const { habitId } = await params;
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!session.user.id) {
    return new Response("User ID not found", { status: 400 });
  }

  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
  });

  if (habit?.userId === session.user.id) {
    try {
      await prisma.habit.update({
        data: {
          status: "ARCHIVED",
        },
        where: {
          userId: session.user.id,
          id: habitId,
        },
      });
    } catch (error) {
      console.error("Error deleting habit:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response("", {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
