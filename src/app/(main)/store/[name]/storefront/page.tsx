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
import StorePageHeader from "@/components/elements/frontpage/front-page-header";

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
              filterAttribute={filterAttribute as keyof Attributes}
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

// The useStorePage hook remains the same as in the previous version
