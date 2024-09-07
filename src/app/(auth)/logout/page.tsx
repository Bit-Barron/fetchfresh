"use client";

import { AuthHook } from "@/components/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface LogoutPageProps {}

export default function LogoutPage(props: LogoutPageProps) {
  const router = useRouter();
  const { logoutMutation } = AuthHook();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log("Attempting to log out..."); // Debug log
        await logoutMutation.mutateAsync();
        console.log("Logout successful"); // Debug log

        toast.success("Sie wurden erfolgreich abgemeldet.");

        router.refresh(); // cache reset

        console.log("Redirecting to login page in 2 seconds..."); // Debug log
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Logout error:", error); // Debug log
        setError(
          "Ein Fehler ist beim Abmelden aufgetreten. Bitte versuchen Sie es erneut."
        );
        toast.error("Abmelden fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }
    };

    performLogout();
  }, [logoutMutation, router]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Fehler beim Abmelden
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Zurück zur Anmeldeseite
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Abmelden...</h1>
        <p className="text-gray-600">
          Sie werden in Kürze zur Anmeldeseite weitergeleitet.
        </p>
      </div>
    </div>
  );
}
