import { Type } from "@sinclair/typebox";

export const CreatePaymentIntentSchema = Type.Object({
  amount: Type.Number(),
  workerStripeAccountId: Type.String(),
  platformFeePercent: Type.Number(),
});

export const ConfirmOrderSchema = Type.Object({
  paymentIntentId: Type.String(),
  workerStripeAccountId: Type.String(),
  platformFeePercent: Type.Number(),
});
