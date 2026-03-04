"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface TestCategory {
  id: string
  name: string
  description?: string
}

interface ViewTestCategoryDetailsProps {
  category: TestCategory | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewTestCategoryDetails({ category, open, onOpenChange }: ViewTestCategoryDetailsProps) {
  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-semibold text-white tracking-tight">Category Details</DialogTitle>
        </DialogHeader>

        <Card className="bg-white/5 border-white/10 shadow-none mt-4">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
                <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <FileText className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-white/50 text-sm mt-1">Test Category</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Description</p>
                  <p className="text-white/80 leading-relaxed text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                    {category.description || "No description provided."}
                  </p>
                </div>
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
