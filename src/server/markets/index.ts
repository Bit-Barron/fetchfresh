import axios from "axios";
import Elysia from "elysia";

export const marketRoute = new Elysia({ prefix: "/markets" }).get(
  "/index",
  async (ctx) => {
    const response = await axios.get("http://127.0.0.1:8000/api/marketpickups");
    console.log(response.data);
    return response.data;
  }
);
