"use client";

import { SettingsSidebar } from "@/components/elements/settingsidebar";
import { ShoppingListHook } from "@/components/hooks/shoppinglist-hook";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const Page: React.FC = ({}) => {
  const { shoppingListQuery, shoppingListDeleteMutation } = ShoppingListHook();
  const router = useRouter();

  const shoppingList = shoppingListQuery.data?.shoppingListItems;

  const onHandleDelete = (orderId: string) => {
    shoppingListDeleteMutation
      .mutateAsync({ orderId })
      .then(() => {
        toast.success("Erfolgreich gelöscht");
        shoppingListQuery.refetch();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  useEffect(() => {
    shoppingListQuery.refetch(); // Initial fetch
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full">
        <SettingsSidebar />
        <Toaster richColors position="top-right" />
        <section className="flex-1 p-4 md:p-8">
          <div className="container mx-auto">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">
              Einkaufslisteee
            </h1>

            {shoppingListQuery.isLoading && (
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
                <p className="mt-4 text-gray-600">Einkaufsliste lädt...</p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {shoppingList?.map((i) => (
                <div
                  key={i.id}
                  className="transform overflow-hidden rounded-lg bg-white p-2 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  <button type="button" onClick={() => onHandleDelete(i.id)}>
                    <TrashIcon />
                  </button>
                  <div className="flex items-center justify-center">
                    <Image
                      src={i.image}
                      alt="Product Image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="mb-2 truncate text-lg font-semibold text-gray-700">
                      {i.name}
                    </h2>
                  </div>
                  <Button
                    onClick={() => router.push("/store/rewe/storefront")}
                    className="w-full bg-black text-white"
                  >
                    Zu den Produkten
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
