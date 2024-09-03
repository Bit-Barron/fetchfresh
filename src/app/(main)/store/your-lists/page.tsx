import React from "react";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { Product } from "@/types/product";
import { useShoppingListStore } from "@/store/ShoppingListStore";

interface ShoppingListItemProps {
  item: Product;
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item }) => {
  const { removeFromList, addToCart } = useShoppingListStore();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      {item.imageURL ? (
        <Image
          src={item.imageURL}
          alt={item.name}
          width={200}
          height={200}
          className="mb-4 rounded-lg"
        />
      ) : (
        <div className="bg-gray-200 w-40 h-40 mb-4 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
      <p className="text-gray-600">{item.price}</p>
      <p className="text-gray-600">{item.quantity} stk</p>

      <button
        onClick={() => addToCart(item)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Hinzufügen
      </button>
      <button
        onClick={() => removeFromList(item.id)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        <Trash2Icon />
      </button>
    </div>
  );
};
