// src/hooks/store-hook.ts
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

export const StoreHook = () => {
  const productMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.store.products.post>
    ) => handleEden(await rpc.api.store.products.post(...args)),
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    enabled: true,
    queryFn: async () => handleEden(await rpc.api.store.categories.get()),
  });

  return {
    productMutation,
    categoryQuery,
  };
};
