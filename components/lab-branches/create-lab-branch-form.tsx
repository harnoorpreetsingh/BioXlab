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
import { insertLabBranch } from "@/utils/data/lab-branches";

const labBranchFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  opening_hours: z.string().optional(),
  manager_name: z.string().optional(),
});

export type LabBranchFormValues = z.infer<typeof labBranchFormSchema>;

interface CreateLabBranchFormProps {
  onSuccess?: () => void;
}

export function CreateLabBranchForm({ onSuccess }: CreateLabBranchFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LabBranchFormValues>({
    resolver: zodResolver(labBranchFormSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      opening_hours: "",
      manager_name: "",
    },
  });

  const onSubmit = async (data: LabBranchFormValues) => {
    setIsSubmitting(true);
    insertLabBranch(data)
      .then(() => {
        onSuccess?.();
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
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02]">
          <Plus className="mr-2 h-4 w-4" /> Add Lab Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl text-white">
        <DialogHeader className="pb-4 border-b border-white/10">
          <DialogTitle className="text-2xl font-semibold text-white tracking-tight">Add New Lab Branch</DialogTitle>
          <p className="text-sm text-white/50">Enter details for the new laboratory location.</p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4 animate-in fade-in zoom-in-95 duration-300">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Branch Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Branch name"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Full address"
                      className="resize-none min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 000-0000"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="branch@example.com"
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
              name="opening_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Opening Hours</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mon-Fri: 9am-5pm, Sat: 10am-2pm"
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
              name="manager_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Manager Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Branch manager name"
                      {...field}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
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
                {isSubmitting ? "Saving..." : "Save Branch"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
