import React from "react";
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
  const [isInCart, setIsInCart] = React.useState(false);
  const products = shoppingListQuery?.data?.map((product) => {
    return product.productId;
  });
  const handleProduct = (product: string) => {
    if (products?.includes(product)) {
      setIsInCart(true);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <Button
        className={`flex items-center ${
          isInCart ? "bg-red-500 text-white" : "bg-green-700 text-white"
        }`}
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          isInCart
            ? removeFromCart(product?.productId as unknown as number)
            : addToCart(product, 1);
        }}
      >
        {isInCart ? (
          <>
            <TrashIcon className="h-4 w-4" />
            <span className="ml-2">Entfernen</span>
          </>
        ) : (
          <div className="flex items-center">
            <PlusIcon className="h-4 w-4" />
            <span
              className="ml-2"
              onClick={() => handleProduct(product?.productId)}
            >
              Hinzufügen
            </span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
