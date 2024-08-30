export interface ShoppingListItem {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  userId?: string;
  description?: string;
}
