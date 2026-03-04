"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { TestWithCategory } from "./tests-list";

interface ViewTestDetailsProps {
  test: TestWithCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTestDetails({
  test,
  open,
  onOpenChange,
}: ViewTestDetailsProps) {
  if (!test) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-xl font-semibold text-white tracking-tight">Test Details</DialogTitle>
        </DialogHeader>

        <Card className="bg-white/5 border-white/10 shadow-none mt-4">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
                <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <FileText className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{test.name}</h3>
                  {test.test_category && (
                    <p className="text-emerald-400 text-sm mt-1 font-medium">{test.test_category.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {test.description && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Description</p>
                    <p className="text-white/80 leading-relaxed text-sm">{test.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {test.duration && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Duration</p>
                      <p className="text-white/90 text-sm">{test.duration}</p>
                    </div>
                  )}

                  {test.cost && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Cost</p>
                      <p className="text-emerald-400 font-semibold text-sm">${test.cost}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {test.ideal_range && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Ideal Range</p>
                      <div className="bg-white/5 px-2 py-1 rounded border border-white/10 inline-block text-sm text-white/80">
                        {test.ideal_range}
                      </div>
                    </div>
                  )}

                  {typeof test.popular !== 'undefined' && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Popular</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${test.popular ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                        {test.popular ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                </div>

                {test.preparation && (
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Preparation</p>
                    <p className="text-white/80 text-sm italic">{test.preparation}</p>
                  </div>
                )}

                {test.report_time && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-1">Report Time</p>
                    <p className="text-white/90 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {test.report_time}
                    </p>
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
  );
}
