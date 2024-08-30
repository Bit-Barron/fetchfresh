export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  childCategories: ChildCategory[];
}

export interface ChildCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  childCategories: ChildCategory2[];
}

export interface ChildCategory2 {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItems {
  id: string; // Ändern Sie dies von number zu string
  name: string;
  price: number;
  image: string;
  quantity: number;
}
