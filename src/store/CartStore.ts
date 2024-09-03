import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware"; // Import the persist middleware
import { Product } from "@/types/product";

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: Product) => void;
  removeItemFromCart: (id: number) => void;
  updateItemQuantity: (id: number, amount: number) => void;
  calculateTotal: () => string;
  isInCart: (productId: number) => boolean;
}

export const CartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (cart: CartItem[]) =>
        set(
          produce((state: CartState) => {
            state.cart = cart;
          })
        ),

      addToCart: (product: Product) =>
        set(
          produce((state: CartState) => {
            const existingItemIndex = state.cart.findIndex(
              (item) => item.id === (product.articleId as unknown as number)
            );

            const price = product.listing?.currentRetailPrice || 0;

            if (existingItemIndex > -1) {
              // If the product already exists in the cart, increment its quantity
              state.cart[existingItemIndex].quantity += 1;
            } else {
              // If the product doesn't exist in the cart, add it as a new item
              state.cart.push({
                id: product.articleId as unknown as number,
                image: product.imageURL,
                name: product.title,
                price,
                quantity: 1,
              });
            }
          })
        ),

      removeItemFromCart: (id: number) =>
        set(
          produce((state: CartState) => {
            state.cart = state.cart.filter((item) => item.id !== id);
          })
        ),

      updateItemQuantity: (id: number, amount: number) =>
        set(
          produce((state: CartState) => {
            const item = state.cart.find((item) => item.id === id);
            if (item) {
              item.quantity = Math.max(item.quantity + amount, 1);
            }
          })
        ),

      calculateTotal: () => {
        const cart = get().cart;
        const total = cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return total.toFixed(2);
      },

      isInCart: (productId: number) => {
        const cart = get().cart;
        return cart.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
