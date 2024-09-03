interface SummaryItemProps {
  label: string;
  value: string;
  isBold?: boolean;
}

const SummaryItem = ({ label, value, isBold = false }: SummaryItemProps) => (
  <div
    className={`flex items-center justify-between ${isBold ? "font-bold" : ""}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default SummaryItem;
