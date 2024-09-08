import { Type as t, type Static } from "@sinclair/typebox/type";

/**
 * TypeBox schema Can be used for elysia body params or query schema and in frontend form validation.
 */
export const registerUser = t.Object({
  username: t.String({ minLength: 1, maxLength: 128 }),
  password: t.String({ minLength: 1, maxLength: 128 }),
  email: t.String({ minLength: 1, maxLength: 128 }),
  test: t.Optional(t.String({ minLength: 1, maxLength: 128 })),
  confirmPassword: t.String({ minLength: 1, maxLength: 128 }),
});


export const loginUser = t.Object({
  username: t.String({ minLength: 1, maxLength: 128 }),
  password: t.String({ minLength: 1, maxLength: 128 }),
});


/**
 * TypeScript type
 *  derived from the authUser schema.
 */
export type RegisterUser = Static<typeof registerUser>;
export type Loginuser = Static<typeof loginUser>;
