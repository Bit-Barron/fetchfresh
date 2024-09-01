import { useProductStore } from "@/store/ProductStore";
import { Product } from "@/types/product";
import { useState } from "react";
import { Toaster } from "sonner";
import { StoreHook } from "../../hooks/store-hook";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import ActionButtons from "./product-buttons";
import ProductDetails from "./product-details";
import ProductImage from "./product-image";
import ProductInfo from "./product-info";
import RecommendedProducts from "./product-recommendations";
import { Dialog, DialogContent } from "../../ui/dialog";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInCart,
  addToCart,
  removeFromCart,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { productDetailsMutation } = StoreHook();
  const { products } = useProductStore();
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  const handleProductClick = () => {
    productDetailsMutation
      .mutateAsync({ productId: product.productId } as any)
      .then((response) => setProductDetails(response));
    setIsDialogOpen(true);
  };

  return (
    <section className="overflow-auto hover:shadow-xl">
      <Toaster richColors position="top-right" />
      <Card
        key={product.articleId}
        className="over:duration-150 flex cursor-pointer flex-col rounded-3xl bg-white"
        onClick={handleProductClick}
      >
        <div className="ml-3 mt-3 text-sm">{product.productId}</div>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="w-full max-w-[200px] truncate text-sm font-medium">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col overflow-hidden">
          <ProductImage imageURL={product.imageURL} title={product.title} />
          <ProductInfo product={product} />
          <ActionButtons
            product={product}
            isInCart={isInCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] w-full max-w-[1400px] overflow-y-auto bg-white p-6 md:p-10">
          <ProductDetails
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
          />
          <RecommendedProducts
            products={products}
            currentProductId={product.productId}
            addToCart={addToCart}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductCard;
