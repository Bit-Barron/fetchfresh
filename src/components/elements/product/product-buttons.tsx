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
  shoppingListMutation: any; // Replace 'any' with the actual type
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  isInCart,
  addToCart,
  removeFromCart,
  shoppingListMutation,
}) => {
  const handleAddToShoppingList = () => {
    try {
      shoppingListMutation.mutateAsync({
        name: product.title,
        price: parseFloat(formatPrice(product.listing.currentRetailPrice)),
        image: product.imageURL || "",
        quantity: 1,
        productId: "",
      });
      toast.success("Erfolgreich zur Einkaufsliste hinzugefügt");
    } catch (err) {
      toast.error("Fehler beim Hinzufügen zur Einkaufsliste");
      console.error(err);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <RiFileList2Fill
        onClick={(e) => {
          e.stopPropagation();
          handleAddToShoppingList();
        }}
        className="cursor-pointer text-2xl text-green-600 hover:rounded-full hover:text-green-900"
      />
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
