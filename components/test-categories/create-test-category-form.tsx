"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { insertTestCategory } from "@/utils/data/tests";

const testCategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().optional(),
});

type TestCategoryFormValues = z.infer<typeof testCategoryFormSchema>;

interface CreateTestCategoryFormProps {
  onSuccess?: () => void;
}

export function CreateTestCategoryForm({
  onSuccess,
}: CreateTestCategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestCategoryFormValues>({
    resolver: zodResolver(testCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: TestCategoryFormValues) => {
    setIsSubmitting(true);
    const { name, description } = data;
    insertTestCategory(name, description || "")
      .then(() => {
        onSuccess && onSuccess();
        form.reset();
        setOpen(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Add Test Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Test Category</DialogTitle>
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
