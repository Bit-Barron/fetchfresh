import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import CustomerReviews from "./product-reviews";
import ProductSpecifications from "./product-specifications";
import { formatPrice } from "@/utils";

interface ProductDetailsProps {
  product: any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  setQuantity,
  addToCart,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= product.orderLimit) {
      setQuantity(value);
    } else {
      // Optional: Provide feedback if quantity exceeds limit
      if (value > product.orderLimit) {
        toast.error(`Maximale Menge ist ${product.orderLimit}`);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Erfolgreich zum Warenkorb hinzugefügt");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div>
        {product.imageURL ? (
          <Image
            src={product.imageURL}
            alt={product.name}
            width={200}
            height={200}
            className="mb-4 rounded-lg"
          />
        ) : (
          <div className="bg-gray-200 w-40 h-40 mb-4 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold md:text-3xl mb-4">{product.title}</h2>
        <ProductSpecifications product={product} />
        <CustomerReviews />
        <div className="flex items-center gap-4 mt-6 mb-6">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={product.orderLimit}
            className="w-20 rounded border border-gray-300 p-2 text-center"
          />
          <div className="flex-grow flex justify-end">
            <Button
              size="lg"
              className="bg-green-700 text-white"
              onClick={handleAddToCart}
            >
              {quantity} zum Warenkorb hinzufügen
            </Button>
          </div>
        </div>
        <div className="flex justify-end  text-lg font-semibold">
          {product.listing.grammage} -{" "}
          {formatPrice(product.listing.currentRetailPrice.toFixed(2))} €
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
