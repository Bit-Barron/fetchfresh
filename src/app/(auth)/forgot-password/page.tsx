"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePasswordReset } from "@/components/hooks/forgot-password-hook";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const { requestPasswordReset } = usePasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      await requestPasswordReset.mutateAsync(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Check Your Email</h1>
        <p className="mt-2">
          If an account exists for {email}, we have sent password reset
          instructions to it.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Forgot Password
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email Address
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
              asd
            </Button>
          </div>
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:underline"
              prefetch={false}
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
