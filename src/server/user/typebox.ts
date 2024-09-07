import { Type } from "@sinclair/typebox";
import { Static } from "@sinclair/typebox";

export const UpdateUserSchema = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 20 }),
  password: Type.Optional(Type.String({ minLength: 0, maxLength: 50 })),
  firstName: Type.Optional(Type.String({ minLength: 1, maxLength: 30 })),
  lastName: Type.Optional(Type.String({ minLength: 1, maxLength: 30 })),
  address: Type.Optional(Type.String({ minLength: 1, maxLength: 100 })),
  zipCode: Type.Optional(Type.String({ minLength: 1, maxLength: 10 })),
  city: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
  phoneNumber: Type.Optional(Type.String({ minLength: 1, maxLength: 15 })),
  email: Type.Optional(Type.String({ minLength: 1, maxLength: 50 })),
});

type UpdateUserBody = Static<typeof UpdateUserSchema>;
