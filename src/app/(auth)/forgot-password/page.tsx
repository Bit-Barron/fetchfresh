"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePasswordReset } from "@/components/hooks/forgot-password-hook";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { requestPasswordReset } = usePasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Bitte geben Sie eine E-Mail-Adresse ein.");
      console.error("No email provided"); // Debug log
      return;
    }

    try {
      console.log("Attempting to request password reset for:", email); // Debug log
      await requestPasswordReset.mutateAsync(email);
      console.log("Password reset request successful"); // Debug log
      setIsSubmitted(true);
      toast.success(
        "Anweisungen zum Zurücksetzen des Passworts wurden gesendet."
      );
    } catch (err) {
      console.error("Password reset request failed:", err); // Debug log
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ein Fehler ist aufgetreten beim Zurücksetzen des Passworts.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Überprüfen Sie Ihre E-Mails</h1>
        <p className="mt-2">
          Falls ein Konto für {email} existiert, haben wir Anweisungen zum
          Zurücksetzen des Passworts dorthin gesendet.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Zurück zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Passwort vergessen
          </h1>
          <p className="mt-2 text-muted-foreground">
            Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link
            zum Zurücksetzen Ihres Passworts.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              E-Mail-Adresse
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button type="submit" className="w-full bg-black text-white">
              Reset
            </Button>
          </div>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:underline"
              prefetch={false}
            >
              Zurück zur Anmeldung
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
