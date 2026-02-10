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
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <CreateLabBranchForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBranches.length > 0 ? (
              paginatedBranches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">{branch.name}</TableCell>
                  <TableCell>
                    {branch.address.length > 30
                      ? `${branch.address.substring(0, 30)}...`
                      : branch.address}
                  </TableCell>
                  <TableCell>
                    <div>{branch.phone}</div>
                    <div className="text-sm text-muted-foreground">
                      {branch.email}
                    </div>
                  </TableCell>
                  <TableCell>{branch.manager_name || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(branch)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(branch)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(branch)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
                <TableCell colSpan={5} className="h-24 text-center">
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
