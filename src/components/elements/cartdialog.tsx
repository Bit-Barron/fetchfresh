import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/utils";
import { MinusIcon, PlusIcon, XIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingListHook } from "../hooks/shopping-list-hook";

interface CartDialogProps {
  onClose: () => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ onClose }) => {
  const router = useRouter();
  const { shoppingListQuery, deleteItemMutation, updateItemQuantityMutation } =
    ShoppingListHook();

  const [localShoppingList, setLocalShoppingList] = React.useState(
    shoppingListQuery.data || []
  );

  React.useEffect(() => {
    if (shoppingListQuery.data) {
      setLocalShoppingList((prevList) => {
        return shoppingListQuery.data.map((newItem) => {
          const existingItem = prevList.find((item) => item.id === newItem.id);
          return existingItem || newItem;
        });
      });
    }
  }, [shoppingListQuery.data]);

  const total = localShoppingList.reduce((acc, item) => {
    return acc + (item.price as number) * item.quantity;
  }, 0);

  const deleteItem = async (id: string) => {
    try {
      await deleteItemMutation.mutateAsync({ id } as any);
      setLocalShoppingList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    shoppingListQuery.refetch();
  };

  const updateItemQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity > 0) {
        await updateItemQuantityMutation.mutateAsync({ id, quantity } as any);
        setLocalShoppingList((prevList) =>
          prevList.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      } else {
        await deleteItem(id);
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
    shoppingListQuery.refetch();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-[800px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <DialogTitle className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2" /> Warenkorb
        </DialogTitle>

        <div className="grid gap-4">
          {localShoppingList.map(
            (item) =>
              item.quantity > 0 && (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <Image
                    src={item.imageURL ? decodeURIComponent(item.imageURL) : ""} // Decode the image URL here
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    unoptimized // Disable Next.js image optimization
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-green-600 font-medium">
                      {formatPrice(item.price as number)}€
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteItem(item.id)}
                    >
                      <XIcon className="h-5 w-4" />
                    </Button>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mt-4">
          <p className="text-lg font-medium">Total: {formatPrice(total)}€</p>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Weiter einkaufen
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              onClose();
              router.push("/store/checkout");
            }}
          >
            Weiter zur Kasse
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
