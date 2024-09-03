import React from "react";
import { formatPrice } from "@/utils";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Totals {
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  totals: Totals;
  orderCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  totals,
  orderCount,
}) => {
  return (
    <div className="bg-background rounded-lg p-8 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Bestellübersicht</h2>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <span>Anzahl der Bestellungen</span>
          <span>{orderCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Zwischensumme</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Versand</span>
          <span>{formatPrice(totals.shippingCost)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Rabatt</span>
          <span>-{formatPrice(totals.discount)}</span>
        </div>
        <div className="flex items-center justify-between font-bold">
          <span>Gesamt</span>
          <span>{formatPrice(totals.total)}</span>
        </div>
        <div className="grid gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
