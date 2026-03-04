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
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium mb-1.5 text-white/70">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all duration-300 focus:ring-emerald-500/50 focus:border-emerald-500"
          >
            {value ? format(value, "dd MMMM yyyy") : <span className="text-white/30">Pick a date</span>}
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4 bg-black/90 border-white/10 backdrop-blur-xl text-white shadow-2xl rounded-xl" align="start">
          <div className="flex gap-2 mb-4">
            <Select
              onValueChange={(val) => handleMonthChange(parseInt(val))}
              value={month.getMonth().toString()}
            >
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white hover:bg-white/10 focus:ring-emerald-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white backdrop-blur-xl max-h-[300px]">
                {months.map((m, idx) => (
                  <SelectItem key={m} value={idx.toString()} className="focus:bg-emerald-600 focus:text-white cursor-pointer">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(val) => handleYearChange(parseInt(val))}
              value={month.getFullYear().toString()}
            >
              <SelectTrigger className="w-[100px] bg-white/5 border-white/10 text-white hover:bg-white/10 focus:ring-emerald-500/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white backdrop-blur-xl h-[300px]">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()} className="focus:bg-emerald-600 focus:text-white cursor-pointer">
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
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(undefined);
                }}
                className="hover:bg-red-500/20 hover:text-red-400 text-white/50"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div id="calendar-container" className="bg-white/5 rounded-lg p-1 border border-white/5">
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
              className="p-2 pointer-events-auto"
              classNames={{
                day_selected: "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white focus:bg-emerald-600 focus:text-white shadow-lg shadow-emerald-900/50",
                day_today: "bg-white/10 text-white font-bold border border-white/20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 hover:text-white text-white/90 rounded-md transition-all duration-200",
                head_cell: "text-white/40 w-9 font-normal text-[0.8rem]",
                caption_label: "text-white font-semibold text-sm hidden", // Hide default caption since we have custom selects
                nav: "hidden", // Hide default nav since we have custom selects
                table: "w-full border-collapse space-y-1",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
