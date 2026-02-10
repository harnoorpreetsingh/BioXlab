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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Test Category Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{category.name}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{category.description || "No description provided."}</p>
                </div>
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
