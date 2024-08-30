import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
