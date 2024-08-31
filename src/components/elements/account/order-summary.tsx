// components/OrderSummary.tsx

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OrderSummaryProps } from "@/types/account";

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderCount }) => (
  <Card>
    <CardHeader>
      <CardTitle>Bestellungen</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Insgesamt {orderCount} Bestellungen</p>
    </CardContent>
  </Card>
);

export default OrderSummary;
