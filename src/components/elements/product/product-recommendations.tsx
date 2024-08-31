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
  <div className="">
    <h3 className="text-lg font-semibold md:text-xl">Empfohlene Produkte</h3>
    <div className="mx-auto mt-6 grid grid-cols-6 gap-4">
      {products
        .filter((item) => item.productId !== currentProductId)
        .slice(0, 20)
        .map((item) => (
          <div key={item.productId} className="flex flex-col items-center">
            <Image
              src={item.imageURL}
              alt={item.title}
              width={100}
              height={100}
            />
            <div className="mt-2 text-center text-sm font-medium">
              {item.title}
            </div>
            <div className="mt-1 text-center text-lg font-semibold">
              {formatPrice(item.listing.currentRetailPrice)}€
            </div>
            <ShoppingCartIcon
              className="flex cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toast.success("Erfolgreich zum Warenkorb hinzugefügt");
                addToCart(item, 1);
              }}
            />
          </div>
        ))}
    </div>
  </div>
);

export default RecommendedProducts;
