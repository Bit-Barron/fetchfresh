import { decrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import Elysia, { t } from "elysia";
import { wishListSchema } from "./typebox";

export const wishListRoute = new Elysia({ prefix: "/wish-list" })
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

      const wishList = await prisma.wishlist.create({
        data: {
          name: body.name,
          userId: user.id,
          productId: body.productId,
          quantity: body.quantity,
          imageURL: body.imageURL,
          price: body.price,
        },
      });

      return wishList;
    },
    { body: wishListSchema }
  )
  .get("/index", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user || !user?.id) {
      throw new Error("User not authenticated");
    }

    const wishList = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
    });

    return wishList;
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

      const { productId } = ctx.body as { productId: string };
      if (!productId) {
        throw new Error("ProductId is required");
      }

      const deletedItem = await prisma.wishlist.deleteMany({
        where: {
          userId: user.id,
          productId: productId,
        },
      });

      if (deletedItem.count === 0) {
        throw new Error("Item not found in the wishlist");
      }

      return {
        message: "Item removed from wishlist",
        deletedCount: deletedItem.count,
      };
    },
    {
      body: t.Object({
        productId: t.String(),
      }),
    }
  );
