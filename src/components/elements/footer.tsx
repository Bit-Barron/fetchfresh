import React from "react";
import Link from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Über uns</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" prefetch={false}>
                  Unsere Geschichte
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Karriere
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Presse
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Hilfe</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" prefetch={false}>
                  Kontaktieren Sie uns
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Lieferinformationen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" prefetch={false}>
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Barrierefreiheit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Folgen Sie uns</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" prefetch={false}>
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" prefetch={false}>
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          &copy; 2024 GroceryGo. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};
