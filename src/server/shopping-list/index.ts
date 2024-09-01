import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";

export const shoppingListRoute = new Elysia({ prefix: "/shopping-list" }).post(
  "/index",
  async (ctx: any) => {
    const user: any = await decrypt(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user?.id) {
      throw new Error("User not authenticated");
    }

    const body = ctx.body;

    const shoppingList = await prisma.shoppingListItem.create({
      data: {
        name: body.name,
        userId: user.id,
        productId: body.productId,
        quantity: body.quantity,
        user: body.user,
      },
    });
    return shoppingList;
  }
);
