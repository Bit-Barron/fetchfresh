import { useMutation, useQuery } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useParams } from "next/navigation";

export const ShoppingListHook = () => {
  const params = useParams();

  const createShoppingListMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api)["shopping-list"]["index"]["post"]>
    ) => handleEden(await rpc.api["shopping-list"]["index"]["post"](...args)),
  });

  const shoppingListQuery = useQuery({
    queryKey: ["shopping-list", params],
    queryFn: async () =>
      handleEden(await rpc.api["shopping-list"]["index"]["get"]()),
  });

  return {
    createShoppingListMutation,
    shoppingListQuery,
  };
};
