import { sendTransactionalEmails } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usersThatNeedEmails = await prisma.user.findMany({
      where: {
        emailNotifications: true,
      },
      include: {
        habits: {
          where: {
            status: "ACTIVE",
            reminders: {
              some: {
                days: {
                  some: {
                    dayOfWeek: today.getDay(),
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!usersThatNeedEmails || usersThatNeedEmails.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    const emailsToSend = usersThatNeedEmails.map((user) => {
      return {
        email: user.email,
        name: user.name || "User",
        content: `<h1>Daily Habit Reminder</h1><p>Here are your active habits for today:</p><ul>${user.habits
          .map((habit) => `<li>${habit.name}</li>`)
          .join("")}</ul>`,
        subject: "Your Daily Habit Reminder",
      };
    });
    const sentEmails = await sendTransactionalEmails({
      to: emailsToSend,
    });

    return new Response(JSON.stringify(sentEmails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending transactional emails:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
