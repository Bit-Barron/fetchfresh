import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";

export const WishListHook = () => {
  const createWishListMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api)["wish-list"]["index"]["post"]>
    ) => handleEden(await rpc.api["wish-list"]["index"]["post"](...args)),
  });

  const wishListQuery = useQuery({
    queryKey: ["wish-list"],
    queryFn: async () =>
      handleEden(await rpc.api["wish-list"]["index"]["get"]()),
  });

  const deleteWishListMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api)["wish-list"]["index"]["delete"]>
    ) => handleEden(await rpc.api["wish-list"]["index"]["delete"](...args)),
  });

  return {
    deleteWishListMutation,
    wishListQuery,
    createWishListMutation,
  };
};
