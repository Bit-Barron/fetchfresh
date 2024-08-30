import { useMutation, useQuery } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";

export const UserHook = () => {
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => handleEden(await rpc.api.user.me.get()),
  });

  const updateUser = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.user.update.post>
    ) => handleEden(await rpc.api.user.update.post(...args)),
  });

  return {
    meQuery,
    updateUser,
  };
};
