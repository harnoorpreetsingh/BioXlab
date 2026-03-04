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
import { CreateTestCategoryForm } from "./create-test-category-form";
import { EditTestCategoryForm } from "./edit-test-category-form";
import { ViewTestCategoryDetails } from "./view-test-category-details";
import { DeleteTestCategoryDialog } from "./delete-test-category-dialog";
import { fetchTestCategories } from "@/utils/data/tests";

interface TestCategory {
  id: string;
  name: string;
  description?: string;
}

export function TestCategoriesList() {
  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [loading, setLoading] = useState(true);
  // Modal states
  const [editingCategory, setEditingCategory] = useState<TestCategory | null>(
    null
  );
  const [viewingCategory, setViewingCategory] = useState<TestCategory | null>(
    null
  );
  const [deletingCategory, setDeletingCategory] = useState<TestCategory | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchCategories = async () => {
    const data = await fetchTestCategories();
    setCategories(data);
    setLoading(false);
  };
  // Fetch categories from Supabase
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredCategories.length / Number.parseInt(itemsPerPage)
  );
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage)
  );

  // Handlers
  const handleEdit = (category: TestCategory) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleView = (category: TestCategory) => {
    setViewingCategory(category);
    setIsViewModalOpen(true);
  };

  const handleDelete = (category: TestCategory) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    fetchCategories();
  };

  const handleCreateSuccess = () => {
    fetchCategories();
  };

  const handleEditSuccess = () => {
    fetchCategories();
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[300px] focus-visible:sm:w-[400px] transition-all duration-300 bg-white/5 border-white/10 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20 rounded-full pl-10 text-white placeholder:text-white/30"
            />
          </div>
        </div>
        <CreateTestCategoryForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-b border-white/10">
              <TableHead className="min-w-[150px] text-white/90 font-semibold pl-6">Name</TableHead>
              <TableHead className="flex-1 text-white/90 font-semibold">Description</TableHead>
              <TableHead className="w-[100px] text-center text-white/90 font-semibold pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <TableRow key={category.id} className="border-b border-white/5 hover:bg-white/10 transition-all duration-200">
                  <TableCell className="font-medium text-white/90 group-hover:text-white transition-colors pl-6">{category.name}</TableCell>
                  <TableCell className="text-white/70 group-hover:text-white transition-colors max-w-md truncate">
                    {category.description && category.description.length > 100
                      ? `${category.description.substring(0, 100)}...`
                      : category.description}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(category)}
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category)}
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
                <TableCell colSpan={3} className="h-24 text-center text-white/50">
                  No categories found.
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
            Showing {paginatedCategories.length} of {filteredCategories.length}{" "}
            categories
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
      {editingCategory && (
        <EditTestCategoryForm
          category={editingCategory}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewTestCategoryDetails
        category={viewingCategory}
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      {deletingCategory && (
        <DeleteTestCategoryDialog
          categoryId={deletingCategory.id}
          categoryName={deletingCategory.name}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
