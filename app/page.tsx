import { title, subtitle } from "@/components/primitives";
import { fontLexend, fontLexendBold, fontLexendLight } from "@/config/fonts";

export default function Home() {
  return (
    <section className="flex flex-col items-center md:items-start justify-start gap-4 md:gap-20 py-8 md:py-10 text-center md:text-left">
      <div
        className={`inline-block max-w-3xl justify-center ${fontLexendLight.className}`}
      >
        <h1 className={`${title()} ${fontLexend.className}`}>
          Decentralized Trust,{" "}
          <strong className={fontLexendBold.className}>Amplified</strong>
        </h1>
        <h2 className={subtitle({ class: "mt-16 max-w-xl" })}>
          Zeko is a{" "}
          <strong className={fontLexendBold.className}>
            zero-knowledge, cross-chain scaling protocol
          </strong>{" "}
          built on Mina and designed for developers shaping the future of
          finance, AI, gaming, and the internet
        </h2>
      </div>
    </section>
  );
}
