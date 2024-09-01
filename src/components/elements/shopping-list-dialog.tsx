import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingListHook } from "../hooks/shopping-list-hook";

interface ShoppingListDialogProps {
  onClose: () => void;
  onCreate: (listId: string) => void;
}

const ShoppingListDialog: React.FC<ShoppingListDialogProps> = ({
  onClose,
  onCreate,
}) => {
  const { createShoppingListMutation } = ShoppingListHook();
  const [listName, setListName] = useState("");

  const handleCreateShoppingList = async () => {
    if (listName.trim() !== "") {
      try {
        const result: any = await createShoppingListMutation.mutateAsync({
          name: listName,
          items: [],
        });
        onCreate(result?.id);
        onClose();
      } catch (error) {
        console.error("Failed to create shopping list:", error);
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[400px] p-6 bg-white">
        <h1 className="text-xl font-bold">Neue Einkaufsliste</h1>
        <Input
          placeholder="Name der Einkaufsliste"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="mt-4"
        />
        <Button
          onClick={handleCreateShoppingList}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Einkaufsliste erstellen
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingListDialog;
