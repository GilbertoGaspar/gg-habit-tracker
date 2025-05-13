"use client";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginProps {
  heading?: string;
  subheading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  loginText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  heading = "Login",
  subheading = "",
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "Logo",
  },
  loginText = "Log in",
  googleText = "Log in with Google",
  signupText = "Don't have an account?",
  signupUrl = "/register",
}: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setIsSubmitting(true);
    const email = data.email;
    const password = data.password;

    // Place API call here to authenticate user credentials
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          setHasError(true);
        } else {
          redirect("/dashboard");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        resetField("password");
      });
  };

  const onGoogleLogin = () => {
    setIsSubmitting(true);
    signIn("google", {
      callbackUrl: "/dashboard",
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          setHasError(true);
        } else {
          redirect("/dashboard");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
              <p className="text-muted-foreground">{subheading}</p>
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
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password
                  </a>
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  {loginText}
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={onGoogleLogin}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>{signupText}</p>
                <a href={signupUrl} className="font-medium text-primary">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
