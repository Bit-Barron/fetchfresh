import { Type } from "@sinclair/typebox/type";

export const ShoppingListItemSchema = Type.Object({
  name: Type.String(),
  productId: Type.String(),
  quantity: Type.Number(),
  user: Type.Optional(Type.String()),
  imageURL: Type.Optional(Type.String()),
  price: Type.Optional(Type.Number()),
});

export const DeleteItemSchema = Type.Object({
  id: Type.String(),
});

export const addToListSchema = Type.Object({
  productId: Type.String(),
  quantity: Type.Number(),
  imageURL: Type.String(),
});
