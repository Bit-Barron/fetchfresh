import { Type } from "@sinclair/typebox";

const CartItem = Type.Object({
  productId: Type.String(),
  quantity: Type.Number(),
});

export const OrderBody = Type.Object({
  firstName: Type.String({ minLength: 1, maxLength: 100 }),
  lastName: Type.String({ minLength: 1, maxLength: 100 }),
  address: Type.String({ minLength: 1, maxLength: 200 }),
  city: Type.String({ minLength: 1, maxLength: 100 }),
  zipCode: Type.String({ minLength: 1, maxLength: 100 }),
  orderId: Type.String(),
  status: Type.String({ enum: ["PENDING", "COMPLETED", "CANCELLED"] }),
  totalAmount: Type.Number(),
  cart: Type.Optional(Type.Any(CartItem)),
  email: Type.String(),
  phoneNumber: Type.String(),
});

export const OrderStatusUpdateBody = Type.Object({
  orderId: Type.String(),
  status: Type.String({ enum: ["PENDING", "COMPLETED", "CANCELLED"] }),
});
