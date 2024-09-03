import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { DeleteItemSchema, ShoppingListItemSchema } from "./typebox";
import { User } from "@prisma/client";

export const shoppingListRoute = new Elysia({ prefix: "/shopping-list" })
  .post(
    "/index",
    async (ctx) => {
      const user = await decrypt<User>(
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
          imageURL: body.imageURL,
        },
      });
      return shoppingList;
    },
    { body: ShoppingListItemSchema }
  )
  .get("/index", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user?.id) {
      throw new Error("User not authenticated");
    }

    const shoppingList = await prisma.shoppingListItem.findMany({
      where: {
        userId: user.id,
      },
    });
    return shoppingList;
  })
  .delete(
    "/index",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      if (!user || !user?.id) {
        throw new Error("User not authenticated");
      }

      const body = ctx.body;

      const shoppingList = await prisma.shoppingListItem.delete({
        where: {
          id: body.id,
        },
      });
      return shoppingList;
    },
    { body: DeleteItemSchema }
  )
  .post(
    "/add-to-list",
    async (ctx: any) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      if (!user || !user?.id) {
        throw new Error("User not authenticated");
      }

      const { productId, name, price, quantity, imageURL } = ctx.body;

      const existingItem = await prisma.shoppingListItem.findFirst({
        where: {
          userId: user.id,
          productId: productId,
        },
      });

      if (existingItem) {
        const updatedItem = await prisma.shoppingListItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
        return updatedItem;
      } else {
        const newItem = await prisma.shoppingListItem.create({
          data: {
            userId: user.id,
            productId: productId,
            name,
            quantity,
            imageURL,
            price,
          },
        });
        return newItem;
      }
    },
    { body: ShoppingListItemSchema }
  );
