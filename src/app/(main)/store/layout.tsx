"use client";

import { CartStore } from "../../../store/CartStore";
import CartDialog from "@/components/elements/cartdialog";
import { useState } from "react";
import Searchbar from "@/components/elements/searchbar";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../../store/ProductStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { cart, removeItemFromCart, updateItemQuantity, calculateTotal } =
    CartStore();
  const [showCart, setShowCart] = useState<boolean>(false);

  const { setProducts } = useProductStore();

  const { productMutation } = StoreHook();
  const fetchProducts = (query: string) => {
    productMutation
      .mutateAsync({
        query,
      } as any)
      .then((response) => {
        const productsData = response.data.products;
        setProducts(productsData.products);
      })
      .catch((error) => console.error(error));
  };

  return (
    <section>
      <Searchbar
        onSearch={(query) => fetchProducts(query)}
        onShowCart={() => setShowCart(true)}
      />
      {showCart && (
        <CartDialog
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemoveItem={removeItemFromCart}
          onUpdateItemQuantity={updateItemQuantity}
          calculateTotal={calculateTotal}
        />
      )}
      {props.children}
    </section>
  );
}
