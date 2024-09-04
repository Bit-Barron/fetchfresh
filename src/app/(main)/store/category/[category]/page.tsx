"use client";

import { StoreHook } from "@/components/hooks/store-hook";
import { Category } from "@/types";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface pageProps {
  params: { category: string };
}

const Page: React.FC<pageProps> = ({ params }) => {
  const { productMutation, categoryQuery } = StoreHook();
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    productMutation
      .mutateAsync({
        category: params.category,
      } as any)
      .then((response) => {
        const productsData = response.data.products;
        setProducts(productsData.products);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">
          Ergebnisse für {params.category}
        </h1>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Beliebteste Artikel</h2>
            <p className="text-sm text-gray-500">Öffnungszeiten: 7 - 22 Uhr</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {products.map((i) => {
                const decodedImageUrl = i.imageURL
                  ? decodeURIComponent(i.imageURL)
                  : "";

                return (
                  <div key={i.id} className="rounded-md border p-2">
                    <Image
                      src={decodedImageUrl}
                      alt={`Bild von ${i.title}`}
                      className="h-32 w-full rounded-md object-cover"
                      width="150"
                      height="150"
                      style={{ aspectRatio: "150/150", objectFit: "cover" }}
                      unoptimized // Disable Next.js image optimization
                    />
                    <h3 className="mt-2 text-sm font-medium">{i.title}</h3>
                    <p className="text-sm text-gray-500">Noch viele verfügbar</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10">
              <button
                className="underline hover:text-green-600"
                onClick={() => router.push("/store/rewe/storefront")}
              >
                Weiter Produkte
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Weitere Categoryn</h2>

            {categoryQuery.data?.topLevelCategories && (
              <ul className="grid w-full gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categoryQuery.data.topLevelCategories.map((category: Category) => {
                  const decodedCategoryImageUrl = category.imageUrl
                    ? decodeURIComponent(category.imageUrl)
                    : "";

                  return (
                    <li key={category.id} className="p-2">
                      <Link href={`/store/category/${category.slug}`}>
                        <div className="flex items-center gap-2">
                          <Image
                            width={20}
                            height={20}
                            src={decodedCategoryImageUrl}
                            alt={category.name}
                            className="h-6 w-6 rounded sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                            unoptimized // Disable Next.js image optimization
                          />
                          <span className="text-sm sm:text-base lg:text-lg">
                            {category.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
