"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ListCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordUserSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { postForgotPassword } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ForgotPasswordProps {
  logo?: { url: string; alt: string };
}

interface ForgotPasswordFormInputs {
  email: string;
}

export default function ForgotPasswordComponent({
  logo = {
    url: "/",
    alt: "Logo",
  },
}: ForgotPasswordProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(ForgotPasswordUserSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: postForgotPassword,
    onSuccess: () => {
      setIsSubmitting(false);
      toast("Password reset link sent successfully. Please check your email.");
      resetField("email");
      router.push("/login");
    },
    onError: () => {
      setHasError(true);
      setIsSubmitting(false);
      resetField("email");
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    setIsSubmitting(true);
    const email = data.email;
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <section className="flex justify-center items-center py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <a href={logo.url} className="mb-6 flex items-center gap-2">
                <ListCheck />
              </a>
              <h1 className="mb-2 text-2xl font-bold">Forgot Password?</h1>
              <p className="text-muted-foreground">
                Please provide your email to reset your password.
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
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  {...register("email", { required: "Email is required" })}
                  disabled={isSubmitting}
                />
                {errors.email && <p>{errors.email.message}</p>}

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
