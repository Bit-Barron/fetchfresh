import { authRoute } from "@/server/auth";
import { marketRoute } from "@/server/markets";
import { orderRoute } from "@/server/order";
import { passwordResetRoute } from "@/server/password-reset";
import { shoppingListRoute } from "@/server/shopping-list";
import { storeRoute } from "@/server/store";
import { userRoute } from "@/server/user";
import { wishListRoute } from "@/server/wish-list";
import { Elysia } from "elysia";

/**
 * Main API router
 * Combines auth and user routes under the '/api' prefix
 */
const app = new Elysia({ prefix: "/api", aot: false })
  .use(userRoute)
  .use(authRoute)
  .use(storeRoute)
  .use(orderRoute)
  .use(shoppingListRoute)
  .use(marketRoute)
  .use(passwordResetRoute)
  .use(wishListRoute);

/**
 * Export the app type for use with RPC clients (e.g., edenTreaty)
 */
export type App = typeof app;

/**
 * Export handlers for different HTTP methods
 * These are used by Next.js API routes [[...route]].ts
 */
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
