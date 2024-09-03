import { Attributes } from "react";
import { ComboboxSelects } from "../combobox-selects";

interface StorePageHeaderProps {
  selectedCategory: string;
  sorting: string;
  filterAttribute: any;
  productsPerPage: string;
  setSorting: (sorting: string) => void;
  setFilterAttribute: (attr: any) => void;
  setProductsPerPage: (perPage: string) => void;
  products: any[];
  attributeFilter: any;
  setAttributeFilter: (attr: any) => void;
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
        filterAttribute={filterAttribute as string}
        productsPerPage={productsPerPage}
        setSorting={setSorting}
        setFilterAttribute={setFilterAttribute}
        setProductsPerPage={setProductsPerPage}
        products={products}
        attributeFilter={attributeFilter as string}
        setAttributeFilter={setAttributeFilter}
      />
    </div>
  );
}

export default StorePageHeader;
