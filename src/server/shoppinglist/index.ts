import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import { DeleteSchema, ShoppingListItemBody } from "./typebox";

export const shoppingListRoute = new Elysia({ prefix: "/shoppinglist" })
  .post(
    "/create",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
      );

      const userId = user?.id;
      if (!userId) {
        return { error: "User not authenticated" };
      }
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return { error: "User does not exist" };
      }

      const { productId, name, price, image, quantity } = ctx.body;

      try {
        const shoppingListItem = await prisma.shoppingListItem.create({
          data: {
            userId,
            productId,
            name,
            price,
            image,
            quantity,
          },
        });

        return { success: true, shoppingListItem };
      } catch (error) {
        console.error("Error creating shopping list item:", error);
        return {
          error: "Failed to create shopping list item",
        };
      }
    },
    { body: ShoppingListItemBody },
  )
  .get("/all", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
    );

    const userId = user?.id;
    if (!userId) {
      return { error: "User not authenticated" };
    }

    try {
      const shoppingListItems = await prisma.shoppingListItem.findMany({
        where: { userId },
      });

      return { success: true, shoppingListItems };
    } catch (error) {
      console.error("Error fetching shopping list items:", error);
      return {
        error: "Failed to fetch shopping list items",
      };
    }
  })
  .delete(
    "/delete/:id",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string,
      );

      const orderId = ctx?.body?.orderId;

      const userId = user?.id;
      if (!userId) {
        return { error: "User not authenticated" };
      }

      try {
        const shoppingListItem = await prisma.shoppingListItem.findUnique({
          where: { id: orderId },
        });

        if (!shoppingListItem) {
          return { error: "Item not found" };
        }

        if (shoppingListItem.userId !== userId) {
          return { error: "Not authorized to delete this item" };
        }

        await prisma.shoppingListItem.delete({
          where: { id: orderId },
        });

        return { success: true, message: "Item successfully deleted" };
      } catch (error) {
        console.error("Error deleting shopping list item:", error);
        return {
          error: "Failed to delete shopping list item",
        };
      }
    },
    { body: DeleteSchema },
  );
