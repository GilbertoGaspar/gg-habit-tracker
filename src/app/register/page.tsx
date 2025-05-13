import Footer from "@/components/footer";
import HeroNavBar from "@/components/hero-nav-bar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Register as RegisterComponent } from "@/components/register";

export default async function Register() {
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
      <RegisterComponent />
      <Footer />
    </>
  );
}
