import React from "react";
import { Product } from "@/types/product";
import { ComboboxDemo } from "./combobox";

// Sortieroptionen
const sortingOptions = [
  { value: "PRICE_ASC", label: "Preis aufsteigend" },
  { value: "PRICE_DESC", label: "Preis absteigend" },
  { value: "RELEVANCE_DESC", label: "Relevanz" },
  { value: "NAME_ASC", label: "Name" },
  { value: "TOPSELLER_DESC", label: "Beliebtheit" },
];

// Allgemeine Filteroptionen
const filterOptions = [
  { value: "", label: "Alle Produkte" },
  { value: "isVegan", label: "Vegan" },
  { value: "isVegetarian", label: "Vegetarisch" },
  { value: "isOrganic", label: "Bio" },
  { value: "isRegional", label: "Regional" },
  { value: "isSingleUse", label: "Einweg" },
  { value: "isReusable", label: "Mehrweg" },
];

// Neue Attribute für spezielle Filter
const attributeOptions = [
  { value: "discounted", label: "Rabattiert" },
  { value: "new", label: "Neu" },
];

// Optionen für die Anzahl der Produkte pro Seite
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
  attributeFilter,
  productsPerPage,
  setSorting,
  setFilterAttribute,
  setAttributeFilter,
  setProductsPerPage,
  products,
}: ComboboxSelectsProps) {
  // Zähle die Anzahl der Produkte für spezielle Attribute
  const getAttributeCount = (attribute: keyof Product["attributes"]) => {
    return products.filter((product) => product.attributes[attribute]).length;
  };

  // Filteroptionen für spezielle Attribute mit Zählungen
  const attributeOptionsWithCounts = attributeOptions.map((option) => ({
    ...option,
    count: getAttributeCount(option.value as keyof Product["attributes"]),
  }));

  return (
    <div className="flex items-center space-x-4">
      <ComboboxDemo
        options={sortingOptions}
        value={sorting}
        onValueChange={(value: string) => setSorting(value)}
        placeholder="Sortieren nach..."
      />
      <ComboboxDemo
        options={filterOptions}
        value={filterAttribute || ""}
        onValueChange={(value: string | null) =>
          setFilterAttribute(value as keyof Product["attributes"] | null)
        }
        placeholder="Allgemeine Filter..."
      />
      <ComboboxDemo
        options={attributeOptionsWithCounts}
        value={attributeFilter || ""}
        onValueChange={(value: string | null) =>
          setAttributeFilter(value as keyof Product["attributes"] | null)
        }
        placeholder="Spezielle Filter..."
      />
      <ComboboxDemo
        options={productsPerPageOptions}
        value={productsPerPage}
        onValueChange={(value: string) => setProductsPerPage(value)}
        placeholder="Artikel pro Seite"
      />
    </div>
  );
}
