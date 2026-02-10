"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Mail, Phone, Clock, User } from "lucide-react"

interface LabBranch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  opening_hours?: string
  manager_name?: string
}

interface ViewLabBranchDetailsProps {
  branch: LabBranch | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewLabBranchDetails({ branch, open, onOpenChange }: ViewLabBranchDetailsProps) {
  if (!branch) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Lab Branch Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{branch.name}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="whitespace-pre-line">{branch.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{branch.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{branch.phone}</p>
                  </div>
                </div>

                {branch.opening_hours && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Opening Hours</p>
                      <p>{branch.opening_hours}</p>
                    </div>
                  </div>
                )}

                {branch.manager_name && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Manager</p>
                      <p>{branch.manager_name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
