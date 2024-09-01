import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import CustomerReviews from "./product-reviews";
import ProductSpecifications from "./product-specifications";

interface ProductDetailsProps {
  product: any;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (product: Product, quantity: number) => void;
  productInfo: { title: string; content: string };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  quantity,
  setQuantity,
  addToCart,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= product.orderLimit) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Erfolgreich zum Warenkorb hinzugefügt");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div>
        <Image
          src={product.imageURL || "/placeholder.svg"}
          alt={product.title}
          width={600}
          height={600}
          className="aspect-square w-full rounded-lg object-cover"
        />
      </div>
      <div className="">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">{product.title}</h2>
        </div>
        <ProductSpecifications product={product} />
        <CustomerReviews />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={product.orderLimit}
            className="w-16 rounded border border-gray-300 p-2"
          />
          <div className="flex flex-grow justify-end mt-10">
            <Button
              size="lg"
              className="bg-green-700 text-white"
              onClick={handleAddToCart}
            >
              {quantity} zum Warenkorb hinzufügen
            </Button>
          </div>
        </div>
        {/* <ProductSmallInfo /> */}
      </div>
    </div>
  );
};

export default ProductDetails;
