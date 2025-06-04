import Footer from "@/components/footer";
import HeroNavBar from "@/components/hero-nav-bar";
import ResetPasswordComponent from "@/components/reset-password";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ResetPassword() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeroNavBar
        auth={{
          login: {
            title: "Login",
            url: "/login",
          },
          signup: {
            title: "Sign Up",
            url: "/register",
          },
        }}
      />
      <ResetPasswordComponent />
      <Footer />
    </>
  );
}
