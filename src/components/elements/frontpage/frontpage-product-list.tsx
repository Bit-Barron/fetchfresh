import React from "react";
import ProductCard from "@/components/elements/product/productcard";
import { Product, Attributes } from "@/types/product";

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
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
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
