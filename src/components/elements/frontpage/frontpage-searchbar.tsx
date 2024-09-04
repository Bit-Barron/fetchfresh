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
    <NavigationMenuContent className="w-full md:w-[1800px] md:flex-row bg-white shadow-lg sm:max-w-lg md:max-w-[1900px]">
      <ul className="grid gap-3 p-3">
        <div className="mt-2">
          {filteredProducts.slice(0, 11).map((product) => (
            <div
              key={product.id}
              className="relative flex rounded-lg p-2 transition-shadow duration-300 hover:bg-gray-200"
            >
              <div className="flex-1">
                <h1 className="truncate mt-2 ml-10 text-sm font-semibold text-black hover:text-green-700">
                  {product.title}
                </h1>
              </div>
              <div className="">
                {meQuery?.data ? (
                  <div>
                    <ShoppingCartIcon
                      onClick={() => {
                        toast.success("Erfolgreich zum warenkorb hinzugefügt");
                      }}
                      className="h-3 w-3 mt-1"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
          <div
            className="cursor-pointer underline ml-10"
            onClick={() => router.push("/store/rewe/storefront")}
          >
            Alle Produkte sehen
          </div>
        </div>
      </ul>
    </NavigationMenuContent>
  );

  return (
    <header className="bg-background flex flex-col items-center justify-between bg-[#F7F5F0] px-2 py-4 shadow-sm sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <MenuIcon onClick={() => setSidebarOpen(true)} className="" />
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-20 hover:bg-muted/50 rounded-full"
            onClick={() => setDrawerOpen(true)}
          >
            Markt auswählen
          </Button>
          <MarketMapDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
          <form
            className="relative flex items-center"
            onSubmit={(e) => e.preventDefault()}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <NavigationMenu className="">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center">
                    <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 ml-2 h-5 w-5 -translate-y-1/2 text-black" />
                    <Input
                      type="search"
                      placeholder="Suche, Produkte, Geschäfte und Rezepte"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="!focus:outline-none w-full shadow-lg rounded-full border bg-[#F6F7F8] py-6 pl-10 pr-4 text-sm text-black placeholder:text-black md:w-[1800px]"
                    />
                  </NavigationMenuTrigger>
                  {menuOpen && renderMenuContent()}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </form>
        </div>
        <div className="ml-4">
          {meQuery?.data ? renderUserControls() : renderAuthButtons()}
        </div>
      </div>
    </header>
  );
}