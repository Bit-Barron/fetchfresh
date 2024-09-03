import React from "react";
import { Product } from "@/types/product";
import { ComboboxDemo } from "./combobox";

const sortingOptions = [
  { value: "PRICE_ASC", label: "Preis aufsteigend" },
  { value: "PRICE_DESC", label: "Preis absteigend" },
  { value: "RELEVANCE_DESC", label: "Relevanz" },
  { value: "NAME_ASC", label: "Name" },
  { value: "TOPSELLER_DESC", label: "Beliebtheit" },
];

const filterOptions = [
  { value: "", label: "Alle Produkte" },
  { value: "isVegan", label: "Vegan" },
  { value: "isVegetarian", label: "Vegetarisch" },
  { value: "isOrganic", label: "Bio" },
  { value: "isRegional", label: "Regional" },
];

const productsPerPageOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "40", label: "40" },
  { value: "80", label: "80" },
];

interface ComboboxSelectsProps {
  sorting: string;
  filterAttribute: string | null;
  attributeFilter: string | null;
  productsPerPage: string;
  setSorting: (value: string) => void;
  setFilterAttribute: (value: keyof Product["attributes"] | null) => void;
  setAttributeFilter: (value: keyof Product["attributes"] | null) => void;
  setProductsPerPage: (value: string) => void;
  products: Product[];
}

export function ComboboxSelects({
  sorting,
  filterAttribute,
  productsPerPage,
  setSorting,
  setFilterAttribute,
  setProductsPerPage,
}: ComboboxSelectsProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:flex-wrap sm:items-center sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-auto">
        <ComboboxDemo
          options={sortingOptions}
          value={sorting}
          onValueChange={(value: string) => setSorting(value)}
          placeholder="Sortieren nach..."
        />
      </div>
      <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-auto">
        <ComboboxDemo
          options={filterOptions}
          value={filterAttribute || ""}
          onValueChange={(value: string | null) =>
            setFilterAttribute(value as keyof Product["attributes"] | null)
          }
          placeholder="Allgemeine Filter..."
        />
      </div>
      <div className="w-full sm:w-full md:w-auto">
        <ComboboxDemo
          options={productsPerPageOptions}
          value={productsPerPage}
          onValueChange={(value: string) => setProductsPerPage(value)}
          placeholder="Artikel pro Seite"
        />
      </div>
    </div>
  );
}
