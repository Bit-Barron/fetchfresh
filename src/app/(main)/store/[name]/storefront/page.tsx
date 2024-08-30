"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { StoreHook } from "@/components/hooks/store-hook";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import ProductCard from "@/components/elements/productcard";
import { MenuIcon } from "lucide-react";
import { CartStore } from "../../../../../store/CartStore";
import Sidebar from "@/components/elements/sidebar";
import { useProductStore } from "../../../../../store/ProductStore";

interface StorePageProps {
  params: { name: string };
}

const sortingOptions = [
  { value: "PRICE_ASC", label: "Preis aufsteigend" },
  { value: "RELEVANCE_DESC", label: "Relevanz" },
  { value: "NAME_ASC", label: "Name" },
  { value: "TOPSELLER_DESC", label: "Top Seller" },
];

export default function StorePage({ params }: StorePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sorting, setSorting] = useState<string>("TOPSELLER_DESC");
  const { products, setProducts } = useProductStore();
  const { addToCart, isInCart, removeItemFromCart } = CartStore();
  const [filterAttribute, setFilterAttribute] = useState<
    keyof Product["attributes"] | null
  >(null);
  const { productMutation, categoryQuery } = StoreHook();
  const router = useRouter();

  useEffect(() => {
    if (params.name !== "rewe") {
      router.push("/");
    } else {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory, sorting, filterAttribute]);

  const fetchProducts = (category?: string, nextPage: number = 1) => {
    productMutation
      .mutateAsync({
        category,
        page: nextPage,
        sorting,
        filterAttribute,
      } as any)
      .then((response) => {
        const productsData = response.data.products;
        setProducts(productsData.products);
      })
      .catch((error) => console.error(error));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchProducts(category, 1);
  };

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSorting = e.target.value;
    setSorting(newSorting);
    fetchProducts(selectedCategory, 1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value as keyof Product["attributes"] | null;
    setFilterAttribute(filter ? filter : null);
    fetchProducts(selectedCategory, 1);
  };

  const veganCount = products.filter(
    (product) => product.attributes.isVegan,
  ).length;
  const vegetarianCount = products.filter(
    (product) => product.attributes.isVegetarian,
  ).length;
  const organicCount = products.filter(
    (product) => product.attributes.isOrganic,
  ).length;
  const regionalCount = products.filter(
    (product) => product.attributes.isRegional,
  ).length;

  const filteredProducts = filterAttribute
    ? products.filter((product) => product.attributes[filterAttribute])
    : products;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar
          categories={categoryQuery.data?.topLevelCategories || []}
          onCategoryClick={handleCategoryClick}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Menü umschalten</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 border-r bg-white p-4 lg:hidden"
          >
            <div className="space-y-4">
              <Link href="#" className="block font-bold" prefetch={false}>
                Shop
              </Link>
              <Link
                href="/store/account/orders"
                className="block"
                prefetch={false}
              >
                Nochmal kaufen
              </Link>
              <Link href="/your-lists" className="block" prefetch={false}>
                Einkaufsliste
              </Link>
              <div className="border-t pt-4">
                <ul className="space-y-2">
                  {categoryQuery.data?.topLevelCategories.map(
                    (category: any) => (
                      <li key={category.id}>
                        <button
                          className="block"
                          onClick={() => handleCategoryClick(category.slug)}
                        >
                          <h2>{category.name}</h2>
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <main className="flex-1 space-y-8 bg-[#F6F7F8] p-4 md:p-6">
          <section>
            <div className="md:flex md:justify-between">
              <h2 className="mb-5 text-2xl font-bold">
                {selectedCategory || "Meistverkaufte Artikel"}
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={sorting}
                  onChange={handleSortingChange}
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
                  onChange={handleFilterChange}
                  className="rounded border border-gray-300 p-2"
                >
                  <option value="">Alle Produkte ({products.length})</option>
                  <option value="isVegan">Vegan ({veganCount})</option>
                  <option value="isVegetarian">
                    Vegetarisch ({vegetarianCount})
                  </option>
                  <option value="isOrganic">Bio ({organicCount})</option>
                  <option value="isRegional">Regional ({regionalCount})</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {filteredProducts.map((i) => {
                return (
                  <ProductCard
                    key={i.articleId}
                    product={i}
                    isInCart={isInCart(i.articleId as any)}
                    addToCart={addToCart}
                    removeFromCart={removeItemFromCart}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
