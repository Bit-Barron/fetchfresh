import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { toast } from "sonner";

interface ActionButtonsProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  addToCart,
}) => {
  const { shoppingListQuery, deleteItemMutation } = ShoppingListHook();
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  useEffect(() => {
    const cartItem = shoppingListQuery.data?.find(
      (item) => item.productId === product.productId
    );
    setIsInCart(!!cartItem);
    setCartItemId(cartItem?.id || null);
  }, [shoppingListQuery.data, product.productId]);

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart && cartItemId) {
      try {
        await deleteItemMutation.mutateAsync({ id: cartItemId } as any);
        setIsInCart(false);
        setCartItemId(null);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      addToCart(product, 1);
      setIsInCart(true);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <Button
        className={`flex items-center ${
          isInCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-700 hover:bg-green-800"
        } text-white`}
        variant="outline"
        size="sm"
        onClick={handleButtonClick}
      >
        {isInCart ? (
          <>
            <TrashIcon className="h-4 w-4" />
            <span className="ml-2">Entfernen</span>
          </>
        ) : (
          <div className="flex items-center">
            <PlusIcon className="h-4 w-4" />
            <span className="ml-2">Hinzufügen</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
