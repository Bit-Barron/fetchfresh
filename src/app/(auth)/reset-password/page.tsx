"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePasswordReset } from "@/components/hooks/forgot-password-hook";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const { resetPassword } = usePasswordReset();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      setError("No reset token found. Please request a new password reset.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    try {
      await resetPassword.mutateAsync({ token, newPassword: password });
      router.push("/login?reset=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (resetPassword.isSuccess) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold">Password Reset Successful</h1>
        <p className="mt-2">
          Your password has been reset. You can now log in with your new
          password.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Reset Password
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please enter your new password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              New Password
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
              Confirm New Password
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
              Reset Password
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
