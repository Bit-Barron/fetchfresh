import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { CartItem } from "@/types";

export const saveCartToDB = async (cart: CartItem[]) => {
  const { createShoppingListMutation } = ShoppingListHook();
  try {
    createShoppingListMutation.mutateAsync({
      cart,
    } as any);
  } catch (error) {
    console.error("Error saving cart to the database", error);
  }
};
