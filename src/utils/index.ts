import { format } from "date-fns";

export function formatDate(
  dateString: string | Date,
  dateFormat: string = "PP",
) {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return format(date, dateFormat);
}

export const formatPrice = (priceInCents: number): string => {
  const priceInEuros = priceInCents / 100;
  return priceInEuros.toFixed(2);
};
