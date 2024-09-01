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
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  addToCart,
}) => {
  const handleAddToCart = () => {
    addToCart(product, 1);
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
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold md:text-3xl mb-4">{product.title}</h2>
        <ProductSpecifications product={product} />
        <CustomerReviews />
        <div className="flex items-center gap-4 mt-6 mb-6">
          <div className="flex-grow flex justify-end">
            <Button
              size="lg"
              className="bg-green-700 text-white"
              onClick={handleAddToCart}
            >
              Zum Warenkorb hinzufügen
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
