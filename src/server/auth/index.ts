import { encrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { Elysia } from "elysia";
import { loginUser, registerUser } from "./typebox";

export const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async (ctx) => {
      const userExist = await prisma.user.findFirst({
        where: { username: ctx.body.username.trim() },
      });
      if (userExist) throw new Error("User already exists");

      const user = await prisma.user.create({
        data: {
          username: ctx.body.username.trim(),
          password: ctx.body.password.trim(),
          email: ctx.body.email.trim(),
          role: "CUSTOMER",
        },
      });

      ctx.cookie[serverEnv.AUTH_COOKIE].set({
        value: await encrypt(user),
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: registerUser }
  )
  .post(
    "/login",
    async (ctx) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            username: ctx.body.username.trim(),
            password: ctx.body.password.trim(),
          },
        });

        if (!user) throw new Error("User not found");

        ctx.cookie[serverEnv.AUTH_COOKIE].set({
          value: await encrypt(user),
          path: "/",
          httpOnly: true,
          maxAge: serverEnv.SEVEN_DAYS,
        });
        return "success";
      } catch (error) {
        console.error(error);
      }
    },
    { body: loginUser }
  )
  .get("/logout", (ctx) => {
    ctx.cookie[serverEnv.AUTH_COOKIE].set({
      value: "",
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });
    return "success";
  });
