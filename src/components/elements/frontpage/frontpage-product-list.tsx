import ProductCard from "@/components/elements/product/productcard";
import { Attributes, Product } from "@/types/product";
import React from "react";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  filterAttribute: keyof Attributes | null;
  attributeFilter: keyof Attributes | null;
  isInCart: (id: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  filterAttribute,
  attributeFilter,
  addToCart,
  removeFromCart,
}) => {
  const getFilteredProducts = () => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }

    return products.filter((product: Product) => {
      if (filterAttribute && !product.attributes[filterAttribute]) {
        return false;
      }
      if (attributeFilter && !product.attributes[attributeFilter]) {
        return false;
      }
      return true;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Produkte Laden...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {getFilteredProducts().map((product: Product) => (
        <ProductCard
          key={product.productId}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
