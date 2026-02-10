"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import gsap from "gsap";

interface CustomDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  allowClear?: boolean;
}

const years = Array.from(
  { length: 125 },
  (_, i) => new Date().getFullYear() - i
);
const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2000, i), "MMMM")
);

export function CustomDatePicker({
  value,
  onChange,
  label,
  allowClear = true,
}: CustomDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value || new Date());

  const handleMonthChange = (monthIndex: number) => {
    const updated = new Date(month);
    updated.setMonth(monthIndex);
    setMonth(updated);
  };

  const handleYearChange = (year: number) => {
    const updated = new Date(month);
    updated.setFullYear(year);
    setMonth(updated);
  };

  React.useEffect(() => {
  if (open) {
    gsap.fromTo("#calendar-container", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
  }
}, [open]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium mb-2">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value ? format(value, "dd-MM-yyyy") : "dd-mm-yyyy"}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex gap-2 mb-3">
            <Select
              onValueChange={(val) => handleMonthChange(parseInt(val))}
              value={month.getMonth().toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, idx) => (
                  <SelectItem key={m} value={idx.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(val) => handleYearChange(parseInt(val))}
              value={month.getFullYear().toString()}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="h-[200px] overflow-y-auto">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {allowClear && value && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onChange(undefined)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div id="calendar-container">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              month={month}
              onMonthChange={setMonth}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
