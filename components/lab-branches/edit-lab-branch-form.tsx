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
import { updateLabBranch } from "@/utils/data/lab-branches";

const labBranchFormSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  opening_hours: z.string().optional(),
  manager_name: z.string().optional(),
});

type LabBranchFormValues = z.infer<typeof labBranchFormSchema>;

interface EditLabBranchFormProps {
  branch: LabBranchFormValues;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditLabBranchForm({
  branch,
  open,
  onOpenChange,
  onSuccess,
}: EditLabBranchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LabBranchFormValues>({
    resolver: zodResolver(labBranchFormSchema),
    defaultValues: branch,
  });

  // Update form when branch changes
  useEffect(() => {
    if (branch && open) {
      form.reset(branch);
    }
  }, [branch, form, open]);

  async function onSubmit(data: LabBranchFormValues) {
    setIsSubmitting(true);

    updateLabBranch(branch.id, data)
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
          <DialogTitle>Edit Lab Branch</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Full address"
                      className="resize-none min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="branch@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="opening_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Hours</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mon-Fri: 9am-5pm, Sat: 10am-2pm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manager_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Branch manager name" {...field} />
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
                {isSubmitting ? "Saving..." : "Update Branch"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
