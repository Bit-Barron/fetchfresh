"use client";

import { toast, Toaster } from "sonner";
import React, { useMemo } from "react";
import { Trash2Icon, PlusIcon, MinusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";
import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";

interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageURL?: string;
}

interface ShoppingListItemProps {
  item: ShoppingItem;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onDelete: (id: string) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onUpdateQuantity,
  onDelete,
}) => {
  return (
    <Card className="w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {item.imageURL ? (
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600">
              Price: €{(item.price / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="text-gray-700 font-medium">{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(item.id)}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ShoppingList: React.FC = () => {
  const { shoppingListQuery, deleteItemMutation, updateItemQuantityMutation } =
    ShoppingListHook();

  const shoppingList = shoppingListQuery.data;

  const sortedShoppingList = useMemo(() => {
    if (!shoppingList) return [];
    return Object.values(shoppingList).sort((a, b) => a.id.localeCompare(b.id));
  }, [shoppingList]);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await updateItemQuantityMutation
        .mutateAsync({
          id,
          quantity: newQuantity,
        })
        .then(() => toast.success("Quantity updated!"));
      shoppingListQuery.refetch();
    } catch (error) {
      toast.error("Error updating quantity");
      console.error("Error updating quantity:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItemMutation.mutateAsync({ id } as any).then(() => {
        toast.success("Item deleted!");
      });
      shoppingListQuery.refetch();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (shoppingListQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (shoppingListQuery.isError) {
    return <div>Error loading shopping list</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <SettingsSidebar />
      <Toaster richColors position="top-right" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Einkaufsliste</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedShoppingList.map((item) => (
            <ShoppingListItem
              key={item.id}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDelete}
              item={item as ShoppingItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
