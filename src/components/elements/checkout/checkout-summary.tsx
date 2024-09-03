import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils";
import SummaryItem from "./checkout-summary-item";
import { CartItem } from "@/types";

export const OrderSummary = (
  { cart }: { cart: CartItem[] },
  totals: { subtotal: number; shippingCost: any; total: number }
) => (
  <div className="bg-background rounded-lg p-8 shadow-lg">
    <h2 className="mb-4 text-xl font-bold">Bestellübersicht</h2>
    <div className="grid gap-4">
      <SummaryItem label="Zwischensumme" value={formatPrice(totals.subtotal)} />
      <SummaryItem label="Versand" value={`${totals.shippingCost}€`} />
      <Separator />
      <SummaryItem label="Gesamt" value={formatPrice(totals.total)} isBold />
      <Separator />
      <div className="grid gap-2">
        {cart.map((item) => (
          <SummaryItem
            key={item.id}
            label={`${item.quantity}x ${item.name}`}
            value={formatPrice(item.price * item.quantity)}
          />
        ))}
      </div>
    </div>
  </div>
);
