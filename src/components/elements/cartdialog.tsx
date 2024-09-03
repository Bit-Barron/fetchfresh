import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CartItem } from "@/types";
import { formatPrice } from "@/utils";
import { Separator } from "@radix-ui/react-select";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartDialogProps {
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateItemQuantity: (id: number, amount: number) => void;
  calculateTotal: () => string;
}

const CartDialog: React.FC<CartDialogProps> = ({
  cart,
  onClose,
  onRemoveItem,
  onUpdateItemQuantity,
  calculateTotal,
}) => {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTitle className="text-2xl font-bold"></DialogTitle>
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[100px_1fr_100px] items-center gap-4"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">
                  {formatPrice(item.price)}€
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onUpdateItemQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onUpdateItemQuantity(item.id, 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Gesamt:</p>
          <p className="text-2xl font-bold">
            {formatPrice(calculateTotal() as unknown as number)}€
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Weiter einkaufen
          </Button>
          <Button
            className="rounded-xl bg-green-700 text-white"
            onClick={() => {
              onClose();
              router.push("/store/checkout");
            }}
          >
            Zur Kasse gehen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
