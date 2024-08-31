"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Reviews } from "@/components/elements/reviews";
import { Footer } from "@/components/elements/footer";
import { Faqs } from "@/components/elements/faqs";

import ReweLogo from "../../../public/images/logo-rewe.svg";
import { useRouter } from "next/navigation";
import Searchbar from "@/components/elements/searchbar";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../store/ProductStore";
import CartDialog from "@/components/elements/cartdialog";
import { CartStore } from "../../store/CartStore";
import { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { cart, removeItemFromCart, updateItemQuantity, calculateTotal } =
    CartStore();
  const [showCart, setShowCart] = useState<boolean>(false);

  const { setProducts, products } = useProductStore();
  const { productMutation, categoryQuery } = StoreHook();

  const fetchProducts = (category?: string, nextPage: number = 1) => {
    productMutation
      .mutateAsync({
        category,
        page: nextPage,
      } as any)
      .then((response) => {
        const productsData = response.data.products;
        setProducts(productsData.products);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Searchbar
        onSearch={(query) => fetchProducts(query)}
        onShowCart={() => setShowCart(true)}
      />
      <main className="flex flex-col items-center space-y-8 py-8">
        {/* Hero Section */}
        <section className="w-full max-w-7xl rounded-md bg-green-100 p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Bestellen Sie Lebensmittel zur Lieferung oder Abholung noch heute
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Alles, was Sie von lokalen Geschäften möchten, direkt zu Ihnen nach
            Hause geliefert.
          </p>
        </section>

        <section className="w-full max-w-7xl">
          <h2 className="text-center text-2xl font-bold">
            Wählen Sie Ihr Geschäft in{" "}
            <span className="text-green-600">Deutschland</span>
          </h2>
          <div className="mt-6 flex grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="flex items-center space-x-4 p-4">
              <div>
                <button onClick={() => router.push("/store/rewe/storefront")}>
                  <Image
                    src={ReweLogo}
                    width={200}
                    height={200}
                    alt={"Rewe-Logo"}
                  />
                </button>
                <p className="text-sm text-gray-600">
                  Jetzt bei Rewe Essen bestellen
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Section */}
        <section className="w-full max-w-7xl rounded-md bg-green-100 p-8">
          <h2 className="mb-4 text-center text-3xl font-bold">From Our Blog</h2>
          <div className="gap-4 md:flex">
            <Card className="w-full p-4 md:w-1/2 lg:w-1/3">
              <h3 className="text-xl font-bold">How to Choose Fresh Produce</h3>
              <p className="mt-2 text-gray-700">
                Tips and tricks on selecting the best fruits and vegetables for
                your family.
              </p>
              <button
                className="mt-2 text-green-600 underline"
                onClick={() => router.push("/store/rewe/storefront")}
              >
                jetzt bestellen
              </button>
            </Card>
            <Card className="w-full p-4 md:w-1/2 lg:w-1/3">
              <h3 className="text-xl font-bold">
                Easy Recipes for Busy Weeknights
              </h3>
              <p className="mt-2 text-gray-700">
                Quick and delicious recipes to make your evenings stress-free.
              </p>
              <button
                className="mt-2 text-green-600 underline"
                onClick={() => router.push("/store/rewe/storefront")}
              >
                jetzt bestellen
              </button>
            </Card>
            <Card className="w-full p-4 md:w-1/2 lg:w-1/3">
              <h3 className="text-xl font-bold">
                Health Benefits of Organic Foods
              </h3>
              <p className="mt-2 text-gray-700">
                Discover the advantages of choosing organic foods for your
                health.
              </p>
              <button
                className="mt-2 text-green-600 underline"
                onClick={() => router.push("/store/rewe/storefront")}
              >
                jetzt bestellen
              </button>
            </Card>
          </div>
        </section>

        {/* FAQs and Reviews Sections */}
        <Faqs />
        <Reviews />
      </main>
      <Footer />
      {showCart && (
        <CartDialog
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemoveItem={removeItemFromCart}
          onUpdateItemQuantity={updateItemQuantity}
          calculateTotal={calculateTotal}
        />
      )}
    </div>
  );
}