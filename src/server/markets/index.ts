import axios from "axios";
import Elysia from "elysia";

export const marketRoute = new Elysia({ prefix: "/markets" }).post(
  "/index",
  async ({ body }: any) => {
    const { zipCode } = body;
    console.log("server", zipCode);
    const response = await axios.get(
      `http://127.0.0.1:8000/api/marketpickups?zip_code=${zipCode}`
    );
    return response.data;
  }
);
