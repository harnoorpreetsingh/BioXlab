"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PatientInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: string;
    gender: string;
    address: string;
    city: string;
    pincode: string;
}

interface Step2Props {
    patientInfo: Partial<PatientInfo>;
    onInfoChange: (info: Partial<PatientInfo>) => void;
    onNext: () => void;
    onPrev: () => void;
}

const Step2_PatientInfo = ({ patientInfo, onInfoChange, onNext, onPrev }: Step2Props) => {
    const [formData, setFormData] = useState<PatientInfo>({
        firstName: patientInfo.firstName || "",
        lastName: patientInfo.lastName || "",
        email: patientInfo.email || "",
        phone: patientInfo.phone || "",
        age: patientInfo.age || "",
        gender: patientInfo.gender || "",
        address: patientInfo.address || "",
        city: patientInfo.city || "",
        pincode: patientInfo.pincode || "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PatientInfo, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof PatientInfo, boolean>>>({});

    const validateField = (name: keyof PatientInfo, value: string) => {
        let error = "";
        switch (name) {
            case "firstName":
            case "lastName":
                if (!value.trim()) error = "Required";
                break;
            case "email":
                if (!value.trim()) error = "Required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email";
                break;
            case "phone":
                if (!value.trim()) error = "Required";
                else if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) error = "Invalid phone number";
                break;
            case "age":
                if (!value) error = "Required";
                else if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 120) error = "Invalid age";
                break;
            case "gender":
                if (!value) error = "Required";
                break;
            case "address":
            case "city":
            case "pincode":
                if (!value.trim()) error = "Required";
                break;
        }
        return error;
    };

    const handleChange = (name: keyof PatientInfo, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        onInfoChange({ ...formData, [name]: value });

        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (name: keyof PatientInfo) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }));
    };

    const handleSubmit = () => {
        const newErrors: Partial<Record<keyof PatientInfo, string>> = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof PatientInfo>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(
            (Object.keys(formData) as Array<keyof PatientInfo>).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );

        if (isValid) {
            onNext();
        } else {
            // Scroll to first error
            const firstErrorField = document.querySelector('.error-field');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Patient Details</h2>
                <p className="text-slate-400">Who is this booking for?</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-slate-300">First Name <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                onBlur={() => handleBlur("firstName")}
                                className={cn(
                                    "pl-10 bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.firstName && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-slate-300">Last Name <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                onBlur={() => handleBlur("lastName")}
                                className={cn(
                                    "pl-10 bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.lastName && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email Address <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                className={cn(
                                    "pl-10 bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-300">Phone Number <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                id="phone"
                                placeholder="10-digit mobile number"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                onBlur={() => handleBlur("phone")}
                                className={cn(
                                    "pl-10 bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="age" className="text-slate-300">Age <span className="text-red-500">*</span></Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="25"
                                value={formData.age}
                                onChange={(e) => handleChange("age", e.target.value)}
                                onBlur={() => handleBlur("age")}
                                className={cn(
                                    "bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.age && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-slate-300">Gender <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleChange("gender", value)}
                            >
                                <SelectTrigger
                                    className={cn(
                                        "bg-slate-950 border-slate-800 text-white focus:ring-emerald-500",
                                        errors.gender && "border-red-500 ring-red-500 error-field"
                                    )}
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-slate-300">Address <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Textarea
                                id="address"
                                placeholder="House No, Street, Landmark"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                onBlur={() => handleBlur("address")}
                                className={cn(
                                    "pl-10 bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500 min-h-[80px]",
                                    errors.address && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                        </div>
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* City & Pincode */}
                    <div className="grid grid-cols-2 gap-4 md:col-span-2">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-slate-300">City <span className="text-red-500">*</span></Label>
                            <Input
                                id="city"
                                placeholder="New Delhi"
                                value={formData.city}
                                onChange={(e) => handleChange("city", e.target.value)}
                                onBlur={() => handleBlur("city")}
                                className={cn(
                                    "bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.city && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pincode" className="text-slate-300">Pincode <span className="text-red-500">*</span></Label>
                            <Input
                                id="pincode"
                                placeholder="110001"
                                value={formData.pincode}
                                onChange={(e) => handleChange("pincode", e.target.value)}
                                onBlur={() => handleBlur("pincode")}
                                className={cn(
                                    "bg-slate-950 border-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500",
                                    errors.pincode && "border-red-500 focus:border-red-500 focus:ring-red-500 error-field"
                                )}
                            />
                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                        </div>
                    </div>

                </div>

                <div className="flex justify-between mt-10 p-4 border-t border-slate-800">
                    <Button
                        variant="outline"
                        onClick={onPrev}
                        className="bg-transparent border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                        Back to Tests
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-8"
                    >
                        Continue to Appointment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Step2_PatientInfo;
