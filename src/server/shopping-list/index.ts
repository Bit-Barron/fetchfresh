import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { CreateShoppingListSchema } from "./typebox";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";

export const shoppingListRoute = new Elysia({ prefix: "/shopping-list" })
  .post(
    "/index",
    async (ctx) => {
      const user: any = await decrypt(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      if (!user || !user?.id) {
        throw new Error("User not authenticated");
      }

      const body = ctx.body;

      const shoppingList = await prisma.shoppingList.create({
        data: {
          name: body.name,
          userId: user.id,
          items: {
            create: body.items.map((item) => ({
              productId: item.productId,
              name: item.name,
              quantity: item.quantity,
              imageURL: item.imageURL ?? undefined,
            })),
          },
        },
        include: { items: true },
      });
      return shoppingList;
    },
    { body: CreateShoppingListSchema }
  )
  .get("/index", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );
    const shoppingLists = await prisma.shoppingList.findMany({
      where: { userId: user?.id },
      include: { items: true },
    });
    return shoppingLists;
  })
  .get("/:id", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    const shoppingList = await prisma.shoppingList.findUnique({
      where: { id: ctx.params.id, userId: user?.id },
      include: { items: true },
    });
    if (!shoppingList) {
      ctx.set.status = 404;
      return { error: "Shopping list not found" };
    }
    return shoppingList;
  })
  .post("/:id/items", async (ctx: any) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user.id) {
      throw new Error("User not authenticated");
    }

    const { id } = ctx.params;
    const { items } = ctx.body;

    const updatedShoppingList = await prisma.shoppingList.update({
      where: { id, userId: user.id },
      data: {
        items: {
          create: items.map(
            (item: {
              productId: any;
              name: any;
              quantity: any;
              imageURL: any;
            }) => ({
              productId: item.productId,
              name: item.name,
              quantity: item.quantity,
              imageURL: item.imageURL ?? undefined,
            })
          ),
        },
      },
      include: { items: true },
    });

    return updatedShoppingList;
  });
