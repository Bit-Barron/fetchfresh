"use client";
import React from "react";
import { toast, Toaster } from "sonner";
import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";
import { WishListHook } from "@/components/hooks/wish-list-hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { ShoppingCartIcon, TrashIcon } from "lucide-react";
import { formatPrice } from "@/utils";

const WishlistItem = ({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (productId: string) => Promise<void>;
}) => {
  const { createShoppingListMutation } = ShoppingListHook();
  const { deleteWishListMutation } = WishListHook();

  const addToCartHandler = async (product: Product) => {
    createShoppingListMutation
      .mutateAsync({
        productId: product.productId,
        quantity: 1,
        imageURL: product.imageURL,
        name: product.name,
        price: product.price,
      })
      .then(() => {
        toast.success("Product added to cart");
      })
      .catch(() => {
        toast.error("Failed to add product to cart");
      });
  };

  const removeFromWishlistHandler = async (id: string) => {
    await deleteWishListMutation
      .mutateAsync({
        productId: id,
      })
      .then(() => {
        toast.success("Product removed from wishlist");
      })
      .catch(() => {
        toast.error("Failed to remove product from wishlist");
      });
    await onRemove(id);
  };

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center p-4 bg-white h-full">
        <img
          src={item.imageURL}
          alt={item.name}
          className="w-32 h-32 object-cover rounded-md mb-4"
        />
        <div className="text-center">
          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
          <p className="text-xs text-gray-500">Product ID: {item.productId}</p>
          <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
          {item.price && (
            <p className="text-sm font-semibold mt-2">
              Price: {formatPrice(item.price.toFixed(2))}€
            </p>
          )}
          <Button className="mr-2" onClick={() => addToCartHandler(item)}>
            <ShoppingCartIcon />
          </Button>
          <Button
            className=""
            onClick={() => removeFromWishlistHandler(item.productId)}
          >
            <TrashIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WishlistPage = () => {
  const { wishListQuery } = WishListHook();
  const wishlistItems = wishListQuery.data || [];

  const uniqueWishlistItems = wishlistItems.reduce((acc, current) => {
    const x: any = acc.find(
      (item: Product) => item.productId === current.productId
    );
    if (!x) {
      return acc.concat([current] as any);
    } else {
      x.quantity += current.quantity;
      return acc;
    }
  }, []);

  const handleRemove = async () => {
    await wishListQuery.refetch();
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <SettingsSidebar />
      <Toaster richColors position="top-right" />
      <main className="flex-1 p-8">
        <Card className="w-full max-w-8xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Meine Wunschliste
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uniqueWishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {uniqueWishlistItems.map((item: Product, index) => (
                  <WishlistItem
                    key={item.productId || index}
                    item={item}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Your wishlist is empty.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WishlistPage;
