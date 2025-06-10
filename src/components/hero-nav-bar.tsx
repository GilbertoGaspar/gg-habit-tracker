import { ListCheck } from "lucide-react";
import { Button } from "./ui/button";

interface HeroNavbarProps {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

export default function HeroNavBar({
  logo = {
    url: "/",
    alt: "logo",
    title: "GG Habit Tracker",
  },
  auth = undefined,
}: HeroNavbarProps) {
  return (
    <section className="flex justify-center items-center py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="justify-between flex gap-10">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <ListCheck />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>
          {auth && (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button asChild size="sm">
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
}
