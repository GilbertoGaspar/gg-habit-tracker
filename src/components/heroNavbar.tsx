import { Button } from "./ui/button";

interface HeroNavbarProps {
  logo?: {
    url: string;
    src: string;
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
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "GG Habit Tracker",
  },
  auth = {
    login: {
      title: "Login",
      url: "/login",
    },
    signup: {
      title: "Sign Up",
      url: "/register",
    },
  },
}: HeroNavbarProps) {
  return (
    <section className="flex justify-center items-center py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="justify-between flex gap-10">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
}
