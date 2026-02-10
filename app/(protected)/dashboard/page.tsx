"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Activity,
  Users,
  Building,
  Beaker,
  ChevronRight,
  User,
  ShieldCheck,
  FolderKanban,
  FlaskConical,
  MapPin,
  UserCircle,
  LogOut,
  Home,
  BookMarked,
} from "lucide-react";
import { TestCategoriesList } from "@/components/test-categories/test-categories-list";
import { LabBranchesList } from "@/components/lab-branches/lab-branches-list";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { PatientsList } from "@/components/patients/patients-list";
import { AdminsList } from "@/components/admins/admin-list";
import { TestList } from "@/components/tests/tests-list";
import ProfilePage from "@/components/profile";
import PatientBookingsPage from "@/common/PatientDetailsPage";
import PatientDetailsPageForAdmin from "@/common/PatientDetailsPageForAdmin";
import BookingDetailsPageForAdmin from "@/common/BookingDetailsPageForAdmin";
import PatientBookingDetailsPage from "@/common/BookingDetailsPage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrentUser } from "@/providers/AuthProvider";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const contentRef = useRef<HTMLDivElement>(null);
  const { appUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState(() => {
    if (tab) return tab;
    if (appUser?.role === "admin") return "patients";
    return "bookings";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile(); // Adjust this value as needed for your mobile breakpoint
  const router = useRouter();
  // Effect to update activeTab when search params change
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/sign-in");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Error logging out: " + error.message);
    }
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-teal-800 text-white z-30 fixed h-full transition-all duration-300 ease-in-out ${
          sidebarOpen ? "max-sm:w-full w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-teal-700">
          {sidebarOpen && <h2 className="text-xl font-bold min-w-max">Menu</h2>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-teal-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            active={false}
            onClick={() => router.push("/")}
            collapsed={!sidebarOpen}
          />

          {appUser?.role === "admin" && (
            <SidebarItem
              icon={<User size={20} />}
              text="Patients"
              active={activeTab === "patients"}
              onClick={() => {
                router.push("/dashboard?tab=patients");
                setActiveTab("patients");
                isMobile && setSidebarOpen(false);
              }}
              collapsed={!sidebarOpen}
            />
          )}
          {appUser?.role === "admin" && (
            <SidebarItem
              icon={<FlaskConical size={20} />}
              text="Tests"
              active={activeTab === "tests"}
              onClick={() => {
                router.push("/dashboard?tab=tests");
                setActiveTab("tests");
                isMobile && setSidebarOpen(false);
              }}
              collapsed={!sidebarOpen}
            />
          )}
          {appUser?.role === "admin" && (
            <SidebarItem
              icon={<FolderKanban size={20} />}
              text="Test Categories"
              active={activeTab === "test-categories"}
              onClick={() => {
                router.push("/dashboard?tab=test-categories");
                setActiveTab("test-categories");
                isMobile && setSidebarOpen(false);
              }}
              collapsed={!sidebarOpen}
            />
          )}
          {appUser?.role === "admin" && (
            <SidebarItem
              icon={<MapPin size={20} />}
              text="Lab Branches"
              active={activeTab === "lab-branches"}
              onClick={() => {
                router.push("/dashboard?tab=lab-branches");
                setActiveTab("lab-branches");
                isMobile && setSidebarOpen(false);
              }}
              collapsed={!sidebarOpen}
            />
          )}
          {appUser?.role === "user" && (
            <SidebarItem
              icon={<BookMarked  size={20} />}
              text="My Bookings"
              active={activeTab === "bookings"}
              onClick={() => {
                router.push("/dashboard?tab=bookings");
                setActiveTab("bookings");
                isMobile && setSidebarOpen(false);
              }}
              collapsed={!sidebarOpen}
            />
          )}
          {/* <SidebarItem
            icon={<ShieldCheck size={20} />}
            text="Admins"
            active={activeTab === "admins"}
            onClick={() => setActiveTab("admins")}
            collapsed={!sidebarOpen}
          /> */}
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Profile"
            active={activeTab === "profile"}
            onClick={() => {
              router.push("/dashboard?tab=profile");
              setActiveTab("profile");
              isMobile && setSidebarOpen(false);
            }}
            collapsed={!sidebarOpen}
          />
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
            onClick={() => {
              handleSignOut();
            }}
            collapsed={!sidebarOpen}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out max-w-full overflow-x-auto ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="bg-white shadow-sm">
          <div className="py-4 px-6 flex items-center">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
            >
              <Activity className="text-teal-600 mr-2" size={24} />
              <span className="text-2xl font-bold text-gray-800">
                BioXLab Medical Laboratory
              </span>
            </button>{" "}
          </div>
        </header>

        <main className="sm:p-6">
          <div
            ref={contentRef}
            className="bg-white rounded-lg shadow-sm sm:px-6 py-6"
          >
            <h2 className="text-xl font-semibold text-teal-700 mb-6">
              {activeTab === "patients" && "Patients Management"}
              {activeTab === "test-categories" && "Test Categories Management"}
              {activeTab === "lab-branches" && "Lab Branches Management"}
              {/* {activeTab === "admins" && "Admins Management"} */}
              {activeTab === "tests" && "Tests Management"}
            </h2>

            {activeTab === "patients" && <PatientsList />}
            {activeTab === "test-categories" && <TestCategoriesList />}
            {activeTab === "lab-branches" && <LabBranchesList />}
            {/* {activeTab === "admins" && <AdminsList />} */}
            {activeTab === "tests" && <TestList />}
            {activeTab === "profile" && <ProfilePage />}
            {activeTab === "bookings" && <PatientBookingsPage />}
            {activeTab === "patientBookings" && <PatientDetailsPageForAdmin />}
            {activeTab === "adminViewBooking" && <BookingDetailsPageForAdmin />}
            {activeTab === "viewBooking" && <PatientBookingDetailsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

// TypeScript interface for SidebarItem props
interface SidebarItemProps {
  icon?: React.ReactNode;
  text?: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

// Sidebar Item Component
function SidebarItem({
  icon,
  text,
  active,
  onClick,
  collapsed,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 mb-1 transition-colors ${
        active ? "bg-teal-700 text-white" : "text-teal-100 hover:bg-teal-700"
      }`}
    >
      <div className={`${collapsed ? "mx-auto" : ""}`}>{icon}</div>

      {!collapsed && (
        <>
          <span className="ml-3 text-sm font-medium min-w-max">{text}</span>
          {active && <ChevronRight size={16} className="ml-auto" />}
        </>
      )}
    </button>
  );
}
