// components/ComboboxSelects.tsx
import React from "react";
import { Product } from "@/types/product";
import { ComboboxDemo } from "./combobox";

const sortingOptions = [
  { value: "PRICE_ASC", label: "Preis aufsteigend" },
  { value: "RELEVANCE_DESC", label: "Relevanz" },
  { value: "NAME_ASC", label: "Name" },
  { value: "TOPSELLER_DESC", label: "Top Seller" },
];

const filterOptions = [
  { value: "", label: "Alle Produkte" },
  { value: "isVegan", label: "Vegan" },
  { value: "isVegetarian", label: "Vegetarisch" },
  { value: "isOrganic", label: "Bio" },
  { value: "isRegional", label: "Regional" },
];

interface ComboboxSelectsProps {
  sorting: string;
  filterAttribute: string | null;
  setSorting: (value: string) => void;
  setFilterAttribute: (value: keyof Product["attributes"] | null) => void;
  products: Product[]; // Add products as a prop to get counts
}

export function ComboboxSelects({
  sorting,
  filterAttribute,
  setSorting,
  setFilterAttribute,
  products,
}: ComboboxSelectsProps) {
  const getAttributeCount = (attribute: keyof Product["attributes"]) => {
    return products.filter((product) => product.attributes[attribute]).length;
  };

  const sortingOptionsWithCounts = sortingOptions.map((option) => ({
    ...option,
    count: undefined,
  }));

  const filterOptionsWithCounts = filterOptions.map((option) => ({
    ...option,
    count: option.value
      ? getAttributeCount(option.value as keyof Product["attributes"])
      : products.length,
  }));

  return (
    <div className="flex items-center space-x-4">
      <ComboboxDemo
        options={sortingOptionsWithCounts}
        value={sorting}
        onValueChange={(value: string) => setSorting(value)}
        placeholder="Sortieren nach..."
      />
      <ComboboxDemo
        options={filterOptionsWithCounts}
        value={filterAttribute || ""}
        onValueChange={(value: string | null) =>
          setFilterAttribute(value as keyof Product["attributes"] | null)
        }
        placeholder="Filtern nach..."
      />
    </div>
  );
}
