"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Lock, AlertCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (verified === "true") {
      toast.success("Account verified successfully");
    }
  }, [verified]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      } else if (result?.ok) {
        toast.success("Signed in successfully");
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "An error occurred");
      toast.error(`Sign in failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      {/* Left Column - Image */}
      <div className="hidden bg-gray-100 lg:flex lg:w-1/2 lg:items-center lg:justify-center p-8">
        <div className="relative max-h-max w-full max-w-md">
          <Image
            src="https://images.pexels.com/photos/9574511/pexels-photo-9574511.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Laboratory equipment"
            width={600}
            height={600}
            className="rounded-lg object-cover shadow-lg !mt-auto"
            priority
          />
          <div className="absolute inset-0 bg-teal-700/20 rounded-lg"></div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-700">User Login</h2>
            <p className="text-gray-500 mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-teal-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="email@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link
                  href="/forgot-password"
                  className="text-sm text-teal-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-teal-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
