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
  .delete("/products", async (ctx: any) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user?.id) {
      throw new Error("User not authenticated");
    }

    const { id } = ctx.body;

    if (!id) {
      throw new Error("Item id is required");
    }

    try {
      const deletedItem = await prisma.shoppingList.delete({
        where: {
          id: id,
          userId: user.id,
        },
      });

      return deletedItem;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw new Error(`Failed to delete item with id: ${id}`);
    }
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
