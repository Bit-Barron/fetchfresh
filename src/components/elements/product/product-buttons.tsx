import React from "react";
import { toast } from "sonner";
import { formatPrice } from "@/utils";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { RiFileList2Fill } from "react-icons/ri";

interface ActionButtonsProps {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  isInCart,
  addToCart,
  removeFromCart,
}) => {
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
            ? removeFromCart(product.articleId as unknown as number)
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
            <span className="ml-2">Hinzufügen</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
