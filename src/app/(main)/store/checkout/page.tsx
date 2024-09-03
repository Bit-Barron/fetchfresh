"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { OrderHook } from "@/components/hooks/order-hook";
import { CartStore } from "../../../../store/CartStore";
import { UserHook } from "@/components/hooks/user-hook";
import { formatPrice } from "@/utils";
import OrderSummary from "@/components/elements/account/order-summary";
import { CheckoutForm } from "@/components/elements/checkout/checkout-form";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
  });
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const { orderMutation } = OrderHook();
  const { cart } = CartStore();
  const { meQuery } = UserHook();
  const router = useRouter();

  useEffect(() => {
    if (meQuery.data && useSavedAddress) {
      setFormData({
        firstName: meQuery.data.firstName || "",
        lastName: meQuery.data.lastName || "",
        address: meQuery.data.address || "",
        city: meQuery.data.city || "",
        zipCode: meQuery.data.zipCode || "",
        phoneNumber: meQuery.data.phoneNumber || "",
        email: meQuery.data.email || "",
      });
    } else if (!useSavedAddress) {
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
      });
    }
    setIsHydrated(true);
  }, [meQuery.data, useSavedAddress]);

  if (!isHydrated) {
    return null;
  }

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    const shippingCost = 5.0;
    const discount = 10.0;
    const total = subtotal + shippingCost - discount;
    return { subtotal, shippingCost, discount, total };
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { total } = calculateTotals();
    const calculatedTotalAmount = parseFloat(formatPrice(total));

    try {
      await orderMutation.mutateAsync({
        ...formData,
        cart: cart.map((item: CartItem) => ({
          productId: item.id,
          quantity: item.quantity,
          name: item.name,
          image: item.image,
          price: item.price,
        })),
        orderId: "",
        status: "PENDING",
        totalAmount: calculatedTotalAmount,
      });

      router.push("/store/account/orders");
      toast.success("Bestellung erfolgreich aufgegeben");
    } catch (error) {
      toast.error("Bitte alle Felder ausfüllen");
      console.error("Fehler bei der Bestellung:", error);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Toaster richColors position="top-right" />
      <form
        onSubmit={onSubmit}
        className="flex-1 bg-[#F7F7F7] px-4 py-8 sm:px-6 md:py-12"
      >
        <main className="grid flex-1 grid-cols-1 gap-8 p-8 md:grid-cols-[3fr_1fr]">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            useSavedAddress={useSavedAddress}
            setUseSavedAddress={setUseSavedAddress}
          />
          <OrderSummary cart={cart} totals={totals} orderCount={0} />
        </main>
      </form>
    </div>
  );
}
