"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressStepper from "./ProgressStepper";
import { toast } from "react-toastify";
import Step1_SelectTests from "./Step1_SelectTests";
import Step2_PatientInfo from "./Step2_PatientInfo";
import Step3_Appointment from "./Step3_Appointment";
import Step4_Review from "./Step4_Review";
import Step5_Success from "./Step5_Success";

import { TestWithCategory } from "@/components/tests/tests-list";
import { createBooking, insertTestsBooking } from "@/utils/data/bookings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookingFormData {
    selectedTests: TestWithCategory[];
    patientInfo: any;
    appointment: any;
}

const BookingWizard = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingId, setBookingId] = useState("");

    // Form State
    const [formData, setFormData] = useState<BookingFormData>({
        selectedTests: [],
        patientInfo: {},
        appointment: {
            type: 'lab-visit'
        },
    });

    // Auto-fill patient info if user is logged in
    // This could be enhanced to fetch profile data
    useState(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                patientInfo: {
                    ...prev.patientInfo,
                    email: session?.user?.email || "",
                    firstName: session?.user?.name?.split(" ")[0] || "",
                    lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
                }
            }));
        }
    });

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const jumpToStep = (step: number) => {
        if (step < currentStep && !bookingId) { // Prevent jumping if booking completed
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handlers
    const handleTestsChange = (tests: TestWithCategory[]) => {
        setFormData(prev => ({ ...prev, selectedTests: tests }));
    };

    const handlePatientInfoChange = (info: any) => {
        setFormData(prev => ({ ...prev, patientInfo: info }));
    };

    const handleAppointmentChange = (appointment: any) => {
        setFormData(prev => ({ ...prev, appointment }));
    };

    const submitBooking = async () => {
        // Check if user is authenticated
        if (!session?.user) {
            toast.info("Please Sign Up first to complete your booking", {
                icon: () => "🔐",
                style: {
                    background: "#0f172a",
                    color: "#e2e8f0",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(16,185,129,0.15)",
                },
            });
            router.push("/sign-up");
            return;
        }

        setIsSubmitting(true);
        try {
            const { selectedTests, patientInfo, appointment } = formData;

            // Calculate total price
            const testsTotal = selectedTests.reduce((sum, test) => sum + (Number(test.cost) || 0), 0);
            const collectionCharge = appointment.type === 'home-collection' ? 100 : 0;
            const grandTotal = testsTotal + collectionCharge;

            // 1. Create Booking with pending_payment status
            const userId = (session?.user as any)?.id || "guest-user";
            const bookingPayload = {
                userId,
                lab: appointment.labBranchId,
                date: appointment.date,
                status: "pending_payment",
                totalPrice: grandTotal,
                collectionLocation: appointment.type === 'home-collection'
                    ? `${patientInfo.address}, ${patientInfo.city} - ${patientInfo.pincode}`
                    : "Lab Center",
            };

            const bookingResponse = await createBooking(bookingPayload);

            if (!bookingResponse || !bookingResponse.id) {
                throw new Error("Failed to create booking ID");
            }

            const newBookingId = bookingResponse.id;

            // 2. Link Tests
            const testBookingsPayload = selectedTests.map(test => ({
                bookingId: newBookingId,
                testId: test.id,
                resultValue: "",
                remarks: "Pending"
            }));

            await insertTestsBooking(testBookingsPayload);

            // 3. Create Polar checkout session and redirect to payment
            const checkoutResponse = await fetch("/api/polar/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId: newBookingId,
                    amount: grandTotal,
                    customerEmail: patientInfo.email || session?.user?.email || "",
                }),
            });

            if (!checkoutResponse.ok) {
                throw new Error("Failed to create checkout session");
            }

            const { checkoutUrl } = await checkoutResponse.json();

            if (!checkoutUrl) {
                throw new Error("No checkout URL received");
            }

            // 4. Redirect to Polar checkout page
            window.location.href = checkoutUrl;

        } catch (error) {
            console.error("Booking failed:", error);
            toast.error("Failed to process booking. Please try again.");
            setIsSubmitting(false);
        }
    };

    // Render Current Step Component
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1_SelectTests
                        selectedTests={formData.selectedTests}
                        onTestsChange={handleTestsChange}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <Step2_PatientInfo
                        patientInfo={formData.patientInfo}
                        onInfoChange={handlePatientInfoChange}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 3:
                return (
                    <Step3_Appointment
                        appointment={formData.appointment}
                        onAppointmentChange={handleAppointmentChange}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 4:
                return (
                    <Step4_Review
                        formData={formData}
                        onNext={submitBooking}
                        onPrev={prevStep}
                        isSubmitting={isSubmitting}
                    />
                );
            case 5:
                return (
                    <Step5_Success bookingId={bookingId} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 ">
            <ProgressStepper
                currentStep={currentStep}
                totalSteps={totalSteps}
                onStepClick={jumpToStep}
            />

            <div className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Fullscreen Loading Overlay during Payment Redirection */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md"
                    >
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center shadow-2xl max-w-sm mx-4 text-center">
                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-6 relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-xl border-t-2 border-emerald-500 opacity-50"
                                />
                                <div className="w-8 h-8 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Preparing Checkout</h3>
                            <p className="text-slate-400 text-sm">
                                Please wait while we securely redirect you to our payment processor...
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingWizard;
