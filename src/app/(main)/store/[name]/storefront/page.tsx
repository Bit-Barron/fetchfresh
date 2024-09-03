"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/elements/sidebar/sidebar";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../../../../store/ProductStore";
import { CartStore } from "../../../../../store/CartStore";
import { Attributes, Product } from "@/types/product";
import { MobileSidebar } from "@/components/elements/sidebar/mobile-sidebar";
import { useFilterSortStore } from "@/store/FilterStore";
import { ComboboxSelects } from "@/components/elements/combobox-selects";
import ProductList from "@/components/elements/frontpage/product-list";
import PaginationComponent from "@/components/elements/frontpage/product-pagination";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";

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
  } = useFilterSortStore();
  const { products, setProducts } = useProductStore();
  const { addToCart, isInCart, removeItemFromCart } = CartStore();
  const { productMutation, categoryQuery } = StoreHook();
  const { addToListMutation } = ShoppingListHook();
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState("20");
  const [attributeFilter, setAttributeFilter] = useState<
    keyof Attributes | null
  >(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.name !== "rewe") {
      // router.push("/");
    } else {
      fetchProducts();
    }
  }, [
    params.name,
    selectedCategory,
    sorting,
    filterAttribute,
    attributeFilter,
    productsPerPage,
    page,
  ]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productMutation.mutateAsync({
        category: selectedCategory,
        page,
        sorting,
        filterAttribute,
        attributes: attributeFilter,
        objects_per_page: productsPerPage,
      } as any);

      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else if (
        response.data.products &&
        Array.isArray(response.data.products.products)
      ) {
        setProducts(response.data.products.products);
      } else {
        console.error("Unexpected product data structure:", response.data);
        setProducts([]);
      }

      setTotalPages(
        response.data.totalPages ||
          Math.ceil(response.data.total / parseInt(productsPerPage))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const addToCartHandler = (product: Product) => {
    addToListMutation.mutateAsync({
      productId: product.productId,
      quantity: 1,
      imageURL: product.imageURL,
      name: product.title,
      price: product.listing.currentRetailPrice,
    });
  };

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
            <div className="md:flex md:justify-between">
              <h2 className="mb-5 text-2xl font-bold">
                {selectedCategory || "Meistverkaufte Artikel"}
              </h2>

              <ComboboxSelects
                sorting={sorting}
                filterAttribute={filterAttribute as unknown as string}
                productsPerPage={productsPerPage}
                setSorting={setSorting}
                setFilterAttribute={setFilterAttribute}
                setProductsPerPage={setProductsPerPage}
                products={products}
                attributeFilter={attributeFilter as unknown as string}
                setAttributeFilter={setAttributeFilter}
              />
            </div>

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
