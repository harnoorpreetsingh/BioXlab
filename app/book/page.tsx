import BookingWizard from "@/components/booking/BookingWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book a Test | BioXLab",
    description: "Schedule your lab tests online easily with BioXLab. Choose from a wide range of diagnostic tests and book your appointment in minutes.",
};

export default function BookTestPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24">
            <BookingWizard />
        </main>
    );
}
