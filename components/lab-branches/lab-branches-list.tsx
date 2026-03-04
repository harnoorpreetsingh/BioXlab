"use client";

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
import { CreateLabBranchForm } from "./create-lab-branch-form";
import { EditLabBranchForm } from "./edit-lab-branch-form";
import { ViewLabBranchDetails } from "./view-lab-branch-details";
import { DeleteLabBranchDialog } from "./delete-lab-branch-dialog";
import { fetchLabBranches } from "@/utils/data/lab-branches";

// Mock data
const mockBranches = [
  {
    id: "1",
    name: "Downtown Lab",
    address: "123 Main St, Downtown, City, 12345",
    phone: "+1 (555) 123-4567",
    email: "downtown@medlab.com",
    opening_hours: "Mon-Fri: 8am-6pm, Sat: 9am-2pm",
    manager_name: "John Smith",
  },
  {
    id: "2",
    name: "Westside Medical Center",
    address: "456 West Ave, Westside, City, 12346",
    phone: "+1 (555) 987-6543",
    email: "westside@medlab.com",
    opening_hours: "Mon-Fri: 7am-7pm, Sat-Sun: 9am-3pm",
    manager_name: "Sarah Johnson",
  },
  {
    id: "3",
    name: "Northside Lab",
    address: "789 North Blvd, Northside, City, 12347",
    phone: "+1 (555) 456-7890",
    email: "northside@medlab.com",
    opening_hours: "Mon-Fri: 8am-5pm",
    manager_name: "David Williams",
  },
  {
    id: "4",
    name: "Eastside Diagnostic Center",
    address: "321 East St, Eastside, City, 12348",
    phone: "+1 (555) 234-5678",
    email: "eastside@medlab.com",
    opening_hours: "24/7",
    manager_name: "Emily Brown",
  },
  {
    id: "5",
    name: "Southside Medical Lab",
    address: "654 South Ave, Southside, City, 12349",
    phone: "+1 (555) 876-5432",
    email: "southside@medlab.com",
    opening_hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
    manager_name: "Michael Jones",
  },
];

interface LabBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  opening_hours?: string;
  manager_name?: string;
}

export function LabBranchesList() {
  const [branches, setBranches] = useState<LabBranch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [loading, setLoading] = useState(true);
  // Modal states
  const [editingBranch, setEditingBranch] = useState<LabBranch | null>(null);
  const [viewingBranch, setViewingBranch] = useState<LabBranch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<LabBranch | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchBranches = async () => {
    const data = await fetchLabBranches();
    data && setBranches(data);
    setLoading(false);
  };
  // Fetch categories from Supabase
  useEffect(() => {
    fetchBranches();
  }, []);

  // Filter branches based on search term
  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.phone.includes(searchTerm) ||
      (branch.manager_name &&
        branch.manager_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredBranches.length / Number.parseInt(itemsPerPage)
  );
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  // Handlers
  const handleEdit = (branch: LabBranch) => {
    setEditingBranch(branch);
    setIsEditModalOpen(true);
  };

  const handleView = (branch: LabBranch) => {
    setViewingBranch(branch);
    setIsViewModalOpen(true);
  };

  const handleDelete = (branch: LabBranch) => {
    setDeletingBranch(branch);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    fetchBranches();
  };

  const handleCreateSuccess = () => {
    // In a real app, you would fetch the updated list

    fetchBranches();
  };

  const handleEditSuccess = () => {
    // In a real app, you would fetch the updated list

    fetchBranches();
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
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 group-focus-within:text-emerald-400 transition-colors" />
            <Input
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[300px] focus-visible:sm:w-[400px] transition-all duration-300 bg-white/5 border-white/10 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 rounded-full pl-10 text-white placeholder:text-white/30"
            />
          </div>
        </div>
        <CreateLabBranchForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-b border-white/10">
              <TableHead className="min-w-[150px] text-white/90 font-semibold pl-6">Name</TableHead>
              <TableHead className="text-white/90 font-semibold">Address</TableHead>
              <TableHead className="text-white/90 font-semibold">Contact</TableHead>
              <TableHead className="text-white/90 font-semibold">Manager</TableHead>
              <TableHead className="w-[100px] text-center text-white/90 font-semibold pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBranches.length > 0 ? (
              paginatedBranches.map((branch) => (
                <TableRow key={branch.id} className="border-b border-white/5 hover:bg-white/10 transition-all duration-200">
                  <TableCell className="font-medium text-white/90 group-hover:text-white transition-colors pl-6">{branch.name}</TableCell>
                  <TableCell className="text-white/70 group-hover:text-white transition-colors">
                    {branch.address.length > 30
                      ? `${branch.address.substring(0, 30)}...`
                      : branch.address}
                  </TableCell>
                  <TableCell className="text-white/70 group-hover:text-white transition-colors">
                    <div>{branch.phone}</div>
                    <div className="text-xs text-white/50">
                      {branch.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70 group-hover:text-white transition-colors">{branch.manager_name || "—"}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(branch)}
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(branch)}
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(branch)}
                        className="h-8 w-8 text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-white/50">
                  No branches found.
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
            Showing {paginatedBranches.length} of {filteredBranches.length}{" "}
            branches
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
      {editingBranch && (
        <EditLabBranchForm
          branch={editingBranch}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewLabBranchDetails
        branch={viewingBranch}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      {deletingBranch && (
        <DeleteLabBranchDialog
          branchId={deletingBranch.id}
          branchName={deletingBranch.name}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
