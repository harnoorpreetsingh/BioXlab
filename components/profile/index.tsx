"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { gsap } from "gsap";
import { Save, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/providers/AuthProvider";
import { updateCurrentUserProfile } from "@/utils/data/users";
import { useRouter } from "next/navigation";
import { CustomDatePicker } from "@/common/CustomDatePicker";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth.",
  }),
  phone: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { appUser, refreshAppUser } = useCurrentUser();
  const router = useRouter();
  // Mock user data - in a real app, this would come from an API
  const defaultValues = {
    firstName: appUser?.firstName || "",
    lastName: appUser?.lastName || "",
    email: appUser?.email || "",
    gender: appUser?.gender || "",
    dateOfBirth:
      (appUser?.dateOfBirth && new Date(appUser.dateOfBirth)) || new Date(),
    phone: appUser?.phone || "",
    address: appUser?.address || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Update form when appUser changes
  useEffect(() => {
    if (appUser) {
      form.reset({
        firstName: appUser.firstName || "",
        lastName: appUser.lastName || "",
        email: appUser.email || "",
        gender: appUser.gender || "",
        dateOfBirth: appUser.dateOfBirth ? new Date(appUser.dateOfBirth) : new Date(),
        phone: appUser.phone || "",
        address: appUser.address || "",
      });
    }
  }, [appUser, form]);

  // GSAP animations
  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      ".profile-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    timeline.fromTo(
      ".form-field",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { dateOfBirth, ...restValues } = values;
    const userData = {
      ...restValues,
      dateOfBirth: dateOfBirth.toISOString(),
    };
    updateCurrentUserProfile(appUser?.id!, userData)
      .then(async () => {
        // Refresh the user data to reflect changes
        await refreshAppUser();

        const saveBtn = document.querySelector(".save-button");
        if (saveBtn) {
          gsap.to(saveBtn, {
            backgroundColor: "rgb(5, 150, 105)", // emerald-600
            duration: 0.3,
            onComplete: () => {
              gsap.to(saveBtn, {
                backgroundColor: "", // Revert to class style
                duration: 0.5,
                delay: 0.5,
              });
            },
          });
        }
        appUser?.role === "admin"
          ? router.push("/dashboard?tab=patients")
          : router.push("/dashboard?tab=bookings");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 rounded-full bg-emerald-500 mr-4 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Profile</h1>
      </div>

      <Card className="profile-card border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl text-white">
        <CardHeader className="bg-white/5 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <User size={36} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white tracking-tight">
                Personal Information
              </CardTitle>
              <CardDescription className="text-white/50 text-base mt-1">
                Update your personal details and contact information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-white/70">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-white/70">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-white/70">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormDescription className="text-white/40">
                      This email will be used for all communications.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-white/70">Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white data-[placeholder]:text-white/30 focus:ring-emerald-500/50 focus:border-emerald-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl">
                          <SelectItem value="male" className="focus:bg-emerald-500/20 focus:text-white cursor-pointer">Male</SelectItem>
                          <SelectItem value="female" className="focus:bg-emerald-500/20 focus:text-white cursor-pointer">Female</SelectItem>
                          <SelectItem value="other" className="focus:bg-emerald-500/20 focus:text-white cursor-pointer">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say" className="focus:bg-emerald-500/20 focus:text-white cursor-pointer">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <div className="form-field">
                  <Controller
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <CustomDatePicker
                        value={field.value}
                        onChange={field.onChange}
                        label="Date of Birth"
                      />
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-white/70">Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 transition-all duration-300"
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
                  <FormItem className="form-field">
                    <FormLabel className="text-white/70">Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your address"
                        className="resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 min-h-[100px] transition-all duration-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pt-6 flex justify-end border-t border-white/10 mt-6">
                <Button
                  type="submit"
                  className="save-button bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02] px-8"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 font-medium">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
