"use client";

import { OrderHook } from "@/components/hooks/order-hook";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/utils";
import Image from "next/image";
import { CartStore } from "../../../../../../store/CartStore";
import { useRouter } from "next/navigation";

function Bestellinformationen() {
  const { getOrderByIdQuery, getOrderQuery } = OrderHook();
  const order = getOrderByIdQuery.data?.order;
  const totalOrders = getOrderQuery.data?.orders.length;
  const router = useRouter();

  return (
    <>
      {getOrderByIdQuery.isLoading && <div>Laden...</div>}
      <div className="grid gap-6 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-lg font-medium">
              Bestellung #{order?.id || "N/A"}
            </div>
            <div className="text-muted-foreground text-sm">
              Bestellt am
              {order?.createdAt ? formatDate(new Date(order.createdAt)) : "N/A"}
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            {order?.status || "Status N/A"}
          </Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Kundeninformationen</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <div className="font-medium">
                  {order?.firstName} {order?.lastName}
                </div>
                <div className="text-muted-foreground">
                  {totalOrders} Bestellungen insgesamt
                </div>
              </div>
              <Separator />
              <div>
                <div className="font-medium">{order?.email}</div>
                <div>{order?.phoneNumber}</div>
              </div>
              <Separator />
              <div>
                <div>Gleiche Adresse wie die Lieferadresse</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Versanddetails</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="font-medium">
                  {order?.firstName}, {order?.lastName}
                </div>
                <div>{order?.address}</div>
                <div>{order?.zipCode}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bestellübersicht</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Zwischensumme</div>
                <div>{order?.totalAmount}€</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Rabatt</div>
                <div>-0€</div>
              </div>

              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Gesamt</div>
                <div>{order?.totalAmount}€</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Bestellte Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[80px] md:table-cell">
                    Bild
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Menge</TableHead>
                  <TableHead>Gesamt</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.products?.length ? (
                  order.products.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden md:table-cell">
                        <Image
                          src={item.image}
                          width="64"
                          height="64"
                          alt={`Bild von ${item.name}`}
                          className="aspect-square rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatPrice(item.quantity * item.price)}€
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Keine Artikel in dieser Bestellung gefunden.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Button
          className="bg-black text-white"
          onClick={() => router.push("/store/rewe/storefront")}
        >
          Nochmal kaufen
        </Button>
      </div>
    </>
  );
}

export default Bestellinformationen;
