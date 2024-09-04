"use client";

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

  const deleteItemMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<
        (typeof rpc.api)["shopping-list"]["products"]["delete"]
      >
    ) =>
      handleEden(await rpc.api["shopping-list"]["products"]["delete"](...args)),
  });
  const updateItemQuantityMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<
        (typeof rpc.api)["shopping-list"]["update-quantity"]["put"]
      >
    ) =>
      handleEden(
        await rpc.api["shopping-list"]["update-quantity"]["put"](...args)
      ),
  });

  return {
    updateItemQuantityMutation,
    deleteItemMutation,
    createShoppingListMutation,
    shoppingListQuery,
  };
};
