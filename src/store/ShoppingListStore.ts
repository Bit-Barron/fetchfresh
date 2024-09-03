import { create } from "zustand";
import { Product } from "@/types/product";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { StoreHook } from "@/components/hooks/store-hook";
import { formatPrice } from "@/utils";
import { CartStore } from "./CartStore";
import { toast, Toaster } from "sonner";

interface ShoppingListStore {
  shoppingList: Product[];
  setShoppingList: (list: Product[]) => void;
  removeFromList: (id: string) => void;
  fetchShoppingList: () => Promise<void>;
  addToCart: (item: Product) => Promise<void>;
}

export const useShoppingListStore = create<ShoppingListStore>((set, get) => ({
  shoppingList: [],
  setShoppingList: (list) => set({ shoppingList: list }),
  removeFromList: (id) =>
    set((state) => ({
      shoppingList: state.shoppingList.filter((item) => item.id !== id),
    })),
  fetchShoppingList: async () => {
    const { shoppingListQuery } = ShoppingListHook();
    const data = await shoppingListQuery.refetch();
    if (data.data) {
      set({ shoppingList: data.data as any[] });
    }
  },
  addToCart: async (item) => {
    const { productDetailsMutation } = StoreHook();
    const { addToCart } = CartStore();
    toast.success("Product zum warenkorb hinzugefügt");
    const data = await productDetailsMutation.mutateAsync({
      productId: item.productId,
    } as any);
    const price = formatPrice(data.product[0].listing.currentRetailPrice);
    addToCart({ ...item, price });
  },
}));
