import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { CartItem } from "@/types";

export const saveCartToDB = async (cart: CartItem[]) => {
  const { addToListMutation } = ShoppingListHook();
  try {
    addToListMutation.mutateAsync({
      cart,
    } as any);
  } catch (error) {
    console.error("Error saving cart to the database", error);
  }
};