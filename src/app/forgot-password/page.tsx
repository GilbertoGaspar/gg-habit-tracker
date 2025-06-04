import Footer from "@/components/footer";
import ForgotPasswordComponent from "@/components/forgot-password";
import HeroNavBar from "@/components/hero-nav-bar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {
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
      <ForgotPasswordComponent />
      <Footer />
    </>
  );
}
