import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { encrypt, decrypt } from "@/lib/jwt";

export const passwordResetRoute = new Elysia({ prefix: "/password-reset" })
  .post("/request", async ({ body }: any) => {
    const { email } = body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = await encrypt({ userId: user.id });
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}`;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires: new Date(Date.now() + 3600000),
      },
    });

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Please use the following link to reset your password: ${resetUrl}`,
    });

    return { message: "Password reset email sent" };
  })
  .post("/reset", async ({ body }: any) => {
    const { token, newPassword } = body;

    let decodedToken: any;
    try {
      decodedToken = await decrypt(token);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }

    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !("userId" in decodedToken)
    ) {
      throw new Error("Invalid token structure");
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (
      !user ||
      user.resetToken !== token ||
      (user.resetTokenExpires && user.resetTokenExpires < new Date())
    ) {
      throw new Error("Invalid or expired token");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return { message: "Password reset successful" };
  });
