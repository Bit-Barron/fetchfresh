import { Type } from "@sinclair/typebox/type";

export const wishListSchema = Type.Object({
  name: Type.String(),
  productId: Type.String(),
  quantity: Type.Number(),
  user: Type.Optional(Type.String()),
  imageURL: Type.Optional(Type.String()),
  price: Type.Optional(Type.Number()),
});
