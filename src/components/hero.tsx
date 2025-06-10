import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import HeroImage from "../../public/images/hero.png";
import Image from "next/image";

interface HeroProps {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    alt: string;
  };
}

const Hero = ({
  heading = "Heading",
  description = "Description",
  buttons = {
    primary: {
      text: "Sign Up",
      url: "",
    },
    secondary: {
      text: "Login",
      url: "",
    },
  },
  image = {
    alt: "Hero Image",
  },
}: HeroProps) => {
  return (
    <section className="flex justify-center items-center py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={HeroImage}
            alt={image.alt}
            className="max-h-115 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
