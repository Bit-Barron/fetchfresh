import { useMutation, useQuery } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useParams } from "next/navigation";

export const OrderHook = () => {
  const params = useParams();

  const orderMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.orders.post>) =>
      handleEden(await rpc.api.orders.post(...args)),
  });

  const getOrderQuery = useQuery({
    queryKey: ["order"],
    enabled: true,
    queryFn: async () => handleEden(await rpc.api.orders.get()),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: string;
    }) => {
      try {
        const response = await rpc.api.orders.patch({ orderId, status });

        return response;
      } catch (error) {
        console.error("Mutation Error:", error);
        throw error;
      }
    },
  });

  const getOrderByIdQuery = useQuery({
    queryKey: ["order", params.orderId],
    enabled: true,
    queryFn: async () => {
      if (typeof params.orderId !== "string") throw new Error("Error");
      return handleEden(await rpc.api.orders[params.orderId].get());
    },
  });

  return {
    orderMutation,
    getOrderQuery,
    getOrderByIdQuery,
    updateStatusMutation,
  };
};
