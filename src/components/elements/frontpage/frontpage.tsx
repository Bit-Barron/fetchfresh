"use client";

import { useState, useEffect } from "react";
import { StoreHook } from "@/components/hooks/store-hook";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { useFilterSortStore } from "@/store/FilterStore";
import { Attributes, Product } from "@/types/product";
import { useProductStore } from "@/store/ProductStore";

export function useStorePage(params: { name: string }) {
  const {
    selectedCategory,
    sorting,
    filterAttribute,
    setSorting,
    setFilterAttribute,
    setSelectedCategory,
  } = useFilterSortStore();
  const { products, setProducts } = useProductStore();
  const { productMutation, categoryQuery } = StoreHook();
  const { createShoppingListMutation } = ShoppingListHook();
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState("20");
  const [attributeFilter, setAttributeFilter] = useState<
    keyof Attributes | null
  >(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.name === "rewe") {
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
    createShoppingListMutation.mutateAsync({
      productId: product.productId,
      quantity: 1,
      imageURL: product.imageURL,
      name: product.title,
      price: product.listing.currentRetailPrice,
    });
  };

  return {
    selectedCategory,
    sorting,
    filterAttribute,
    setSorting,
    setFilterAttribute,
    setSelectedCategory,
    products,
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
  };
}
