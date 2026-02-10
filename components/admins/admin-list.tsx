"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Pencil, Trash2, Search } from "lucide-react"
import { CreateAdminForm } from "./create-admin-form"
import { EditAdminForm } from "./edit-admin-form"
import { ViewAdminDetails } from "./view-admin-details"
import { DeleteAdminDialog } from "./delete-admin-dialog"
import { fetchAdmins } from "@/utils/data/admins"

interface Admin {
  id: string
  email: string
  first_name: string
  last_name?: string
  gender: "male" | "female" | "other"
  dob: string
  mobile: string
  address: string
}

export function AdminsList() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")

  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [viewingAdmin, setViewingAdmin] = useState<Admin | null>(null)
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const loadAdmins = async () => {
    setLoading(true)
    try {
      const data = await fetchAdmins()
      setAdmins(data)
    } catch (error) {
      console.error("Error loading admins:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdmins()
  }, [])

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.last_name && admin.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.mobile.includes(searchTerm),
  )

  const totalPages = Math.ceil(filteredAdmins.length / Number.parseInt(itemsPerPage))
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * Number.parseInt(itemsPerPage),
    currentPage * Number.parseInt(itemsPerPage),
  )

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setIsEditModalOpen(true)
  }

  const handleView = (admin: Admin) => {
    setViewingAdmin(admin)
    setIsViewModalOpen(true)
  }

  const handleDelete = (admin: Admin) => {
    setDeletingAdmin(admin)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = () => {
    loadAdmins()
  }

  const handleCreateSuccess = () => {
    loadAdmins()
  }

  const handleEditSuccess = () => {
    loadAdmins()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <CreateAdminForm onSuccess={handleCreateSuccess} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading admins...
                </TableCell>
              </TableRow>
            ) : paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    {admin.first_name} {admin.last_name}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.mobile}</TableCell>
                  <TableCell>{admin.dob}</TableCell>
                  <TableCell className="capitalize">{admin.gender}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(admin)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(admin)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(admin)}
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
                <TableCell colSpan={6} className="h-24 text-center">
                  No admins found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedAdmins.length} of {filteredAdmins.length} admins
          </p>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value)
              setCurrentPage(1)
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      {editingAdmin && (
        <EditAdminForm
          admin={editingAdmin}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSuccess={handleEditSuccess}
        />
      )}

      <ViewAdminDetails admin={viewingAdmin} open={isViewModalOpen} onOpenChange={setIsViewModalOpen} />

      {deletingAdmin && (
        <DeleteAdminDialog
          adminId={deletingAdmin.id}
          adminName={`${deletingAdmin.first_name} ${deletingAdmin.last_name}`}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  )
}
