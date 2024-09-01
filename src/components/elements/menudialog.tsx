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

interface MenuDialogProps {
  onClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ onClose }) => {
  const { grocerySearchMutation } = StoreHook();
  const { createShoppingListMutation } = ShoppingListHook();
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentShoppingListId, setCurrentShoppingListId] = useState<
    string | null
  >(null);

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

  const handleCreateShoppingList = async (product: any) => {
    if (!currentShoppingListId) {
      try {
        const result = await createShoppingListMutation.mutateAsync({
          name: product.title,
          quantity: 1,
          productId: product.productId,
          imageURL: product.imageURL,
        } as any);
        setCurrentShoppingListId(result.id);
        toast.success("Zur Einkaufsliste hinzugefügt");
      } catch (error) {
        toast.error("Fehler beim Erstellen der Einkaufsliste");
        console.error("Failed to create shopping list:", error);
      }
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
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-xl font-bold">Einkaufsliste</h1>
        <div className="mt-3">
          <Input
            placeholder="Tomate, Brot, Käse ..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div
                key={product.productId}
                className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div className="ml-4 flex-grow">
                  <h2
                    className="text-lg font-semibold truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "300px",
                    }}
                  >
                    {product.title}
                  </h2>
                </div>
                <Button
                  onClick={() => handleCreateShoppingList(product)}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                >
                  <RiFileList2Fill className="h-6 w-6" />
                </Button>
              </div>
            ))
          ) : (
            <p>Keine Produkte gefunden</p>
          )}
        </div>
        {hasMore && searchQuery && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={loadMore}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Lädt..." : "Mehr laden"}
            </Button>
          </div>
        )}
        <Separator className="my-6" />
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
