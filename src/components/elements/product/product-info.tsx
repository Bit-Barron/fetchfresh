import React from "react";
import { formatPrice } from "@/utils";
import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <>
    <div className="mt-2 truncate text-lg font-semibold">
      {formatPrice(product.listing.currentRetailPrice)}€
    </div>
    <div className="truncate text-sm">
      Bestellgrenze {product.orderLimit} Stück
    </div>
    <p className="text-muted-foreground text-sm">Viele verfügbar</p>
    <div className="truncate text-sm">
      {product.attributes.isBulkyGood ? "Sperriges Gut" : "Nicht sperrig"}
    </div>
  </>
);

export default ProductInfo;
