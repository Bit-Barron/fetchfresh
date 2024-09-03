import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CartItem } from "@/types";
import { formatPrice } from "@/utils";
import { Separator } from "@radix-ui/react-select";
import { MinusIcon, PlusIcon, XIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingListHook } from "../hooks/shopping-list-hook";

interface CartDialogProps {
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItemQuantity: (id: string, amount: number) => void;
  calculateTotal: () => string;
}

const CartDialog: React.FC<CartDialogProps> = ({
  cart,
  onClose,
  onRemoveItem,
  onUpdateItemQuantity,
  calculateTotal,
}) => {
  const router = useRouter();
  const { shoppingListQuery, addToListMutation, deleteShoppingListMutation } =
    ShoppingListHook();
  const [stableShoppingList, setStableShoppingList] = useState<any[]>([]);

  useEffect(() => {
    if (shoppingListQuery.data) {
      setStableShoppingList(shoppingListQuery.data);
    }
  }, [shoppingListQuery.data]);

  const handleUpdateShoppingListItem = async (
    item: { id: any; productId: any; name: any; price: any; imageURL: any },
    amount: number
  ) => {
    setStableShoppingList((prevList) =>
      prevList.map((listItem) =>
        listItem.id === item.id
          ? { ...listItem, quantity: Math.max(0, listItem.quantity + amount) }
          : listItem
      )
    );

    try {
      await addToListMutation.mutateAsync({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: amount,
        imageURL: item.imageURL,
      });
    } catch (error) {
      setStableShoppingList((prevList) =>
        prevList.map((listItem) =>
          listItem.id === item.id
            ? { ...listItem, quantity: listItem.quantity - amount }
            : listItem
        )
      );
    }
  };

  const handleRemoveShoppingListItem = async (id: any) => {
    const removedItem = stableShoppingList.find((item) => item.id === id);
    setStableShoppingList((prevList) =>
      prevList.filter((item) => item.id !== id)
    );

    try {
      await deleteShoppingListMutation.mutateAsync({ id });
    } catch (error) {
      setStableShoppingList((prevList) => [...prevList, removedItem]);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-[800px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <DialogTitle className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2" /> Shopping Cart
        </DialogTitle>

        <div className="grid gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-green-600 font-medium">
                  {formatPrice(item.price)}€
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    onUpdateItemQuantity(item.id as unknown as string, -1)
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
                    onUpdateItemQuantity(item.id as unknown as string, 1)
                  }
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveItem(item.id as unknown as string)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-2xl font-bold text-green-600">
            {formatPrice(calculateTotal() as unknown as number)}€
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Shopping List</h3>
        <div className="grid gap-4">
          {stableShoppingList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={item.imageURL || "/placeholder-image.jpg"}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
              />
              <div className="flex-grow">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-green-600">
                  {formatPrice(item.price as unknown as number)}€
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateShoppingListItem(item, -1)}
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
                  onClick={() => handleUpdateShoppingListItem(item, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveShoppingListItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Continue Shopping
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              onClose();
              router.push("/store/checkout");
            }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
