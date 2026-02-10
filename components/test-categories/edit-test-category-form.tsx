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
import { updateTestCategory } from "@/utils/data/tests";

const testCategoryFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
});

type TestCategoryFormValues = z.infer<typeof testCategoryFormSchema>;

interface EditTestCategoryFormProps {
  category: TestCategoryFormValues;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditTestCategoryForm({
  category,
  open,
  onOpenChange,
  onSuccess,
}: EditTestCategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestCategoryFormValues>({
    resolver: zodResolver(testCategoryFormSchema),
    defaultValues: category,
  });

  // Update form when category changes
  useEffect(() => {
    if (category && open) {
      form.reset(category);
    }
  }, [category, form, open]);

  async function onSubmit(data: TestCategoryFormValues) {
    setIsSubmitting(true);

    updateTestCategory(data.id, data.name, data.description || "")
      .then(() => {
        onOpenChange(false);

        if (onSuccess) onSuccess();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Test Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
