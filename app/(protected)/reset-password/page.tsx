"use client";

import { useState } from "react";
import { resetPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await resetPasswordAction(formData);
      if (result?.success) {
        toast.success(result.message || "Password updated");
        router.push("/sign-in");
        // Optionally redirect after success, e.g.:
        // window.location.href = "/sign-in";
      } else {
        toast.error(result?.message || "Password update failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full bg-white">
      <div className="w-full max-w-md p-6 lg:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-700">Reset Password</h2>
          <p className="text-gray-500 mt-2">
            Please enter your new password below.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                required
                className="mt-2"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((v) => !v)}
                style={{ top: "2.25rem" }} // adjust for input padding
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                required
                className="mt-2"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword((v) => !v)}
                style={{ top: "2.25rem" }}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <SubmitButton
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={isSubmitting}
            pendingText="Resetting..."
          >
            Reset password
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
