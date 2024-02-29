import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Decentralised trust, at scale</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Zeko is an isomorphic zero-knowledge (zk) scaling solution for Web3
          apps, built on Mina
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.docs}
        >
          Whitepaper
        </Link>
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.github}
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}
