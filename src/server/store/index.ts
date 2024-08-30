import Elysia from "elysia";
import axios from "axios";

export const storeRoute = new Elysia({ prefix: "/store" })
  .get("/categories", async (ctx: any) => {
    try {
      const resp = await axios.get("http://api.barron.agency/api/categories");
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

      const resp = await axios.get("http://api.barron.agency/api/products", {
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
  });
