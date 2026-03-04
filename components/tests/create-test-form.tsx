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
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02]">
          <Plus className="mr-2 h-4 w-4" /> Add Test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-2xl font-semibold text-white tracking-tight">Add New Test</DialogTitle>
          <p className="text-sm text-white/50">Enter the details for the new diagnostic test.</p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
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

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-white/80">Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id} className="focus:bg-white/10 focus:text-white">
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Cost */}
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter test description"
                      className="resize-none min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Duration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 1 hour"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Report Time */}
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

            {/* Ideal Range */}
            <FormField
              control={form.control}
              name="ideal_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Ideal Range</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ideal range for the test"
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
                      <Select
                        onValueChange={val => field.onChange(val === "true")}
                        value={field.value ? "true" : "false"}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20">
                          <SelectValue placeholder="Is this test popular?" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="true" className="focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="false" className="focus:bg-white/10 focus:text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
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
                onClick={() => setOpen(false)}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20"
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
