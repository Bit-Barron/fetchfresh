// Front-end: market-hook.ts
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useQuery } from "@tanstack/react-query";

export const MarketHook = () => {
  const marketQuery = useQuery({
    queryKey: ["markets"],
    enabled: true,
    queryFn: async () => handleEden(await rpc.api["markets"]["index"]["get"]()),
  });

  return {
    marketQuery,
  };
};
