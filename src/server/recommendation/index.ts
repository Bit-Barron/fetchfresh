import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import Elysia from "elysia";
import prisma from "@/lib/prisma";

export const recommendationRoute = new Elysia({ prefix: "/recommendation" }).post(
  "/",
  async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    const getProducts = await prisma.orderProduct.findMany({
      where: {
        orderId: user?.id,
      },
    });

    console.log(getProducts);
  }
);
