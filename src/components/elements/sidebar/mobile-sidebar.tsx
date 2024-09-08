import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Category } from "@/types";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export const MobileSidebar = ({
  categories,
  onCategoryClick,
}: {
  categories: Category[];
  onCategoryClick: (category: string) => void;
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Menü umschalten</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-64 border-r bg-white p-0 lg:hidden">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link href="#" className="block font-bold" prefetch={false}>
            Shop
          </Link>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4 space-y-4">
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
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                      onClick={() => onCategoryClick(category.slug)}
                    >
                      <h2>{category.name}</h2>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export default MobileSidebar;
