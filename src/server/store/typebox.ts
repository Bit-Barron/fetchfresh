import { Type, Static } from "@sinclair/typebox";

export const GetProductsRequestSchema = Type.Object({
  category: Type.Optional(Type.Any()),
  page: Type.Optional(Type.Any()),
  sorting: Type.Optional(Type.Any()),
  filter: Type.Optional(Type.String()),
});

export const GetProductsResponseSchema = Type.Object({
  data: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      category: Type.String(),
      price: Type.Number(),
    })
  ),
});

export const GetCategoriesResponseSchema = Type.Object({
  categories: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      slug: Type.String(),
    })
  ),
});

export const ProductDetailsSchema = Type.Object({
  productId: Type.String(),
});
