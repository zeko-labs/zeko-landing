import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center md:items-start justify-start gap-4 md:gap-20 py-8 md:py-10 text-center md:text-left">
      <div className="inline-block max-w-3xl justify-center">
        <h1 className={title()}>
          Decentralized Trust, <strong>Amplified</strong>
        </h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Zeko is the premium <strong>zero-knowledge scaling protocol</strong>,
          built on Mina and designed for ambitious developers
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:gap-3 items-center">
        <h2 className={subtitle()}>Start building the future...</h2>
        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            MVP Sign Up
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.docs}
          >
            Whitepaper
          </Link>
        </div>
      </div>
    </section>
  );
}
