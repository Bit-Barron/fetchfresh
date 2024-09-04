import { decrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import Elysia from "elysia";
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

      console.log("Wish list created:", wishList);
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
  });
