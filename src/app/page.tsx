import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import HeroNavBar from "@/components/heroNavbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeroNavBar />
      <Hero
        heading="Build Better Habits. One Day at a Time."
        description="Stay consistent, track your progress, and achieve your goals with a simple, distraction-free habit tracker."
        buttons={{
          primary: {
            text: "Join Now",
            url: "/register",
          },
          secondary: {
            text: "Login",
            url: "login",
          },
        }}
      />
      <Footer />
    </>
  );
}
