import { authRoute } from "@/server/auth";
import { marketRoute } from "@/server/markets";
import { orderRoute } from "@/server/order";
import { passwordResetRoute } from "@/server/password-reset";
import { shoppingListRoute } from "@/server/shopping-list";
import { storeRoute } from "@/server/store";
import { userRoute } from "@/server/user";
import { wishListRoute } from "@/server/wish-list";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger({
    path: '/swagger'
  }))
  .use(userRoute)
  .use(authRoute)
  .use(storeRoute)
  .use(orderRoute)
  .use(shoppingListRoute)
  .use(marketRoute)
  .use(passwordResetRoute)
  .use(wishListRoute)
  .ws("/ws", {
    message: (ws, message) => {
      ws.send({
        message: message,
        time: new Date().toISOString(),
      });
      ws.publish("chat", {
        message: message,
        time: new Date().toISOString(),
      });
    },
  })
  .use(
    cors({
      origin: "http://localhost:3001",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  
export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
