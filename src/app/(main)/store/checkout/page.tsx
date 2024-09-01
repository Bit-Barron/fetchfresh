"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { OrderHook } from "@/components/hooks/order-hook";
import { useRouter } from "next/navigation";
import { CartStore } from "../../../../store/CartStore";
import { formatPrice } from "@/utils";
import { UserHook } from "@/components/hooks/user-hook";
import { toast, Toaster } from "sonner";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [useSavedAddress, setUseSavedAddress] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const { orderMutation } = OrderHook();
  const { cart } = CartStore();
  const { meQuery } = UserHook();
  const router = useRouter();

  useEffect(() => {
    if (meQuery.data && useSavedAddress) {
      setFirstName(meQuery.data.firstName || "");
      setLastName(meQuery.data.lastName || "");
      setAddress(meQuery.data.address || "");
      setCity(meQuery.data.city || "");
      setZipCode(meQuery.data.zipCode || "");
      setPhoneNumber(meQuery.data.phoneNumber || "");
      setEmail(meQuery.data.email || "");
    } else if (!useSavedAddress) {
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setZipCode("");
      setPhoneNumber("");
      setEmail("");
    }
    setIsHydrated(true);
  }, [meQuery.data, useSavedAddress]);

  if (!isHydrated) {
    return null;
  }

  const subtotal = cart.reduce(
    (acc: number, item: Item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 5.0;
  const discount = 10.0;
  const total = subtotal + shippingCost - discount;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const calculatedTotalAmount = parseFloat(formatPrice(total));
    try {
      await orderMutation.mutateAsync({
        firstName,
        lastName,
        address,
        city,
        phoneNumber,
        email,
        zipCode,
        cart: cart.map((item: Item) => ({
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
      toast.success("bestellung erfolgreich aufgegeben");
    } catch (error) {
      toast.error("Bitte alle Felder ausfüllen");
      console.error("Fehler bei der Bestellung:", error);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Toaster richColors position="top-right" />
      <form
        onSubmit={onSubmit}
        className="flex-1 bg-[#F7F7F7] px-4 py-8 sm:px-6 md:py-12"
      >
        <main className="grid flex-1 grid-cols-1 gap-8 p-8 md:grid-cols-[3fr_1fr]">
          <div className="bg-background rounded-lg p-8 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">Bestellung</h1>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Vorname</Label>
                  <Input
                    id="firstname"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Nachname</Label>
                  <Input
                    id="lastname"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Telefonnummer</Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id="phoneNumber"
                  type="text"
                  placeholder="17625440123"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Lieferadresse</Label>
                <Input
                  id="address"
                  placeholder="123 Hauptstraße, Irgendwo USA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Stadt</Label>
                <Input
                  id="city"
                  placeholder="Irgendwo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipcode">Postleitzahl</Label>
                <Input
                  id="zipcode"
                  placeholder="12345"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  id="useSavedAddress"
                  type="checkbox"
                  checked={useSavedAddress}
                  onChange={() => {
                    setUseSavedAddress(!useSavedAddress);
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600" // Adds blue color when checked
                />
                <Label htmlFor="useSavedAddress" className="mb-1 ml-3">
                  Verwenden Sie die gespeicherte Adresse
                </Label>
              </div>
              <Button type="submit" className="w-full bg-black text-white">
                Bestellung aufgeben
              </Button>
            </div>
          </div>
          <div className="bg-background rounded-lg p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Bestellübersicht</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span>Zwischensumme</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Versand</span>
                <span>{shippingCost}€</span>
              </div>

              <Separator />
              <div className="flex items-center justify-between font-bold">
                <span>Gesamt</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Separator />
              <div className="grid gap-2">
                {cart.map((item: Item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}
