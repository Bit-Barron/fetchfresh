import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";

interface ActionButtonsProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  addToCart,
  removeFromCart,
}) => {
  const { shoppingListQuery } = ShoppingListHook();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const products = shoppingListQuery?.data?.map((item) => item.productId);
    setIsInCart(products?.includes(product.productId) as any);
  }, [shoppingListQuery?.data, product.productId]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.productId as unknown as number);
    } else {
      addToCart(product, 1);
    }
    setIsInCart(!isInCart);
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
