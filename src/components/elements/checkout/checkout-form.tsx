import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputField from "./checkout-input";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
};

export const CheckoutForm = ({
  formData,
  setFormData,
  useSavedAddress,
  setUseSavedAddress,
}: {
  formData: FormData;
  setFormData: (data: FormData) => void;
  useSavedAddress: boolean;
  setUseSavedAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`Changing ${id} to ${value}`);
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="bg-background rounded-lg p-8 w-full shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Bestellung</h1>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="Vorname"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
          />
          <InputField
            id="lastName"
            label="Nachname"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
          />
        </div>
        <InputField
          id="email"
          label="E-Mail"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          type="email"
        />
        <InputField
          id="phoneNumber"
          label="Telefonnummer"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="17625440123"
        />
        <InputField
          id="address"
          label="Lieferadresse"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="123 Hauptstraße, Irgendwo USA"
        />
        <InputField
          id="city"
          label="Stadt"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Irgendwo"
        />
        <InputField
          id="zipCode"
          label="Postleitzahl"
          value={formData.zipCode}
          onChange={handleInputChange}
          placeholder="12345"
        />
        <div className="">
          <input
            id="useSavedAddress"
            type="checkbox"
            checked={useSavedAddress}
            onChange={() => setUseSavedAddress(!useSavedAddress)}
            className="form-checkbox h-4 w-4 text-blue-600"
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
  );
};
