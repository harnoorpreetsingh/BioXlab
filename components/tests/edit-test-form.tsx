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
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
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
                    <Input placeholder="Test name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category ID" {...field} />
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
                      placeholder="Enter test description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="Duration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input placeholder="Cost" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ideal_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ideal Range</FormLabel>
                  <FormControl>
                    <Input placeholder="Ideal range" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Popular */}
            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popular</FormLabel>
                  <FormControl>
                    <select
                      className="input"
                      value={field.value ? "true" : "false"}
                      onChange={e => field.onChange(e.target.value === "true")}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preparation */}
            <FormField
              control={form.control}
              name="preparation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Preparation instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Report Time */}
            <FormField
              control={form.control}
              name="report_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Time</FormLabel>
                  <FormControl>
                    <Input placeholder="Report time (e.g., 24 hours)" {...field} />
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
                {isSubmitting ? "Saving..." : "Update Test"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
