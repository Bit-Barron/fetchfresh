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
    <SheetContent side="left" className="w-64 border-r bg-white p-4 lg:hidden">
      <div className="space-y-4">
        <Link href="#" className="block font-bold" prefetch={false}>
          Shop
        </Link>
        <Link href="/store/account/orders" className="block" prefetch={false}>
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
                  className="block"
                  onClick={() => onCategoryClick(category.slug)}
                >
                  <h2>{category.name}</h2>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);
