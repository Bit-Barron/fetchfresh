"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/elements/product/productcard";
import Sidebar from "@/components/elements/sidebar/sidebar";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../../../../store/ProductStore";
import { CartStore } from "../../../../../store/CartStore";
import { Attributes, Product } from "@/types/product";
import { MobileSidebar } from "@/components/elements/sidebar/mobile-sidebar";
import { useFilterSortStore } from "@/store/FilterStore";
import { ComboboxSelects } from "@/components/elements/combobox-selects";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

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
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [productsPerPage, setProductsPerPage] = useState("20");
  const [attributeFilter, setAttributeFilter] = useState<
    keyof Attributes | null
  >(null);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.name !== "rewe") {
      router.push("/");
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

      const totalPages =
        response.data.totalPages ||
        Math.ceil(response.data.total / parseInt(productsPerPage));
      setMaxPage(totalPages);

      console.log("Total Pages:", totalPages);
      updateVisiblePages(page, totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setMaxPage(1);
    } finally {
      setIsLoading(false);
    }
  };

  const updateVisiblePages = (currentPage: number, totalPages: number) => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getFilteredProducts = () => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }

    return products.filter((product: Product) => {
      if (filterAttribute && !product.attributes[filterAttribute]) {
        return false;
      }
      if (attributeFilter && !product.attributes[attributeFilter]) {
        return false;
      }
      return true;
    });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
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

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {getFilteredProducts().map((product: Product) => (
                  <ProductCard
                    key={product.articleId}
                    product={product}
                    isInCart={isInCart(product.articleId as unknown as number)}
                    addToCart={addToCart}
                    removeFromCart={removeItemFromCart}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
