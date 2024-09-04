import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AddressSummaryProps } from "@/types/account";

const AddressSummary: React.FC<AddressSummaryProps> = ({
  address,
  zipCode,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Adressen</CardTitle>
      <CardDescription>Verwalten Sie Ihre Adressen.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Hier sehen Sie Ihre gespeicherten Adressen.</p>
      <ul className="list-disc pl-5">
        <li>
          {address || "keine Adresse"}, {zipCode || "keine Postleitzahl"}
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default AddressSummary;
