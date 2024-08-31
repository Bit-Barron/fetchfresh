"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/elements/product/productcard";
import Sidebar from "@/components/elements/sidebar/sidebar";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../../../../store/ProductStore";
import { CartStore } from "../../../../../store/CartStore";
import { Product } from "@/types/product";
import { MobileSidebar } from "@/components/elements/sidebar/mobile-sidebar";
import { useFilterSortStore } from "@/store/FilterStore";
import { ComboboxSelects } from "@/components/elements/combobox-selects";

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
  const router = useRouter();

  useEffect(() => {
    if (params.name !== "rewe") {
      router.push("/");
    } else {
      fetchProducts();
    }
  }, [params.name, selectedCategory, sorting, filterAttribute]);

  const fetchProducts = async (nextPage: number = 1) => {
    try {
      const response = await productMutation.mutateAsync({
        category: selectedCategory,
        page: nextPage,
        sorting,
        filterAttribute,
      } as any);
      setProducts(response.data.products.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getFilteredProducts = () => {
    return filterAttribute
      ? products.filter((product) => product.attributes[filterAttribute])
      : products;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={setSelectedCategory}
        />
        <MobileSidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={setSelectedCategory}
        />
        <main className="flex-1 space-y-8 bg-[#F6F7F8] p-4 md:p-6">
          <section>
            <div className="md:flex md:justify-between">
              <h2 className="mb-5 text-2xl font-bold">
                {selectedCategory || "Meistverkaufte Artikel"}
              </h2>
              <ComboboxSelects
                sorting={sorting}
                filterAttribute={filterAttribute}
                setSorting={setSorting}
                setFilterAttribute={setFilterAttribute}
                products={products}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {getFilteredProducts().map((product: Product) => (
                <ProductCard
                  key={product.articleId}
                  product={product}
                  isInCart={isInCart(product.articleId as any)}
                  addToCart={addToCart}
                  removeFromCart={removeItemFromCart}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
