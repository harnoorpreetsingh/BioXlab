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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertTest, fetchTestCategories } from "@/utils/data/tests";

const testFormSchema = z.object({
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

export type TestFormValues = z.infer<typeof testFormSchema>;

interface Category {
  id: string;
  name: string;
}

interface CreateTestFormProps {
  onSuccess?: () => void;
}

export function CreateTestForm({ onSuccess }: CreateTestFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      duration: "",
      cost: "",
      ideal_range: "",
      popular: false,
      preparation: "",
      report_time: "",
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      const data = await fetchTestCategories();
      setCategories(data || []);
    }

    fetchCategories();
  }, []);

  async function onSubmit(data: TestFormValues) {
    setIsSubmitting(true);
    insertTest(data)
      .then(() => {
        onSuccess && onSuccess();
        form.reset();
        setOpen(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" /> Add Test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Test</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
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

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Test duration (e.g., 1 hour)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cost */}
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


            {/* Ideal Range */}
            <FormField
              control={form.control}
              name="ideal_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ideal Range</FormLabel>
                  <FormControl>
                    <Input placeholder="Ideal range for the test" {...field} />
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
                    <Select
                      onValueChange={val => field.onChange(val === "true")}
                      value={field.value ? "true" : "false"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is this test popular?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prepration */}
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Test"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
