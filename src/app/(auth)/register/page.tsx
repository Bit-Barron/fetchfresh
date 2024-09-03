"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
  const router = useRouter();
  const { registerMutation } = AuthHook();
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e: FormEvent) => {
    if (password !== confirmPassword) {
      toast.error("");
    }
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus("Passwörter stimmen nicht über ein");
      return;
    }
    registerMutation
      .mutateAsync({
        username,
        password,
        email,
      })
      .then((user) => {
        user ? router.push("/dashboard") : setStatus(user);
        toast.success("Erfolgreich Account erstellt.");
      })
      .catch((error) => {
        toast.error("Username oder Email existiert bereits");
      });
  };

  return (
    <div className="bg-background flex items-center justify-center">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-foreground mt-6 text-center text-3xl font-bold tracking-tight">
            Konto Erstellen
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Sie haben bereits ein Konto?
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
              prefetch={false}
            >
              Einloggen
            </Link>
          </p>
        </div>
        <Card>
          <CardContent className="space-y-6 px-6 py-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="username"
                  className="text-muted-foreground block text-sm font-medium"
                >
                  Username
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary block w-full rounded-md px-3 py-2 shadow-sm"
                    placeholder="JohnDoe123@gmail.com"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-muted-foreground block text-sm font-medium"
                >
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary block w-full rounded-md px-3 py-2 shadow-sm"
                    placeholder="JohnDoe123"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-muted-foreground block text-sm font-medium"
                >
                  Passwort
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary block w-full rounded-md px-3 py-2 shadow-sm"
                    placeholder="Passwort"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-muted-foreground block text-sm font-medium"
                >
                  Passwort bestätigen
                </Label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary block w-full rounded-md px-3 py-2 shadow-sm"
                    placeholder="Passwort bestätigen"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-black text-white">
                Register
              </Button>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Du hast schon ein Account?
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 font-medium"
                    prefetch={false}
                  >
                    Log dich hier ein
                  </Link>
                </p>
              </div>
              {status && (
                <div className="text-center text-red-600">{status}</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
