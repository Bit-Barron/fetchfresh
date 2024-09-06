import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RiFileList2Fill } from "react-icons/ri";
import { StoreHook } from "../hooks/store-hook";
import { ShoppingListHook } from "../hooks/shopping-list-hook";
import { Product } from "@/types/product";
import { DialogTitle } from "@radix-ui/react-dialog";
import { WishListHook } from "../hooks/wish-list-hook";
import { formatPrice } from "@/utils";

interface MenuDialogProps {
  onClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ onClose }) => {
  const { grocerySearchMutation, productDetailsMutation } = StoreHook();
  const { createWishListMutation } = WishListHook();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGrocerySearch = async (
    query: string,
    page = 1,
    append = false
  ) => {
    setIsLoadingMore(true);
    try {
      const response = await grocerySearchMutation.mutateAsync({
        query,
        page,
      } as any);
      const fetchedProducts = response.data?.grocerySearch?.products ?? [];
      if (append) {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      } else {
        setProducts(fetchedProducts);
      }
      setHasMore(fetchedProducts.length > 0);
    } catch (error) {
      console.error("Grocery search error:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleCreateWishList = async (product: Product) => {
    try {
      const response = await productDetailsMutation.mutateAsync({
        productId: product.productId,
      } as any);

      const price = response.product[0].listing.currentRetailPrice;

      await createWishListMutation.mutateAsync({
        name: product.title,
        quantity: 1,
        productId: product.productId,
        imageURL: product.imageURL,
        price: price,
      });

      toast.success(`${product.title} zur Einkaufsliste hinzugefügt`);
    } catch (error) {
      toast.error("Fehler beim Hinzufügen zur Einkaufsliste");
      console.error("Failed to add product to shopping list:", error);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleGrocerySearch(searchQuery, nextPage, true);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      handleGrocerySearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Toaster richColors position="top-right" />
      <DialogTitle></DialogTitle>
      <DialogContent className="max-h-[80vh] w-[95vw] sm:w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-4 sm:p-6 shadow-lg">
        <h1 className="text-lg sm:text-xl font-bold">Wunschliste</h1>
        <div className="mt-3">
          <Input
            placeholder="Tomate, Brot, Käse ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="text-sm sm:text-base"
          />
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <div
                key={product.productId}
                className="flex items-center border rounded-lg p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={
                    product.imageURL
                      ? decodeURIComponent(product.imageURL)
                      : "/placeholder.png"
                  }
                  alt={product.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                  unoptimized
                />
                <div className="ml-3 sm:ml-4 flex-grow min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold truncate">
                    {product.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600"></p>
                </div>
                <Button
                  onClick={() => handleCreateWishList(product)}
                  className="bg-green-700 text-white p-2 sm:p-2 rounded-lg hover:bg-green-800 transition"
                >
                  <RiFileList2Fill className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              Keine Produkte gefunden
            </p>
          )}
        </div>
        {hasMore && searchQuery && (
          <div className="mt-4 sm:mt-6 flex justify-center">
            <Button
              onClick={loadMore}
              className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Lädt..." : "Mehr laden"}
            </Button>
          </div>
        )}
        <Separator className="my-4 sm:my-6" />
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
