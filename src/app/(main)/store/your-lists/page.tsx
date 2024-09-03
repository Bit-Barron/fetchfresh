"use client";

import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { StoreHook } from "@/components/hooks/store-hook";
import { formatPrice } from "@/utils";
import { CartStore } from "@/store/CartStore";
import { Product } from "@/types/product";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const { shoppingListQuery, deleteShoppingListMutation } = ShoppingListHook();
  const [shoppingList, setShoppingList] = useState<Product[]>([]);
  const { productDetailsMutation } = StoreHook();
  const [price, setPrice] = useState<number>(0);
  const { addToCart } = CartStore();

  useEffect(() => {
    if (shoppingListQuery?.data) {
      setShoppingList(shoppingListQuery.data as any);
    }
  }, [shoppingListQuery?.data]);

  const handleDelete = async (id: string) => {
    try {
      await deleteShoppingListMutation.mutateAsync({ id } as any);

      setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleCartItem = async (item: Product, productId: string) => {
    productDetailsMutation
      .mutateAsync({ productId: productId } as any)
      .then((data) => {
        console.log(data);
        setPrice(
          formatPrice(data.product[0].listing.currentRetailPrice) as any
        );
      });

    addToCart(item);
  };

  return (
    <div className="flex min-h-screen w-full bg-bg">
      <SettingsSidebar />
      <div className="mx-auto container p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Einkaufsliste</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shoppingList.map((item) => {
            return (
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
                {item.price}
                <p className="text-gray-600">{item.quantity} stk</p>

                <button onClick={() => handleCartItem(item, item.productId)}>
                  Hinzufügen
                </button>
                <div className="flex justify-end items-end">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    <Trash2Icon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
