import { useMutation } from "@tanstack/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";

export const usePasswordReset = () => {
  const requestPasswordReset = useMutation({
    mutationFn: async (email: string) =>
      handleEden(
        await rpc.api["password-reset"].request.post({ email } as any)
      ),
  });

  const resetPassword = useMutation({
    mutationFn: async ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) =>
      handleEden(
        await rpc.api["password-reset"].reset.post({
          token,
          newPassword,
        } as any)
      ),
  });

  return {
    requestPasswordReset,
    resetPassword,
  };
};
