"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserHook } from "@/components/hooks/user-hook";
import { SettingsSidebar } from "@/components/elements/settingsidebar";
import { toast, Toaster } from "sonner";
import { OrderHook } from "@/components/hooks/order-hook";

export default function Account() {
  const { meQuery, updateUser } = UserHook();
  const { getOrderQuery } = OrderHook();
  const order = getOrderQuery.data?.orders.length;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (meQuery.data) {
      setUsername(meQuery.data.username);
      setPassword(""); // Reset password field
      setFirstName(meQuery.data.firstName || "");
      setLastName(meQuery.data.lastName || "");
      setAddress(meQuery.data.address || "");
      setPhoneNumber(meQuery.data.phoneNumber || "");
      setZipCode(meQuery.data.zipCode || "");
      setCity(meQuery.data.city || "");
      setEmail(meQuery.data.email || "");
    }
  }, [meQuery.data]);

  const handleUpdateUser = async () => {
    try {
      await updateUser.mutateAsync({
        username,
        password,
        firstName,
        lastName,
        address,
        city,
        zipCode,
        phoneNumber,
        email,
      });
      toast.success("Daten erfolgreich gespeichert");
    } catch (error) {
      toast.error(
        "Fehler beim Speichern, bitte versuchen Sie es später erneut",
      );
      console.error("Fehler beim Aktualisieren des Benutzers:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <Toaster richColors position="top-right" />
        <SettingsSidebar />
        <div className="flex-1 p-6 md:p-10">
          <div className="">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Kontoeinstellungen</h1>
            </div>
            <div className="grid gap-8">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Kontoinformationen</CardTitle>
                  <CardDescription>
                    Aktualisieren Sie Ihre persönlichen Informationen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateUser();
                    }}
                  >
                    <div className="grid gap-1">
                      <Label htmlFor="username">Benutzername</Label>
                      <Input
                        className="bg-inputbg"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input
                        className="bg-inputbg"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="password">Passwort ändern</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-inputbg"
                      />
                    </div>
                    <Button type="submit" className="bg-black text-white">
                      Änderungen speichern
                    </Button>
                  </form>
                </CardContent>
              </Card>
              {getOrderQuery.isLoading && (
                <div className="text-center">
                  <svg
                    className="mx-auto h-8 w-8 animate-spin text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  <p className="mt-4 text-gray-600">
                    Loading your shopping list...
                  </p>
                </div>
              )}

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Persönliche Informationen</CardTitle>
                  <CardDescription>
                    Aktualisieren Sie Ihre persönlichen Details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateUser();
                    }}
                  >
                    <div className="grid gap-1">
                      <Label htmlFor="firstName">Vorname</Label>
                      <Input
                        className="bg-inputbg"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="lastName">Nachname</Label>
                      <Input
                        className="bg-inputbg"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        className="bg-inputbg"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="city">Stadt</Label>
                      <Input
                        className="bg-inputbg"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="zipCode">Postleitzahl</Label>
                      <Input
                        className="bg-inputbg"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="phoneNumber">Telefonnummer</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-inputbg"
                      />
                    </div>
                    <Button type="submit" className="bg-black text-white">
                      Änderungen speichern
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bestellungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Insgesammt {order} Bestellungen</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Adressen</CardTitle>
                  <CardDescription>
                    Verwalten Sie Ihre Adressen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Hier sehen Sie Ihre gespeicherten Adressen.</p>
                  <ul className="list-disc pl-5">
                    <li>
                      {address || "keine Adresse "},{" "}
                      {zipCode || "keine Postleitzahl"}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
