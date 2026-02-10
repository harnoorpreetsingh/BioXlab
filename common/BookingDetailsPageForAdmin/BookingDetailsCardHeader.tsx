import { useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils"; // Optional utility for class merging
import { updateBookingStatus } from "@/utils/data/bookings";

type BookingStatus = "pending" | "in-progress" | "completed";

const STATUS_OPTIONS: BookingStatus[] = ["pending", "in-progress", "completed"];

const StatusColor: Record<BookingStatus, string> = {
  pending: "text-yellow-700",
  "in-progress": "text-blue-700",
  completed: "text-green-700",
};

export function BookingCardHeader({
  booking,
  onStatusUpdate,
}: {
  booking: any;
  onStatusUpdate?: (newStatus: string) => void;
}) {
  const [status, setStatus] = useState(booking.status);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      await updateBookingStatus(booking.id, newStatus).then(() => {
        setStatus(newStatus);
        setDropdownOpen(false);
      });

      onStatusUpdate?.(newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      // Optionally show a toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardHeader className="bg-gradient-to-r from-teal-600/10 to-teal-600/5 border-b pb-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-600" />
          Booking Information
        </CardTitle>
        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <StatusBadge status={status} />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-md z-50 min-w-max">
              {STATUS_OPTIONS.map((option) => (
                <div
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className={cn(
                    "px-4 py-2 text-sm cursor-pointer hover:bg-teal-300 hover:text-white capitalize",

                    {
                      [StatusColor[option]]: option === status,
                      "font-medium": option === status,
                      "opacity-50 pointer-events-none": loading,
                    }
                  )}
                >
                  {option.replace("-", " ")}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
}
