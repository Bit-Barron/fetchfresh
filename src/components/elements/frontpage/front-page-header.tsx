import React from "react";
import { ComboboxSelects } from "../combobox-selects";

interface StorePageHeaderProps {
  selectedCategory: string;
  sorting: string;
  filterAttribute: string;
  productsPerPage: string;
  setSorting: (sorting: string) => void;
  setFilterAttribute: (attr: string) => void;
  setProductsPerPage: (perPage: string) => void;
  products: any[];
  attributeFilter: string;
  setAttributeFilter: (attr: string | null) => void;
}

function StorePageHeader({
  selectedCategory,
  sorting,
  filterAttribute,
  productsPerPage,
  setSorting,
  setFilterAttribute,
  setProductsPerPage,
  products,
  attributeFilter,
  setAttributeFilter,
}: StorePageHeaderProps) {
  return (
    <div className="md:flex md:justify-between">
      <h2 className="mb-5 text-2xl font-bold">
        {selectedCategory || "Meistverkaufte Artikel"}
      </h2>
      <ComboboxSelects
        sorting={sorting}
        filterAttribute={filterAttribute}
        productsPerPage={productsPerPage}
        setSorting={setSorting}
        setProductsPerPage={setProductsPerPage}
        products={products}
        attributeFilter={attributeFilter}
        setFilterAttribute={setFilterAttribute as any}
        setAttributeFilter={setAttributeFilter as any}
      />
    </div>
  );
}

export default StorePageHeader;
