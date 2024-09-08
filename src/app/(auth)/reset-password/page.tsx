"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePasswordReset } from "@/components/hooks/forgot-password-hook";
import { useSearchParams, useRouter } from "next/navigation";
import AuthStore from "@/store/AuthStore";
import { toast } from "sonner";

export default function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { password, setPassword } = AuthStore();
  const { resetPassword } = usePasswordReset();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
      console.log("Token set:", queryToken); // Debug log
    } else {
      setError(
        "Kein Zurücksetzungs-Token gefunden. Bitte fordern Sie eine neue Passwort-Zurücksetzung an."
      );
      console.error("No reset token found in URL"); // Debug log
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Submitting form"); // Debug log

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      console.error("Passwords do not match"); // Debug log
      return;
    }

    if (!token) {
      setError("Ungültiger Zurücksetzungs-Token");
      console.error("Invalid reset token"); // Debug log
      return;
    }

    try {
      console.log("Attempting to reset password"); // Debug log
      await resetPassword.mutateAsync({ token, newPassword: password });
      console.log("Password reset successful"); // Debug log
      toast.success("Passwort erfolgreich zurückgesetzt");
      router.push("/login?reset=success");
    } catch (err) {
      console.error("Password reset failed:", err); // Debug log
      const errorMessage =
        err instanceof Error ? err.message : "Ein Fehler ist aufgetreten";
      setError(errorMessage);
    }
  };

  if (resetPassword.isSuccess) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Passwort-Zurücksetzung erfolgreich
        </h1>
        <p className="mt-2">
          Ihr Passwort wurde zurückgesetzt. Sie können sich jetzt mit Ihrem
          neuen Passwort anmelden.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Passwort zurücksetzen
          </h1>
          <p className="mt-2 text-muted-foreground">
            Bitte geben Sie Ihr neues Passwort ein.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Neues Passwort
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground"
            >
              Neues Passwort bestätigen
            </Label>
            <div className="mt-1">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button type="submit" className="w-full bg-black text-white">
              Passwort zurücksetzen
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
