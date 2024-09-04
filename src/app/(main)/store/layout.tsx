"use client";

import CartDialog from "@/components/elements/cartdialog";
import { useState } from "react";
import { StoreHook } from "@/components/hooks/store-hook";
import { useProductStore } from "../../../store/ProductStore";
import MenuDialog from "@/components/elements/menudialog";
import Searchbar from "@/components/elements/frontpage/frontpage-searchbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
        onShowMenu={() => setShowMenu(true)}
      />
      {showCart && <CartDialog onClose={() => setShowCart(false)} />}
      {showMenu && <MenuDialog onClose={() => setShowMenu(false)} />}
      {props.children}
    </section>
  );
}
