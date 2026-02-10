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
import { CreateTestForm, TestFormValues } from "./create-test-form";
import { EditTestForm } from "./edit-test-form";
import { ViewTestDetails } from "./view-test-details";
import { DeleteTestDialog } from "./delete-test-dialog";
import { fetchTests } from "@/utils/data/tests";

// Mock data
// const mockTests = [
//   {
//     id: "1",
//     name: "Blood Test",
//     category: "Blood Tests",
//     description: "Tests that analyze blood components",
//     duration: "1 hour",
//     cost: 100,
//     ideal_range: "Normal",
//   },
//   {
//     id: "2",
//     name: "MRI",
//     category: "Imaging",
//     description: "X-rays, MRIs, CT scans, and other imaging tests",
//     duration: "2 hours",
//     cost: 500,
//     ideal_range: "Normal",
//   },
//   {
//     id: "3",
//     name: "Urine Test",
//     category: "Urinalysis",
//     description:
//       "Tests that examine the physical, chemical, and microscopic properties of urine",
//     duration: "30 minutes",
//     cost: 50,
//     ideal_range: "Normal",
//   },
// ];

export interface TestWithCategory extends TestFormValues {
  id: string;
  created_at?: string;
  updated_at?: string;
  test_category?: {
    id?: string;
    name?: string;
    description?: string;
  };
}

export function TestList() {
  const [tests, setTests] = useState<TestWithCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [loading, setLoading] = useState(true);
  // Modal states
  const [editingTest, setEditingTest] = useState<TestWithCategory | null>(null);
  const [viewingTest, setViewingTest] = useState<TestWithCategory | null>(null);
  const [deletingTest, setDeletingTest] = useState<TestWithCategory | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchTestsData = async () => {
    const data = await fetchTests();
    setTests(data);
    setLoading(false);
  };

  // Fetch categories from Supabase
  useEffect(() => {
    fetchTestsData();
  }, []);

  // Filter tests based on search term
  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (test.description &&
        test.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredTests.length / Number.parseInt(itemsPerPage)
  );
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  // Handlers
  const handleEdit = (test: TestWithCategory) => {
    setEditingTest(test);
    setIsEditModalOpen(true);
  };

  const handleView = (test: TestWithCategory) => {
    setViewingTest(test);
    setIsViewModalOpen(true);
  };

  const handleDelete = (test: TestWithCategory) => {
    setDeletingTest(test);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    fetchTestsData();
  };

  const handleCreateSuccess = () => {
    // In a real app, you would fetch the updated list
    fetchTestsData();
  };

  const handleEditSuccess = () => {
    // In a real app, you would fetch the updated list
    fetchTestsData();
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
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <CreateTestForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTests.length > 0 ? (
              paginatedTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.name}</TableCell>
                  <TableCell>{test.test_category?.name}</TableCell>
                  <TableCell>
                    {test.description && test.description.length > 100
                      ? `${test.description.substring(0, 100)}...`
                      : test.description}
                  </TableCell>
                  <TableCell>${test.cost || test.price || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(test)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(test)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(test)}
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
                <TableCell colSpan={7} className="h-24 text-center">
                  No tests found.
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
            Showing {paginatedTests.length} of {filteredTests.length} tests
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
      {editingTest && (
        <EditTestForm
          test={editingTest}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewTestDetails
        test={viewingTest}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      {deletingTest && (
        <DeleteTestDialog
          testId={deletingTest.id}
          testName={deletingTest.name}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
