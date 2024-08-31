import Elysia from "elysia";
import axios from "axios";
import { ProductDetailsSchema } from "./typebox";

export const storeRoute = new Elysia({ prefix: "/store" })
  .get("/categories", async (ctx: any) => {
    try {
      const resp = await axios.get("http://127.0.0.1:8000/api/categories");
      return resp.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  })
  .post("/products", async (ctx: any) => {
    try {
      const categorySlug = ctx.body?.category || "regional";
      const page = ctx.body?.page || 1;
      const sorting = ctx.body?.sorting || "TOPSELLER_DESC";
      const filter = ctx.body?.filter || "ALL";

      const resp = await axios.get("http://127.0.0.1:8000/api/products", {
        params: {
          categorySlug,
          page,
          sorting,
          filter,
        },
      });

      return resp.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  })
  .post("/product-details", async (ctx: any) => {
    try {
      const productId = ctx.body?.productId;
      const resp = await axios.get(
        `http://127.0.0.1:8000/api/product/${productId}`
      );
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      console.error(error);
    }
  });
