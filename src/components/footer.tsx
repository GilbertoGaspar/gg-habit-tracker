interface BottomLink {
  text: string;
  url: string;
}

interface FooterProps {
  copyright?: string;
  bottomLinks?: BottomLink[];
}

export default function Footer({
  copyright = "© 2024 Gilberto Gaspar. All rights reserved.",
  bottomLinks,
}: FooterProps) {
  return (
    <section className="flex justify-center items-center py-4">
      <div className="container">
        <footer>
          <div className="mt-4 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
