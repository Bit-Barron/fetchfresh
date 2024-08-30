import { decrypt, encrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { UpdateUserSchema } from "./typebox";

export const userRoute = new Elysia({ prefix: "/user" })
  .get("/me", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
    );

    if (!user) throw new Error("User not found");

    const userData = await prisma.user.findUnique({ where: { id: user.id } });
    if (!userData) throw new Error("User data not found");

    return userData;
  })

  .post(
    "/update",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
      );

      if (!user) throw new Error("User not found");

      const {
        username,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        city,
        email,
        zipCode,
      } = ctx.body;

      if (!user.id || !username) throw new Error("Missing required fields");

      try {
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            username,
            ...(password ? { password } : {}),
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(address ? { address } : {}),
            ...(phoneNumber ? { phoneNumber } : {}),
            ...(city ? { city } : {}),
            ...(zipCode ? { zipCode } : {}),
            ...(email ? { email } : {}),
          },
        });
        return updatedUser;
      } catch (error) {
        console.error("Update error:", error);
        throw new Error("Update failed");
      }
    },
    { body: UpdateUserSchema },
  );
