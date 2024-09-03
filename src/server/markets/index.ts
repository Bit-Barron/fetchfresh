import axios from "axios";
import Elysia from "elysia";

export const marketRoute = new Elysia({ prefix: "/markets" }).post(
  "/index",
  async ({ body }: any) => {
    const { zipCode } = body;
    const zip = zipCode ? zipCode : "13355";
    const response = await axios.get(
      `http://127.0.0.1:8000/api/marketpickups?zip_code=${zip}`
    );
    return response.data;
  }
);
