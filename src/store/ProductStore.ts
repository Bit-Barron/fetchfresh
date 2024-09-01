import { create } from 'zustand';
import { Product } from '@/types/product';

interface ProductStoreState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStoreState>(set => ({
  products: [], // Initialisiere als leeres Array
  setProducts: (products) => set({ products }),
}));