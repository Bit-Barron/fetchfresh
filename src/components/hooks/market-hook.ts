// Front-end: market-hook.ts
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation } from "@tanstack/react-query";

export const MarketHook = () => {
  const marketMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.markets.index.post>
    ) => handleEden(await rpc.api.markets.index.post(...args)),
  });

  return {
    marketMutation,
  };
};
