"use client";

import { useSearchParams } from "next/navigation";
import { DashboardOverview } from "./_components/DashboardOverview";
import { TestCategoriesList } from "@/components/test-categories/test-categories-list";
import { LabBranchesList } from "@/components/lab-branches/lab-branches-list";
import { PatientsList } from "@/components/patients/patients-list";
import { TestList } from "@/components/tests/tests-list";
import ProfilePage from "@/components/profile";
import PatientBookingsPage from "@/common/PatientDetailsPage";
import PatientDetailsPageForAdmin from "@/common/PatientDetailsPageForAdmin";
import BookingDetailsPageForAdmin from "@/common/BookingDetailsPageForAdmin";
import PatientBookingDetailsPage from "@/common/BookingDetailsPage";
import { NotificationsList } from "@/components/notifications/NotificationsList";
// import { AdminsList } from "@/components/admins/admin-list";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  return (
    <div className="w-full animate-in fade-in duration-500">
      {tab === "dashboard" && <DashboardOverview />}

      {/* Management Views */}
      {tab === "patients" && <PatientsList />}
      {tab === "test-categories" && <TestCategoriesList />}
      {tab === "lab-branches" && <LabBranchesList />}
      {tab === "tests" && <TestList />}
      {tab === "notifications" && <NotificationsList />}

      {/* Profile & User Views */}
      {tab === "profile" && <ProfilePage />}
      {tab === "bookings" && <PatientBookingsPage />}

      {/* Detail Views */}
      {tab === "patientBookings" && <PatientDetailsPageForAdmin />}
      {tab === "adminViewBooking" && <BookingDetailsPageForAdmin />}
      {tab === "viewBooking" && <PatientBookingDetailsPage />}
    </div>
  );
}
