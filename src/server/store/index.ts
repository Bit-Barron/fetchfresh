import Elysia from "elysia";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.fetchfresh.de/api";

export const storeRoute = new Elysia({ prefix: "/store" })
  .get("/categories", async (ctx: any) => {
    try {
      const resp = await axios.get(`${API_URL}/categories`);
      return resp.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  })
  .post("/products", async (ctx: any) => {
    try {
      const categorySlug = ctx.body?.category || "";
      const page = ctx.body?.page || 1;
      const sorting = ctx.body?.sorting || "TOPSELLER_DESC";
      const filter = ctx.body?.filter || "ALL";
      const objects_per_page = ctx.body?.objects_per_page || 25;
      const query = ctx.body?.query || "";
      const attributes = ctx.body?.attributes || "";


      const resp = await axios.get(`https://api.fetchfresh.de/api/products`, {
        params: {
          categorySlug,
          page,
          sorting,
          filter,
          objects_per_page,
          query,
          attributes,
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
      const resp = await axios.get(`https://api.fetchfresh.de/api/product/${productId}`);
      return resp.data.data;
    } catch (error) {
      // console.error(error);
    }
  })
  .post("/grocerysearch", async (ctx: any) => {
    try {
      const query = ctx.body?.query || "";
      const page = ctx.body?.page || 1;
      const response = await axios.get(`https://api.fetchfresh.de/api/grocerysearch/${query}`, {
        params: {
          page,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  });
