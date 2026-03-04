// @ts-nocheck
"use client";

import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Trash2, Search, Loader } from "lucide-react";
// import { ViewPatientDetails } from "./view-patient-details";
// import { CreatePatientForm } from "./create-patient-form";
import { EditPatientForm } from "./edit-patient-form";
import { DeletePatientDialog } from "./delete-patient-dialog";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/utils/data/users";
import { IExtendedUser } from "@/types";

// Mock data
// const mockPatients = [
//   {
//     id: "1",
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     gender: "male",
//     dob: "1990-01-15",
//     phone: "+1 (555) 123-4567",
//     address: "123 Elm Street",
//   },
//   {
//     id: "2",
//     first_name: "Jane",
//     last_name: "Smith",
//     email: "jane.smith@example.com",
//     gender: "female",
//     dob: "1985-05-30",
//     phone: "+1 (555) 987-6543",
//     address: "456 Oak Avenue",
//   },
// ];

// interface Patient {
//   id: string;
//   first_name: string;
//   last_name?: string;
//   email: string;
//   gender: string;
//   date_of_birth: string;
//   phone: string;
//   address: string;
// }
type Patient = any;

export function PatientsList() {
  const [patients, setPatients] = useState<IExtendedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [loading, setLoading] = useState(true);
  // Modal states
  const [editingPatient, setEditingPatient] = useState<IExtendedUser | null>(
    null
  );
  // const [viewingPatient, setViewingPatient] = useState<IExtendedUser | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<IExtendedUser | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchUsersData = async () => {
    const data = await fetchUsers();
    setPatients(data);
    setLoading(false);
  };
  // Fetch categories from Supabase
  useEffect(() => {
    fetchUsersData();
  }, []);

  const router = useRouter();
  // Filter based on search term
  const filteredPatients = patients.filter(
    (patient) => {
      const firstName = (patient as any).firstName || (patient as any).first_name || '';
      const lastName = (patient as any).lastName || (patient as any).last_name || '';
      const email = patient.email || '';
      const phone = patient.phone || '';

      return firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm);
    }
  );

  const totalPages = Math.ceil(
    filteredPatients.length / Number.parseInt(itemsPerPage)
  );
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  // Handlers
  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setIsEditModalOpen(true);
  };

  // const handleView = (patient: Patient) => {
  //   setViewingPatient(patient);
  //   setIsViewModalOpen(true);
  // };

  const handleDelete = (patient: Patient) => {
    setDeletingPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    if (deletingPatient) {
      setPatients(patients.filter((p) => p.id !== deletingPatient.id));
    }
  };

  // const handleCreateSuccess = () => {
  //   console.log("Patient created successfully");
  // };

  const handleEditSuccess = () => {
    fetchUsersData();
  };

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-12">
            <Loader className="animate-spin" />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 group-focus-within:text-emerald-400 transition-colors" />
            <Input
              placeholder="Search patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[300px] focus-visible:sm:w-[400px] transition-all duration-300 bg-white/5 border-white/10 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 rounded-full pl-10 text-white placeholder:text-white/30"
            />
          </div>
        </div>
        {/* <CreatePatientForm onSuccess={handleCreateSuccess} /> */}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-b border-white/10">
              <TableHead className="min-w-[150px] text-white/90 font-semibold pl-6">Name</TableHead>
              <TableHead className="text-white/90 font-semibold">Email</TableHead>
              <TableHead className="min-w-[150px] text-white/90 font-semibold">Phone</TableHead>
              <TableHead className="min-w-[130px] text-white/90 font-semibold">Gender</TableHead>
              <TableHead className="min-w-[150px] text-white/90 font-semibold">DOB</TableHead>
              <TableHead className="w-[100px] text-center text-white/90 font-semibold pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => {
                const firstName = (patient as any).firstName || patient.first_name || '';
                const lastName = (patient as any).lastName || patient.last_name || '';
                const dateOfBirth = (patient as any).dateOfBirth || patient.date_of_birth || '';
                // Format date to remove timestamp
                const formattedDOB = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : '';

                return (
                  <TableRow key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <TableCell className="font-medium text-white/90 group-hover:text-white transition-colors pl-6">
                      {firstName} {lastName}
                    </TableCell>
                    <TableCell className="text-white/70 group-hover:text-white transition-colors">{patient.email}</TableCell>
                    <TableCell className="text-white/70 group-hover:text-white transition-colors">{patient.phone}</TableCell>
                    <TableCell className="capitalize text-white/70">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        patient.gender?.toLowerCase() === 'male'
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-pink-500/10 text-pink-400 border-pink-500/20"
                      )}>
                        {patient.gender}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/70 group-hover:text-white transition-colors">{formattedDOB}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(
                              `/dashboard?tab=patientBookings&patientId=${patient.id}`
                            )
                          }
                          className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(patient)}
                          className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(patient)}
                          className="h-8 w-8 text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-white/50">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex max-sm:flex-col-reverse max-sm:gap-y-5 items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedPatients.length} of {filteredPatients.length}{" "}
            patients
          </p>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">per page</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      {editingPatient && (
        <EditPatientForm
          patient={editingPatient}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* <ViewPatientDetails
        patient={viewingPatient}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      /> */}

      {deletingPatient && (
        <DeletePatientDialog
          auth_id={deletingPatient.auth_id || ""}
          patientId={deletingPatient.id}
          patientName={`${deletingPatient.first_name} ${deletingPatient.last_name}`}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
