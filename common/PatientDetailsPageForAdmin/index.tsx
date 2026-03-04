"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PatientInfoCard } from "@/components/patient-info-card";
import { BookingList } from "@/components/booking-list";
import { fetchAllBookings, fetchUserById } from "@/utils/data/users";
import { Booking } from "@/types";
// import {
//   getPatientById,
//   getPatientBookings,
//   getBookingWithDetails,
// } from "@/data/mock-data";

export default function PatientDetailsPageForAdmin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const patientId = useSearchParams().get("patientId") || "";

  const fetchPatient = async () => {
    const data = await fetchUserById(patientId);
    if (data) {
      setPatient(data);
    }
  };
  const fetchBookings = async () => {
    const data = await fetchAllBookings(patientId);
    if (data) {
      setBookings(data);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient().finally(() => {
        setIsLoading(false);
      });
      fetchBookings();
    }
  }, [patientId]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // GSAP animations
    const timeline = gsap.timeline({ delay: 0.5 });

    timeline.fromTo(
      ".page-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    timeline.fromTo(
      ".patient-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    timeline.fromTo(
      ".bookings-list",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    return () => {
      clearTimeout(timer);
      timeline.kill();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            Patient not found
          </h2>
          <p className="mt-2 text-gray-500">
            The patient you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/dashboard?tab=patients")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center mb-8 page-header">
        <Button
          variant="ghost"
          size="sm"
          className="mr-6 text-white/60 hover:text-white hover:bg-white/10 -ml-2 transition-all duration-300 group"
          onClick={() => router.push("/dashboard?tab=patients")}
        >
          <div className="bg-white/5 p-2 rounded-full mr-3 group-hover:bg-emerald-500/20 transition-colors">
            <ArrowLeft className="h-4 w-4 text-white/70 group-hover:text-emerald-400" />
          </div>
          <span className="text-lg">Back to Patients</span>
        </Button>
      </div>

      <div className="flex flex-col gap-2 mb-8 px-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Patient Details
        </h1>
        <p className="text-white/50 text-lg">
          View and manage patient information and booking history.
        </p>
      </div>

      <div className="grid gap-8">
        <div className="patient-card">
          <PatientInfoCard patient={patient} />
        </div>

        <div className="bookings-list">
          <BookingList bookings={bookings} patientId={patientId} />
        </div>
      </div>
    </div>
  );
}
