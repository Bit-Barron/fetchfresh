import { useMutation } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";

export const RecommendationHook = () => {
  const getRecommendationMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.recommendation.index.post>
    ) => handleEden(await rpc.api.recommendation.index.post(...args)),
  });

  return {
    getRecommendationMutation,
  };
};
