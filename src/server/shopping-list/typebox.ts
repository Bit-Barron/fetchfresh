import { t } from "elysia";

// TypeBox schemas
export const ShoppingListItemSchema = t.Object({
  productId: t.String(),
  name: t.String(),
  quantity: t.Number(),
  imageURL: t.Optional(t.String()),
});

export const CreateShoppingListSchema = t.Object({
  name: t.String(),
  items: t.Array(ShoppingListItemSchema),
});
