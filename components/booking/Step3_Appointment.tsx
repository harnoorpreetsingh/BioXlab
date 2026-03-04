"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Home, Building2, Check } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Assuming this exists, if not will fallback
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface LabBranch {
    id: string;
    name: string;
    address: string;
    opening_hours: string;
}

interface AppointmentDetails {
    type: 'lab-visit' | 'home-collection';
    labBranchId: string;
    date: Date | undefined;
    timeSlot: string;
}

interface Step3Props {
    appointment: Partial<AppointmentDetails>;
    onAppointmentChange: (details: Partial<AppointmentDetails>) => void;
    onNext: () => void;
    onPrev: () => void;
}

// Helper to generate time slots
const generateTimeSlots = (startTime: string = "09:00", endTime: string = "17:00") => {
    const slots = [];
    let current = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    while (current < end) {
        slots.push(format(current, "HH:mm"));
        current.setMinutes(current.getMinutes() + 30);
    }
    return slots;
};

const Step3_Appointment = ({ appointment, onAppointmentChange, onNext, onPrev }: Step3Props) => {
    const [details, setDetails] = useState<Partial<AppointmentDetails>>({
        type: appointment.type || 'lab-visit',
        labBranchId: appointment.labBranchId || "",
        date: appointment.date ? new Date(appointment.date) : undefined,
        timeSlot: appointment.timeSlot || "",
    });

    const [labBranches, setLabBranches] = useState<LabBranch[]>([]);
    const [loadingLabs, setLoadingLabs] = useState(true);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const res = await fetch("/api/lab-branches");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setLabBranches(data);
                }
            } catch (error) {
                console.error("Failed to fetch labs", error);
            } finally {
                setLoadingLabs(false);
            }
        };
        fetchLabs();
    }, []);

    // Generate slots when lab or date changes
    useEffect(() => {
        if (details.labBranchId) {
            const selectedLab = labBranches.find(l => l.id === details.labBranchId);
            // Parse opening hours broadly or use default
            // Assuming format "09:00 - 17:00" or similar, fallback to default
            // For now using simple default generator
            setTimeSlots(generateTimeSlots("08:00", "18:00"));
        } else {
            setTimeSlots(generateTimeSlots("08:00", "18:00"));
        }
    }, [details.labBranchId, labBranches]);


    const updateDetail = (key: keyof AppointmentDetails, value: any) => {
        const updated = { ...details, [key]: value };
        setDetails(updated);
        onAppointmentChange(updated);
    };

    const isNextEnabled = () => {
        if (details.type === 'lab-visit' && !details.labBranchId) return false;
        if (!details.date) return false;
        if (!details.timeSlot) return false;
        return true;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Schedule Appointment</h2>
                <p className="text-slate-400">Choose when and where you want to get tested</p>
            </div>

            <div className="space-y-8">
                {/* 1. Appointment Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={cn(
                            "cursor-pointer p-6 rounded-xl border transition-all duration-300 flex items-center gap-4",
                            details.type === 'lab-visit'
                                ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                : "bg-slate-900 border-slate-800 hover:border-emerald-500/50"
                        )}
                        onClick={() => updateDetail('type', 'lab-visit')}
                    >
                        <div className={cn(
                            "p-3 rounded-full",
                            details.type === 'lab-visit' ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                        )}>
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Visit Lab Center</h3>
                            <p className="text-sm text-slate-400">Walk in to our nearest center</p>
                        </div>
                        {details.type === 'lab-visit' && <Check className="ml-auto text-emerald-500" />}
                    </div>

                    <div
                        className={cn(
                            "cursor-pointer p-6 rounded-xl border transition-all duration-300 flex items-center gap-4",
                            details.type === 'home-collection'
                                ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                : "bg-slate-900 border-slate-800 hover:border-emerald-500/50"
                        )}
                        onClick={() => updateDetail('type', 'home-collection')}
                    >
                        <div className={cn(
                            "p-3 rounded-full",
                            details.type === 'home-collection' ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                        )}>
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Home Collection</h3>
                            <p className="text-sm text-slate-400">+ ₹100 collection charge</p>
                        </div>
                        {details.type === 'home-collection' && <Check className="ml-auto text-emerald-500" />}
                    </div>
                </div>

                {/* 2. Select Lab (if Lab Visit) */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                >
                    <Label className="text-slate-300 text-lg">Select Lab Center</Label>
                    <Select
                        value={details.labBranchId}
                        onValueChange={(val) => updateDetail('labBranchId', val)}
                    >
                        <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-white h-12">
                            <SelectValue placeholder={loadingLabs ? "Loading labs..." : "Choose a center near you"} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                            {labBranches.map((lab) => (
                                <SelectItem key={lab.id} value={lab.id} className="focus:bg-slate-800 focus:text-white cursor-pointer">
                                    <div className="flex flex-col text-left py-1">
                                        <span className="font-medium">{lab.name}</span>
                                        <span className="text-xs text-slate-400">{lab.address}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* 3. Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date Picker */}
                    <div className="space-y-4">
                        <Label className="text-slate-300 text-lg">Select Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal h-12 bg-slate-950 border-slate-800 text-white hover:bg-slate-900 hover:text-white",
                                        !details.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {details.date ? format(details.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-800 text-white">
                                <Calendar
                                    mode="single"
                                    selected={details.date}
                                    onSelect={(date) => updateDetail('date', date)}
                                    disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                                    initialFocus
                                    className="bg-slate-900 text-white rounded-md"
                                    classNames={{
                                        day_selected: "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-600",
                                        day_today: "bg-slate-800 text-white",
                                        day: "h-9 w-9 p-0 font-normal hover:bg-slate-800 rounded-md transition-colors text-slate-200 aria-selected:opacity-100"
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Time Slots */}
                    <div className="space-y-4">
                        <Label className="text-slate-300 text-lg">Select Time</Label>
                        {!details.date ? (
                            <div className="h-12 flex items-center justify-center border border-dashed border-slate-800 rounded-lg text-slate-500">
                                Select a date first
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => updateDetail('timeSlot', slot)}
                                        className={cn(
                                            "py-2 px-1 text-sm rounded-md transition-all border",
                                            details.timeSlot === slot
                                                ? "bg-emerald-500 text-white border-emerald-500"
                                                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-emerald-500/50"
                                        )}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-10 p-4 border-t border-slate-800">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                    Back to Patient Info
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!isNextEnabled()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Review Booking
                </Button>
            </div>
        </div>
    );
};

export default Step3_Appointment;
