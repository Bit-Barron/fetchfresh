import { Type } from "@sinclair/typebox";

export const ShoppingListItemBody = Type.Object({
  productId: Type.String(),
  name: Type.String(),
  price: Type.Number(),
  image: Type.String(),
  quantity: Type.Integer(),
});

export const DeleteSchema = Type.Object({
  orderId: Type.String(),
});
