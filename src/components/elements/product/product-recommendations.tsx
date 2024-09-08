import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { formatPrice } from "@/utils";
import { Product } from "@/types/product";
import { ShoppingCartIcon } from "lucide-react";

interface RecommendedProductsProps {
  products: Product[];
  currentProductId: string;
  addToCart: (product: Product, quantity: number) => void;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  products,
  currentProductId,
  addToCart,
}) => (
  <div className="container mx-auto px-4">
    <h3 className="text-lg font-semibold md:text-xl mb-6">
      Empfohlene Produkte
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products
        .filter((item) => item.productId !== currentProductId)
        .slice(0, 20)
        .map((item) => {
          const imageSrc = item.imageURL
            ? decodeURIComponent(item.imageURL)
            : "/placeholder.svg";

          console.log("src",imageSrc);

          return (
            <div
              key={item.productId}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={imageSrc}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <h4 className="text-md font-semibold mb-2 truncate">
                  {item.title}
                </h4>
                <p className="text-lg font-semibold mb-4">
                  {formatPrice(item.listing.currentRetailPrice)}€
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success("Erfolgreich zum Warenkorb hinzugefügt");
                    addToCart(item, 1);
                  }}
                  className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  In den Warenkorb
                </button>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

export default RecommendedProducts;
