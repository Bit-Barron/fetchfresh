import { useMutation, useQuery } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useParams } from "next/navigation";

export const ShoppingListHook = () => {
  const params = useParams();

  const createShoppingListMutation = useMutation({
    mutationFn: async (data: { name: string; items: any[] }) =>
      handleEden(await rpc.api["shopping-list"]["index"].post(data)),
  });

  const getShoppingListsQuery = useQuery({
    queryKey: ["shoppingLists"],
    enabled: true,
    queryFn: async () =>
      handleEden(await rpc.api["shopping-list"]["index"].get()),
  });

  const addItemToShoppingListMutation = useMutation({
    mutationFn: async ({
      shoppingListId,
      item,
    }: {
      shoppingListId: string;
      item: {
        productId: string;
        name: string;
        quantity: number;
        imageURL?: string;
      };
    }) => {
      try {
        const response = await rpc.api["shopping-list"][
          shoppingListId
        ].items.post({
          item,
        } as any);
        return handleEden(response);
      } catch (error) {
        console.error("Add Item Mutation Error:", error);
        throw error;
      }
    },
  });

  const getShoppingListByIdQuery = useQuery({
    queryKey: ["shoppingList", params.shoppingListId],
    enabled: !!params.shoppingListId,
    queryFn: async () => {
      if (typeof params.shoppingListId !== "string")
        throw new Error("Invalid shopping list ID");
      return handleEden(
        await rpc.api["shopping-list"][params.shoppingListId].get()
      );
    },
  });

  return {
    addItemToShoppingListMutation,
    createShoppingListMutation,
    getShoppingListsQuery,
    getShoppingListByIdQuery,
  };
};
