import Footer from "@/components/footer";
import HeroNavBar from "@/components/heroNavbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Login as LoginComponent } from "@/components/login";

export default async function Login() {
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
      <LoginComponent />
      <Footer />
    </>
  );
}
