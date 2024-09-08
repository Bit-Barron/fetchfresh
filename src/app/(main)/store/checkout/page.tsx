"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { OrderHook } from "@/components/hooks/order-hook";
import { UserHook } from "@/components/hooks/user-hook";
import { formatPrice } from "@/utils";
import { CheckoutForm } from "@/components/elements/checkout/checkout-form";
import { useCheckoutStore } from "@/store/CheckoutStore";
import OrderSummary from "@/components/elements/account/account-order-summary";
import { ShoppingListHook } from "@/components/hooks/shopping-list-hook";

export default function Checkout() {
  const {
    formData,
    useSavedAddress,
    isHydrated,
    setFormData,
    setUseSavedAddress,
    setIsHydrated,
    resetFormData,
    populateFormWithUserData,
  } = useCheckoutStore();
  const { shoppingListQuery } = ShoppingListHook();

  const { orderMutation } = OrderHook();
  const { meQuery } = UserHook();
  const router = useRouter();
  const cart = shoppingListQuery.data || [];

  useEffect(() => {
    if (meQuery.data && useSavedAddress) {
      populateFormWithUserData(meQuery.data);
    } else if (!useSavedAddress) {
      resetFormData();
    }
    setIsHydrated(true);
  }, [
    meQuery.data,
    useSavedAddress,
    populateFormWithUserData,
    resetFormData,
    setIsHydrated,
  ]);

  const calculateTotals = () => {
    const subtotal: any = cart.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
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
      await placeOrder(calculatedTotalAmount);
      router.push("/store/account/orders");
      toast.success("Bestellung erfolgreich aufgegeben");
    } catch (error) {
      toast.error("Bitte alle Felder ausfüllen");
      console.error("Fehler bei der Bestellung:", error);
    }
  };

  const placeOrder = async (totalAmount: number) => {
    return orderMutation.mutateAsync({
      ...formData,
      cart: cart.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
        name: item.name,
        image: item.imageURL,
        price: item.price,
      })),
      orderId: "",
      status: "PENDING",
      totalAmount,
    });
  };

  if (!isHydrated) {
    return null;
  }

  const totals = calculateTotals();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Toaster richColors position="top-right" />
      <form
        onSubmit={onSubmit}
        className="flex-1 bg-[#F7F7F7] px-4 py-8 sm:px-6 md:py-12"
      >
        <main className="grid  md:grid-cols-[3fr_1fr]">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData as any}
            useSavedAddress={useSavedAddress}
            setUseSavedAddress={setUseSavedAddress as any}
          />
          <OrderSummary
            cart={cart as any}
            orderCount={0}
            totals={totals as any}
          />
        </main>
      </form>
    </div>
  );
}
