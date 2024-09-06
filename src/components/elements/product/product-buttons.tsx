import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";

interface ActionButtonsProps {
  product: Product;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ product }) => {
  const { createShoppingListMutation, deleteItemMutation, shoppingListQuery } =
    ShoppingListHook();
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkCartStatus = useCallback(() => {
    const shoppingList = shoppingListQuery.data;
    const cartItem = shoppingList?.find(
      (item) => item.productId === product.productId
    );
    setIsInCart(!!cartItem);
    setCartItemId(cartItem?.id || null);
  }, [shoppingListQuery.data, product.productId]);

  useEffect(() => {
    checkCartStatus();
  }, [checkCartStatus]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setIsInCart(true); // Sofortige UI-Aktualisierung
    try {
      const result = await createShoppingListMutation.mutateAsync({
        productId: product.productId,
        quantity: 1,
        imageURL: product.imageURL,
        name: product.title,
        price: product.listing.currentRetailPrice,
      });
      setCartItemId(result.id); // Annahme: Die Mutation gibt das erstellte Objekt zurück
      toast.success(`${product.title} wurde zum Warenkorb hinzugefügt!`, {
        id: `add-to-cart-${product.productId}`,
      });
    } catch (err: any) {
      console.error(err);
      setIsInCart(false); // Zurücksetzen bei Fehler
      toast.error(err.message, {
        id: `add-to-cart-error-${product.productId}`,
      });
    } finally {
      setIsLoading(false);
      shoppingListQuery.refetch(); // Aktualisieren Sie die Daten im Hintergrund
    }
  };

  const handleRemoveFromCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cartItemId) {
      console.error("Cart item ID not found");
      return;
    }
    setIsLoading(true);
    setIsInCart(false); // Sofortige UI-Aktualisierung
    try {
      await deleteItemMutation.mutateAsync({ id: cartItemId } as any);
      setCartItemId(null);
      toast.success(`${product.title} wurde aus dem Warenkorb entfernt!`, {
        id: `remove-from-cart-${product.productId}`,
      });
    } catch (err: any) {
      console.error(err);
      setIsInCart(true); // Zurücksetzen bei Fehler
      toast.error(err.message, {
        id: `remove-from-cart-error-${product.productId}`,
      });
    } finally {
      setIsLoading(false);
      shoppingListQuery.refetch(); // Aktualisieren Sie die Daten im Hintergrund
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <Button
        className={`flex items-center ${
          isInCart
            ? "bg-red-700 hover:bg-red-800"
            : "bg-green-700 hover:bg-green-800"
        } text-white`}
        variant="outline"
        size="sm"
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : isInCart ? (
          <TrashIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
        <span className="ml-2">{isInCart ? "Löschen" : "Hinzufügen"}</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
