import Link from "next/link";
import { Category } from "@/types";
import ReweLogo from "../../../public/images/logo-rewe.svg";
import Image from "next/image";

interface SidebarProps {
  categories: Category[];
  onCategoryClick: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="hidden w-64 border-r bg-white p-4 lg:block">
      <div className="mx-auto mb-5 flex flex-col items-center justify-center">
        <div className="rounded-lg border p-3">
          <Image width={100} src={ReweLogo} alt="rewe logo" />
        </div>
        <h1 className="text-xl font-semibold">Rewe</h1>
        <div className="text-xs">Preisgestaltung & Gebühren</div>
        <div className="text-xs text-blue-900">100% Zufriedenheitsgarantie</div>
        <div className="text-xs">Werden Sie heute Mitglied bei Rewe</div>
      </div>
      <div className="space-y-4 border-t">
        <Link href="#" className="block font-bold" prefetch={false}>
          Shop
        </Link>
        <Link href="/store/account/orders" className="block" prefetch={false}>
          Bestellungen
        </Link>
        <Link href="/store/your-lists" className="block" prefetch={false}>
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
    </div>
  );
};

export default Sidebar;
