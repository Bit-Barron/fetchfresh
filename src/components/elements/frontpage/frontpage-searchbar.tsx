"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { RiFileList2Fill } from "react-icons/ri";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCartIcon, MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { UserHook } from "@/components/hooks/user-hook";
import { useProductStore } from "@/store/ProductStore";
import MarketMapDrawer from "../market-drawer";
import DashboardSidebar from "../dashboardsidebar";

interface SearchbarProps {
  onSearch?: (query: string) => void;
  onShowCart?: () => void;
  onShowMenu?: () => void;
}

export default function Searchbar({
  onSearch,
  onShowCart,
  onShowMenu,
}: SearchbarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products } = useProductStore();
  const { meQuery } = UserHook();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  }, [searchQuery, products]);

  const renderAuthButtons = () => (
    <>
      <Link href="/login" className="mr-4">
        <Button variant="ghost" size="sm" className="text-black">
          Anmelden
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="ghost" size="sm" className="bg-green-700 text-white">
          Registrieren
        </Button>
      </Link>
    </>
  );

  const renderUserControls = (product?: Product) => (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="w-10 gap-3 rounded-full"
        onClick={onShowCart}
      >
        <ShoppingCartIcon className="h-6 w-6" />
        <span className="sr-only">Warenkorb</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-10 gap-3 rounded-full"
        onClick={onShowMenu}
      >
        <RiFileList2Fill className="h-6 w-6" />
        <span className="sr-only">Einkaufsliste</span>
      </Button>
    </>
  );

  const renderMenuContent = () => (
    <NavigationMenuContent className="w-full md:w-[1800px] bg-white shadow-lg sm:max-w-lg md:max-w-[1900px] rounded-b-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Suchergebnisse</h2>
        <ul className="space-y-2">
          {filteredProducts.slice(0, 10).map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* You can replace this with an actual product image if available */}
                  <span className="text-gray-500 text-xs">
                    {product.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500">{product.categories}</p>
                </div>
              </div>
              {meQuery?.data && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toast.success("Erfolgreich zum Warenkorb hinzugefügt");
                  }}
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-green-600 hover:text-green-800"
            onClick={() => router.push("/store/rewe/storefront")}
          >
            Alle Produkte anzeigen
          </Button>
        </div>
      </div>
    </NavigationMenuContent>
  );

  return (
    <header className="bg-background flex flex-col items-center justify-between bg-[#F7F5F0] px-2 py-4 shadow-sm sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon className="h-6 w-6 mr-4" />
        </Button>
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-grow max-w-4xl mx-auto">
          <form
            className="relative flex items-center"
            onSubmit={(e) => e.preventDefault()}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <NavigationMenu className="w-full">
              <NavigationMenuList className="w-full">
                <NavigationMenuItem className="w-full">
                  <NavigationMenuTrigger className="flex items-center w-full">
                    <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 ml-2 h-5 w-5 -translate-y-1/2 text-black" />
                    <Input
                      type="search"
                      placeholder="Suche Produkte, Geschäfte und Rezepte"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="md:w-[1500px] shadow-lg rounded-full border bg-[#F6F7F8] py-4 pl-10 pr-5 text-sm text-black placeholder:text-black"
                    />
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </form>
        </div>
        <div className="flex-shrink-0 ml-2">
          {meQuery?.data ? renderUserControls() : renderAuthButtons()}
        </div>
      </div>
    </header>
  );
}
