// components/AccountInfoForm.tsx

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
import { AccountInfoFormData, AccountInfoFormProps } from "@/types/account";

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  user,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<AccountInfoFormData>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
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
        <CardTitle>Kontoinformationen</CardTitle>
        <CardDescription>
          Aktualisieren Sie Ihre persönlichen Informationen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Benutzername"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            id="email"
            label="E-Mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            id="password"
            label="Passwort ändern"
            type="password"
            value={formData.password}
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

export default AccountInfoForm;
