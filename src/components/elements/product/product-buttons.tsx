import React from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ActionButtonsProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  addToCart,
}) => {
  // Handle the button click for adding items to the cart
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1); // Add the product to the cart
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <Button
        className="flex items-center bg-green-700 hover:bg-green-800 text-white"
        variant="outline"
        size="sm"
        onClick={handleButtonClick}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="ml-2">Hinzufügen</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
