"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderHook } from "@/components/hooks/order-hook";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SettingsSidebar } from "@/components/elements/settings/settingsidebar";
import { Order } from "@prisma/client";

export default function Seite() {
  const { getOrderQuery, updateStatusMutation } = OrderHook();
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  const handleStatusChange = async (orderId: string) => {
    const payload = { orderId, status: "COMPLETED" };

    try {
      const response = await updateStatusMutation.mutateAsync(payload);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "COMPLETED" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderQuery.refetch(); // Hier fehlte die Klammer
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full">
        <SettingsSidebar />
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Bestellungen
            </h1>
          </div>
          {getOrderQuery.data?.orders.length === 0 && (
            <div className="mt-10 flex">Keine Bestellungen</div>
          )}
          <div className="">
            {getOrderQuery.isLoading && <div>Laden...</div>}
            {getOrderQuery.data && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {getOrderQuery.data?.orders.map((order: Order) => (
                  <Card
                    key={order.id}
                    className="shadow-lg transition-shadow duration-200 hover:shadow-xl"
                    onClick={() =>
                      router.push(`/store/account/orders/${order.id}`)
                    }
                  >
                    <CardHeader className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {order.firstName} {order.lastName}
                        </h2>
                        <Badge
                          variant={
                            order.status === "COMPLETED"
                              ? "secondary"
                              : "outline"
                          }
                          className={`text-xs ${
                            order.status === "COMPLETED"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {order.status === "COMPLETED"
                            ? "Abgeschlossen"
                            : "Ausstehend"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(
                          new Date(order.createdAt),
                          "MMMM dd, yyyy - HH:mm"
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          <strong>Adresse:</strong> {order.address},{" "}
                          {order.city}, {order.zipCode}
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        Gesamt: ${order.totalAmount}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div>
                        <div className="text-sm text-gray-500">
                          <strong>Zuletzt aktualisiert am:</strong>{" "}
                          {format(
                            new Date(order.updatedAt),
                            "MMMM dd, yyyy - HH:mm"
                          )}
                        </div>
                        <div className="mt-5 flex items-center justify-center">
                          {order.status === "COMPLETED" ? (
                            <Button
                              className="w-full cursor-default bg-black text-white"
                              disabled
                            >
                              Abgeschlossen
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleStatusChange(order.id)}
                              className="w-full bg-green-700 text-white hover:bg-green-900"
                            >
                              Bestellung angekommen?
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
