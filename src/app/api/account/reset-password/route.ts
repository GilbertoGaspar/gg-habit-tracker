import { prisma } from "@/lib/prisma";
import { ResetPasswordUserSchema } from "@/lib/schemas";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token) {
      return new Response("Token is required", { status: 400 });
    }

    if (!password) {
      return new Response("Password is required", { status: 400 });
    }

    try {
      ResetPasswordUserSchema.parse({
        password,
      });
    } catch {
      return new Response("Invalid data", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return new Response("Invalid or expired token", {
        status: 400,
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

    const hashedPassword = await hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return new Response("Password has been reset successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
