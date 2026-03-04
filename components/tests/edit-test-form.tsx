"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TestWithCategory } from "./tests-list";
import { updateTest } from "@/utils/data/tests";

const testFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  category: z.string().uuid().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  cost: z.string().optional(),
  ideal_range: z.string().optional(),
  popular: z.boolean(),
  preparation: z.string().optional(),
  report_time: z.string().optional(),
});

type TestFormValues = z.infer<typeof testFormSchema>;

interface EditTestFormProps {
  test: TestWithCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditTestForm({
  test,
  open,
  onOpenChange,
  onSuccess,
}: EditTestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      id: test.id ?? "",
      name: test.name ?? "",
      category: test.test_category?.id ?? "",
      description: test.description ?? "",
      duration: test.duration ?? "",
      cost: test.cost ? String(test.cost) : "",
      ideal_range: test.ideal_range ?? "",
      popular: typeof test.popular === "boolean" ? test.popular : false,
      preparation: test.preparation ?? "",
      report_time: test.report_time ?? "",
    },
  });

  // Update form when test changes
  useEffect(() => {
    if (test && open) {
      form.reset({
        id: test.id ?? "",
        name: test.name ?? "",
        category: test.test_category?.id ?? "",
        description: test.description ?? "",
        duration: test.duration ?? "",
        cost: test.cost ? String(test.cost) : "",
        ideal_range: test.ideal_range ?? "",
        popular: typeof test.popular === "boolean" ? test.popular : false,
        preparation: test.preparation ?? "",
        report_time: test.report_time ?? "",
      });
    }
  }, [test, form, open]);

  async function onSubmit(data: TestFormValues) {
    setIsSubmitting(true);
    updateTest(test.id, data)
      .then(() => {
        onOpenChange(false);
        onSuccess();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-2xl font-semibold text-white tracking-tight">Edit Test</DialogTitle>
          <p className="text-sm text-white/50">Update details for this diagnostic test.</p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-white/80">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Test name"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-white/80">Category ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category ID"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-white/80">Cost</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cost"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter test description"
                      {...field}
                      className="resize-none min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Duration"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="report_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Report Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 24 hours"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ideal_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Ideal Range</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ideal range"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Popular */}
              <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Popular</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value ? "true" : "false"}
                        onChange={e => field.onChange(e.target.value === "true")}
                      >
                        <option value="true" className="bg-zinc-900 text-white">Yes</option>
                        <option value="false" className="bg-zinc-900 text-white">No</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Preparation */}
            <FormField
              control={form.control}
              name="preparation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Preparation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Preparation instructions"
                      {...field}
                      className="resize-none min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-8 pt-4 border-t border-white/10 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update Test"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
