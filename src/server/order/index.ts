import { Elysia } from "elysia";
import prisma from "@/lib/prisma";
import { OrderBody, OrderStatusUpdateBody } from "./typebox";
import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: string;
}

export const orderRoute = new Elysia({ prefix: "/orders" })
  .post(
    "",
    async (ctx) => {
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      const {
        firstName,
        lastName,
        address,
        city,
        zipCode,
        cart,
        totalAmount,
        email,
        phoneNumber,
      } = ctx.body;

      if (!user?.id) {
        throw new Error("User is not authenticated");
      }

      const productData = cart.map((item: Item) => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.name,
        image: item.image,
        price: item.price,
      }));

      const order = await prisma.order.create({
        data: {
          status: "PENDING",
          firstName,
          lastName,
          address,
          city,
          zipCode,
          userId: user.id,
          email,
          phoneNumber,
          totalAmount: totalAmount,
          products: {
            create: productData,
          },
        },
      });

      return { success: true, order };
    },
    { body: OrderBody }
  )
  .get("", async (ctx) => {
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user?.id) {
      throw new Error("User is not authenticated");
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, orders };
  })
  .get("/all", async (ctx) => {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { success: true, orders };
  })
  .patch(
    "",
    async (ctx) => {
      const { orderId, status } = ctx.body;
      const user = await decrypt<User>(
        ctx.cookie[serverEnv.AUTH_COOKIE].value as string
      );

      if (!user?.id) {
        throw new Error("User is not authenticated");
      }

      const updatedOrder = await prisma.order.update({
        where: { id: orderId, userId: user.id },
        data: { status: "COMPLETED" },
      });

      return { success: true, updatedOrder };
    },
    { body: OrderStatusUpdateBody }
  )

  .get("/:orderId", async (ctx) => {
    const { orderId } = ctx.params;
    const user = await decrypt<User>(
      ctx.cookie[serverEnv.AUTH_COOKIE].value as string
    );

    if (!user?.id) {
      throw new Error("User is not authenticated");
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId, userId: user.id },
      include: { products: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return { success: true, order };
  })
  .get("/all/:orderId", async (ctx) => {
    const { orderId } = ctx.params;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return { success: true, order };
  });
