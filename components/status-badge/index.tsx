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
  | "confirmed"
  | "pending_payment"
  | string
  | null
  | undefined;
  type?: "payment" | "booking" | "test";
};

export function StatusBadge({ status, type = "booking" }: StatusBadgeProps) {
  if (!status) return null;
  const getVariant = () => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
      case "confirmed":
        return "success";
      case "pending":
      case "pending_payment":
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
        "capitalize font-medium px-2.5 py-0.5 whitespace-nowrap",
        variant === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        variant === "warning" && "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        variant === "destructive" && "border-red-500/30 bg-red-500/10 text-red-400",
        variant === "info" && "border-blue-500/30 bg-blue-500/10 text-blue-400",
        variant === "default" && "border-slate-700 bg-slate-800/50 text-slate-300"
      )}
    >
      {status.replace(/[-_]/g, " ")}
    </Badge>
  );
}
