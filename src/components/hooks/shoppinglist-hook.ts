import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ShoppingListHook = () => {
  const shoppingListMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.shoppinglist.create.post>
    ) => handleEden(await rpc.api.shoppinglist.create.post(...args)),
  });

  const shoppingListDeleteMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.shoppinglist.delete[":id"]["delete"]>
    ) => handleEden(await rpc.api.shoppinglist.delete[":id"]["delete"](...args)),
  });

  const shoppingListQuery = useQuery({
    queryKey: ["shoppinglist"],
    enabled: true,
    queryFn: async () => handleEden(await rpc.api.shoppinglist.all.get()),
  });

  return {
    shoppingListDeleteMutation,
    shoppingListMutation,
    shoppingListQuery,
  };
};
