import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import {
  MountainIcon,
  CompassIcon,
  SettingsIcon,
  LogOutIcon,
  AppleIcon,
  HelpCircleIcon,
  ListIcon,
  ShoppingBagIcon,
  ClipboardIcon,
  PhoneIcon,
} from "lucide-react";
import { UserHook } from "../hooks/user-hook";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarSections = [
  {
    title: "",
    links: [
      {
        href: "/store/rewe/storefront",
        label: "Shops",
        icon: ShoppingBagIcon,
      },
      {
        href: "/store/account/orders",
        label: "Deine Bestellungen",
        icon: ClipboardIcon,
      },
      {
        href: "/store/your-lists",
        label: "Deine Einkaufsliste",
        icon: ListIcon,
      },
      {
        href: "/store/account",
        label: "Account Einstellungen",
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Hilfe Center", icon: HelpCircleIcon },
      {
        href: "/help/how-Grocerygo-works",
        label: "Wie GroceryGo funktioniert",
        icon: CompassIcon,
      },
    ],
  },
  {
    title: "Unsere Apps",
    links: [
      { href: "#", label: "App Store", icon: AppleIcon },
      { href: "#", label: "Google Play", icon: PhoneIcon },
    ],
  },
];

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const { meQuery } = UserHook();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="flex h-full max-w-xs flex-col border-r bg-white shadow-lg sm:w-80"
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <MountainIcon className="h-6 w-6" />
            <span className="text-xl font-bold">{meQuery.data?.username}</span>
          </Link>
        </div>

        <nav className="flex flex-grow flex-col space-y-6">
          {sidebarSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`pb-4 ${sectionIndex < sidebarSections.length - 1 ? "border-b" : ""}`}
            >
              {section.title && (
                <h3 className="mb-3 font-semibold uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.links.map((link, linkIndex) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md py-2 text-sm font-medium transition-colors"
                      prefetch={false}
                    >
                      <IconComponent className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t p-4">
          <Link
            href="/logout"
            className="hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            prefetch={false}
          >
            <LogOutIcon className="h-5 w-5" />
            Abmelden
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
