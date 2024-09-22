import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftIcon,
  ClipboardIcon,
  GiftIcon,
  ListIcon,
  LogOutIcon,
  SettingsIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface SettingsSidebarProps {}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({}) => {
  const router = useRouter();

  const sidebarItems = [
    {
      href: "/store/rewe/storefront",
      icon: ShoppingBagIcon,
      label: "Shop",
    },
    {
      href: "/store/account/orders",
      icon: ClipboardIcon,
      label: "Deine Bestellungen",
    },
    {
      href: "/store/your-lists",
      icon: ListIcon,
      label: "Einkaufsliste",
    },
    {
      href: "/store/wish-lists",
      icon: GiftIcon,
      label: "Wunschliste",
    },
    {
      href: "/store/account",
      icon: SettingsIcon,
      label: "Account Einstellungen",
    },
    {
      href: "/logout",
      icon: LogOutIcon,
      label: "Logout",
    },
  ];

  return (
    <aside className="bg-background hidden w-64 flex-col border-r bg-white p-3 md:flex">
      <button
        className="mt-5 flex items-center gap-2 text-sm font-medium"
        onClick={() => router.push("/store/rewe/storefront")}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Zurück
      </button>
      <Separator className="my-4 bg-gray-200" />
      <nav className="space-y-5">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className="hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md text-sm font-medium transition-colors"
              prefetch={false}
            >
              <item.icon className="h-6 w-6" />
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};
