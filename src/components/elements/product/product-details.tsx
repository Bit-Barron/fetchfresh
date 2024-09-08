import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import CustomerReviews from "./product-reviews";
import ProductSpecifications from "./product-specifications";
import { formatPrice } from "@/utils";

interface ProductDetailsProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  addToCart,
}) => {
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.title} Erfolgreich zum Warenkorb hinzugefügt`);
  };

  const { title = "Unbekanntes Produkt", imageURL, listing } = product;

  const decodedTitle = decodeURIComponent(title || "Unbekanntes Produkt");
  const imageSrc = imageURL ? decodeURIComponent(imageURL) : "/placeholder.svg";

  const formattedPrice = formatPrice(listing?.currentRetailPrice || 0);

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div>
        <Image
          src={imageSrc}
          alt={decodedTitle}
          width={600}
          height={600}
          className="aspect-square w-full rounded-lg object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold md:text-3xl mb-4">{decodedTitle}</h2>

        <ProductSpecifications product={product} />

        <CustomerReviews />

        <div className="flex items-center gap-4 mt-6 mb-6">
          <div className="flex-grow flex justify-end">
            <Button
              size="lg"
              className="bg-green-700 text-white hover:bg-green-800"
              onClick={handleAddToCart}
            >
              Zum Warenkorb hinzufügen
            </Button>
          </div>
        </div>

        <div className="flex justify-end text-lg font-semibold">
          {listing?.grammage} - {formattedPrice} €
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
