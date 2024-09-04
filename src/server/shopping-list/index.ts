import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import {
  DeleteItemSchema,
  ShoppingListItemSchema,
  UpdateItemQuantitySchema,
} from "./typebox";
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

      const shoppingList = await prisma.shoppingList.create({
        data: {
          name: body.name,
          userId: user.id,
          productId: body.productId,
          quantity: body.quantity,
          imageURL: body.imageURL,
          price: body.price,
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

    const shoppingList = await prisma.shoppingList.findMany({
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

      const shoppingList = await prisma.shoppingList.delete({
        where: {
          id: body.id,
        },
      });
      return shoppingList;
    },
    { body: DeleteItemSchema }
  )
  .delete("/:productId", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user?.id) {
      throw new Error("User not authenticated");
    }

    const productId = ctx.params.productId;

    const shoppingList = await prisma.shoppingList.deleteMany({
      where: {
        userId: user.id,
        productId: productId,
      },
    });
    return shoppingList;
  })
  .put(
    "/update-quantity",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      if (!user || !user?.id) {
        throw new Error("User not authenticated");
      }

      const body = ctx.body;

      const updatedItem = await prisma.shoppingList.update({
        where: {
          id: body.id,
          userId: user.id, // Ensure the item belongs to the user
        },
        data: {
          quantity: body.quantity,
        },
      });

      return updatedItem;
    },
    { body: UpdateItemQuantitySchema }
  );
