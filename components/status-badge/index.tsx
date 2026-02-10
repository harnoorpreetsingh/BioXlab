import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status:
    | "completed"
    | "pending"
    | "cancelled"
    | "in-progress"
    | "paid"
    | "failed"
    | null
    | undefined;
  type?: "payment" | "booking" | "test";
};

export function StatusBadge({ status, type = "booking" }: StatusBadgeProps) {
  if (!status) return null;
  const getVariant = () => {
    switch (status) {
      case "completed":
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
      case "failed":
        return "destructive";
      case "in-progress":
        return "info";
      default:
        return "default";
    }
  };

  const variant = getVariant();

  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        variant === "success" && "border-green-500 bg-green-50 text-green-700",
        variant === "warning" &&
          "border-yellow-500 bg-yellow-50 text-yellow-700",
        variant === "destructive" && "border-red-500 bg-red-50 text-red-700",
        variant === "info" && "border-blue-500 bg-blue-50 text-blue-700"
      )}
    >
      {status.replace("-", " ")}
    </Badge>
  );
}
