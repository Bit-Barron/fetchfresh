"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/elements/sidebar/sidebar";
import { MobileSidebar } from "@/components/elements/sidebar/mobile-sidebar";
import { ComboboxSelects } from "@/components/elements/combobox-selects";
import ProductList from "@/components/elements/frontpage/product-list";
import PaginationComponent from "@/components/elements/frontpage/product-pagination";
import { Attributes } from "@/types/product";
import { useStorePage } from "@/components/elements/frontpage/front-page";

interface StorePageProps {
  params: { name: string };
}

export default function StorePage({ params }: StorePageProps) {
  const {
    selectedCategory,
    sorting,
    filterAttribute,
    setSorting,
    setFilterAttribute,
    setSelectedCategory,
    products,
    isInCart,
    removeItemFromCart,
    categoryQuery,
    page,
    productsPerPage,
    attributeFilter,
    setAttributeFilter,
    totalPages,
    isLoading,
    setPage,
    setProductsPerPage,
    handleCategoryClick,
    addToCartHandler,
  } = useStorePage(params);

  if (params.name !== "rewe") {
    // Consider using Next.js routing here instead of imperative navigation
    // router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={handleCategoryClick}
        />
        <MobileSidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={handleCategoryClick}
        />
        <main className="flex-1 space-y-8 bg-[#F6F7F8] p-4 md:p-6">
          <section>
            <StorePageHeader
              selectedCategory={selectedCategory}
              sorting={sorting}
              filterAttribute={filterAttribute}
              productsPerPage={productsPerPage}
              setSorting={setSorting}
              setFilterAttribute={setFilterAttribute}
              setProductsPerPage={setProductsPerPage}
              products={products}
              attributeFilter={attributeFilter}
              setAttributeFilter={setAttributeFilter}
            />
            <ProductList
              products={products}
              isLoading={isLoading}
              filterAttribute={filterAttribute}
              attributeFilter={attributeFilter}
              isInCart={isInCart}
              addToCart={addToCartHandler}
              removeFromCart={removeItemFromCart}
            />
          </section>
        </main>
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

interface StorePageHeaderProps {
  selectedCategory: string;
  sorting: string;
  filterAttribute: keyof Attributes | null;
  productsPerPage: string;
  setSorting: (sorting: string) => void;
  setFilterAttribute: (attr: keyof Attributes | null) => void;
  setProductsPerPage: (perPage: string) => void;
  products: any[];
  attributeFilter: keyof Attributes | null;
  setAttributeFilter: (attr: keyof Attributes | null) => void;
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

// The useStorePage hook remains the same as in the previous version
