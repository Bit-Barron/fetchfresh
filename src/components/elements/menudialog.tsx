import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ShoppingListDialog from "./shopping-list-dialog";
import { Dialog, DialogContent } from "../ui/dialog";
import { ShoppingListHook } from "../hooks/shopping-list-hook";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { RiFileList2Fill } from "react-icons/ri";
import { StoreHook } from "../hooks/store-hook";

interface MenuDialogProps {
  onClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ onClose }) => {
  const [isShoppingListDialogOpen, setShoppingListDialogOpen] = useState(false);
  const [isProductSearchDialogOpen, setProductSearchDialogOpen] =
    useState(false);
  const [currentShoppingListId, setCurrentShoppingListId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const { getShoppingListsQuery, addItemToShoppingListMutation } =
    ShoppingListHook();
  const { grocerySearchMutation } = StoreHook();

  const handleShoppingListCreated = (listId: string) => {
    setCurrentShoppingListId(listId);
    setShoppingListDialogOpen(false); // Schließt das ShoppingListDialog nach dem Erstellen
  };

  const openShoppingListDialog = () => {
    setShoppingListDialogOpen(true);
  };

  const openProductSearchDialog = (listId: string) => {
    setCurrentShoppingListId(listId);
    setProductSearchDialogOpen(true);
    if (searchQuery === "") {
      // Lade alle Produkte aus der aktuellen Einkaufsliste, wenn kein Suchbegriff eingegeben ist
      const selectedList = getShoppingListsQuery.data?.find(
        (list: any) => list.id === listId
      );
      if (selectedList) {
        setProducts(selectedList.items || []);
      }
    }
  };

  const handleGrocerySearch = async () => {
    if (searchQuery.trim() === "") {
      // Lade alle Produkte aus der aktuellen Einkaufsliste, wenn kein Suchbegriff eingegeben ist
      const selectedList = getShoppingListsQuery.data?.find(
        (list: any) => list.id === currentShoppingListId
      );
      if (selectedList) {
        setProducts(selectedList.items || []);
      }
    } else {
      try {
        const response = await grocerySearchMutation.mutateAsync({
          query: searchQuery,
          page: 1,
        } as any);
        const fetchedProducts = response.data?.grocerySearch?.products ?? [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Grocery search error:", error);
      }
    }
  };

  const handleAddItemToList = async (item: any) => {
    if (currentShoppingListId) {
      try {
        await addItemToShoppingListMutation.mutateAsync({
          shoppingListId: currentShoppingListId,
          item: {
            productId: item.productId || "",
            name: item.title || item.name || "",
            quantity: 1,
            imageURL: item.imageURL || undefined,
          },
        });
        openProductSearchDialog(currentShoppingListId);
      } catch (error) {
        console.error("Failed to add item to shopping list:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-h-[80vh] w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
          <h1 className="text-xl font-bold">Einkaufsliste</h1>
          <div className="mt-3">
            <Button
              onClick={openShoppingListDialog}
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Neue Einkaufsliste erstellen
            </Button>
          </div>

          {/* Vorhandene Einkaufslisten anzeigen */}
          {getShoppingListsQuery.data &&
          getShoppingListsQuery.data.length > 0 ? (
            <div className="mt-3">
              <h2 className="text-lg font-semibold">
                Vorhandene Einkaufslisten:
              </h2>
              <ul className="mt-3">
                {getShoppingListsQuery.data.map((list: any) => (
                  <li
                    key={list.id}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      currentShoppingListId === list.id
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => openProductSearchDialog(list.id)}
                  >
                    {list.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-6">
              Keine Einkaufslisten gefunden. Bitte erstellen Sie eine neue
              Liste.
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog zum Erstellen einer neuen Einkaufsliste */}
      {isShoppingListDialogOpen && (
        <ShoppingListDialog
          onClose={() => setShoppingListDialogOpen(false)}
          onCreate={handleShoppingListCreated}
        />
      )}

      {/* Dialog zur Produktsuche und Hinzufügen von Produkten */}
      {isProductSearchDialogOpen && (
        <Dialog
          open={true}
          onOpenChange={() => setProductSearchDialogOpen(false)}
        >
          <DialogContent className="max-h-[80vh] w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              Produkte suchen und hinzufügen
            </h2>
            <div className="mt-4 flex">
              <Input
                placeholder="Produkte suchen (z.B. Tomaten, Brot)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGrocerySearch()}
                className="flex-grow"
              />
              <Button
                onClick={handleGrocerySearch}
                className="bg-green-500 text-white ml-2 px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Suchen
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <div
                    key={product.productId || product.name} // Fallback für eigene Produkte
                    className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {product.imageURL && (
                      <Image
                        src={product.imageURL}
                        alt={product.title || product.name}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    )}
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
                        {product.title || product.name}
                      </h2>
                    </div>
                    <Button
                      onClick={() => handleAddItemToList(product)}
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MenuDialog;
