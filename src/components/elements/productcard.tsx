import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { RiFileList2Fill } from "react-icons/ri";
import { Product } from "@/types/product";
import Image from "next/image";
import { ShoppingListHook } from "../hooks/shoppinglist-hook";
import { Toaster, toast } from "sonner";
import { formatPrice } from "@/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useProductStore } from "../../store/ProductStore";

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
  const { shoppingListMutation } = ShoppingListHook();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { products } = useProductStore();

  const createShoppingList = () => {
    try {
      shoppingListMutation.mutateAsync({
        name: product.title,
        price: parseFloat(formatPrice(product.listing.currentRetailPrice)),
        image: product.imageURL || "",
        quantity: quantity,
        productId: "",
      });
      toast.success("Erfolgreich zur Einkaufsliste hinzugefügt");
    } catch (err) {
      toast.error("Fehler beim Hinzufügen zur Einkaufsliste");
      console.error(err);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= product.orderLimit) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Erfolgreich zum Warenkorb hinzugefügt");
    handleCloseDialog();
  };

  return (
    <section className="overflow-auto hover:shadow-xl">
      <Toaster richColors position="top-right" />
      <Card
        key={product.articleId}
        className="over:duration-150 flex cursor-pointer flex-col rounded-3xl bg-white"
        onClick={handleOpenDialog}
      >
        <div className="ml-3 mt-3 text-sm">{product.productId}</div>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="w-full max-w-[200px] truncate text-sm font-medium">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col overflow-hidden">
          {product.imageURL ? (
            <div className="lg:64 relative h-32 w-full overflow-hidden md:h-64">
              <Image
                src={product.imageURL}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-200 text-gray-600">
              Kein Bild verfügbar
            </div>
          )}

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
          <div className="mt-3 flex items-center justify-between">
            <RiFileList2Fill
              onClick={(e) => {
                e.stopPropagation();
                createShoppingList();
              }}
              className="cursor-pointer text-2xl text-green-600 hover:rounded-full hover:text-green-900"
            />
            <Button
              className={`flex items-center ${
                isInCart ? "bg-red-500 text-white" : "bg-green-700 text-white"
              }`}
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Verhindert das Öffnen des Dialogs beim Klicken auf diesen Button
                isInCart
                  ? removeFromCart(product.articleId as unknown as number)
                  : addToCart(product, quantity);
              }}
            >
              {isInCart ? (
                <>
                  <TrashIcon className="h-4 w-4" />
                  <span className="ml-2">Entfernen</span>
                </>
              ) : (
                <div className="flex items-center">
                  <PlusIcon className="h-4 w-4" />
                  <span className="ml-2">Hinzufügen</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-h-[90vh] w-full max-w-[1400px] overflow-y-auto bg-white p-6 md:p-10">
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
            <div className="grid gap-4 md:gap-6">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  {product.title}
                </h2>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold md:text-xl">
                  Spezifikationen
                </h3>
                <ul className="text-muted-foreground grid gap-1">
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isOrganic ? "Bio" : "Nicht Bio"}
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isVegan ? "Vegan" : "Nicht Vegan"}
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isVegetarian
                      ? "Vegetarisch"
                      : "Nicht Vegetarisch"}
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isDairyFree
                      ? "Lactosefrei"
                      : "Enthält Milch"}
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isGlutenFree
                      ? "Glutenfrei"
                      : "Enthält Gluten"}
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline h-4 w-4" />
                    {product.attributes.isRegional
                      ? "Regional"
                      : "Nicht Regional"}
                  </li>
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold md:text-xl">
                  Kundenbewertungen
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="fill-primary h-5 w-5" />
                        <span className="text-sm">4.5</span>
                      </div>
                    </div>
                    <p className="text-sm">Tolles Produkt!</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.orderLimit}
                  className="w-16 rounded border border-gray-300 p-2"
                />
                <div className="flex flex-grow justify-end">
                  <Button
                    size="lg"
                    className="bg-green-600 text-white"
                    onClick={handleAddToCart}
                  >
                    {quantity} zum Warenkorb hinzufügen
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold md:text-xl">
              Empfohlene Produkte
            </h3>
            <div className="mx-auto mt-6 grid grid-cols-6 gap-4">
              {products
                .filter((item) => item.productId !== product.productId)
                .slice(0, 20)
                .map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col items-center"
                  >
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
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductCard;
