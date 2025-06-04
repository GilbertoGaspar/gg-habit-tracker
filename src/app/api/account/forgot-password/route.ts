import { sendResetEmail } from "@/lib/apiUtils";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response("", {
        status: 200,
      });
    }

    if (user.provider !== "credentials") {
      return new Response(
        "Password reset is only available for users registered with credentials",
        {
          status: 400,
        }
      );
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: { passwordResetToken: token, passwordResetExpires: expiresAt },
    });

    await sendResetEmail(email, token);

    return new Response("Password reset link sent to your email", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
