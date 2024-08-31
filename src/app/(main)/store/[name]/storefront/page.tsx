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

interface StorePageProps {
  params: { name: string };
}

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

  const getAttributeCount = (attribute: keyof Product["attributes"]) => {
    return products.filter((product) => product.attributes[attribute]).length;
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
              <div className="flex items-center space-x-4">
                <select
                  value={sorting}
                  onChange={(e) => setSorting(e.target.value)}
                  className="rounded border border-gray-300 p-2"
                >
                  {sortingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={filterAttribute || ""}
                  onChange={(e) =>
                    setFilterAttribute(
                      e.target.value as keyof Product["attributes"] | null
                    )
                  }
                  className="rounded border border-gray-300 p-2"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} (
                      {option.value
                        ? getAttributeCount(
                            option.value as keyof Product["attributes"]
                          )
                        : products.length}
                      )
                    </option>
                  ))}
                </select>
              </div>
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
