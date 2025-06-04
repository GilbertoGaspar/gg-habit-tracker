"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordUserSchema } from "@/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { postResetPassword } from "@/lib/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface ResetPasswordProps {
  logo?: { url: string; src: string; alt: string };
}

interface ResetPasswordFormInputs {
  password: string;
}

export default function ResetPasswordComponent({
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "Logo",
  },
}: ResetPasswordProps) {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!token) {
    router.replace("/login");
  }

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(ResetPasswordUserSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: postResetPassword,
    onSuccess: () => {
      setIsSubmitting(false);
      resetField("password");
      toast(
        "Password reset successfully. You can now log in with your new password.",
        {
          description: "Please log in with your new password.",
        }
      );
      router.push("/login");
    },
    onError: () => {
      setHasError(true);
      setIsSubmitting(false);
      resetField("password");
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (data) => {
    setIsSubmitting(true);
    const password = data.password;
    resetPasswordMutation.mutate({ token: token || "", password });
  };

  return (
    <section className="flex justify-center items-center py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <a href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              </a>
              <h1 className="mb-2 text-2xl font-bold">Reset Password?</h1>
              <p className="text-muted-foreground">
                Please provide your new password to reset your password.
              </p>
              {hasError && (
                <div
                  className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Something went wrong!</span>{" "}
                    Change a few things up and try submitting again.
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                    {...register("password", {
                      required: "Password is required",
                    })}
                    disabled={isSubmitting}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="mt-2 w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Reset Password
                </Button>
              </div>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Login instead?</p>
                <Link href="/login" className="font-medium text-primary">
                  Click here.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
