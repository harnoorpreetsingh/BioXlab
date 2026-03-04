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
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-semibold text-white tracking-tight">Lab Branch Details</DialogTitle>
        </DialogHeader>

        <Card className="bg-white/5 border-white/10 shadow-none mt-4">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
                <div className="h-14 w-14 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                  <Building2 className="h-7 w-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{branch.name}</h3>
                  <p className="text-white/50 text-sm mt-1">Branch Location</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Address</p>
                    <p className="whitespace-pre-line text-white/90 text-sm">{branch.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Mail className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Email</p>
                      <p className="text-white/90 text-sm truncate max-w-[150px]">{branch.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Phone className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Phone</p>
                      <p className="text-white/90 text-sm">{branch.phone}</p>
                    </div>
                  </div>
                </div>

                {branch.opening_hours && (
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Clock className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Opening Hours</p>
                      <p className="text-white/90 text-sm">{branch.opening_hours}</p>
                    </div>
                  </div>
                )}

                {branch.manager_name && (
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <User className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Manager</p>
                      <p className="text-white/90 text-sm">{branch.manager_name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="mt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-white/5 hover:bg-white/10 text-white border-white/10 w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
