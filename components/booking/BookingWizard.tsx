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

interface BookingFormData {
    selectedTests: TestWithCategory[];
    patientInfo: any;
    appointment: any;
}

const BookingWizard = () => {
    const { data: session } = useSession();
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
        } finally {
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
        </div>
    );
};

export default BookingWizard;
