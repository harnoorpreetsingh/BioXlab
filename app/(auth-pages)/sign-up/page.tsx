"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarIcon, CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { handleSignUpAction } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";
import { CustomDatePicker } from "@/common/CustomDatePicker";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8).regex(passwordRegex, {
      message:
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    }),
    confirmPassword: z.string().min(8),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select a gender.",
    }),
    date_of_birth: z.date({
      required_error: "Please select a date of birth.",
    }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 digits.",
    }),
    address: z.string().min(10, {
      message: "Address must be at least 10 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    handleSignUpAction(values)
      .then(async (result) => {
        if (result?.error) {
          toast.error(result.error);
          setIsSubmitting(false);
        } else {
          toast.success(result?.message || "Account created successfully! Signing you in...");
          // Auto sign-in after registration
          const signInResult = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          
          if (signInResult?.ok) {
            window.location.href = "/dashboard";
          } else {
            router.push("/sign-in");
          }
          form.reset();
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        toast.error("An error occurred during sign up");
        setIsSubmitting(false);
      });
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      {/* Left Column - Image/Branding */}
      <div className="hidden bg-teal-700 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center p-8">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-6">Join our community</h1>
          <p className="text-lg mb-8">
            Create an account to access exclusive features and start your
            journey with us.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckIcon className="h-6 w-6 mr-3" />
              <span>Access to premium content</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-6 w-6 mr-3" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="h-6 w-6 mr-3" />
              <span>Save your preferences</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-700">User Sign Up</h2>
            <p className="text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-teal-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword((v) => !v)}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <CustomDatePicker
                      value={field.value}
                      onChange={field.onChange}
                      label="Date of Birth"
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
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
                        placeholder="Enter your address"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
