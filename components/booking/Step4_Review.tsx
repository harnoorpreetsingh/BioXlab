"use client";

import { motion } from "framer-motion";
import { User, Calendar, MapPin, FlaskConical, AlertCircle, Phone, Mail, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TestWithCategory } from "@/components/tests/tests-list";

interface Step4Props {
    formData: {
        selectedTests: TestWithCategory[];
        patientInfo: any;
        appointment: any;
    };
    onNext: () => void;
    onPrev: () => void;
    isSubmitting: boolean;
}

const Step4_Review = ({ formData, onNext, onPrev, isSubmitting }: Step4Props) => {
    const { selectedTests, patientInfo, appointment } = formData;

    const testsTotal = selectedTests.reduce((sum, test) => sum + (Number(test.cost) || 0), 0);
    const collectionCharge = appointment.type === 'home-collection' ? 100 : 0;
    const grandTotal = testsTotal + collectionCharge;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Review Booking</h2>
                <p className="text-slate-400">Please verify your details before confirming</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-6">

                    {/* 1. Patient Details */}
                    <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-emerald-500" />
                            Patient Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500 block">Full Name</span>
                                <span className="text-slate-200 font-medium">{patientInfo.firstName} {patientInfo.lastName}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Age / Gender</span>
                                <span className="text-slate-200 font-medium">{patientInfo.age} Yrs / {patientInfo.gender}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Email</span>
                                <span className="text-slate-200 font-medium flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {patientInfo.email}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Phone</span>
                                <span className="text-slate-200 font-medium flex items-center gap-1">
                                    <Phone className="w-3 h-3" /> {patientInfo.phone}
                                </span>
                            </div>
                            <div className="sm:col-span-2">
                                <span className="text-slate-500 block">Address</span>
                                <span className="text-slate-200 font-medium flex items-start gap-1">
                                    <MapPin className="w-3 h-3 mt-1 shrink-0" />
                                    {patientInfo.address}, {patientInfo.city} - {patientInfo.pincode}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 2. Appointment Details */}
                    <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-500" />
                            Appointment Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500 block">Type</span>
                                <span className="text-slate-200 font-medium capitalize">{appointment.type?.replace('-', ' ')}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Date & Time</span>
                                <span className="text-slate-200 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {appointment.date ? format(new Date(appointment.date), "PPP") : "N/A"} at {appointment.timeSlot}
                                </span>
                            </div>
                            {appointment.type === 'lab-visit' && (
                                <div className="sm:col-span-2">
                                    <span className="text-slate-500 block">Lab Center</span>
                                    <span className="text-slate-200 font-medium">Selected Center ID: {appointment.labBranchId}</span>
                                    {/* Ideally fetch lab name here or pass it from parent */}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 3. Selected Tests */}
                    <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <FlaskConical className="w-5 h-5 text-emerald-500" />
                            Selected Tests ({selectedTests.length})
                        </h3>
                        <div className="space-y-3">
                            {selectedTests.map((test) => (
                                <div key={test.id} className="flex justify-between items-center text-sm border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                                    <span className="text-slate-300">{test.name}</span>
                                    <span className="text-white font-medium">₹{test.cost || 0}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Column: Pricing Summary */}
                <div className="md:col-span-1">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-xl">
                        <h3 className="text-lg font-semibold text-white mb-6">Payment Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Subtotal</span>
                                <span className="text-white">₹{testsTotal}</span>
                            </div>
                            {collectionCharge > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Home Collection</span>
                                    <span className="text-white">₹{collectionCharge}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Tax</span>
                                <span className="text-slate-500 italic">Inclusive</span>
                            </div>

                            <div className="h-px bg-slate-800 my-4"></div>

                            <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">Total Amount</span>
                                <span className="text-2xl font-bold text-emerald-400">₹{grandTotal}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-emerald-200">
                                    You will be securely redirected to our payment partner to complete your payment. By proceeding, you agree to our Terms & Conditions.
                                </p>
                            </div>

                            <Button
                                onClick={onNext}
                                disabled={isSubmitting}
                                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/80 transition-all hover:scale-[1.02]"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Redirecting to Payment...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Proceed to Payment
                                    </span>
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={onPrev}
                                disabled={isSubmitting}
                                className="w-full text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Step4_Review;
