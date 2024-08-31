import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "@/types/product";

interface FilterSortState {
  selectedCategory: string;
  sorting: string;
  filterAttribute: keyof Product["attributes"] | null;
  setSorting: (sorting: string) => void;
  setFilterAttribute: (
    filterAttribute: keyof Product["attributes"] | null
  ) => void;
  setSelectedCategory: (category: string) => void;
}

export const useFilterSortStore = create<FilterSortState>()(
  immer((set) => ({
    selectedCategory: "",
    sorting: "TOPSELLER_DESC",
    filterAttribute: null,
    setSorting: (sorting) =>
      set((state) => {
        state.sorting = sorting;
      }),
    setFilterAttribute: (filterAttribute) =>
      set((state) => {
        state.filterAttribute = filterAttribute;
      }),
    setSelectedCategory: (category) =>
      set((state) => {
        state.selectedCategory = category;
      }),
  }))
);
