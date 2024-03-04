import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center md:items-start justify-start gap-4 py-8 md:py-10 text-center md:text-left">
      <div className="inline-block max-w-3xl justify-center">
        <h1 className={title()}>
          Decentralized Privacy, <strong>Amplified</strong>
        </h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Zeko is the premium zero-knowledge scaling protocol, built on Mina and
          designed for developers thinking bigger
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        <h2 className={subtitle()}>Stay tuned for the future of zk...</h2>
        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            Sign Up
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
