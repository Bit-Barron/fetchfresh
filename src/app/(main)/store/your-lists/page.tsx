"use client";

import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartStore } from "@/store/CartStore";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const { shoppingListQuery } = ShoppingListHook();
  const { addToCart } = CartStore();

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <SettingsSidebar />
      <div className="mx-auto container p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Einkaufsliste</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shoppingListQuery?.data?.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
            >
              {item.imageURL ? (
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mb-4 rounded-lg"
                />
              ) : (
                <div className="bg-gray-200 w-40 h-40 mb-4 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-gray-600">{item.quantity} stk</p>
              <p className="text-gray-500 text-sm mt-2">
                Added on: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
