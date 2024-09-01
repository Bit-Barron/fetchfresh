export interface ShoppingListItem {
  createdAt: Date;
  id: string;
  imageURL: string | null;
  name: string;
  productId: string;
  quantity: number;
  updatedAt: Date;
  userId: string;
}
