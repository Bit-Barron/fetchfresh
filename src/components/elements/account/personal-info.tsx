// components/PersonalInfoForm.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import InputField from "./input";
import { PersonalInfoFormData, PersonalInfoFormProps } from "@/types/account";

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  user,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Persönliche Informationen</CardTitle>
        <CardDescription>
          Aktualisieren Sie Ihre persönlichen Details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <InputField
            id="firstName"
            label="Vorname"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            id="lastName"
            label="Nachname"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            id="address"
            label="Adresse"
            value={formData.address}
            onChange={handleChange}
          />
          <InputField
            id="city"
            label="Stadt"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            id="zipCode"
            label="Postleitzahl"
            value={formData.zipCode}
            onChange={handleChange}
          />
          <InputField
            id="phoneNumber"
            label="Telefonnummer"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Button type="submit" className="bg-black text-white">
            Änderungen speichern
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
